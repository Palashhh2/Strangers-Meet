# 🍽️ Strangers at Supper  
### *AI-Powered Curated Dinner Matching System*

Strangers at Supper is an **AI-first web application** that forms curated groups of six strangers for dinner. Applicants submit a form → AI evaluates them → accepted applicants are automatically grouped → AI generates compatibility explanations.

This project demonstrates **full-stack AI integration**, **automated grouping logic**, and **aesthetic UI** using:

- **Next.js 14 (App Router)**
- **OpenAI Responses API**
- **TailwindCSS + shadcn/ui**
- **Local JSON database (no Prisma)**
- **Clean reusable UI components**

---

## ✨ Features Overview

### 📝 Applicant Experience
- Beautiful application form
- Submission is evaluated by AI on:
  - Creativity & "interestingness"
  - Personality
  - Conversation value
  - Social energy
  - Dietary preferences compatibility
  - Availability
  - Diversity
- AI returns structured JSON:
  ```json
  {
    "decision": "accepted",
    "reason": "Strong creative communication...",
    "confidence": 0.89
  }
