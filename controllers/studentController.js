const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const { sendmail } = require("../utils/nodemailer");
const imagekit = require("../utils/imagekit").initImageKit();
const path = require("path");

// Callback functions for homepage
exports.studentHomepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Welcome To Student Homepage" });
});

// Callback functions for current student
exports.allStudent = catchAsyncErrors(async (req, res, next) => {
  const allStudent = await Student.find()
    .exec();
  res.json({ allStudent });
});
// Callback functions for current student
exports.currentStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id)
    .populate("jobs")
    .populate("internships")
    .exec();
  res.json({ student });
});

// Callback functions for student signup
exports.studentSignUp = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student(req.body).save();
  sendtoken(student, 201, res);
});

// Callback functions for student signin
exports.studentSignIn = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }) //Find student by their Email address
    .select("+password")
    .exec();

  if (!student) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  // Check password
  const isMatch = student.comparepassword(req.body.password);
  if (!isMatch) return next(new ErrorHandler("Wrong Password", 500));

  // res.json(student);
  sendtoken(student, 200, res);
});

// Callback functions for student signout
exports.studentSignOut = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Successfully Logged Out",
  });
});

// Callback functions for sending reset link mail
exports.studentSendMail = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  // const resetURL = `${req.protocol}://${req.get("host")}/student/forget-link/${
  //   student._id
  // }`;
  const resetURL = Math.round(Math.random() * 9000 + 1000);
  sendmail(req, res, next, resetURL);
  student.resetPasswordToken = `${resetURL}`;
  await student.save();

  res.json({
    message: "Email sent successfully ! Please Check your inbox/spam folder",
    student
  });
});

// Callback functions for forget links
exports.studentForgetPassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ email: req.body.email }).exec();

  if (!student) {
    return next(
      new ErrorHandler("User not found with this email address", 404)
    );
  }

  if (student.resetPasswordToken == req.body.otp) {
    student.resetPasswordToken = "0";
    student.password = req.body.password;
    await student.save();
  } else {
    return next(
      new ErrorHandler("Invalid Reset Password OTP ! Please try again ", 500)
    );
  }

  res.status(200).json({ message: "Password has been successfully reset" });
});

// // Callback functions for Updateing the Password
// exports.verifyOtp = catchAsyncErrors(async (req, res, next) => {
//   const student = await Student.findOne({email: req.body.email}).exec();

//   if (!student) {
//     return next(
//       new ErrorHandler("User not found with this email address", 404)
//     );
//   }

//   student.password = req.body.password;
//   await student.save();
//   sendtoken(student, 201, res);
// });

// Callback functions for Updateing the Password
exports.studentUpdatePassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();

  student.password = req.body.password;
  await student.save();
  sendtoken(student, 201, res);
});

// Callback functions for Updating the student details
exports.studentUpdateDetails = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body
  ).exec();
  res.status(200).json({
    success: true,
    message: "Student details updated successfully !",
    student,
  });
});

// Callback functions for uploading image into the imageKit and student avatar field
exports.studentAvatarUpload = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.params.id).exec();
  const file = req.files.avatar;
  const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(
    file.name
  )}`;

  if (student.avatar.fileId !== "" && student.avatar.fileId !== undefined) {
    await imagekit.deleteFile(student.avatar.fileId);
  }

  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });

  student.avatar = { fileId, url };
  await student.save();

  res.status(200).json({
    success: true,
    message: "Image Uploaded!",
  });
});

// Callback functions for Delete Student Account
exports.studentAccountDelete = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.studentId);
  const allJobs = await Job.find().exec();
  const allInternships = await Internship.find().exec();

  allInternships.forEach(async (internship) => {
    if (internship.students.includes(student._id)) {
      internship.students.pull(student._id);
      await internship.save();
    }
  });

  allJobs.forEach(async (job) => {
    if (job.students.includes(student._id)) {
      job.students.pull(student._id);
      await job.save();
    }
  });

  res.json({
    success: true,
    message: "Account Deleted!",
    studentID: req.params.studentId,
  });
});

// =========== Apply Internship ==========================
//Callback function for viewing all internships
exports.viewAllInternship = catchAsyncErrors(async (req, res, next) => {
  const internships = await Internship.find().exec();
  res.status(201).json({ internships });
});

// Callback functions for viewing loggedin/current student details
exports.applyInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const internship = await Internship.findById(req.params.internshipId).exec();

  if (!student.internships.includes(internship._id)) {
    student.internships.push(internship._id);
    internship.students.push(student._id);
    await student.save();
    await internship.save();
  } else {
    return next(
      new ErrorHandler("You have already applied for this internship ", 500)
    );
  }

  res.json({
    success: true,
    message: "Applied for An Internship !",
    student,
    internship,
  });
});

// =========== Apply Job ==========================
// Callback functions for view All jobs
exports.viewAllJob = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find().populate('employee').exec();
  res.status(201).json({  jobs });
});

// Callback functions for viewing loggedin/current student details
exports.applyJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const job = await Job.findById(req.params.jobId).exec();

  if (!student.jobs.includes(job._id)) {
    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save();
    await job.save();
  } else {
    return next(
      new ErrorHandler("You have already applied for this job ", 500)
    );
  }

  res.json({ success: true, message: "Applied for A Job !", student, job });
});
