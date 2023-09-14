const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require("uuid");

// Callback functions for resume dashboard
exports.resumeDashboard = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ message: "Welcome to your Resume Page"});
});

// Callback functions for view current student resume
exports.currentStudentResume = catchAsyncErrors(async (req, res, next) => {
  const { resume } = await Student.findById(req.id).exec();
  res.json({ studentId:req.id , resume });
});

// ================================ For Education (START)=================================================================

// Callback functions for add education
exports.addEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ student});
});

// Callback functions for edit education
exports.editEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const eduIndex = student.resume.education.findIndex(
    (i) => i.id === req.params.eduId
  );
  student.resume.education[eduIndex] = {
    ...student.resume.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Education Updated" });
});

// Callback functions for delete education
exports.deleteEducation = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredEdu = student.resume.education.filter(
    (i) => i.id !== req.params.eduId
  );
  student.resume.education = filteredEdu;
  await student.save();
  res.json({ message: "Education Deleted " });
});

// ================================ For Education (END)=================================================================

// ================================ For Jobs (START)=================================================================

// Callback functions for add Job
exports.addJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Job added" });
});

// Callback functions for edit Job
exports.editJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const jobIndex = student.resume.jobs.findIndex(
    (i) => i.id === req.params.jobId
  );
  student.resume.jobs[jobIndex] = {
    ...student.resume.jobs[jobIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Job Updated" });
});

// Callback functions for delete Job
exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredJob = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobId
  );
  student.resume.jobs = filteredJob;
  await student.save();
  res.json({ message: "Job Deleted " });
});

// ================================ For Jobs (END)=================================================================

// ================================ For Internship (START)=================================================================

// Callback functions for add Internship
exports.addInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.internships.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Internships added" });
});

// Callback functions for edit Internship
exports.editInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const InternshipIndex = student.resume.internships.findIndex(
    (i) => i.id === req.params.internshipId
  );
  student.resume.internships[InternshipIndex] = {
    ...student.resume.internships[InternshipIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Internships Updated" });
});

// Callback functions for delete Internship
exports.deleteInternship = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredInternship = student.resume.internships.filter(
    (i) => i.id !== req.params.internshipId
  );
  student.resume.internships = filteredInternship;
  await student.save();
  res.json({ message: "Internships Deleted " });
});

// ================================ For Internship (END)=================================================================

// ================================ For Skills (START)=================================================================

// Callback functions for add Skill
exports.addSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.skills.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Skill added" });
});

// Callback functions for edit Skill
exports.editSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const skillIndex = student.resume.skills.findIndex(
    (i) => i.id === req.params.skillId
  );
  student.resume.skills[skillIndex] = {
    ...student.resume.skills[skillIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Skill Updated" });
});

// Callback functions for delete Skill
exports.deleteSkill = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredSkill = student.resume.skills.filter(
    (i) => i.id !== req.params.skillId
  );
  student.resume.skills = filteredSkill;
  await student.save();
  res.json({ message: "Skill Deleted " });
});

// ================================ For Skills (END)=================================================================

// ================================ For Interests (START)=================================================================

// Callback functions for add Interest
exports.addInterest = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.interests.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Interest added" });
});

// Callback functions for edit Interest
exports.editInterest = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const interestIndex = student.resume.interests.findIndex(
    (i) => i.id === req.params.interestId
  );
  student.resume.interests[interestIndex] = {
    ...student.resume.interests[interestIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Interest Updated" });
});

// Callback functions for delete Interest
exports.deleteInterest = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredInterest = student.resume.interests.filter(
    (i) => i.id !== req.params.interestId
  );
  student.resume.interests = filteredInterest;
  await student.save();
  res.json({ message: "Interest Deleted " });
});

// ================================ For Interests (END)=================================================================

// ================================ For Projects (START)=================================================================

// Callback functions for add Project
exports.addProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.projects.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Project added" });
});

// Callback functions for edit Project
exports.editProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const projectIndex = student.resume.projects.findIndex(
    (i) => i.id === req.params.projectId
  );
  student.resume.projects[projectIndex] = {
    ...student.resume.projects[projectIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Project Updated" });
});

// Callback functions for delete Project
exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredProject = student.resume.projects.filter(
    (i) => i.id !== req.params.projectId
  );
  student.resume.projects = filteredProject;
  await student.save();
  res.json({ message: "Project Deleted " });
});

// ================================ For Projects (END)=================================================================

// ================================ For Courses (START)=================================================================

// Callback functions for add Course
exports.addCourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.courses.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Course added" });
});

// Callback functions for edit Course
exports.editCourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const courseIndex = student.resume.courses.findIndex(
    (i) => i.id === req.params.courseId
  );
  student.resume.courses[courseIndex] = {
    ...student.resume.courses[courseIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Course Updated" });
});

// Callback functions for delete Course
exports.deleteCourse = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredCourse = student.resume.courses.filter(
    (i) => i.id !== req.params.courseId
  );
  student.resume.courses = filteredCourse;
  await student.save();
  res.json({ message: "Course Deleted " });
});

// ================================ For Courses (END)=================================================================

// ================================ For Accomplishments / Awards (START)=================================================================

// Callback functions for add Award
exports.addAward = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.awards.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Award added" });
});

// Callback functions for edit Award
exports.editAward = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const awardIndex = student.resume.awards.findIndex(
    (i) => i.id === req.params.awardId
  );
  student.resume.awards[awardIndex] = {
    ...student.resume.awards[awardIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Award Updated" });
});

// Callback functions for delete Award
exports.deleteAward = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredAward = student.resume.awards.filter(
    (i) => i.id !== req.params.awardId
  );
  student.resume.awards = filteredAward;
  await student.save();
  res.json({ message: "Award Deleted " });
});

// ================================ For Awards (END)=================================================================

// ================================ For Responsibilities / Role (START)=================================================================

// Callback functions for add Accomplishment
exports.addRole = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  student.resume.roles.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.json({ message: "Role added" });
});

// Callback functions for edit Accomplishment
exports.editRole = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const roleIndex = student.resume.roles.findIndex(
    (i) => i.id === req.params.roleId
  );
  student.resume.roles[roleIndex] = {
    ...student.resume.roles[roleIndex],
    ...req.body,
  };
  await student.save();
  res.json({ message: "Role Updated" });
});

// Callback functions for delete Accomplishment
exports.deleteRole = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  const filteredRole = student.resume.roles.filter(
    (i) => i.id !== req.params.roleId
  );
  student.resume.roles = filteredRole;
  await student.save();
  res.json({ message: "Role Deleted " });
});

// ================================ For Responsibilities (END)=================================================================

