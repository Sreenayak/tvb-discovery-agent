import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  ExternalLink, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  AlertTriangle, 
  Building2, 
  Layers, 
  Globe2, 
  Mail, 
  ArrowRight,
  Download,
  Briefcase,
  FileText,
  UserCheck,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { CompanyRecord, OutreachStatus } from '../types';

interface CatalysisOutreachModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyRecord | null;
  allCompanies: CompanyRecord[];
  onSelectCompany: (company: CompanyRecord) => void;
  onUpdateStatus?: (companyId: string, status: OutreachStatus) => void;
}

type OutreachAngle = 'us_market_access' | 'operator_advisory' | 'scaleup_marketplace' | 'capital_readiness';

export const CatalysisOutreachModal: React.FC<CatalysisOutreachModalProps> = ({
  isOpen,
  onClose,
  company,
  allCompanies,
  onSelectCompany,
  onUpdateStatus
}) => {
  const [selectedAngle, setSelectedAngle] = useState<OutreachAngle>('us_market_access');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedSubject, setCopiedSubject] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');

  if (!isOpen || !company) return null;

  const hasEmail = Boolean(company.verifiedEmail && company.verifiedEmail.trim().length > 0);
  const currentStatus: OutreachStatus = company.outreachStatus || (hasEmail ? 'Dossier Ready' : 'New Lead');

  // Compute Primary TVB Growth Engine Fit
  const engineFit = useMemo(() => {
    switch (company.tvbOrbit) {
      case 'AI & Automation':
        return {
          primary: 'Market Access & Enterprise Pilots',
          secondary: 'Executive Advisory (GTM Architecture)',
          focus: 'Connecting proprietary AI workflows directly to enterprise buyers in North America via the Austin corridor.',
          wedge: 'Austin Landing Pad & Fortune 500 Enterprise Access'
        };
      case 'Cybersecurity':
        return {
          primary: 'Market Access (US CISO Channel)',
          secondary: 'Capital Readiness & Series A Scaling',
          focus: 'Introducing non-US cybersecurity technology to US enterprise security buyers and compliance ecosystems.',
          wedge: 'Transatlantic CISO Network & Channel Partnerships'
        };
      case 'Fintech & Payments':
        return {
          primary: 'Scale-Up Marketplace & Regulatory Advisory',
          secondary: 'Market Access & Banking Partnerships',
          focus: 'Cross-border payment infrastructure scaling and commercial banking pilot programs.',
          wedge: 'US Regulatory Clearance & Cross-Border Rails'
        };
      case 'Healthcare':
      case 'Education':
      case 'Digital Twin':
      case 'Travel & Mobility':
      default:
        return {
          primary: 'US Market Access & Strategic Expansion',
          secondary: 'Executive Advisory (Operator-Led Scale)',
          focus: 'Establishing commercial beachhead in the United States while keeping engineering in local regional hub.',
          wedge: 'Austin US Expansion Bridge'
        };
    }
  }, [company.tvbOrbit]);

  // Generate Email Subject & Body based on Selected Angle
  const emailDraft = useMemo(() => {
    const founderFirstName = company.executiveName ? company.executiveName.split(' ')[0] : 'there';
    
    let subject = '';
    let body = '';

    if (selectedAngle === 'us_market_access') {
      subject = `The Venture Build <> ${company.name} | US Market Entry via Austin`;
      body = `Hi ${founderFirstName},

I have been closely following ${company.name}'s platform in the ${company.industry} space out of ${company.city || company.country}. Your proprietary technology architecture and recent traction in the ${company.fundingDisplay} bracket caught our attention at The Venture Build (TVB).

At TVB, our thesis is simple: "The future of scaling is not advising. It is execution." We operate as an execution catalyst headquartered in Austin, Texas, specializing in helping premier international scale-ups establish a high-impact commercial bridge into the US enterprise market—without the overhead of relocating your core engineering base.

Given ${company.name}'s minimal US footprint and mature platform, we see a clear wedge to accelerate direct US customer access and enterprise pilots.

Would you be open to a brief 15-minute introductory conversation next week with our venture partners in Austin?

Best regards,

Venture Partnership Team
The Venture Build (TVB)
Austin, TX • London • Paris • India • UAE
https://theventurebuild.com`;
    } else if (selectedAngle === 'operator_advisory') {
      subject = `The Venture Build <> ${company.name} | Operator-Led Execution`;
      body = `Hi ${founderFirstName},

Congratulations on the ongoing momentum with ${company.name}. 

At The Venture Build (TVB), we partner with exceptional tech platform founders who have raised $1M–$5M and are preparing for their next inflection point. Unlike traditional advisory firms or passive consultancies, TVB is operator-led: our partners embed directly alongside founders to execute on go-to-market, pricing, and enterprise channel expansion.

We have audited ${company.name}'s trajectory in ${company.tvbOrbit} and believe our CXO advisory network can dramatically compress your sales cycles and accelerate scale.

Are you available for a brief exploratory call this Thursday or Friday?

Best,

The Venture Build Leadership
https://theventurebuild.com`;
    } else if (selectedAngle === 'scaleup_marketplace') {
      subject = `${company.name} <> The Venture Build | Scale-Up Marketplace & Growth`;
      body = `Hi ${founderFirstName},

I hope this finds you well. I'm reaching out from The Venture Build (TVB). We tracked ${company.name}'s platform traction in ${company.city || company.country} and wanted to introduce our Scale-Up Marketplace.

TVB functions as the "Costco for scale-ups" for high-growth tech platforms between $1M and $5M funding. We provide pre-negotiated, enterprise-tier access (30% to 70% cost reductions) on critical scaling infrastructure—spanning global cloud compute, compliance, cross-border legal, and pipeline demand generation.

We would love to share how several scale-ups in our ${company.tvbHub.split(' ')[0]} corridor are leveraging TVB to preserve runway while accelerating enterprise revenue.

Let me know if you have 10 minutes for an introductory chat.

Warm regards,

Venture Partnerships
The Venture Build
https://theventurebuild.com`;
    } else {
      // capital_readiness
      subject = `The Venture Build <> ${company.name} | Pre-Series A Metric Hardening`;
      body = `Hi ${founderFirstName},

I've been reviewing ${company.name}'s milestones in ${company.industry}. At ${company.fundingDisplay} in capital/revenue, you are approaching the critical inflection point for global institutional expansion.

Through TVB's Capital Readiness engine, we assist high-growth non-US tech platforms in structuring their narrative, auditing unit economics, and executing introductions to top-tier US and cross-border growth funds that value international defensibility.

I'd welcome the chance to connect and compare notes on the current ${company.tvbOrbit} investment climate.

Best regards,

Investment & Scale Catalyst
The Venture Build
Austin, Texas • theventurebuild.com`;
    }

    return { subject, body };
  }, [company, selectedAngle]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailDraft.body);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopySubject = () => {
    navigator.clipboard.writeText(emailDraft.subject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleOpenMailClient = () => {
    if (!hasEmail) return;
    
    // 1. Copy complete formatted outreach to clipboard so user never loses their pitch
    const fullPitch = `To: ${company.verifiedEmail}\nSubject: ${emailDraft.subject}\n\n${emailDraft.body}`;
    navigator.clipboard.writeText(fullPitch);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);

    // 2. Safely trigger email client without navigating iframe away to a blank page
    const mailtoUrl = `mailto:${encodeURIComponent(company.verifiedEmail)}?subject=${encodeURIComponent(emailDraft.subject)}&body=${encodeURIComponent(emailDraft.body)}`;
    try {
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Mail client launch handled via clipboard fallback:', err);
    }

    if (onUpdateStatus) {
      onUpdateStatus(company.id, 'Outreach Sent');
    }
  };

  const handleDownloadDossier = () => {
    const dossierMarkdown = `# TVB Strategic Catalysis Dossier: ${company.name}
**Generated by The Venture Build Autonomous Scouting Engine**
**Date:** ${new Date().toLocaleDateString()}
**Status:** ${company.audit.overallMatch ? 'QUALIFIED TARGET' : 'FLAGGED'}

---

## Target Profile Audit
- **Company Name:** ${company.name}
- **Website:** ${company.website || 'N/A'}
- **Industry & Orbit:** ${company.industry} (${company.tvbOrbit})
- **Headquarters:** ${company.city}, ${company.country} (${company.tvbHub})
- **Funding / Revenue:** ${company.fundingDisplay} ($${company.fundingAmountUSD.toLocaleString()} USD)
- **US Presence:** ${company.usPresence} (${company.audit.usPresenceDetail})
- **Executive Founder:** ${company.executiveName || 'Unverified'} (${company.executiveRole || 'Executive'})
- **Verified Direct Email:** ${company.verifiedEmail || '[STRICT POLICY: UNVERIFIED - LEFT BLANK]'}

---

## TVB Growth Engine Alignment
- **Primary Engine:** ${engineFit.primary}
- **Secondary Engine:** ${engineFit.secondary}
- **Strategic Wedge:** ${engineFit.wedge}
- **Fit Rationale:** ${company.audit.tvbStrategicFitReason}

---

## Transatlantic Expansion Thesis
TVB acts as the execution bridge connecting ${company.city || company.country} to Austin, Texas and North American enterprise buyers without demanding the founder relocate product engineering.

---

## Recommended Founder Outreach Pitch (${selectedAngle.toUpperCase()})
**Subject:** ${emailDraft.subject}
**Recipient:** ${company.verifiedEmail || '[UNVERIFIED]'}

${emailDraft.body}

${customNotes ? `\n---\n## Internal Notes\n${customNotes}\n` : ''}
`;

    const blob = new Blob([dossierMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TVB-Catalysis-Dossier-${company.name.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
      >
        {/* Modal Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  TVB Catalysis &amp; Founder Outreach Engine
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Execution Wedge
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Operator-led venture acceleration &amp; transatlantic US entry strategy for vetted scaleups.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto pr-1 py-4 space-y-4 flex-1 text-xs">
          
          {/* Target Company Switcher Bar */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center font-bold text-emerald-800 text-sm shrink-0">
                {company.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{company.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-200">
                    {company.tvbOrbit}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {company.fundingDisplay}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-2">
                  <span>{company.city}, {company.country}</span>
                  <span>•</span>
                  <span>{company.tvbHub.split(' ')[0]} Hub</span>
                  <span>•</span>
                  <span>US Presence: <strong className="text-slate-700">{company.usPresence}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Switch Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] text-slate-500 shrink-0">Switch Target:</span>
              <select
                value={company.id}
                onChange={(e) => {
                  const found = allCompanies.find(c => c.id === e.target.value);
                  if (found) onSelectCompany(found);
                }}
                className="bg-white text-xs text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 w-full sm:w-48 shadow-2xs"
              >
                {allCompanies.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.tvbOrbit})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Strategic TVB Catalysis Engine Analysis Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <h3 className="font-semibold text-slate-900 text-xs uppercase tracking-wider font-mono">
                  TVB Catalysis Wedge &amp; Growth Engine Fit
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Operator-Led Execution Model
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Box 1 */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-mono text-emerald-700 uppercase font-semibold">
                  Primary TVB Growth Engine
                </div>
                <div className="font-bold text-slate-900 text-xs mt-1">
                  {engineFit.primary}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {engineFit.focus}
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-mono text-cyan-700 uppercase font-semibold">
                  Secondary Growth Engine
                </div>
                <div className="font-bold text-slate-900 text-xs mt-1">
                  {engineFit.secondary}
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Operator CXO support and infrastructure discounts via Scaleup Marketplace.
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="text-[10px] font-mono text-amber-700 uppercase font-semibold">
                  US Market Entry Wedge
                </div>
                <div className="font-bold text-slate-900 text-xs mt-1">
                  Austin / Texas Launchpad
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  High-velocity commercial expansion into North America while keeping HQ in {company.country}.
                </p>
              </div>
            </div>
          </div>

          {/* Executive Contact & TVB Verification Status */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                hasEmail ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-amber-100 text-amber-700 border border-amber-300'
              }`}>
                {hasEmail ? <UserCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                  <span>Founder: {company.executiveName || 'Unverified'}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-normal">{company.executiveRole || 'CEO / Co-Founder'}</span>
                </div>
                <div className="text-[11px] mt-0.5">
                  {hasEmail ? (
                    <span className="font-mono text-emerald-700">
                      Verified Direct Email: <strong>{company.verifiedEmail}</strong>
                    </span>
                  ) : (
                    <span className="text-amber-700 italic">
                      [Strict TVB Policy: Email Unverified – Field Left Strictly Blank]
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Email status warning banner */}
            {!hasEmail && (
              <div className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-800">
                ⚠️ Direct send disabled until email verified
              </div>
            )}
          </div>

          {/* Strategic Pitch Angle Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-700 text-xs flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                Select Strategic Outreach Angle:
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setSelectedAngle('us_market_access')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedAngle === 'us_market_access'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-xs">US Market Access</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Austin enterprise bridge
                </div>
              </button>

              <button
                onClick={() => setSelectedAngle('operator_advisory')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedAngle === 'operator_advisory'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-xs">Operator Advisory</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Execution over advising
                </div>
              </button>

              <button
                onClick={() => setSelectedAngle('scaleup_marketplace')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedAngle === 'scaleup_marketplace'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-xs">Marketplace Savings</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Costco for scale-ups
                </div>
              </button>

              <button
                onClick={() => setSelectedAngle('capital_readiness')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedAngle === 'capital_readiness'
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-2xs font-medium'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-xs">Capital Readiness</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                  Pre-Series A hardening
                </div>
              </button>
            </div>
          </div>

          {/* Generated Subject & Email Box */}
          <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
            
            {/* Subject Line Bar */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden text-xs">
                <span className="text-slate-500 font-mono font-medium">Subject:</span>
                <span className="font-semibold text-slate-800 truncate">{emailDraft.subject}</span>
              </div>
              <button
                onClick={handleCopySubject}
                className="text-slate-500 hover:text-slate-800 text-[11px] flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
              >
                {copiedSubject ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSubject ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Email Body Preformatted */}
            <div className="p-4 bg-white relative">
              <pre className="font-sans text-xs text-slate-700 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto selection:bg-emerald-100">
                {emailDraft.body}
              </pre>

              <button
                onClick={handleCopyEmail}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] flex items-center gap-1.5 transition-all border border-slate-200 cursor-pointer"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied Body' : 'Copy Email'}</span>
              </button>
            </div>

          </div>

          {/* Pipeline Status Workflow Selector */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-600">TVB Engagement Status:</span>
              <span className="font-semibold text-emerald-800 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                {currentStatus}
              </span>
            </div>

            {onUpdateStatus && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['New Lead', 'Brief Generated', 'Outreach Sent', 'Meeting Scheduled'] as OutreachStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => onUpdateStatus(company.id, status)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors border cursor-pointer ${
                      currentStatus === status
                        ? 'bg-emerald-600 text-white border-emerald-600 font-semibold shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal Bottom Action Controls */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-slate-500 text-[11px] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-600" />
            <span>Official TVB Target Profile: $1M–$5M, Non-US HQ, Tech Platform, Verified Founder.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            
            {/* Download Full Dossier Markdown */}
            <button
              onClick={handleDownloadDossier}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Complete Investment & Catalysis Dossier (.md)"
            >
              <Download className="w-3.5 h-3.5 text-cyan-700" />
              <span>Export Dossier</span>
            </button>

            {/* Launch in Mail Client Button */}
            <button
              onClick={handleOpenMailClient}
              disabled={!hasEmail}
              className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-xs ${
                hasEmail
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              }`}
              title={hasEmail ? `Open in Default Email Client (${company.verifiedEmail})` : 'Email unverified per TVB policy'}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{hasEmail ? 'Launch Email Client (mailto:)' : 'Unverified Email (Disabled)'}</span>
            </button>

          </div>
        </div>

      </motion.div>
    </div>
  );
};
