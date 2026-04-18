const express = require("express");
const router = express.Router();
const { 
  createCareer, updateCareer, deleteCareer, getAllCareers,
  getAllUsers, updateUserRole, deleteUser,
  getLogs, getStats 
} = require("../controllers/adminController");
const { verifyToken, requireRole } = require("../middleware/authMiddleware");

const guard = [verifyToken, requireRole("admin")];

router.get("/careers", ...guard, getAllCareers);
router.post("/careers", ...guard, createCareer);
router.put("/careers/:id", ...guard, updateCareer);
router.delete("/careers/:id", ...guard, deleteCareer);

router.get("/users", ...guard, getAllUsers);
router.put("/users/:id/role", ...guard, updateUserRole);
router.delete("/users/:id", ...guard, deleteUser);

router.get("/logs", ...guard, getLogs);
router.get("/stats", ...guard, getStats);

module.exports = router;
