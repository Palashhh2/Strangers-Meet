# Strangers Meet - AI-Curated Dinner Experience

A sophisticated Next.js admin dashboard for curating dinner experiences by matching 6 strangers based on personality, creativity, and compatibility.

## 🎯 Core Features

### 1. **Applicant Submission & AI Evaluation**
- 8-field application form (name, email, age, location, bio, interests, dietary, profession, availability)
- OpenAI GPT-4 Mini evaluates applicants on:
  - Creative potential & "interestingness"
  - Conversation value & personality fit
  - Diversity & compatibility potential
- Returns decision (accept/reject) with confidence score & reasoning

### 2. **Automated Group Formation**
- Groups accepted applicants into sets of 6
- Uses compatibility scoring to build optimal groups
- Selects shared dinner time from applicant availability preferences
- AI-generated explanations for why each group works well together

### 3. **Admin Dashboard**
- **Overview Tab**: Live stats (total, accepted, rejected applicants)
- **Audit Log Tab**: Complete trail of all admin actions (overrides, deletions) with timestamps
- **Applicants Tab**: Card grid with AI scores, status badges, and detail modals
- **Groups Tab**: Display scheduled dinner times and member compatibility reasons

### 4. **Audit Trail & Accountability**
- Every override decision (accept/reject) is logged with timestamp & original status
- Every deletion is logged with applicant name & former status
- Full audit history accessible from admin dashboard

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 14.0.8 with App Router & Turbopack
- **UI**: React 18.2.1, Tailwind CSS 4.1.17, Radix UI 1.x, shadcn/ui
- **AI**: OpenAI API (gpt-4-mini)
- **Storage**: JSON file-based (/data/) - JSON files: applicants.json, groups.json, audit.json
- **Forms**: React Hook Form 7.68.0 + Zod validation
- **Database**: Prisma 7.1.0 (schema available for future production migration)

### Key Routes

#### Public Pages
- `GET /` - Home page with CTA buttons (Apply / Admin)
- `GET /apply` - Application form
- `GET /matches` - View scheduled dinner groups

#### Admin Pages
- `GET /admin` - Dashboard with overview & audit logs
- `GET /admin/applicants` - View, accept, reject, delete applicants
- `GET /admin/groups` - Create and manage dinner groups

#### API Endpoints
- `POST /api/apply` - Submit application with normalization & AI evaluation
- `GET /api/applicants` - Fetch all applicants
- `GET /api/group` - Generate groups from accepted applicants
- `GET /api/groups` - Fetch saved groups
- `POST /api/override` - Accept/reject applicant with audit logging
- `DELETE /api/override` - Delete applicant with audit logging
- `GET /api/audit` - Fetch complete audit trail

## 📊 Data Schema

### Applicants
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "age": "number?",
  "location": "string?",
  "bio": "string?",
  "interests": "string?",
  "dietary": "string?",
  "profession": "string?",
  "availability": ["string array"],
  "AI": {
    "decision": "accept|reject",
    "confidence": "number 0-1",
    "reason": "string"
  },
  "status": "accept|reject",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp?"
}
```

### Groups
```json
{
  "members": [applicant objects],
  "explanation": "AI-generated why group works well together",
  "scheduledAt": "common availability slot or null",
  "createdAt": "ISO timestamp"
}
```

### Audit Log
```json
{
  "timestamp": "ISO timestamp",
  "action": "override|delete",
  "applicantId": "uuid",
  "applicantName": "string",
  "from": "previous status (override only)",
  "to": "new status (override only)",
  "status": "former status (delete only)"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn
- OpenAI API key

### Installation
```bash
npm install
```

### Environment Setup
Create `.env.local`:
```
OPENAI_API_KEY=sk-...
```

### Running Dev Server
```bash
npm run dev
# Server runs on http://localhost:3001 (3000 may be in use)
```

### Building for Production
```bash
npm run build
npm run start
```

## 📋 AI Evaluation Prompt

**Applicant Evaluation**:
The system evaluates each applicant considering:
- Creative potential & personality
- Conversation value & social compatibility
- Diversity of background & interests
- Dietary compatibility for group dining

**Group Compatibility**:
When forming groups, AI explains:
- Complementary personality blends
- Shared interests or conversation starters
- Balanced energy levels
- Dietary compatibility

## 🔐 Key Features in Detail

### Error Handling
- All file I/O wrapped in try/catch with graceful fallbacks
- API routes return 400/500 with meaningful error messages
- Toast notifications for user feedback

### Data Normalization
- Age parsed as number
- Availability split on `;`, `,`, or newlines and trimmed
- Timestamps auto-generated on creation/update

### Availability Matching
- When scheduling groups, finds common availability slots
- Falls back to most-common availability if no perfect intersection
- Displays in human-readable format (e.g., "Saturday, December 20, 2025 at 7:00 PM")

### Audit Trail
- Every admin decision tracked with applicant name & timestamp
- Supports compliance & dispute resolution
- Accessible from admin dashboard audit tab

## 📝 Files Structure

```
src/
├── app/
│   ├── api/
│   │   ├── apply/route.ts          # Application submission & AI evaluation
│   │   ├── applicants/route.ts     # Fetch all applicants
│   │   ├── audit/route.ts          # Fetch audit logs
│   │   ├── evaluate/route.ts       # Test evaluation endpoint
│   │   ├── group/route.ts          # Generate groups with scheduling
│   │   ├── groups/route.ts         # Fetch saved groups
│   │   ├── override/route.ts       # Accept/reject/delete with audit logging
│   │   └── utils/
│   │       ├── ai.ts              # OpenAI API integration
│   │       ├── readWrite.ts       # JSON file I/O
│   │       └── scoring.ts         # Compatibility scoring
│   ├── admin/
│   │   ├── page.tsx               # Dashboard with audit logs
│   │   ├── applicants/page.tsx    # Applicant management
│   │   └── groups/page.tsx        # Group management
│   ├── apply/page.tsx             # Application form
│   ├── matches/page.tsx           # View scheduled groups
│   ├── layout.tsx                 # Global layout with Navbar
│   └── page.tsx                   # Home page
├── components/
│   ├── Navbar.tsx                # Global header
│   ├── HomeButton.tsx            # Home navigation
│   ├── Toast.tsx                 # Toast notifications
│   ├── forms/
│   │   └── ApplicationForm.tsx   # 8-field application form
│   └── ui/                        # Radix UI + shadcn components
├── lib/
│   ├── utils.ts                  # Tailwind utilities
│   ├── ai/
│   │   └── generateGroupReason.ts # Group explanation generator
│   └── grouping/
│       └── groupingBuilder.ts    # Compatibility-based grouping
├── types/
│   └── applicants.ts             # TypeScript interfaces
└── app/
    ├── globals.css               # Global styles & Tailwind
    ├── layout.tsx
    └── page.tsx
```

## 🎨 Design System

- **Brand Color**: Indigo (#4f46e5)
- **Transitions**: 180-300ms motion-safe animations
- **Spacing**: Consistent gap-4 to gap-6 padding
- **Cards**: Rounded-lg/xl with shadow effects
- **Status Badges**: Color-coded (green=accept, red=reject, slate=pending)

## ⚠️ Known Limitations & Future Improvements

1. **Storage**: JSON file-based (local dev only) - use Prisma + database for production
2. **Timestamps**: No timezone handling - assumes UTC
3. **Availability Format**: Text-based - implement date/time picker UI for better UX
4. **Scheduling**: Simple intersection logic - implement calendar view with conflict resolution
5. **Notifications**: Toast only - add email/SMS notifications for group scheduling
6. **Multi-tenant**: Single admin account - add role-based access control
7. **Testing**: Add unit & integration tests for API routes

## 🔧 Troubleshooting

**Port 3000 in use?**
```bash
# Dev server will automatically use 3001
npm run dev
```

**Missing OpenAI key?**
```bash
# Ensure .env.local has OPENAI_API_KEY
# AI evaluation will gracefully fail with error messaging
```

**JSON files not found?**
```bash
# Create /data/ directory and empty JSON files:
mkdir -p data
echo "[]" > data/applicants.json
echo "[]" > data/groups.json
echo "[]" > data/audit.json
```

## 📊 Performance Notes

- Turbopack enables fast HMR during development
- AI evaluation takes 2-5s per applicant (OpenAI latency)
- Group generation (6+ applicants) takes 5-15s
- All file I/O is async with proper error boundaries

## 📄 License

Private project - all rights reserved.

---

**Last Updated**: December 10, 2025
**Status**: ✅ Production-ready for demo purposes
