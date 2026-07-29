 
ICU Kennisplatform (ICU Forum)

A Dutch-language  Q&A platform built for the **ICU Church** community in Gouda, where members can ask questions, share knowledge, and get AI-assisted answers powered by Groq.
🔗 Live app: https://icukennisplatform.vercel.app/


✨ Overview

ICU Kennisplatform (Dutch for "ICU Knowledge Platform") is a full-stack Q&A community platform designed for a faith community to ask questions, discuss topics, and get help — combining human answers with AI-generated responses to give members fast, reliable support.

The project was built end-to-end: data modeling, authentication, AI integration, responsive UI, and production deployment.

 🚀 Features

- **Ask & answer questions** with a clean, community-driven Q&A flow
- **AI-generated answers** via Groq (LLaMA), with authentication checks and rate limiting (3 AI requests per user/day) to prevent abuse
- **Tagging system** — browse questions by tag, with AI-generated tag descriptions
- **"Helpful" voting** on both questions and answers to surface the best content
- **Recommended & Hot questions** — smart sorting (cold-start handling, helpful-count ranking, recency)
- **Authentication** with Auth.js v5 — credentials (email/password) and Google OAuth
- **Content moderation** — shared profanity filter applied across all user-generated content
- **Responsive design** — adaptive UI that swaps between a desktop dropdown menu and a mobile bottom drawer, with custom hooks to avoid hydration mismatches
- **Smooth animations** powered by Framer Motion
- **Optimistic UI feedback** on mutations (create, delete, vote) via Next.js revalidation

## 🛠️ Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- Tailwind CSS
- Radix UI (desktop menus) & Vaul (mobile drawers)
- Framer Motion (animations)

Backend
- Next.js Server Actions
- [Auth.js v5](https://authjs.dev/) (credentials + Google OAuth)
- [MongoDB](https://www.mongodb.com/) with Mongoose (hosted on MongoDB Atlas)
- bcrypt for password hashing

**AI**
- [Groq API](https://groq.com/) (LLaMA models) for AI-generated answers and tag descriptions

**Deployment**
- [Vercel](https://vercel.com/) (hosting + CI/CD)
- MongoDB Atlas (database)


> _Add a few screenshots or a short GIF walkthrough here — homepage, a question thread, and the AI answer in action tend to work best for recruiters skimming a repo._

🧠 How the AI integration works

When a user asks a question, they can request an AI-generated answer in addition to community responses. This flow is:

1. Gated behind authentication — only logged-in users can trigger AI generation.
2. Rate-limited via a MongoDB-backed `AIRequestLog` model with a TTL index, capping usage at 3 AI calls per user per day.
3. Passed through a shared profanity filter before being processed or displayed.

This keeps the AI feature genuinely useful for the community while preventing spam and misuse.

 📂 Project Structure (high level)


├── app/                # Next.js App Router pages & layouts
├── components/         # Reusable UI components (QuestionActions, DeleteConfirmDialog, etc.)
├── actions/            # Server actions (getQuestions, toggleQuestionHelpful, getTags, ...)
├── models/             # Mongoose models (Question, Answer, User, Tag, AIRequestLog)
├── lib/                # Shared utilities (auth config, profanity filter, db connection)
├── hooks/              # Custom hooks (useMediaQuery, etc.)
└── types/              # Shared TypeScript types (PopulatedQuestion, SerializedTag, ...)
```

 ⚙️ Getting Started

# Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster
- A Groq API key
- Google OAuth credentials (for social login)

# Installation

*bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
 

### Environment Variables

Create a `.env.local` file in the root directory:

env
MONGODB_URI=your_mongodb_connection_string
AUTH_SECRET=your_authjs_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GROQ_API_KEY=your_groq_api_key
```

### Run locally

bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) to view the app.

 
 

 


👤 Author

Abel — Fullstack Developer (MERN / Next.js / TypeScript)
 
