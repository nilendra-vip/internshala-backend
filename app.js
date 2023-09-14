require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();


// Database Connection
require("./models/database").connectDatabase();

// Logger
const logger = require("morgan");
app.use(logger("dev"));

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieparser());

//express file-upload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// CORS
app.use(require("cors")({ credentials: true, origin: true }));

// routes code
app.use("/", require("./routes/indexRoutes.js"));
app.use("/student", require("./routes/studentRoutes.js"));
app.use("/resume", require("./routes/resumeRoutes.js"));
app.use("/employee", require("./routes/employeeRoutes.js"));

//Error Handling
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Page not found`, 404));
});
app.use(generatedErrors);

// Server Listening Port
app.listen(
  process.env.PORT,
  console.log(`server is running on port ${process.env.PORT}`)
);

