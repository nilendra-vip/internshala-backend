const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");
require("dotenv").config({ path: "./.env" });

exports.sendmail = (req, res, next, resetURL) => {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.USER_EMAIL_ADDRESS,
      pass: process.env.USER_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Nilendra Patel Company",
    to: req.body.email,
    subject: "OTP for Password Reset",
    html: `<h3>${resetURL}</h3>`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) return next(new ErrorHandler(err, 500));
    console.log(info);
  });
};
