import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Layers, 
  Search, 
  RefreshCw, 
  Terminal, 
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { TVBOrbit, TVBHub } from '../types';

interface DiscoveryAgentControlProps {
  onRunDiscovery: (options: { hub?: string; orbit?: string; customQuery?: string }) => void;
  isDiscovering: boolean;
  showLogs: boolean;
  onToggleLogs: () => void;
}

const HUBS: (TVBHub | 'All TVB Hubs')[] = [
  'All TVB Hubs',
  'UK Hub (London/UK)',
  'Paris/France Hub',
  'India Hub (Hyderabad/Bangalore)',
  'UAE Hub (Dubai/Abu Dhabi)',
  'Singapore/SE Asia Hub',
  'Continental Europe'
];

const ORBITS: (TVBOrbit | 'All Orbits')[] = [
  'All Orbits',
  'AI & Automation',
  'Cybersecurity',
  'Healthcare',
  'Education',
  'Digital Twin',
  'Travel & Mobility',
  'Fintech & Payments'
];

export const DiscoveryAgentControl: React.FC<DiscoveryAgentControlProps> = ({
  onRunDiscovery,
  isDiscovering,
  showLogs,
  onToggleLogs
}) => {
  const [selectedHub, setSelectedHub] = useState<string>('All TVB Hubs');
  const [selectedOrbit, setSelectedOrbit] = useState<string>('All Orbits');
  const [customQuery, setCustomQuery] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDiscovering) return;
    onRunDiscovery({
      hub: selectedHub,
      orbit: selectedOrbit,
      customQuery: customQuery.trim() || undefined
    });
  };

  return (
    <div className="bg-white/95 border-b border-slate-200/90 p-4 sm:p-5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          
          {/* Main Control Line */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            
            {/* Left: Hub & Orbit Selectors */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Hub Selector */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="text-slate-500 shrink-0 font-medium">Target Hub:</span>
                <select
                  value={selectedHub}
                  onChange={(e) => setSelectedHub(e.target.value)}
                  disabled={isDiscovering}
                  className="bg-transparent text-slate-800 focus:outline-none cursor-pointer pr-2 font-semibold"
                >
                  {HUBS.map((hub) => (
                    <option key={hub} value={hub} className="bg-white text-slate-800">
                      {hub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Orbit Selector */}
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs shadow-2xs">
                <Layers className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                <span className="text-slate-500 shrink-0 font-medium">TVB Orbit:</span>
                <select
                  value={selectedOrbit}
                  onChange={(e) => setSelectedOrbit(e.target.value)}
                  disabled={isDiscovering}
                  className="bg-transparent text-slate-800 focus:outline-none cursor-pointer pr-2 font-semibold"
                >
                  {ORBITS.map((orbit) => (
                    <option key={orbit} value={orbit} className="bg-white text-slate-800">
                      {orbit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Advanced prompt toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
              >
                <SlidersHorizontal className="w-3 h-3 text-slate-500" />
                <span className="font-medium">Custom Scout Focus</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              
              {/* Terminal View Button */}
              <button
                type="button"
                onClick={onToggleLogs}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  showLogs 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                <span>{showLogs ? 'Hide Live Terminal' : 'View Live Terminal'}</span>
              </button>

              {/* Run Discovery Button */}
              <button
                type="submit"
                disabled={isDiscovering}
                className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm min-w-[170px] cursor-pointer ${
                  isDiscovering
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98 shadow-emerald-600/20'
                }`}
              >
                {isDiscovering ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                    <span>Agent Scouting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-100" />
                    <span>Run Autonomous Scout</span>
                    <ArrowRight className="w-3 h-3 text-emerald-200" />
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Advanced custom search directive input */}
          {showAdvanced && (
            <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="Optional scout directive, e.g., 'Discover European health data platforms' or 'Find B2B fintech in UAE/Dubai raised $2M-$4M'"
                  className="w-full bg-slate-50 focus:bg-white text-xs text-slate-800 pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>
              <span className="text-[11px] text-slate-500 self-center hidden sm:block">
                The agent will use live search grounding &amp; directory exploration.
              </span>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
