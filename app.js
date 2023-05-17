"use strict"
const express = require('express')
const cors = require('cors')
const models = require('./models');
const {sendOTP} = require('./helpers');
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const verifyToken = require('./middlewares').verifyToken;
const multiavatar = require('@multiavatar/multiavatar')

const app = express()
app.use(cors());
app.use(require('express').json())
app.use(cookieParser());

const User = models.User;
const Avatar = models.Avatar;
const Contact = models.Contact;

app.get('/',(req,res) => {
	res.json({
		status:'Hello World!'
	})
})

app.post('/send_otp', async(req,res) => {
	const email= req.body['email'] || '';

	const otp = await sendOTP(email)
	console.log(otp,req.body);

	const [user, created] = await User.findOrCreate({
		where: {email},
		defaults: {
			email,
			otp
		}
	})

	if(!created){
		user.otp = otp;
		await user.save();
	}	

	res.json({
		status:'OK'
	})
})


app.post('/verify_otp', async(req,res) => {
	const email = req.body['email'] || '';
	const otp = req.body['otp'] || '';

	//check if otp is valid and less than 10 minutes old
	const user = await User.findOne({
		where: {
			email,
			otp,
			updatedAt: {
				[Op.gt]: new Date(new Date() - 10 * 60 * 1000)
			}
		}})
	
		if(user){
			//send a jwt as set-cookie header
			const payload = { email: user.email };
			const secretKey = process.env.JWT_SECRET || 'g0m^sh!';
			const options = { expiresIn: '1h' };

			const token = jwt.sign(payload, secretKey, options);

			res.cookie('token',token,{
				httpOnly:true,
				sameSite:'strict'
			})			

			res.json({
				status:'OK'
			})

		}else{
			res.json({
				status:'FAILED'
			})
		}

})

app.post('/add_contact', verifyToken, async(req,res) => {
	const email = req.user.email;
	const name = req.body['name'] || '';
	const phone = req.body['phone'] || '';
	let image = multiavatar(name);
	image = "data:image/svg+xml," + encodeURIComponent(image);

	const [contact, created] = await Contact.findOrCreate({
		where: {email,phone},
		defaults: {
			email,
			name,
			phone
		}
	})

	if(!created){
		contact.name = name;
		await contact.save();
	}

	//add the image to the avatar table
	const [avatar, createdd] = await Avatar.findOrCreate({
		where: {name},
		defaults: {
			name,
			image
		}
	})

	res.json({
		status:'OK'
	})
})



module.exports = app;