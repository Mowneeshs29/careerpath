const express = require("express");
const router = express.Router();
const { createCareer, updateCareer, deleteCareer, getAllCareers } =
  require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const guard = [verifyToken, requireRole("admin")];

router.get("/careers", ...guard, getAllCareers);
router.post("/careers", ...guard, createCareer);
router.put("/careers/:id", ...guard, updateCareer);
router.delete("/careers/:id", ...guard, deleteCareer);

module.exports = router;
