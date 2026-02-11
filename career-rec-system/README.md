# Career Recommendation System
A full-stack MERN application that helps students and job seekers identify suitable career paths based on skills, education, interests, and preferences.

---

## Folder Structure
```
career-rec-system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js      # Register / Login logic
│   │   │   ├── profileController.js   # User profile CRUD
│   │   │   ├── careerController.js    # Career listing & search
│   │   │   └── adminController.js     # Admin career & skill management
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js      # JWT verify & role guard
│   │   │   └── errorHandler.js        # Global error handler
│   │   ├── models/
│   │   │   ├── User.js                # User schema
│   │   │   ├── Profile.js             # Profile schema
│   │   │   └── Career.js              # Career schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── profileRoutes.js
│   │   │   ├── careerRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── services/
│   │   │   └── recommendationService.js  # Scoring algorithm
│   │   └── utils/
│   │       └── seedData.js            # Sample careers & skills
│   ├── server.js                      # Express app entry
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Profile/
│   │   │   │   └── ProfileForm.jsx
│   │   │   ├── Career/
│   │   │   │   ├── CareerCard.jsx
│   │   │   │   ├── CareerDetail.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   ├── Admin/
│   │   │   │   └── AdminPanel.jsx
│   │   │   ├── Layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── Shared/
│   │   │       ├── Button.jsx
│   │   │       ├── InputField.jsx
│   │   │       └── Loader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Careers.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── services/
│   │   │   └── api.js                 # Axios base + endpoints
│   │   ├── styles/
│   │   │   └── global.css             # Tailwind + custom tokens
│   │   └── utils/
│   │       └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- MongoDB (local or Atlas)

---

## Setup & Run

### 1. Backend
```bash
cd backend
cp .env.example .env          # fill MONGO_URI and JWT_SECRET
npm install
npm run seed                  # loads sample career data
npm start                     # runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev                   # runs on http://localhost:5173
```

### Environment Variables (.env)
```
MONGO_URI=mongodb://localhost:27017/careerapp
JWT_SECRET=your_secret_key_here
PORT=5000
```

---

## How It Works
1. **Register / Login** — JWT token is stored in memory (not localStorage) and passed via Axios interceptors.
2. **Build Profile** — Add education, skills, and interests.
3. **Get Recommendations** — The engine scores every career against your profile and returns ranked matches.
4. **Browse Careers** — Search and filter the full catalog.
5. **Admin Panel** — Manage careers and skill mappings (role-gated).

## API Endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register |
| POST | /api/auth/login | Login |
| GET | /api/profile | Get profile |
| PUT | /api/profile | Update profile |
| GET | /api/careers | List / search careers |
| GET | /api/careers/:id | Career detail |
| GET | /api/careers/recommend | Personalized recommendations |
| POST | /api/admin/careers | Add career (admin) |
| PUT | /api/admin/careers/:id | Update career (admin) |
| DELETE | /api/admin/careers/:id | Delete career (admin) |
