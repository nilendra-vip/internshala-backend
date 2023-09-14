const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");

// Callback functions for Homepage
exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Welcome To Homepage" });
});
