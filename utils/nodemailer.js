const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");
require("dotenv").config({ path: "./.env" });

exports.sendmail = (req, res, next, resetURL) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
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
    subject: "OTP for Forget Password 🔑",
    html: `<div
    style="
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    "
  >
    <div 
      style="
        padding: 5vmax 3vmax;
        background-color: rgba(208, 208, 208, 0.512);
        width: fit-content;
        margin: auto;
        border-radius: 10px;
      "
    >
      <h1
        style="
          width: 100%;
          font-family: 'Karla', sans-serif;
          text-align: center;
        "
      >
        Internshala Clone React App
      </h1>
      <h4
        style="
          font-family: 'Karla', sans-serif;
          font-weight: 400;
          line-height: 28px;
          text-align: center;
        "
      >
        Hello 👋,
        <br />
        You have requested an OTP to reset the password 🔑 for your Internshala
        account (Email ✉️ : ${req.body.email}).
      </h4>
      <h1
        style="
          width: 100%;
          font-family: 'Karla', sans-serif;
          letter-spacing: 10px;
          font-weight: 400;
          line-height: 28px;
          text-align: center;
          color: green;
          padding: 5px;
          border: 1px solid rgba(90, 90, 90, 0.261);
          width: fit-content;
          margin: auto;
        "
      >
      ${resetURL}
      </h1>
      <h4
        style="
          width: 100%;
          font-family: 'Karla', sans-serif;
          font-weight: 400;
          line-height: 28px;
          text-align: center;
          color: tomato;
          font-weight: 600;
        "
      >
        ⚠️ If you did not request this OTP , please ignore this email.
      </h4>
    </div>
  </div>`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) return next(new ErrorHandler(err, 500));
    console.log(info);
  });
};
