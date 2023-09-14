const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");

const {
  employeeDashboard,
  employeeSignUp,
  employeeSignIn,
  employeeSignOut,
  currentEmployee,
  employeeSendMail,
  employeeForgetPassword,
  employeeUpdatePassword,
  employeeUpdateDetails,
  employeeOrganizationLogo,
  // FOR INTERNSHIPS
  createInternship,
  viewCurEmpAllIntern,
  viewAllInternship,
  viewSingleInternship,
  // FOR JOBS
  createJob,
  viewCurEmpAllJob,
  viewAllJob,
  viewSingleJob,

} = require("../controllers/employeeController");

// GET /employee/dashboard
router.get("/dashboard", employeeDashboard);

// GEt /employee/current
router.get("/current", isAuthenticated, currentEmployee);

// POST /employee/signup
router.post("/signup", employeeSignUp);

// POST /employee/signin
router.post("/signin", employeeSignIn);

// GEt /employee/signout
router.get("/signout", isAuthenticated, employeeSignOut);

// POST /employee/send-mail
router.post("/send-mail", employeeSendMail);

// POST /employee/forget-link/:employeeId
router.post("/forget-password", employeeForgetPassword);

// POST /employee/update-password/:employeeId
router.post("/update-password/:id", isAuthenticated, employeeUpdatePassword);

// POST /employee/update/:employeeId
router.post("/update/:id", isAuthenticated, employeeUpdateDetails);

// POST /employee/avatar/:employeeId
router.post(
  "/organization-logo/:id",
  isAuthenticated,
  employeeOrganizationLogo
);

// ================================== Internship ================================

// POST /employee/internship/create
router.post("/internship/create", isAuthenticated, createInternship);

// GET /employee/internship/view-all
router.get("/internship/view-cur-emp-all-intern", isAuthenticated, viewCurEmpAllIntern);

// GET /employee/internship/view-single
router.get("/internship/view-single/:id", isAuthenticated, viewSingleInternship);

// GET /employee/internship/view-all
router.get("/internship/view-all", isAuthenticated, viewAllInternship);



// ================================== Job ================================

// POST /employee/job/create
router.post("/job/create", isAuthenticated, createJob);

// GET /employee/job/view-all
router.get("/job/view-cur-emp-all-job/", isAuthenticated, viewCurEmpAllJob);

// GET /employee/job/view-single
router.get("/job/view-single/:id", isAuthenticated, viewSingleJob);

// GET /employee/job/view-all
router.get("/job/view-all", isAuthenticated, viewAllJob);





module.exports = router;