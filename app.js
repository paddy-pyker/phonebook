"use strict"
const express = require('express')
const cors = require('cors')
const models = require('./models');
const {sendOTP} = require('./helpers');
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors());
app.use(require('express').json())

const Auth = models.Auth;
const UserInfo = models.UserInfo;
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

	const [auth, created] = await Auth.findOrCreate({
		where: {email},
		defaults: {
			email,
			otp
		}
	})

	if(!created){
		auth.otp = otp;
		await auth.save();
	}	

	res.json({
		status:'OK'
	})
})


app.post('/verify_otp', async(req,res) => {
	const email = req.body['email'] || '';
	const otp = req.body['otp'] || '';

	//check if otp is valid and less than 10 minutes old
	const auth = await Auth.findOne({
		where: {
			email,
			otp,
			updatedAt: {
				[Op.gt]: new Date(new Date() - 10 * 60 * 1000)
			}
		}})
	
		if(auth){
			//send a jwt as set-cookie header
			const payload = { email: auth.email };
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


module.exports = app;