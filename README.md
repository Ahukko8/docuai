# DocuAI

<p align="center">
  <strong>AI-powered resumes and cover letters without the design hassle.</strong>
</p>

<p align="center">
  Build polished, ATS-conscious resumes, improve content with AI, choose professional templates, and export application-ready PDFs from one streamlined workspace.
</p>

<p align="center">
  <a href="https://docuai-ashen.vercel.app/">Live App</a>
  ·
  <a href="#features">Features</a>
  ·
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="#roadmap">Roadmap</a>
</p>

---

## ✨ About DocuAI

**DocuAI** is a modern career-document SaaS focused on one simple idea:

> **Users provide the information. DocuAI handles the writing, structure, design, and export.**

Instead of asking users to manually design resumes in a Word-like editor, DocuAI provides ready-made professional templates and AI-assisted writing tools so a strong resume can be created quickly.

DocuAI is operated by **ClickBuyHub LLC**.

---

## 🚀 Features

### Resume Builder

- Create and manage multiple resumes
- Autosave while editing
- Professional summary
- Work experience
- Education
- Skills
- Personal and contact information
- Resume readiness and validation
- Mobile-friendly editing experience

### AI Resume Assistance

DocuAI uses **Groq** with an open-weight AI model for fast resume improvements.

AI tools are designed to:

- Improve professional summaries
- Rewrite work experience
- Strengthen resume wording
- Improve grammar and clarity
- Keep content concise and ATS-conscious
- Preserve the truth of the user's original experience
- Avoid inventing achievements, employers, skills, or metrics

### Professional Resume Templates

DocuAI currently supports three curated resume styles:

| Template | Style | Access |
|---|---|---|
| **Modern** | Bold, clean, contemporary | Free |
| **Executive** | Refined, editorial, leadership-focused | Pro |
| **Creative** | Expressive, modern, professional | Pro |

The goal is to provide beautiful ready-made designs without forcing users to manually configure fonts, spacing, colors, or layouts.

### PDF Export

- High-quality PDF generation
- A4-ready layout
- Browser preview aligned with PDF output
- Server-side protected PDF generation
- Premium template entitlement checks
- Selectable text rather than image-based resumes

### Authentication

Powered by **Clerk**.

- Sign up
- Sign in
- User sessions
- Profile management
- Account security
- Protected dashboard routes

### Billing & Entitlements

Powered by **Paddle**.

Supported plans:

| Plan | AI Uses / Month | Premium Templates |
|---|---:|---|
| Free | 5 | No |
| Starter | 20 | No |
| Pro | 100 | Yes |
| Advanced | 300 | Yes |

The entitlement layer controls access to AI usage and premium templates independently from the UI.

### AI Cover Letter Builder

> 🚧 **Currently being expanded**

The Cover Letter Builder is designed to let users:

1. Select an existing resume
2. Enter the target role and company
3. Paste a job description
4. Generate a tailored cover letter with AI
5. Edit the generated draft
6. Choose a professional design
7. Export the final letter as PDF

Planned/implemented template styles:

- Modern
- Executive
- Professional

---

## 🧠 AI Architecture

DocuAI uses a provider-neutral AI service layer.

```text
User
  │
  ▼
DocuAI Server Action
  │
  ▼
AI Usage Reservation
  │
  ├── Check plan allowance
  │
  └── Reserve generation
  │
  ▼
AI Service
  │
  ▼
Groq
  │
  ▼
Open-weight model
  │
  ▼
Improved resume / cover letter
```

Current default model:

```text
openai/gpt-oss-20b
```

The model is configurable with:

```env
GROQ_MODEL=openai/gpt-oss-20b
```

The API key is always server-side.

---

## 🛠 Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **Framer Motion**

### Backend

- **Next.js Server Actions**
- **Next.js Route Handlers**
- **Supabase**
- **PostgreSQL**

### Authentication

- **Clerk**

### AI

- **Groq**
- **GPT-OSS**

### Payments

- **Paddle Billing**

### Documents

- **@react-pdf/renderer**

### Deployment

- **Vercel**

---

## 🏗 Architecture

DocuAI follows a layered application architecture.

```text
UI / Components
      │
      ▼
Server Actions
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
Supabase / External Providers
```

This keeps business logic separate from the interface and makes providers easier to replace later.

For example:

```text
Resume Editor
    │
    ▼
Resume Action
    │
    ▼
Resume Service
    │
    ▼
Resume Repository
    │
    ▼
Supabase
```

AI follows the same pattern:

```text
AI Button
   │
   ▼
Server Action
   │
   ▼
AI Service
   │
   ├── Billing entitlement
   ├── Usage reservation
   └── Provider call
          │
          ▼
         Groq
```

---

## 📁 Project Structure

The exact structure may evolve, but the project is organized around these major areas:

```text
docuai/
├── app/
│   ├── api/
│   ├── dashboard/
│   │   ├── resumes/
│   │   ├── cover-letters/
│   │   ├── billing/
│   │   └── settings/
│   ├── pricing/
│   ├── privacy/
│   ├── terms/
│   └── refund-policy/
│
├── actions/
│   ├── resumes/
│   └── cover-letters/
│
├── components/
│   ├── resume/
│   ├── cover-letter/
│   ├── dashboard/
│   ├── site/
│   └── ui/
│
├── hooks/
│
├── lib/
│   ├── ai/
│   ├── paddle/
│   ├── pdf/
│   ├── pricing/
│   ├── resume/
│   └── validation/
│
├── repositories/
│
├── services/
│
├── types/
│
├── public/
│
└── package.json
```

If your project uses a `src/` directory, the same folders live under `src/`.

---

# Getting Started

## 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd docuai
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create `.env.local`

Create:

```text
.env.local
```

Never commit this file.

A typical local configuration looks like:

```env
# APP
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# GROQ
GROQ_API_KEY=
GROQ_MODEL=openai/gpt-oss-20b

# PADDLE
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
PADDLE_ENVIRONMENT=sandbox
PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=

# PADDLE PRICE IDS
NEXT_PUBLIC_PADDLE_STARTER_MONTH_PRICE_ID=
NEXT_PUBLIC_PADDLE_STARTER_YEAR_PRICE_ID=
NEXT_PUBLIC_PADDLE_PRO_MONTH_PRICE_ID=
NEXT_PUBLIC_PADDLE_PRO_YEAR_PRICE_ID=
NEXT_PUBLIC_PADDLE_ADVANCED_MONTH_PRICE_ID=
NEXT_PUBLIC_PADDLE_ADVANCED_YEAR_PRICE_ID=
```

> **Important:** Never prefix secrets such as `GROQ_API_KEY`, `CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `PADDLE_API_KEY` with `NEXT_PUBLIC_`.

---

## 4. Configure Supabase

DocuAI uses Supabase for application data including:

- Resumes
- Cover letters
- AI usage tracking
- Billing customers
- Billing subscriptions
- Billing transactions
- Paddle webhook event records

Run the required SQL migrations in:

```text
Supabase Dashboard
→ SQL Editor
```

The application expects server-side ownership checks using the authenticated Clerk user ID.

---

## 5. Configure Clerk

Create a Clerk application and add your keys to `.env.local`.

The app uses Clerk for:

- Authentication
- Session management
- User profile
- Account security
- Protected dashboard pages

---

## 6. Configure Groq

Create a Groq API key and set:

```env
GROQ_API_KEY=gsk_...
```

The default model is:

```env
GROQ_MODEL=openai/gpt-oss-20b
```

DocuAI keeps the Groq key server-side.

---

## 7. Configure Paddle

For development, use Paddle Sandbox:

```env
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox
PADDLE_ENVIRONMENT=sandbox
```

Add your sandbox:

- Client token
- API key
- Webhook secret
- Product price IDs

Live and sandbox credentials are separate.

Do not mix live price IDs with sandbox credentials.

---

## 8. Start development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# Development Checks

Before committing changes:

```bash
npx tsc --noEmit
```

Then:

```bash
npm run build
```

If Next.js cache causes confusing local behavior:

```bash
rm -rf .next
npm run dev
```

---

## 🔐 Security Principles

DocuAI handles sensitive career information, so the application follows several important rules:

- API keys remain server-side
- Resume ownership is checked using the authenticated Clerk user ID
- PDF endpoints require authentication
- Premium template access is checked server-side
- AI usage is reserved atomically before generation
- Failed AI requests refund the reserved usage
- Paddle webhook signatures are verified
- Service-role Supabase credentials are never exposed to the browser
- AI prompts instruct the model not to fabricate candidate information
- User resume and job-description content is treated as untrusted input

---

## 🤖 AI Safety for Career Documents

DocuAI's AI system is intentionally constrained.

The model should **never invent**:

- Employers
- Job titles
- Degrees
- Certifications
- Technologies
- Responsibilities
- Achievements
- Percentages
- Revenue
- Team sizes
- Awards
- Employment dates

The objective is to improve the user's real experience — not manufacture a stronger-looking history.

---

## 💳 Billing Flow

```text
Pricing
   │
   ▼
Paddle Checkout
   │
   ▼
Paddle Transaction
   │
   ▼
Webhook
   │
   ▼
DocuAI Billing Repository
   │
   ▼
Supabase
   │
   ▼
User Entitlements
```

Entitlements determine:

- Monthly AI allowance
- Paid access
- Premium resume templates
- Premium cover-letter templates

---

## 📄 Resume Workflow

```text
Create Resume
      ↓
Enter Information
      ↓
Improve Content with AI
      ↓
Choose Template
      ↓
Autosave
      ↓
Preview
      ↓
Export PDF
```

---

## ✉️ Cover Letter Workflow

```text
Create Cover Letter
        ↓
Select Resume
        ↓
Enter Company + Role
        ↓
Paste Job Description
        ↓
Generate with AI
        ↓
Review / Edit
        ↓
Choose Template
        ↓
Export PDF
```

---

## 📱 Responsive Design

DocuAI is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop layouts prioritize live document previews, while mobile layouts prioritize simple form editing and accessible actions without horizontal overflow.

---

## 🌐 Production

Current production deployment:

**https://docuai-ashen.vercel.app/**

Production is deployed using **Vercel**.

Recommended deployment checks:

```bash
npx tsc --noEmit
npm run build
```

Then push:

```bash
git add .
git commit -m "your commit message"
git push
```

---

# Roadmap

## Completed / Core Foundation

- [x] Clerk authentication
- [x] Resume CRUD
- [x] Resume autosave
- [x] Resume ownership protection
- [x] AI resume improvements
- [x] Groq AI provider
- [x] Monthly AI usage tracking
- [x] Professional resume templates
- [x] Premium template entitlements
- [x] PDF resume export
- [x] Paddle billing architecture
- [x] Customer billing portal
- [x] Legal and policy pages
- [x] Responsive dashboard

## Current

- [ ] Complete AI Cover Letter Builder
- [ ] Finalize cover-letter autosave
- [ ] Complete 3 cover-letter templates
- [ ] Cover-letter PDF parity
- [ ] Mobile cover-letter editing polish

## Next

- [ ] Better dashboard analytics
- [ ] AI usage indicator
- [ ] Improved resume template gallery
- [ ] Resume content quality suggestions
- [ ] Job-description matching improvements
- [ ] Account deletion and data export
- [ ] Error monitoring
- [ ] Rate limiting
- [ ] Production security hardening
- [ ] Additional curated resume templates

---

## 🧪 Recommended Testing

Before production releases, verify:

```text
Authentication
✓ Sign up
✓ Sign in
✓ Sign out
✓ Protected routes

Resumes
✓ Create
✓ Update
✓ Autosave
✓ Delete
✓ AI improve
✓ Template switch
✓ PDF export

Cover Letters
✓ Create
✓ Resume selection
✓ AI generation
✓ Autosave
✓ Delete
✓ Template switch
✓ PDF export

Billing
✓ Checkout
✓ Webhook
✓ Entitlement update
✓ Customer portal
✓ Cancellation handling
```

---

## 🤝 Contributing

DocuAI is currently under active development.

If collaboration is enabled for this repository, a recommended workflow is:

```bash
git checkout -b feature/your-feature
```

Make your changes, then verify:

```bash
npx tsc --noEmit
npm run build
```

Commit:

```bash
git add .
git commit -m "add your feature"
```

Push your branch and open a pull request.

---

## 🧭 Product Philosophy

DocuAI is **not** trying to become another complicated document editor.

The goal is:

> **Fast input → smart AI assistance → professional ready-made design → application-ready document.**

Users should spend their time improving the content of their application, not manually adjusting margins, fonts, colors, and layout.

---

<p align="center">
  <strong>Built for simpler, faster and more professional job applications.</strong>
</p>

<p align="center">
  DocuAI · ClickBuyHub LLC
</p>
