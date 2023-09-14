const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");

const {
  // For Resume Dashboard
  resumeDashboard,
  currentStudentResume,
  // For Education
  addEducation,
  editEducation,
  deleteEducation,
  // For Jobs
  addJob,
  editJob,
  deleteJob,
  // For Internships
  addInternship,
  editInternship,
  deleteInternship,
  // For Skills
  addSkill,
  editSkill,
  deleteSkill,
  // For Interests
  addInterest,
  editInterest,
  deleteInterest,
  // For Projects
  addProject,
  editProject,
  deleteProject,
  // For Courses
  addCourse,
  editCourse,
  deleteCourse,
  // For Responsibilities
  addRole,
  editRole,
  deleteRole,
  // For Accomplishments
  addAward,
  editAward,
  deleteAward,

} = require("../controllers/resumeController");



// GET /resume/dashboard
router.get("/dashboard", isAuthenticated, resumeDashboard);

// GET /resume/
router.get("/current-student-resume", isAuthenticated, currentStudentResume);

// ================================ For Education (START)=================================================================

// POST /resume/add-edu
router.post("/add-edu", isAuthenticated, addEducation);

// POST /resume/edit-edu
router.post("/edit-edu/:eduId", isAuthenticated, editEducation);

// GET /resume/delete-edu
router.get("/delete-edu/:eduId", isAuthenticated, deleteEducation);

// ================================ For Education (END)=================================================================

// ================================ For Jobs (START)=================================================================

// POST /resume/add-job
router.post("/add-job", isAuthenticated, addJob);

// POST /resume/edit-job
router.post("/edit-job/:jobId", isAuthenticated, editJob);

// GET /resume/delete-job
router.get("/delete-job/:jobId", isAuthenticated, deleteJob);

// ================================ For Jobs (END)=================================================================

// ================================ For Projects (START)=================================================================

// POST /resume/add-project
router.post("/add-project", isAuthenticated, addProject);

// POST /resume/edit-project
router.post("/edit-project/:projectId", isAuthenticated, editProject);

// GET /resume/delete-project
router.get("/delete-project/:projectId", isAuthenticated, deleteProject);

// ================================ For Projects (END)=================================================================

// ================================ For Skills (START)=================================================================

// POST /resume/add-skill
router.post("/add-skill", isAuthenticated, addSkill);

// POST /resume/edit-skill
router.post("/edit-skill/:skillId", isAuthenticated, editSkill);

// GET /resume/delete-skill
router.get("/delete-skill/:skillId", isAuthenticated, deleteSkill);

// ================================ For Skills (END)=================================================================

// ================================ For Interests (START)=================================================================

// POST /resume/add-interest
router.post("/add-interest", isAuthenticated, addInterest);

// POST /resume/edit-interest
router.post("/edit-interest/:interestId", isAuthenticated, editInterest);

// GET /resume/delete-interest
router.get("/delete-interest/:interestId", isAuthenticated, deleteInterest);

// ================================ For Interests (END)=================================================================

// ================================ For Internship (START)=================================================================

// POST /resume/add-internship
router.post("/add-internship", isAuthenticated, addInternship);

// POST /resume/edit-internship
router.post("/edit-internship/:internshipId", isAuthenticated, editInternship);

// GET /resume/delete-internship
router.get( "/delete-internship/:internshipId", isAuthenticated, deleteInternship );

// ================================ For Internship (END)=================================================================

// ================================ For Courses (START)=================================================================

// POST /resume/add-course
router.post("/add-course", isAuthenticated, addCourse);

// POST /resume/edit-course
router.post("/edit-course/:courseId", isAuthenticated, editCourse);

// GET /resume/delete-course
router.get("/delete-course/:courseId", isAuthenticated, deleteCourse);

// ================================ For Courses (END)=================================================================

// ================================ For Accomplishments / Awards (START)=================================================================

// POST /resume/add-award
router.post("/add-award", isAuthenticated, addAward);

// POST /resume/edit-award
router.post( "/edit-award/:awardId", isAuthenticated, editAward );

// GET /resume/delete-award
router.get( "/delete-award/:awardId", isAuthenticated, deleteAward );

// ================================ For Accomplishments (END)=================================================================

// ================================ For Responsibilities (START)=================================================================

// POST /resume/add-role
router.post("/add-role", isAuthenticated, addRole);

// POST /resume/edit-role
router.post( "/edit-role/:roleId", isAuthenticated, editRole );

// GET /resume/delete-role
router.get( "/delete-role/:roleId", isAuthenticated, deleteRole );

// ================================ For Responsibilities (END)=================================================================






module.exports = router;
