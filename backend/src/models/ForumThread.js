const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true, minlength: 1, maxlength: 2000 },
  createdAt: { type: Date, default: Date.now },
});

const forumThreadSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, minlength: 3, maxlength: 200 },
    content: { type: String, required: true, minlength: 10, maxlength: 5000 },
    category: { 
      type: String, 
      required: true, 
      enum: ["Courses", "Careers", "Skills", "General"] 
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    replies: [replySchema],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

forumThreadSchema.index({ category: 1, createdAt: -1 });
forumThreadSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("ForumThread", forumThreadSchema);