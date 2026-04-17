const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/config/db");
const { errorHandler } = require("./src/middleware/errorHandler");

const authRoutes = require("./src/routes/authRoutes");
const profileRoutes = require("./src/routes/profileRoutes");
const careerRoutes = require("./src/routes/careerRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const forumRoutes = require("./src/routes/forumRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

/* ─── Middleware ─── */
const corsOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (corsOrigins.includes(origin) || process.env.NODE_ENV === "development") {
        return callback(null, true);
      } else {
        console.warn(`[CORS] Request from blocked origin: ${origin}`);
        return callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* ─── DB ─── */
connectDB();

/* ─── Routes ─── */
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/forum", forumRoutes);

/* ─── Health ─── */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/* ─── Global Error Handler ─── */
app.use(errorHandler);

/* ─── Start ─── */
app.listen(PORT, () => console.log(`[Server] Career API running on port ${PORT}`));

module.exports = app;
