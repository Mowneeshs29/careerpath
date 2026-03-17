const express = require("express");
const router = express.Router();
const {
  getAllThreads,
  getCategories,
  getThreadById,
  createThread,
  addReply,
  deleteThread,
  deleteReply,
} = require("../controllers/forumController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getAllThreads);
router.get("/categories", getCategories);
router.get("/:id", getThreadById);

// Protected routes
router.post("/", verifyToken, createThread);
router.post("/:id/reply", verifyToken, addReply);
router.delete("/:id", verifyToken, deleteThread);
router.delete("/:threadId/reply/:replyId", verifyToken, deleteReply);

module.exports = router;