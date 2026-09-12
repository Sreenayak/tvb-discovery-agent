import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowDown, 
  ShieldCheck, 
  Layers, 
  Globe2, 
  MailCheck, 
  Compass, 
  Search, 
  ExternalLink,
  ChevronRight,
  Zap,
  TrendingUp,
  Send,
  Radio,
  Building2,
  CheckCircle2,
  X
} from 'lucide-react';
import { DiscoveryStats } from '../types';
import { ScoutRadarAnimation } from './ScoutRadarAnimation';

interface AnimatedHeroHomeProps {
  onScrollToConsole: () => void;
  onOpenAuditTarget: () => void;
  onOpenTVBInfo: () => void;
  onOpenCatalysisOutreach: () => void;
  onRunDiscovery: () => void;
  isDiscovering: boolean;
  stats: DiscoveryStats | null;
}

interface HubNode {
  id: string;
  name: string;
  location: string;
  focus: string;
  coords: { x: string; y: string };
  role: string;
  scoutCount: number;
  bridgeStrategy: string;
}

const GLOBAL_HUBS: HubNode[] = [
  {
    id: 'uk',
    name: 'UK Innovation Hub',
    location: 'London, United Kingdom',
    focus: 'Fintech, Applied AI & Cybersecurity Infrastructure',
    coords: { x: '46%', y: '36%' },
    role: 'European Scaleup Corridor',
    scoutCount: 14,
    bridgeStrategy: 'Austin transatlantic landing pad for FCA-regulated & UK AI leaders.'
  },
  {
    id: 'paris',
    name: 'Paris Tech Hub',
    location: 'Paris, France (Station F)',
    focus: 'B2B Enterprise SaaS & Digital Twin Simulation',
    coords: { x: '49%', y: '42%' },
    role: 'Continental Innovation Node',
    scoutCount: 11,
    bridgeStrategy: 'Connecting EU proprietary IP with US industrial & energy enterprise pilots.'
  },
  {
    id: 'austin',
    name: 'Austin Hub (TVB Base)',
    location: 'Austin, Texas (USA)',
    focus: 'Commercial Launchpad & Enterprise Market Access',
    coords: { x: '24%', y: '48%' },
    role: 'US Landing & Expansion Gateway',
    scoutCount: 38,
    bridgeStrategy: 'Operator-led customer acquisition, pilot contracts, and Series A readiness.'
  },
  {
    id: 'india',
    name: 'India Innovation Hub',
    location: 'Hyderabad / Bangalore (T-Hub)',
    focus: 'Enterprise Platform Architecture & Workflow AI',
    coords: { x: '68%', y: '52%' },
    role: 'Engineering & Scaled B2B Bridge',
    scoutCount: 18,
    bridgeStrategy: 'Deploying high-margin software platforms into US mid-market & enterprise.'
  },
  {
    id: 'uae',
    name: 'UAE Capital Hub',
    location: 'Abu Dhabi / Dubai (Hub71)',
    focus: 'Cross-Border Infra & Web3/Treasury Platforms',
    coords: { x: '58%', y: '48%' },
    role: 'Middle East Capital & Trade Hub',
    scoutCount: 9,
    bridgeStrategy: 'Bridging GCC sovereign capital and US commercial customer access.'
  },
  {
    id: 'singapore',
    name: 'Singapore Hub',
    location: 'Singapore, SE Asia',
    focus: 'Cross-Border Supply Chain & Health Platforms',
    coords: { x: '78%', y: '64%' },
    role: 'APAC Expansion Corridor',
    scoutCount: 8,
    bridgeStrategy: 'Unlocking bilateral US-ASEAN commercial partnerships.'
  }
];

export const AnimatedHeroHome: React.FC<AnimatedHeroHomeProps> = ({
  onScrollToConsole,
  onOpenAuditTarget,
  onOpenTVBInfo,
  onOpenCatalysisOutreach,
  onRunDiscovery,
  isDiscovering,
  stats
}) => {
  const [selectedHubDetail, setSelectedHubDetail] = useState<HubNode | null>(null);

  const handleRadarSelectHub = (node: { id: string }) => {
    const match = GLOBAL_HUBS.find(h => h.id === node.id || (node.id === 'london' && h.id === 'uk'));
    if (match) {
      setSelectedHubDetail(match);
    }
  };

  return (
    <section className="relative w-full min-h-[88vh] flex flex-col justify-between overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 text-slate-900">
      
      {/* 1. CLEAN LIGHT CANVAS WITH AIRY AMBIENT GLOWS (NO STATIC DOTS OVER EARTH) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute inset-0 bg-radial-ambient opacity-75" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
      </div>

      {/* 2. HERO CONTENT CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Telemetry Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="tracking-wide">THE VENTURE BUILD</span>
            <span className="text-emerald-500">•</span>
            <span className="text-slate-600 font-normal">AUTONOMOUS SCOUTING AGENT</span>
          </div>

          {/* Live Telemetry Indicator */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 text-slate-600 border border-slate-200 shadow-2xs">
            <Radio className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-slate-500">Target Hubs:</span>
            <span className="text-slate-800 font-mono text-[11px]">Austin • London • Paris • India • UAE • Singapore</span>
          </div>

          <button
            onClick={onOpenCatalysisOutreach}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all shadow-2xs group cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <span>Catalysis &amp; Founder Outreach Engine</span>
            <ChevronRight className="w-3 h-3 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Responsive Hero Section: Left (Proposition & Actions) | Right (Interactive Animated Scout Radar UI) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Subtitle & Primary Actions */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-[-0.03em] text-slate-900 font-display leading-[1.1]">
                Autonomous Venture Scout for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
                  High-Growth Tech Platforms
                </span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                Continuously discovering and auditing scale-ups meeting The Venture Build's strict criteria: 
                <strong className="text-slate-900 font-semibold"> $1M–$5M funding</strong>, proprietary tech platforms, 
                <strong className="text-slate-900 font-semibold"> minimal US footprint</strong>, and <strong className="text-emerald-700 font-semibold">verified founder contacts</strong>.
              </p>
            </motion.div>

            {/* Interactive Action Buttons with Polished Craft */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {/* Primary Action: Go to Console */}
              <button
                onClick={onScrollToConsole}
                id="btn-explore-scaleups"
                className="group px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer border border-emerald-500"
              >
                <span>Explore Scouted Scaleups</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
              </button>

              {/* Secondary Action: Trigger Scout */}
              <button
                onClick={onRunDiscovery}
                disabled={isDiscovering}
                id="btn-hero-run-agent"
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-emerald-500 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-2xs active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{isDiscovering ? 'Scouting Ecosystem...' : 'Run Autonomous Discovery'}</span>
              </button>

              {/* Audit Target Button */}
              <button
                onClick={onOpenAuditTarget}
                id="btn-hero-audit-target"
                className="px-4 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-amber-500 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-500" />
                <span>Audit Specific URL</span>
              </button>

              {/* TVB Founder Outreach Engine */}
              <button
                onClick={onOpenCatalysisOutreach}
                id="btn-hero-catalysis-outreach"
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 text-emerald-900 border border-emerald-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-2xs active:scale-95 cursor-pointer"
                title="Generate Bespoke Executive Founder Outreach & US Bridge Strategy"
              >
                <Send className="w-4 h-4 text-emerald-600" />
                <span>Founder Outreach Engine</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Live Animated Scouting Radar Visualizer & Telemetry */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <ScoutRadarAnimation 
                onSelectHub={handleRadarSelectHub}
                onExploreScaleups={onScrollToConsole}
                onOpenOutreach={onOpenCatalysisOutreach}
              />
            </motion.div>
          </div>

        </div>

        {/* 4 Floating Strict Parameter Highlights (Interactive Glass Panels) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
        >
          {/* Card 1 */}
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-emerald-500/50 hover:shadow-md transition-all group shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                RULE 1: RANGE
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">$1M – $5M Raised / ARR</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Seed, Pre-Series A, or revenue within TVB's optimal acceleration sweet spot.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-cyan-500/50 hover:shadow-md transition-all group shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200 font-semibold">
                RULE 2: TECH
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">Proprietary Tech Platform</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              B2B SaaS, AI workflow, cyber, health, fintech, travel or digital twin platform.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-indigo-500/50 hover:shadow-md transition-all group shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 group-hover:scale-105 transition-transform">
                <Globe2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200 font-semibold">
                RULE 3: GEOGRAPHY
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">Minimal to Zero US Footprint</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              HQ in UK, France, India, UAE, Singapore. High affinity for Austin US expansion bridge.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 hover:border-amber-500/50 hover:shadow-md transition-all group shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 group-hover:scale-105 transition-transform">
                <MailCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-semibold">
                RULE 4: SANITIZATION
              </span>
            </div>
            <div className="text-sm font-bold text-slate-900 tracking-tight">Verified Founder Direct Email</div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Zero generic placeholders. Unverified emails are strictly kept blank per mandate.
            </p>
          </div>
        </motion.div>

      </div>

      {/* 4. BOTTOM TVB ENGINE STRIP */}
      <div className="relative z-20 border-t border-slate-200/80 bg-white/90 backdrop-blur-md py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-3 text-slate-500">
            <span className="font-semibold text-slate-900">TVB Operator Growth Engines:</span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-emerald-700 font-medium">1. Executive Advisory</span>
              <span className="text-slate-300">•</span>
              <span className="text-cyan-700 font-medium">2. Market Access</span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-700 font-medium">3. Scale-Up Marketplace</span>
              <span className="text-slate-300">•</span>
              <span className="text-amber-700 font-medium">4. Capital Readiness</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Official references:</span>
            <a 
              href="https://theventurebuild.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-700 hover:text-emerald-600 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <span>theventurebuild.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://linkedin.com/company/90924902/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-slate-700 hover:text-cyan-600 transition-colors inline-flex items-center gap-1 font-medium"
            >
              <span>TVB LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>

      {/* Hub Detail Drawer Modal */}
      <AnimatePresence>
        {selectedHubDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 rounded-2xl bg-white border border-slate-200 text-left shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {selectedHubDetail.role}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1.5 font-display">
                    {selectedHubDetail.name}
                  </h3>
                  <p className="text-xs text-slate-500">{selectedHubDetail.location}</p>
                </div>
                <button 
                  onClick={() => setSelectedHubDetail(null)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px] mb-0.5">Technology &amp; Orbit Focus:</span>
                  <span className="font-semibold text-slate-900">{selectedHubDetail.focus}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px] mb-0.5">TVB Austin Bridge Strategy:</span>
                  <p className="leading-relaxed text-slate-700">{selectedHubDetail.bridgeStrategy}</p>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span>Scouted in this Hub:</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">{selectedHubDetail.scoutCount} Scaleups</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedHubDetail(null);
                    onScrollToConsole();
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm cursor-pointer"
                >
                  Filter Console to {selectedHubDetail.name.split(' ')[0]}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
