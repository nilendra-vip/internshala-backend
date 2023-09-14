const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const studentModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minlength: [4, "First name must be more than 4 characters"],
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [10, "Last name must be less than 10 characters"],
      minlength: [3, "Last name must be more than 3 characters"],
    },
    contact: {
      type: String,
      required: [true, "Contact is required"],
      maxlength: [10, "Contact must not exceed 10 characters"],
      minlength: [10, "Contact should be atleast 10 characters long"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      maxlength: [10, "City must not exceed 10 characters"],
      minlength: [3, "City should be atleast 3 characters long"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: true,
      select: false,
      minlength: [6, "Password must be more than 6 characters"],
      //   match:[]
    },
    resetPasswordToken: {
      type: String,
      default: "0",
    },

    avatar: {
      type: Object,
      default: {
        fileId: "",
        url: "https://images.unsplash.com/photo-1682685797886-79020b7462a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
      },
    },
    resume: {
      education: [],
      jobs: [],
      internships: [],
      roles: [],
      courses: [],
      projects: [],
      skills: [],
      interests:[],
      awards: [],
    },
    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: "internship" }],
    jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "job" }],
  },
  { timestamps: true }
);

studentModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

studentModel.methods.comparepassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const Student = mongoose.model("student", studentModel);
module.exports = Student;
