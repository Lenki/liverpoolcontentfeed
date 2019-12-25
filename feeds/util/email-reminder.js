const nodemailer = require('nodemailer');
const SERVICE = 'gmail'
const SUBJECT = 'Server Issues'

const transporter = nodemailer.createTransport({
  service: SERVICE,
  auth: {
    user: process.env.SERVER_EMAIL,
    pass: process.env.SERVER_EMAIL_PASSWORD,
  }
});

const sendMail = (err) => {

    const mailOptions = {
        from: process.env.SERVER_EMAIL,
        to: process.env.CLIENT_EMAIL,
        subject: SUBJECT,
        text: err,
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Error email sent');
        }
      });
}

exports.sendMail = sendMail;