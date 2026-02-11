const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: { type: String, trim: true },         // e.g. "Bachelor's"
  field: { type: String, trim: true },          // e.g. "Computer Science"
  institution: { type: String, trim: true },
  year: { type: Number },
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    education: [educationSchema],
    skills: [{ type: String, trim: true, lowercase: true }],
    interests: [{ type: String, trim: true, lowercase: true }],
    preferredLocations: [{ type: String, trim: true }],
    salaryExpectation: {
      min: { type: Number },
      max: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
