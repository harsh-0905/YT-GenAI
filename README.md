# 🚀 PrepAI — Gen AI Job Preparation Web App

A production-ready, full-stack AI-powered platform that helps job seekers upload resumes, analyze job descriptions, detect skill gaps, generate AI-driven interview questions, and download ATS-optimized resumes as PDFs.

---

## 🛠 Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Frontend       | React.js, Vite, React Router        |
| Backend        | Node.js, Express.js                 |
| Database       | MongoDB Atlas (Mongoose)            |
| Authentication | JWT + Token Blacklisting            |
| AI             | Google Gemini API                   |
| File Upload    | Multer                              |
| PDF Generation | Puppeteer                           |
| Validation     | Zod                                 |
| HTTP Client    | Axios                               |

---

## ✨ Features

- 🔐 **Secure Auth** — JWT-based login/register with token blacklisting on logout
- 📄 **Resume Parsing** — Upload resume and extract content server-side
- 🤖 **AI Skill Gap Analysis** — Gemini AI compares resume vs job description
- 🎯 **Interview Question Generation** — Role-specific questions with preparation tips
- 📊 **Report History** — Save, view, and revisit all past interview reports
- 🖨️ **ATS Resume PDF** — AI-restructured resume exported as PDF via Puppeteer

---

## 📁 Folder Structure

```
prepai/
├── client/                    # React Frontend (Vite)
│   └── src/
│       ├── components/        # Reusable UI components
│       ├── context/           # Auth & Interview Context
│       ├── hooks/             # useAuth, useInterview
│       ├── pages/             # Login, Register, Home, Interview
│       └── services/          # Axios API service functions
│
└── server/                    # Node.js + Express Backend
    ├── config/                # MongoDB connection
    ├── controllers/           # Auth & Interview controllers
    ├── middleware/            # JWT auth middleware
    ├── models/                # User, Blacklist, InterviewReport
    ├── routes/                # Auth & Interview routes
    ├── services/              # Gemini AI service
    └── utils/                 # Puppeteer PDF generator
```

---

## ⚙️ How It Works

**1. Authentication**
- Register → password hashed → JWT issued and stored in HTTP-only cookie
- On logout → token is blacklisted in MongoDB, preventing reuse

**2. AI Interview Report**
- User uploads resume + enters job description
- Gemini AI detects skill gaps and generates targeted interview questions
- Report is saved to MongoDB and accessible anytime

**3. ATS Resume PDF**
- AI restructures resume content for ATS compatibility
- Puppeteer renders it as styled HTML and exports a downloadable PDF

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API Key

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

---

## 📡 API Reference

### Auth — `/api/auth`
| Method | Endpoint    | Description           | Auth |
|--------|-------------|-----------------------|------|
| POST   | `/register` | Register new user     | ❌   |
| POST   | `/login`    | Login, receive JWT    | ❌   |
| POST   | `/logout`   | Logout + blacklist    | ✅   |
| GET    | `/me`       | Get logged-in user    | ✅   |

### Interview — `/api/interview`
| Method | Endpoint       | Description                    | Auth |
|--------|----------------|--------------------------------|------|
| POST   | `/generate`    | Upload resume + JD → AI report | ✅   |
| GET    | `/reports`     | Get all user reports           | ✅   |
| GET    | `/reports/:id` | Get report by ID               | ✅   |
| POST   | `/resume-pdf`  | Generate ATS resume PDF        | ✅   |

---

## 👨‍💻 Author

**Harsh Yadav**  
MCA Final Year | Full Stack Developer  
🔗 [Portfolio](https://portfolio-7ivq.vercel.app) · [GitHub](https://github.com/harsh-0905)

---

> ⭐ Star this repo if you found it helpful!
