# Quick Start Guide - Strangers Meet

## 🚀 Start the App

```bash
cd c:\Users\Documents\strangers-meet
npm run dev
```

Server runs at: **http://localhost:3001**

---

## 👤 User Journey

### Step 1: Submit Application (Applicant)
1. Go to **http://localhost:3001/apply**
2. Fill form:
   - Name, Email (required)
   - Age, Location (required)
   - Bio, Interests, Dietary, Profession (required)
   - Availability: e.g., "2025-12-20 19:00; 2025-12-21 18:30"
3. Click "Submit Application"
4. See ✓ confirmation message

### Step 2: Admin Reviews Applications
1. Go to **http://localhost:3001/admin** → Applicants
2. See card grid with:
   - Applicant name, email
   - AI score & confidence
   - Status badge (color-coded)
3. Click "View" to see full details (bio, interests, dietary, AI reasoning)
4. Click "Accept" or "Reject" to override AI decision
5. Actions logged to audit trail

### Step 3: Generate Dinner Groups
1. In Admin, click **Groups** tab
2. Click "Generate New Group"
3. System creates groups of 6 from accepted applicants
4. Each group gets:
   - AI explanation (why they work together)
   - Scheduled time (from availability overlap)
   - Member list with emails

### Step 4: View Scheduled Dinners (Applicants)
1. Go to **http://localhost:3001/matches**
2. See all dinner groups with:
   - Scheduled date/time
   - Member names
   - AI explanation

### Step 5: Check Audit Log (Admin)
1. Go to **http://localhost:3001/admin** → Audit Log tab
2. See all actions:
   - Who accepted/rejected whom (with timestamp)
   - Who was deleted (with timestamp)
   - Status changes

---

## 🔑 Key Pages

| URL | Purpose | User |
|-----|---------|------|
| `/` | Home | Everyone |
| `/apply` | Submit application | Applicants |
| `/matches` | View dinner groups | Everyone |
| `/admin` | Dashboard + Audit Log | Admin |
| `/admin/applicants` | Manage applicants | Admin |
| `/admin/groups` | Create/manage groups | Admin |

---

## 📋 API Endpoints (for testing)

```bash
# Get all applicants
curl http://localhost:3001/api/applicants

# Get all groups
curl http://localhost:3001/api/groups

# Get audit log
curl http://localhost:3001/api/audit

# Generate groups
curl http://localhost:3001/api/group

# Test evaluation (POST with applicant data)
curl -X POST http://localhost:3001/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","bio":"I like travel"}'
```

---

## 🛠️ Development

### View TypeScript Errors
```bash
npx tsc --noEmit
```

### Build for Production
```bash
npm run build
npm run start
```

### View Data Files
```powershell
# Applicants
type data/applicants.json

# Groups
type data/groups.json

# Audit Log
type data/audit.json
```

---

## 🐛 Troubleshooting

**Q: Port 3001 doesn't work?**
A: Dev server will use available port (3000 if free). Check terminal output.

**Q: AI evaluation fails?**
A: Ensure `OPENAI_API_KEY` is set in `.env.local`

**Q: Data files missing?**
A: Create `/data/` directory and empty JSON files:
```bash
mkdir -p data
echo "[]" > data/applicants.json
echo "[]" > data/groups.json
echo "[]" > data/audit.json
```

**Q: Want to reset all data?**
A: Delete or clear JSON files in `/data/` directory

---

## 💡 Testing Tips

1. **Create test applicants**: Use `/apply` form multiple times
2. **View AI evaluations**: Admin → Applicants → View details
3. **Override decisions**: Accept/Reject buttons override AI
4. **Generate groups**: Need 6+ accepted applicants
5. **Check scheduling**: Groups show common availability slots
6. **Audit trail**: Admin → Audit Log shows all changes

---

## 📊 Example Data Structure

```json
// Applicant
{
  "id": "abc-123",
  "name": "Alice",
  "email": "alice@example.com",
  "age": 28,
  "location": "SF",
  "bio": "Love travel & coffee",
  "interests": "hiking, cooking",
  "dietary": "vegetarian",
  "profession": "designer",
  "availability": ["2025-12-20 19:00", "2025-12-21 18:30"],
  "AI": {
    "decision": "accept",
    "confidence": 0.92,
    "reason": "Creative, interesting profile with clear passions"
  },
  "status": "accept",
  "createdAt": "2025-12-10T15:30:00Z"
}

// Group
{
  "members": [ /* 6 applicant objects */ ],
  "explanation": "Perfect blend of personalities...",
  "scheduledAt": "2025-12-20 19:00",
  "createdAt": "2025-12-10T16:00:00Z"
}

// Audit Entry
{
  "timestamp": "2025-12-10T16:05:00Z",
  "action": "override",
  "applicantName": "Alice",
  "from": "reject",
  "to": "accept"
}
```

---

## ✅ System Status

- ✅ TypeScript: 0 errors
- ✅ Dev Server: Running on 3001
- ✅ API Routes: All working
- ✅ AI Integration: Connected & tested
- ✅ Data Persistence: JSON files
- ✅ UI Components: All rendering correctly

---

Ready to go! Start the app with `npm run dev` and visit http://localhost:3001

Questions? Check SYSTEM_GUIDE.md for detailed architecture docs.
