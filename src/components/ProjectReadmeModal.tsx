import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Download, FileText, ShieldCheck } from 'lucide-react';

interface ProjectReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const README_CONTENT = `# TVB Autonomous Venture Scouting Agent
**The Venture Build (TVB) • Target Profile Intelligence Engine**

## 1. Executive Overview
The **TVB Autonomous Venture Scouting Agent** is an end-to-end intelligence system designed for **The Venture Build (TVB)** (theventurebuild.com / linkedin.com/company/90924902/). 

TVB operates as an AI-powered venture catalyst platform combining operator-led executive advisory, enterprise market access, a scale-up marketplace, and funding readiness. Rather than functioning as a passive advisor or broker, TVB provides hands-on operational leverage for ambitious scale-ups.

This agent autonomously scouts and validates tech platforms meeting TVB's strict target profile criteria across global innovation corridors (UK, Europe, India, UAE, and Southeast Asia) to fuel TVB's Orbits and Hubs.

---

## 2. Target Profile & Parameter Rules

Every discovered company is audited against four non-negotiable parameters:

1. **Funding or Revenue Range ($1M – $5M USD)**
   - Target profile: Early-stage traction to growth (Seed, Pre-Series A, or bootstrapped revenue).
   - Validated: Total funding raised or annual revenue falls strictly between $1,000,000 and $5,000,000 USD.
   - Companies with sub-$1M or exceeding $5M are flagged or filtered out.

2. **Tech-Related Platform Architecture**
   - Must operate a proprietary software, SaaS, API, autonomous AI workflow, or digital infrastructure platform.
   - Aligned directly with TVB's vertical Orbits: Healthcare, Education, AI & Automation, Cybersecurity, Digital Twin, Travel & Mobility, and Fintech & Payments.

3. **Minimal to No Presence in the United States**
   - Headquartered in TVB geographic ecosystem hubs (UK Hub, Paris/France Hub, India Hub, UAE Hub, Singapore Hub, or Continental Europe).
   - Minimal to zero operational or sales footprint in the US.
   - Represents high-potential scale-ups where TVB's Austin/Texas Hub provides the transatlantic bridge into the US market.

4. **CEO or Co-Founder Verified Contact**
   - Name and direct verified email of the CEO or Co-founder must be identified.
   - **Zero-Tolerance Protocol for Generic Information**: Per instructions, any unverified, generic (info@, contact@, sales@, hello@, support@), or unconfirmed email addresses are **strictly left blank** with no generic placeholders.

---

## 3. Core Agent Architecture & Autonomy

- **Dynamic Source Discovery**: The agent does not rely on a static list. It queries live venture registries, tech acceleration hubs (Tech Nation UK, Station F France, T-Hub Hyderabad, Hub71 UAE), and search grounding.
- **Multi-Point Verification Engine**: Evaluates financial metrics, technology architecture, geographic corporate domicile, and executive identity.
- **Strict Data Integrity**: Unverified emails are sanitized and set to empty string (\`""\`), preventing false-positive outreach.
- **Clean Output Formatting**: Structured tabular view and CSV/JSON export with Company Name, Description, Industry/Sector, Country/Hub, Funding USD, and Verified Email.

---

## 4. API Endpoints

- \`GET /api/companies\` - Retrieve filtered companies (by Orbit, Hub, verification status, search).
- \`POST /api/discover\` - Trigger autonomous agent discovery cycle across specified Hubs or Orbits.
- \`POST /api/audit-target\` - Run live parameter audit on any custom company URL or name.
- \`GET /api/stats\` - Pipeline analytics and parameter qualification rates.
- \`GET /api/logs\` - Real-time autonomous agent reasoning traces.
- \`GET /api/export/csv\` - Download clean, spec-compliant CSV export.
- \`GET /api/export/json\` - Download JSON payload of all scouted companies.
- \`GET /api/tvb-profile\` - Official reference metadata on TVB Orbits and Hubs.

---

## 5. TVB Orbits Covered
- **AI & Automation Orbit**: Applied AI, AI workflows, enterprise automation.
- **Cybersecurity Orbit**: Cloud security, OT resilience, compliance, vulnerability remediation.
- **Healthcare Orbit**: Digital health, care coordination, health data consent and governance.
- **Education Orbit**: Workforce upskilling, modular learning, adaptive curriculum.
- **Digital Twin Orbit**: 3D spatial simulation, IoT asset modeling, energy grids.
- **Travel & Mobility Orbit**: White-label travel infrastructure, distribution, payments.
- **Fintech & Payments Orbit**: Cross-border payments, corporate treasury, B2B cash flow.
`;

export const ProjectReadmeModal: React.FC<ProjectReadmeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(README_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([README_CONTENT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'TVB-Discovery-Agent-README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Project Documentation &amp; Architecture (README.md)
              </h2>
              <p className="text-[11px] text-slate-500">
                Complete technical reference, parameter rules &amp; TVB alignment specs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-medium text-white flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Markdown content container */}
        <div className="flex-1 overflow-y-auto mt-4 pr-2 font-mono text-xs text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-200 whitespace-pre-wrap selection:bg-emerald-100 selection:text-emerald-900">
          {README_CONTENT}
        </div>

      </motion.div>
    </div>
  );
};
