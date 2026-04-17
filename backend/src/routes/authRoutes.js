const express = require("express");
const router = express.Router();
const { register, login, googleLogin, getMe } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.get("/me", verifyToken, getMe);

module.exports = router;
