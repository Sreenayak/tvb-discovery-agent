import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Compass, 
  ExternalLink, 
  ShieldCheck, 
  Layers, 
  Globe2, 
  Briefcase, 
  Zap,
  Copy,
  Check,
  Building2,
  Send,
  Sparkles
} from 'lucide-react';
import { safeOpenExternalUrl } from '../utils/urlHelper';

interface TVBInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (message: string, type?: 'info' | 'success' | 'error') => void;
}

export const TVBInfoModal: React.FC<TVBInfoModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'engines' | 'orbits' | 'austin'>('engines');

  if (!isOpen) return null;

  const handleCopy = (url: string, label: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(label);
    if (onNotify) onNotify(`Copied ${url} to clipboard`, 'success');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleSafeOpen = (url: string) => {
    safeOpenExternalUrl(url, onNotify);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-5 pr-10 shrink-0">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-md font-mono">
            TVB
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                The Venture Build (TVB) Reference Guide
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Operating Ecosystem
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 italic">
              "The future of scaling is not advising. It is execution." — Operator-led venture acceleration.
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs mb-5 shrink-0">
          <button
            onClick={() => setActiveTab('engines')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'engines' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>4 Growth Engines</span>
          </button>
          <button
            onClick={() => setActiveTab('orbits')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'orbits' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-600" />
            <span>7 Active Orbits</span>
          </button>
          <button
            onClick={() => setActiveTab('austin')}
            className={`flex-1 py-1.5 px-3 rounded-lg font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'austin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Austin Landing Pad</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5">
          
          {/* Official Reference Action Cards (Safe Open & Copy - No Blank Page!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-900">
                  theventurebuild.com
                </div>
                <div className="text-[11px] text-slate-500">Official Web Presence</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy('https://theventurebuild.com', 'site')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Copy official website URL"
                >
                  {copiedLink === 'site' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span className="text-[10px] font-medium">{copiedLink === 'site' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleSafeOpen('https://theventurebuild.com')}
                  className="p-1.5 text-emerald-700 hover:text-white hover:bg-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Open theventurebuild.com"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Open</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-300 transition-all flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-900">
                  TVB LinkedIn
                </div>
                <div className="text-[11px] text-slate-500">Company Profile #90924902</div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy('https://linkedin.com/company/90924902/', 'linkedin')}
                  className="p-1.5 text-slate-500 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Copy LinkedIn URL"
                >
                  {copiedLink === 'linkedin' ? <Check className="w-3 h-3 text-cyan-600" /> : <Copy className="w-3 h-3" />}
                  <span className="text-[10px] font-medium">{copiedLink === 'linkedin' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => handleSafeOpen('https://linkedin.com/company/90924902/')}
                  className="p-1.5 text-cyan-700 hover:text-white hover:bg-cyan-600 bg-cyan-50 rounded-lg border border-cyan-200 transition-colors text-xs flex items-center gap-1 cursor-pointer"
                  title="Open TVB LinkedIn"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Open</span>
                </button>
              </div>
            </div>

          </div>

          {/* TAB 1: Four Growth Engines */}
          {activeTab === 'engines' && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                The 4 Practical TVB Growth Engines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-emerald-300 transition-all">
                  <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px]">1</span>
                    Executive Advisory
                  </div>
                  <p className="text-slate-600 leading-normal mt-1">
                    Operator-led CXO support: GTM strategy, product positioning, pricing, sales strategy, fundraising readiness, and strategic decision support.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-cyan-300 transition-all">
                  <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 flex items-center justify-center font-mono text-[10px]">2</span>
                    Market Access
                  </div>
                  <p className="text-slate-600 leading-normal mt-1">
                    Direct introductions to enterprise customers, channel partners, strategic alliances, corporate pilots, and geographic expansion corridors.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all">
                  <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono text-[10px]">3</span>
                    Scale-Up Marketplace
                  </div>
                  <p className="text-slate-600 leading-normal mt-1">
                    "Costco for scale-ups": curated vetted partners across legal, accounting, compliance, marketing, demand generation, product development, and tooling.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-300 transition-all">
                  <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-mono text-[10px]">4</span>
                    Capital Readiness
                  </div>
                  <p className="text-slate-600 leading-normal mt-1">
                    Investor readiness, pitch refinement, data room guidance, fundraising strategy, investor mapping, and warm investor introductions.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: 7 Active Orbits */}
          {activeTab === 'orbits' && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-600" />
                The 7 TVB Orbits (Vertical Focus Ecosystems)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  { name: 'AI & Automation', desc: 'Applied enterprise AI, agentic systems, test automation & workflow intelligence' },
                  { name: 'Cybersecurity', desc: 'Cloud risk compliance, operational technology (OT), cyber resilience & scan engines' },
                  { name: 'Healthcare', desc: 'Digital therapeutics, social determinants of health (SDOH), clinical data rails' },
                  { name: 'Education', desc: 'Corporate upskilling, modular technical credentials, workforce enablement platforms' },
                  { name: 'Digital Twin', desc: 'Spatial computing, industrial IoT simulations, smart energy & logistics grids' },
                  { name: 'Travel & Mobility', desc: 'White-label booking tech, fleet optimization software, corporate travel infrastructure' },
                  { name: 'Fintech & Payments', desc: 'Prepaid card rails, treasury management, cross-border settlement for scale-ups' },
                  { name: 'Services & Infra', desc: 'B2B enterprise developer tooling, developer productivity, and cloud middleware' }
                ].map((orbit) => (
                  <div key={orbit.name} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="font-semibold text-slate-900 text-xs">{orbit.name}</div>
                    <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{orbit.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Austin Landing Pad & Hubs */}
          {activeTab === 'austin' && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-indigo-600" />
                Austin, Texas HQ &amp; Global Launch Corridors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs">Austin / Texas (Home Base)</span>
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                    Serves as the North American commercial landing pad and pilot testing ground for international scaleups.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs">UK &amp; Paris Hubs</span>
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                    European deeptech scaleups seeking US enterprise commercialization without forcing team relocation.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 text-xs">India &amp; UAE Hubs</span>
                  <p className="text-[11px] text-slate-600 mt-1 leading-normal">
                    T-Hub Hyderabad, Bengaluru &amp; Dubai tech platforms expanding into transatlantic corridors.
                  </p>
                </div>
              </div>

              {/* Target Profile Note */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800">
                <div className="font-semibold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Autonomous Scout Mandate Criteria
                </div>
                The scouting agent continuously audits candidates to verify:
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>• <strong>$1M–$5M USD</strong> Funding or Revenue</div>
                  <div>• <strong>Proprietary Tech Platform</strong> (Not a service agency)</div>
                  <div>• <strong>Minimal/Zero US Footprint</strong> (Non-US HQ)</div>
                  <div>• <strong>Verified Executive Founder Email</strong> (Strictly blank if unverified)</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>The Venture Build • Global Scout Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </motion.div>
    </div>
  );
};
