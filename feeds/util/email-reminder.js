const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kf12560@gmail.com',
    pass: 'qDW6F85&'
  }
});

const sendMail = (err) => {

    const mailOptions = {
        from: 'kf12560@gmail.com',
        to: 'khaleelfreeman@gmail.com',
        subject: 'Server Issues',
        text: err,
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Error email sent sent: ' + info.response);
        }
      });
}

exports.sendMail = sendMail;