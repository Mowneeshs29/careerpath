const mongoose = require("mongoose");

const systemActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: String,
  userName: String,
  type: {
    type: String,
    enum: ["Recommendation", "Forum Thread", "Forum Reply", "Profile Update"],
    default: "Recommendation",
  },
  details: String, // dynamic description
  recommendationsCount: Number,
  topMatches: [String],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SystemActivity", systemActivitySchema);
