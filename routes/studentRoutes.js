const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");

const {
  allStudent,
  currentStudent,
  studentSignUp,
  studentSignIn,
  studentSignOut,
  studentSendMail,
  studentForgetPassword,
  studentUpdatePassword,
  studentUpdateDetails,
  studentAvatarUpload,
  studentAccountDelete,
  viewAllInternship,
  applyInternship,
  viewAllJob,
  applyJob,

} = require("../controllers/studentController");

// GET /student/dashboard
router.get("/allStudent", allStudent);

// GET /student/current
router.get("/current", isAuthenticated , currentStudent);

// POST /student/signup
router.post("/signup", studentSignUp);

// POST /student/signin
router.post("/signin", studentSignIn);

// GEt /student/signout
router.get("/signout", isAuthenticated, studentSignOut);

// POST /student/send-mail
router.post("/send-mail", studentSendMail);

// GET /student/forget-password/:studentId
router.post("/forget-password/", studentForgetPassword);

// POST /student/update-password/:studentId
router.post("/update-password/:id", isAuthenticated, studentUpdatePassword);

// POST /student/update/:studentId
router.post("/update/:id", isAuthenticated, studentUpdateDetails);

// POST /student/avatar/:studentId
router.post("/avatar/:id", isAuthenticated, studentAvatarUpload);

// GET /student/delete-account/:studentId
router.get("/delete-account/:studentId", isAuthenticated, studentAccountDelete);



// ================= Apply Internship =============================================
// GET /student/allinternships
router.get("/allinternships", isAuthenticated, viewAllInternship);

// GET /student/apply-internship/:internshipId
router.get("/apply-internship/:internshipId", isAuthenticated, applyInternship);

// ================= Apply Job =============================================
// GET /student/alljobs
router.get("/alljobs", isAuthenticated, viewAllJob);

// GET /student/apply-job/:jobId
router.get("/apply-job/:jobId", isAuthenticated, applyJob);


module.exports = router;
