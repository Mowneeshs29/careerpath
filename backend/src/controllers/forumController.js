const ForumThread = require("../models/ForumThread");
const SystemActivity = require("../models/SystemActivity");

// Get all threads with filters
exports.getAllThreads = async (req, res, next) => {
  try {
    const { q, category, sort = "-createdAt" } = req.query;
    const query = {};

    if (q) {
      query.$text = { $search: q };
    }
    if (category) {
      query.category = category;
    }

    const threads = await ForumThread.find(query)
      .populate("author", "name email")
      .populate("replies.author", "name")
      .sort(sort)
      .limit(50);

    res.json({ threads });
  } catch (err) {
    next(err);
  }
};

// Get available categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = ["Courses", "Careers", "Skills", "General"];
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

// Get single thread by ID
exports.getThreadById = async (req, res, next) => {
  try {
    const thread = await ForumThread.findById(req.params.id)
      .populate("author", "name email role")
      .populate("replies.author", "name role");

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Increment views
    thread.views += 1;
    await thread.save();

    res.json({ thread });
  } catch (err) {
    next(err);
  }
};

// Create new thread
exports.createThread = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;

    const thread = await ForumThread.create({
      author: req.user.id,
      title,
      content,
      category,
      tags: tags || [],
    });

    await thread.populate("author", "name email");

    // Notice to Admin
    SystemActivity.create({
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      type: "Forum Thread",
      details: `Started a new discussion: "${title}" in ${category}`
    }).catch(err => console.error("Logging error:", err));

    res.status(201).json({ thread });
  } catch (err) {
    next(err);
  }
};

// Add reply to thread
exports.addReply = async (req, res, next) => {
  try {
    const { content } = req.body;
    const thread = await ForumThread.findById(req.params.id);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    thread.replies.push({
      author: req.user.id,
      content,
    });

    await thread.save();
    await thread.populate("replies.author", "name role");

    // Notice to Admin
    SystemActivity.create({
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      type: "Forum Reply",
      details: `Replied to thread: "${thread.title}"`
    }).catch(err => console.error("Logging error:", err));

    res.json({ thread });
  } catch (err) {
    next(err);
  }
};

// Delete thread
exports.deleteThread = async (req, res, next) => {
  try {
    const thread = await ForumThread.findById(req.params.id);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    // Check permissions
    if (thread.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    await ForumThread.findByIdAndDelete(req.params.id);
    res.json({ message: "Thread deleted" });
  } catch (err) {
    next(err);
  }
};

// Delete reply
exports.deleteReply = async (req, res, next) => {
  try {
    const { threadId, replyId } = req.params;
    const thread = await ForumThread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    const reply = thread.replies.id(replyId);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }

    // Check permissions
    if (reply.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    reply.deleteOne();
    await thread.save();

    res.json({ message: "Reply deleted" });
  } catch (err) {
    next(err);
  }
};