# ⚖️ LawAIBot – AI-Powered Legal Assistant

LawAIBot is a full-stack AI-powered chatbot designed to help users understand Indian legal concepts in a simplified manner. It leverages modern web technologies and integrates an AI engine to answer legal queries on topics like IPC, CrPC, and Constitutional Law.

---

## 🚀 Features

- 🔐 **User Authentication** – Secure register/login with password hashing
- 💬 **AI Legal Chatbot** – Ask questions about Indian laws and receive simplified AI-generated answers
- 🧠 **Smart Categorization** – Detects legal topics (e.g., Defamation, FIR, Perjury)
- 🗂️ **Session Management** – User queries and chat sessions stored securely
- 🌐 **Modern Tech Stack** – React, Node.js, PostgreSQL, and LLM APIs
- 📦 **Easy Deployment** – Optimized for Replit or custom VPS hosting

---

## 🛠️ Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- TypeScript

### Backend
- Node.js + Express.js
- PostgreSQL with Drizzle ORM
- JSON Web Token (JWT) for authentication

### AI
- Gemini API /IndianLAW API /LLM-based AI for legal Q&A generation

---

## 📁 Folder Structure
📦 legal-ai-assistant

├── 📁 apps

│   └── 📁 web                    # Frontend React App (Vite + TailwindCSS)

│       ├── 📁 public            # Public assets

│       ├── 📁 src

│       │   ├── 📁 app           # App structure

│       │   ├── 📁 components    # Reusable UI components

│       │   ├── 📁 lib           # Utility functions

│       │   ├── 📁 pages         # Route-based pages (e.g., Chat, Login)

│       │   └── 📁 styles        # TailwindCSS and custom styles

│       ├── .env                # Environment variables for frontend

│       └── vite.config.ts      # Vite config

│

├── 📁 packages

│   ├── 📁 config                # Shared configuration (e.g., DB, Auth)

│   ├── 📁 db                    # Database schema & migration using Drizzle ORM

│   │   ├── 📄 schema.ts

│   │   └── 📄 seed.ts           # (If exists) to populate DB

│   ├── 📁 ui                    # Shared UI components (like cards, buttons)

│   └── 📁 utils                 # Shared utilities across frontend/backend

│

├── 📁 screenshots               # Screenshots for documentation

│

├── .gitignore

├── README.md

├── package.json

└── turbo.json                  # Turborepo configuration

![image](https://github.com/user-attachments/assets/633099ed-454a-4938-8646-3500c0a29041)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js >= 18.x
- PostgreSQL
- Gemini API Key (or other LLM)

### Clone & Install

```bash
git clone https://github.com/Evil-Dreams/Legal_AI_Assistant.git
cd law-ai-bot
