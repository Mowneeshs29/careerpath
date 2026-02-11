const express = require("express");
const router = express.Router();
const { getCareers, getCareerById, getRecommendations, getCategories } =
  require("../controllers/careerController");
const { verifyToken } = require("../middleware/authMiddleware");

// /api/careers/recommend must come BEFORE /:id or Express matches "recommend" as an id
router.get("/recommend", verifyToken, getRecommendations);
router.get("/categories", getCategories);
router.get("/", getCareers);
router.get("/:id", getCareerById);

module.exports = router;
