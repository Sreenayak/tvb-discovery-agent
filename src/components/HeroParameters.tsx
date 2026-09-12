import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Globe2, 
  MailCheck, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  ExternalLink,
  Target,
  Sparkles,
  Filter,
  Check
} from 'lucide-react';
import { DiscoveryStats } from '../types';

interface HeroParametersProps {
  stats: DiscoveryStats | null;
  onSelectFilterVerifiedOnly: () => void;
  verifiedOnlyActive: boolean;
  onOpenTVBInfo: () => void;
}

export const HeroParameters: React.FC<HeroParametersProps> = ({
  stats,
  onSelectFilterVerifiedOnly,
  verifiedOnlyActive,
  onOpenTVBInfo
}) => {
  const qualifiedPercentage = stats && stats.totalScouted > 0 
    ? Math.round((stats.totalQualified / stats.totalScouted) * 100) 
    : 85;

  const emailVerifiedPercentage = stats && stats.totalScouted > 0
    ? Math.round((stats.fullyVerifiedEmails / stats.totalScouted) * 100)
    : 72;

  return (
    <div className="bg-white border-b border-slate-200/90 py-6 relative overflow-hidden">
      {/* Background subtle tint */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-emerald-50/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-48 bg-cyan-50/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Contextual Row: Section Identity & Fast Tools */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-150">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Target className="w-3 h-3 text-emerald-600" />
                MANDATE VERIFICATION MATRIX
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                Active Policy: $1M-$5M • Tech Platform • Minimal US • Verified Founder
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
              Autonomous Scout Radar &amp; Portfolio Pipeline
            </h2>
          </div>

          {/* TVB Reference Links pill box */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap bg-slate-50 p-1.5 rounded-xl border border-slate-200 text-xs">
            <button 
              onClick={onOpenTVBInfo}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>TVB 7 Orbits &amp; Austin Bridge</span>
            </button>
            <a 
              href="https://theventurebuild.com" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/80 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span>theventurebuild.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 4 Strict Mandate Diagnostic Gauges */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Gauge 1: Funding Bracket */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Rule 1: Capital Bracket</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {qualifiedPercentage}% Match
              </span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-900 font-mono">$1,000,000 – $5,000,000</div>
            <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
              <div className="bg-emerald-500 h-1 rounded-full" style={{ width: `${qualifiedPercentage}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-tight">
              Pre-Series A &amp; revenue within TVB acceleration window.
            </p>
          </div>

          {/* Gauge 2: Tech Architecture */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-cyan-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-100 text-cyan-700 border border-cyan-200">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Rule 2: Architecture</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                100% Platform
              </span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-900">Proprietary Tech Platform</div>
            <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
              <div className="bg-cyan-500 h-1 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-tight">
              B2B SaaS, AI workflow, cyber, health, or fintech core.
            </p>
          </div>

          {/* Gauge 3: Geography & US Bridge */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-indigo-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200">
                  <Globe2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Rule 3: Geography</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Zero US Footprint
              </span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-900">Austin US Bridge Target</div>
            <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
              <div className="bg-indigo-500 h-1 rounded-full" style={{ width: '100%' }} />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-tight">
              UK, France, India, UAE, Singapore ready for US landing.
            </p>
          </div>

          {/* Gauge 4: Executive Contact Sanitization */}
          <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-amber-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 border border-amber-200">
                  <MailCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold text-slate-800">Rule 4: Executive Sanitization</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {emailVerifiedPercentage}% Verified
              </span>
            </div>
            <div className="mt-2 text-sm font-bold text-slate-900">Direct Founder Email Only</div>
            <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
              <div className="bg-amber-500 h-1 rounded-full" style={{ width: `${emailVerifiedPercentage}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 leading-tight">
              Zero generic placeholders (info@ / contact@) permitted.
            </p>
          </div>

        </div>

        {/* Real-time stats bar & Filter Controls */}
        {stats && (
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Total Scouted:</span>
                <span className="font-semibold text-slate-900 font-mono text-sm">{stats.totalScouted}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">TVB Qualified:</span>
                <span className="font-semibold text-emerald-700 font-mono text-sm">{stats.totalQualified}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Verified Founder Emails:</span>
                <span className="font-semibold text-cyan-700 font-mono text-sm">{stats.fullyVerifiedEmails}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Average Funding:</span>
                <span className="font-semibold text-indigo-800 font-mono text-sm">
                  ${(stats.averageFundingUSD / 1000000).toFixed(2)}M
                </span>
              </div>
            </div>

            <button
              onClick={onSelectFilterVerifiedOnly}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border shadow-2xs ${
                verifiedOnlyActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <span>{verifiedOnlyActive ? 'Showing Fully Verified Only' : 'Filter: 100% Qualified Only'}</span>
              {verifiedOnlyActive && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
