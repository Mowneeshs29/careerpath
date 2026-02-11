const Career = require("../models/Career");

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
