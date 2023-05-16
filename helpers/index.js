"use strict"
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const nodemailer = require('nodemailer');


const testAccount = {
  host: "smtp.zoho.eu",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'test@pyker.click',
    pass: '7zp-bVya'
  }
}
  

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || testAccount.host,
    port: process.env.EMAIL_PORT || testAccount.port,
    secure: process.env.EMAIL_SECURE || testAccount.secure, 
    auth: {
      user: process.env.EMAIL_USER || testAccount.auth.user,
      pass: process.env.EMAIL_PASS || testAccount.auth.pass, 
    },
});



function generateOTP(length = 6) {
    let Token = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; ++i) {
        Token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return Token;
}


module.exports = {
    async sendOTP(email){
        const otp = generateOTP();
        const html = await readFile('./static/email_template.html', 'utf8');
        const customized_email = html.replace('{{otp}}', otp);
          

        let info = await transporter.sendMail({
            from: "Phonebook " + `${transporter.options.auth.user}`,
            to: email,
            subject: "Confirm Your Identity",
            html: customized_email
        });
        console.log(info);
        return otp;
    }
}