const Career = require("../models/Career");
const User = require("../models/User");
const RecommendationLog = require("../models/RecommendationLog");

/* ─── POST /api/admin/careers ─── */
exports.createCareer = async (req, res, next) => {
  try {
    const career = new Career(req.body);
    await career.save();
    res.status(201).json({ career });
  } catch (err) {
    next(err);
  }
};

/* ─── PUT /api/admin/careers/:id ─── */
exports.updateCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json({ career });
  } catch (err) {
    next(err);
  }
};

/* ─── DELETE /api/admin/careers/:id ─── */
exports.deleteCareer = async (req, res, next) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json({ message: "Career deleted" });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/admin/careers  (full list, no pagination for admin) ─── */
exports.getAllCareers = async (req, res, next) => {
  try {
    const careers = await Career.find().sort({ title: 1 });
    res.json({ careers });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

/* ─── PUT /api/admin/users/:id/role  (admin only) ─── */
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!["user", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

/* ─── DELETE /api/admin/users/:id  (admin only) ─── */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/admin/logs  (admin only) ─── */
exports.getLogs = async (req, res, next) => {
  try {
    const logs = await RecommendationLog.find().sort({ timestamp: -1 }).limit(100);
    res.json({ logs });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/admin/stats  (admin only) ─── */
exports.getStats = async (req, res, next) => {
  try {
    const [userCount, careerCount, logCount] = await Promise.all([
      User.countDocuments(),
      Career.countDocuments(),
      RecommendationLog.countDocuments()
    ]);
    res.json({ 
      stats: {
        totalUsers: userCount,
        totalCareers: careerCount,
        totalMatches: logCount
      }
    });
  } catch (err) {
    next(err);
  }
};
