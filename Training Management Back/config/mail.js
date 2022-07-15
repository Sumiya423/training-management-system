const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a58d45b0aea11a",
    pass: "a8505d6d044a18"
  }
});


const sendMail = async (mailOptions) => {
  try {
    const mail = await transport.sendMail(mailOptions);
    console.log("Email sent: ", mail.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = sendMail;