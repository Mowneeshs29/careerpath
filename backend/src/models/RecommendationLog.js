const mongoose = require("mongoose");

const recommendationLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userEmail: String,
  userName: String,
  calculationType: {
    type: String,
    enum: ["Cosine Similarity", "Skills Match", "Manual Request"],
    default: "Cosine Similarity",
  },
  recommendationsCount: Number,
  topMatches: [String],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RecommendationLog", recommendationLogSchema);
