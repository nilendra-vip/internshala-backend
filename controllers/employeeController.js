const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Employee = require("../models/employeeModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");

// Callback functions for employee dashboard
exports.employeeDashboard = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Welcome To Employee Homepage" });
});

// Callback functions for viewing loggedin employee details
exports.currentEmployee = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();
  res.json({ employee });
});

// Callback functions for employee signup
exports.employeeSignUp = catchAsyncErrors(async (req, res, next) => {
  const employee = await new Employee(req.body).save();
  sendtoken(employee, 201, res);
});

// Callback functions for employee signin
exports.employeeSignIn = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }) //Find employee by their Email address
    .select("+password")
    .exec();

  if (!employee)
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );

  // Check password
  const isMatch = employee.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Password", 500));

  sendtoken(employee, 200, res);
});

// Callback functions for employee signout
exports.employeeSignOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
});

// Callback functions for sending rset link mail
exports.employeeSendMail = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }).exec();

  if (!employee) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }
  // const resetURL = `${req.protocol}://${req.get("host")}/employee/forget-link/${
  //   employee._id
  // }`;

  const resetURL = Math.round(Math.random() * 9000 + 1000);
  sendmail(req, res, next, resetURL);
  employee.resetPasswordToken = `${resetURL}`;
  await employee.save();

  res.json({
    message: "Email sent successfully ! Please Check your inbox/spam folder",
  });
});

// Callback functions for forget links
exports.employeeForgetPassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findOne({ email: req.body.email }).exec();

  if (!employee) {
    return next(
      new ErrorHandler("Employee not found with this email address", 404)
    );
  }

  if (employee.resetPasswordToken == req.body.otp) {
    employee.resetPasswordToken = "0";
    employee.password = req.body.password;
    await employee.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password Link ! Please try again ", 500)
    );
  }

  res.status(200).json({ message: "Password has been successfully reset" });
});

// Callback functions for Updateing the Password
exports.employeeUpdatePassword = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();

  employee.password = req.body.password;
  await employee.save();
  sendtoken(employee, 201, res);
});

// Callback functions for Updating the employee details
exports.employeeUpdateDetails = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({
    success: true,
    message: "employee details updated successfully !",
    employee,
  });
});

// Callback functions for uploading image into the imageKit and employee avatar field
exports.employeeOrganizationLogo = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).exec();
  const file = req.files.organizationLogo;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (employee.organizationLogo.fileId !== "") {
    await imagekit.deleteFile(employee.organizationLogo.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  employee.organizationLogo = { fileId, url };
  await employee.save();

  res.status(200).json({
    success: true,
    message: "Image Uploaded!",
    file,
  });
});

// ============================ Internships =================================

// Callback functions for creating internship
exports.createInternship = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  const internship = await new Internship(req.body);

  internship.employee = employee._id;
  employee.internships.push(internship._id);

  await internship.save();
  await employee.save();

  res.status(201).json({ internship });
});

// Callback functions for view All internships by Current Employee
exports.viewCurEmpAllIntern = catchAsyncErrors(async (req, res, next) => {
  const { internships } = await Employee.findById(req.id)
    .populate("internships")
    .exec();
  res.status(201).json({ internships: internships });
});

// Callback functions for view Single internships
exports.viewSingleInternship = catchAsyncErrors(async (req, res, next) => {
  const internship = await Internship.findById(req.params.id)
    .populate("employee")
    .exec();
  res.status(201).json({ internship });
});

// Callback functions for view All internships
exports.viewAllInternship = catchAsyncErrors(async (req, res, next) => {
  const internships = await Internship.find().exec();
  res.status(201).json({ internships });
});

// ============================ Jobs =================================

// Callback functions for creating Job
exports.createJob = catchAsyncErrors(async (req, res, next) => {
  const employee = await Employee.findById(req.id).exec();
  const job = await new Job(req.body);

  job.employee = employee._id;
  employee.jobs.push(job._id);

  await job.save();
  await employee.save();

  res.status(201).json({ job });
});

// Callback functions for view All jobs by Current Employee
exports.viewCurEmpAllJob = catchAsyncErrors(async (req, res, next) => {
  const { jobs } = await Employee.findById(req.id).populate("jobs").exec();
  res.status(201).json({ jobs });
});

// Callback functions for view Single jobs
exports.viewSingleJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.findById(req.params.id).populate("employee").exec();
  res.status(201).json({ jobs });
});

// Callback functions for view All jobs
exports.viewAllJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find().populate("employee").exec();
  res.status(201).json({ jobs });
});
