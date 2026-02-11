const mongoose = require("mongoose");

const learningPathSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  url: { type: String, trim: true },
  duration: { type: String, trim: true },        // e.g. "3 months"
});

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Career title is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      // e.g. "Technology", "Finance", "Healthcare"
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    requiredSkills: [{ type: String, trim: true, lowercase: true }],
    relatedInterests: [{ type: String, trim: true, lowercase: true }],
    learningPaths: [learningPathSchema],
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: "USD" },
    },
    educationLevel: {
      type: String,
      enum: ["High School", "Associate", "Bachelor's", "Master's", "PhD", "Certification"],
      default: "Bachelor's",
    },
    tags: [{ type: String, trim: true, lowercase: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
