const Profile = require("../models/Profile");

/* ─── GET /api/profile ─── */
exports.getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    res.json({ profile: profile || {} });
  } catch (err) {
    next(err);
  }
};

/* ─── PUT /api/profile ─── */
exports.updateProfile = async (req, res, next) => {
  try {
    const { education, skills, interests, preferredLocations, salaryExpectation } = req.body;

    let profile = await Profile.findOne({ userId: req.user._id });

    if (!profile) {
      profile = new Profile({ userId: req.user._id });
    }

    if (education !== undefined) profile.education = education;
    if (skills !== undefined) profile.skills = skills.map((s) => s.toLowerCase().trim());
    if (interests !== undefined) profile.interests = interests.map((i) => i.toLowerCase().trim());
    if (preferredLocations !== undefined) profile.preferredLocations = preferredLocations;
    if (salaryExpectation !== undefined) profile.salaryExpectation = salaryExpectation;

    await profile.save();
    res.json({ profile });
  } catch (err) {
    next(err);
  }
};
