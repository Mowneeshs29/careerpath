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
  "http://localhost:5173", // Local dev
  "http://localhost:3000",  // Alternative local
  process.env.FRONTEND_URL, // Production frontend URL
].filter(Boolean);

// Allow the frontend origin (or any origin in production) to avoid CORS failures.
// In production, `FRONTEND_URL` should be set to your deployed frontend URL.
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g., Postman) or same-origin
      if (!origin) return callback(null, true);

      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Use this for debugging: log blocked origins
      console.warn("Blocked CORS request from:", origin);
      return callback(new Error("Not allowed by CORS"), false);
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
