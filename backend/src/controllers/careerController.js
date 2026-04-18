const Career = require("../models/Career");
const Profile = require("../models/Profile");
const SystemActivity = require("../models/SystemActivity");
const { scoreCareer } = require("../services/recommendationService");

/* ─── GET /api/careers  ?q=keyword&category=Tech&page=1&limit=12 ─── */
exports.getCareers = async (req, res, next) => {
  try {
    const { q, category, educationLevel, page = 1, limit = 12 } = req.query;
    const filter = {};

    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { tags: regex },
        { requiredSkills: regex },
      ];
    }
    if (category) filter.category = new RegExp(`^${category}$`, "i");
    if (educationLevel) filter.educationLevel = educationLevel;

    const skip = (Number(page) - 1) * Number(limit);

    const [careers, total] = await Promise.all([
      Career.find(filter).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      Career.countDocuments(filter),
    ]);

    res.json({
      careers,
      meta: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/careers/:id ─── */
exports.getCareerById = async (req, res, next) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: "Career not found" });
    res.json({ career });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/careers/recommend  (protected) ─── */
exports.getRecommendations = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile || (!profile.skills.length && !profile.interests.length))
      return res.status(400).json({ message: "Please complete your profile with skills or interests first" });

    const allCareers = await Career.find();

    const scored = allCareers.map((career) => ({
      career,
      score: scoreCareer(career, profile),
    }));

    // sort descending, return top 10
    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, 10).filter((item) => item.score > 0);

    const recommendations = top.map(({ career, score }) => ({
      ...career.toObject(),
      matchScore: Math.round(score * 100) / 100,
    }));
    
    // Non-blocking log creation
    SystemActivity.create({
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      type: "Recommendation",
      details: `Generated ${recommendations.length} recommendations for user.`,
      recommendationsCount: recommendations.length,
      topMatches: recommendations.map(r => r.title).slice(0, 3)
    }).catch(err => console.error("Logging error:", err));

    res.json({ recommendations });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/careers/categories ─── */
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Career.distinct("category");
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};
