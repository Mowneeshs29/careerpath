const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ─── helpers ─── */
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

/* ─── POST /api/auth/register ─── */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email, and password are required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user", // only explicit admin flag sets it
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

/* ─── POST /api/auth/login ─── */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

/* ─── POST /api/auth/google ─── */
exports.googleLogin = async (req, res, next) => {
  try {
    const { name, email, googleId } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required from Google Auth" });

    let user = await User.findOne({ email });

    if (!user) {
      // Create user if they don't exist
      const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 12);
      user = await User.create({
        name: name || "Google User",
        email,
        password: randomPassword, // generic fallback
        role: "user"
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(user.isNew ? 201 : 200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

/* ─── GET /api/auth/me  (protected) ─── */
exports.getMe = async (req, res) => {
  // req.user already populated by verifyToken middleware
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};
