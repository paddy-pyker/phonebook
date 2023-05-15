const express = require('express')
const cors = require('cors')
const models = require('./models');

app.use(cors());
const app = express()

const Auth = models.Auth;
const UserInfo = models.UserInfo;
const Contact = models.Contact;

app.get('/',(req,res) => {
	res.json({
		status:'Hello World!'
	})
})

module.exports = app;