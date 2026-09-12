# TVB Autonomous Venture Scouting Agent
**The Venture Build (TVB) • Target Profile Intelligence Engine**

An autonomous scouting agent designed for **The Venture Build (TVB)** ([theventurebuild.com](https://theventurebuild.com) / [LinkedIn Profile](https://linkedin.com/company/90924902/)) that continuously discovers, validates, and filters tech platform scale-ups matching TVB's precise venture profile.

---

## 1. Executive Summary & Purpose

The Venture Build (TVB) is an AI-powered venture catalyst platform that helps ambitious startups and scale-ups grow through:
1. **Executive Advisory** (operator-led CXO support, GTM strategy, product positioning, fundraising readiness)
2. **Market Access** (enterprise customers, channel partners, corporate pilots, geographic expansion)
3. **Scale-Up Marketplace** ("Costco for scale-ups" covering legal, finance, compliance, demand gen, tooling)
4. **Funding Advisory & Capital Readiness** (investor readiness, pitch refinement, data room guidance, warm introductions)

This application deploys an autonomous agent that discovers new sources across international venture corridors, tests candidates against four strict parameter filters, audits tech platform architecture, and produces clean qualified outputs with verified founder contacts.

---

## 2. Target Profile Parameters & Validation Rules

Every prospective company is audited against four mandatory criteria:

| Parameter | Mandated Target Criteria | Agent Verification Behavior |
| :--- | :--- | :--- |
| **1. Funding / Revenue** | Between **$1,000,000 and $5,000,000 USD** ($1M–$5M) | Flags any company below $1M or exceeding $5M USD. Records funding round (Seed, Pre-Series A, Series A) or ARR. |
| **2. Platform Architecture** | Operates a **tech-related platform** | Confirms proprietary software, B2B SaaS, AI workflow, cyber defense, healthtech, edtech, fintech, travel, or digital twin infrastructure. |
| **3. Geographic Footprint** | **Minimal to NO presence in the United States** | Verifies headquarters and team outside the US (UK, France, India, UAE, Singapore, Continental Europe). Targets scale-ups seeking TVB's Austin/Texas bridge to enter the US. |
| **4. Executive Contact** | **Name & direct email of CEO or Co-founder** | **Zero Generic Tolerance**: If an email is unverified or generic (`info@`, `contact@`, `sales@`, `hello@`, `support@`), it is **strictly left blank** (`""`) with no placeholder text. |

---

## 3. Core Capabilities

- **Autonomous Source Discovery**: The agent does not rely on a fixed static list. It explores dynamic sources, seed funding announcements, regional tech ecosystems (Tech Nation UK, Station F Paris, T-Hub Hyderabad, Hub71 UAE, SGInnovate Singapore), and real-time search grounding.
- **Strict Data Sanitization**: Enforces TVB's rule: *"For all fields that are unverified/untrue, it is advisable to leave the field blank and not put any generic information."*
- **Parameter Scorecard & Audit Drawer**: Interactive breakdown for each company showing pass/fail status across each parameter, evidence, and TVB strategic thesis.
- **TVB Orbits Alignment**: Categorizes companies into TVB's 7 Orbits:
  - AI & Automation
  - Cybersecurity
  - Healthcare
  - Education
  - Digital Twin
  - Travel & Mobility
  - Fintech & Payments
- **On-Demand Target Audit**: Allows operators to enter any custom domain or startup name to evaluate it instantly against the 4 TVB parameters.
- **Clean List & Export Engine**: Produces a clean list with company name, description, industry/sector, and verified email, exportable to CSV and JSON.

---

## 4. Architecture & Technical Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend Service**: Node.js Express server (`server.ts`) running on port `3000`.
- **AI & Reasoning Engine**: Google GenAI SDK (`@google/genai`) using `gemini-3.8-flash` with Google Search Grounding for live source discovery.
- **Development & Production Bundling**: Vite with full-stack Express middleware and esbuild compilation to CommonJS (`dist/server.cjs`).

---

## 5. API Reference

### `GET /api/companies`
Retrieve all evaluated companies with optional query parameters:
- `orbit`: Filter by TVB Orbit (e.g. `Cybersecurity`, `Healthcare`, `Fintech & Payments`)
- `hub`: Filter by TVB Hub (e.g. `UK Hub (London/UK)`, `India Hub (Hyderabad/Bangalore)`)
- `search`: Full-text search across name, description, country, executive name, email
- `verifiedOnly`: Boolean (`true` returns only companies that meet all 4 criteria with verified emails)

### `POST /api/discover`
Triggers an autonomous discovery cycle.
- Payload: `{ "hub": "All TVB Hubs", "orbit": "AI & Automation", "customQuery": "optional notes" }`

### `POST /api/audit-target`
Audits a single target website or company name against TVB parameters.
- Payload: `{ "urlOrName": "https://upflow.io", "notes": "French B2B fintech" }`

### `GET /api/stats`
Returns aggregated metrics on total scouted, qualified companies, verified emails, and average funding.

### `GET /api/logs`
Streams the latest autonomous execution logs and verification traces.

### `GET /api/export/csv`
Exports the clean qualified repository as a CSV file.

### `GET /api/export/json`
Exports company records in structured JSON format.

### `GET /api/tvb-profile`
Official reference details on TVB's 4 growth engines, 7 orbits, and geographic hubs.

---

## 6. Official References

- **The Venture Build Website**: [https://theventurebuild.com](https://theventurebuild.com)
- **The Venture Build LinkedIn**: [https://linkedin.com/company/90924902/](https://linkedin.com/company/90924902/)
- **Core TVB Hubs**: Austin (Texas), London (UK), Paris (France), Hyderabad/Bangalore (India), Abu Dhabi/Dubai (UAE), Singapore.

---

## 7. TVB Strategic Catalysis & Automated Founder Outreach Engine

Once target scale-ups are scouted and verified against TVB's parameters, the platform provides an integrated **Strategic Catalysis & Founder Outreach Engine**:

- **TVB Growth Engine Alignment**: Automatically calculates the primary and secondary TVB Growth Engines that form the natural wedge for each company (*Executive Advisory, US Market Access, Scale-Up Marketplace, or Capital Readiness*).
- **Transatlantic US Bridge Strategy**: Formulates how the company can leverage TVB's Austin/Texas base to win US enterprise customers without relocating their core overseas engineering team.
- **Executive Pitch Generation with Strict Verification Guardrails**: Generates tailored, non-generic outreach communications addressed to the CEO/Co-Founder. If a founder's direct email is unverified, TVB's strict compliance rule is visually enforced (*direct dispatch is disabled until authentic verification is obtained*).
- **Outreach Angles**:
  1. *US Market Access & Enterprise Pilots* (Austin corridor launchpad)
  2. *Operator-Led CXO Advisory* (Hands-on execution, not passive consulting)
  3. *Scale-Up Marketplace* (30–70% cost reduction on scaleup infrastructure)
  4. *Pre-Series A Capital Readiness* (Metric hardening and investor readiness)
- **1-Click Actions**:
  - `mailto:` instant launch in default desktop/mobile email client with pre-filled recipient, subject, and body.
  - 1-Click copy to clipboard.
  - Markdown Catalysis Dossier export for investment partners.
  - Pipeline engagement status tracker (*New Lead → Brief Generated → Outreach Sent → Meeting Scheduled*).
