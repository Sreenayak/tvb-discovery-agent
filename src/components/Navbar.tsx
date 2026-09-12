import React from 'react';
import { 
  Compass, 
  Sparkles, 
  Download, 
  FileText, 
  ShieldCheck, 
  Search, 
  Terminal,
  ExternalLink,
  Layers,
  Home,
  LayoutList
} from 'lucide-react';

interface NavbarProps {
  onOpenTVBInfo: () => void;
  onOpenReadme: () => void;
  onOpenAuditTarget: () => void;
  onOpenCatalysisOutreach: () => void;
  onTriggerDiscovery: () => void;
  onScrollToHome: () => void;
  onScrollToConsole: () => void;
  isDiscovering: boolean;
  onExportCsv: () => void;
  showLogs: boolean;
  onToggleLogs: () => void;
  qualifiedCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTVBInfo,
  onOpenReadme,
  onOpenAuditTarget,
  onOpenCatalysisOutreach,
  onTriggerDiscovery,
  onScrollToHome,
  onScrollToConsole,
  isDiscovering,
  onExportCsv,
  showLogs,
  onToggleLogs,
  qualifiedCount,
  totalCount
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onScrollToHome}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-md shadow-emerald-600/15 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                <span className="font-bold text-white text-base tracking-wider font-mono">TVB</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tracking-tight text-lg font-display group-hover:text-emerald-600 transition-colors">
                    The Venture Build
                  </span>
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full tracking-wide">
                    Autonomous Scout
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Target Profile Scouting Agent • $1M–$5M Tech Platforms
                </p>
              </div>
            </button>
          </div>

          {/* Quick Nav switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={onScrollToHome}
              className="px-3 py-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5 text-cyan-600" />
              <span>Mission Home</span>
            </button>
            <button
              onClick={onScrollToConsole}
              className="px-3 py-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <LayoutList className="w-3.5 h-3.5 text-emerald-600" />
              <span>Scout Console</span>
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* TVB Catalysis & Founder Outreach Engine */}
            <button
              onClick={onOpenCatalysisOutreach}
              id="btn-nav-catalysis-outreach"
              className="px-2.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300/80 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Launch TVB Executive Catalysis & Founder Outreach Engine"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Catalysis Engine</span>
            </button>

            {/* Live terminal toggle */}
            <button
              onClick={onToggleLogs}
              id="btn-toggle-logs"
              className={`p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 border cursor-pointer ${
                showLogs 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-2xs'
              }`}
              title="Toggle Live Autonomous Execution Terminal"
            >
              <Terminal className={`w-3.5 h-3.5 ${showLogs ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="hidden md:inline">Terminal</span>
            </button>

            {/* TVB Reference Modal */}
            <button
              onClick={onOpenTVBInfo}
              id="btn-tvb-framework"
              className="p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="TVB Operating Ecosystem & 7 Orbits"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-600" />
              <span className="hidden lg:inline">TVB Orbits</span>
            </button>

            {/* Readme Button */}
            <button
              onClick={onOpenReadme}
              id="btn-open-readme"
              className="p-2 sm:px-2.5 sm:py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Project Documentation & Parameter Specifications"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden lg:inline">Docs</span>
            </button>

            {/* Audit Target Button */}
            <button
              onClick={onOpenAuditTarget}
              id="btn-audit-target"
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Audit URL</span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={onExportCsv}
              id="btn-export-csv"
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 border border-slate-200 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Export qualified list to CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">CSV</span>
            </button>

            {/* Primary Action: Run Autonomous Discovery */}
            <button
              onClick={onTriggerDiscovery}
              disabled={isDiscovering}
              id="btn-trigger-autonomous-discovery"
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                isDiscovering
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-not-allowed opacity-90'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 active:scale-95'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDiscovering ? 'animate-spin text-emerald-700' : 'text-white'}`} />
              <span>{isDiscovering ? 'Scouting...' : 'Discover'}</span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
