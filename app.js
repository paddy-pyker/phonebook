"use strict"
const express = require('express')
const cors = require('cors')
const models = require('./models');
const {sendOTP} = require('./helpers');

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

app.post('/auth', async(req,res) => {
	const mail= req.body['email']
	console.log(req.body);
	await sendOTP(mail)
	res.json({
		status:'OK'
	})
})

module.exports = app;