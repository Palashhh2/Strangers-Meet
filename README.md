# 🍽️ Strangers at Supper — AI-First Curated Dinner Matching System
An AI-powered web application that selects interesting applicants, evaluates their personalities and conversation value, and automatically groups them into curated dinner groups of six.

This project was built as part of a Developer Assessment showcasing:
- Full-stack architecture  
- AI-powered evaluation workflow  
- Automated grouping system  
- Admin dashboard  
- Complete frontend + backend + database + API design  
- Production-grade styling and UI  

---

## 🚀 Features

### **🧠 AI Application Evaluation**
When a user submits the dinner application form:
- The system uses an LLM to evaluate:
  - Personality
  - Creativity + interestingness
  - Conversation value
  - Compatibility
  - Diversity contribution
- Provides:
  - **Acceptance / Rejection**
  - **Reason**
  - **Confidence score**
- Admins can **override** decisions.

---

### **👥 Automatic Grouping**
Once applicants are accepted:
- Automatically groups them into **sets of six**
- Assigns a **dinner date & time** based on availability
- Generates an **AI-written explanation** for why the group works well  
  _Example:_  
  > “This group mixes extroverted storytellers with thoughtful listeners, all share interest in culture and design, and follow compatible diets.”

---

### **🛠️ Admin Dashboard**
Admins can:
- View all applicants
- Override AI decisions
- Trigger grouping operations
- View groups + reasoning
- See confidence scores

---

### **📦 Tech Stack**
| Layer | Tools |
|------|-------|
| Framework | Next.js 16 (App Router, Server Actions, Route Handlers) |
| Styling | TailwindCSS + ShadCN |
| Database | PostgreSQL + Prisma ORM |
| AI | OpenAI GPT-4.1 / GPT-5.1 API |
| Deployment | Vercel (frontend) + Neon.tech (Postgres) |

---

## 🗂️ Project Structure

