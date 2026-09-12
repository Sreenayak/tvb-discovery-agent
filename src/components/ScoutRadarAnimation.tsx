import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Sparkles, 
  Compass, 
  Zap, 
  ShieldCheck, 
  Globe2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';

interface RadarNode {
  id: string;
  name: string;
  city: string;
  country: string;
  x: number; // SVG coordinate (0-360)
  y: number; // SVG coordinate (0-240)
  orbit: string;
  scoutCount: number;
  dealSize: string;
  status: 'active' | 'qualified' | 'bridged';
  role: string;
  strategy: string;
}

const RADAR_NODES: RadarNode[] = [
  {
    id: 'austin',
    name: 'Austin Launchpad',
    city: 'Austin, TX',
    country: 'USA (TVB Base)',
    x: 95,
    y: 120,
    orbit: 'US Expansion Gateway',
    scoutCount: 38,
    dealSize: '$1M-$5M Sweetspot',
    status: 'bridged',
    role: 'Central Commercial Bridge',
    strategy: 'Operator-led customer acquisition & pilot deployments for non-US founders.'
  },
  {
    id: 'london',
    name: 'UK Innovation Hub',
    city: 'London',
    country: 'United Kingdom',
    x: 195,
    y: 70,
    orbit: 'Fintech & Cyber Infra',
    scoutCount: 14,
    dealSize: '$2.4M Avg Seed',
    status: 'qualified',
    role: 'European Scaleup Corridor',
    strategy: 'Austin transatlantic landing pad for FCA-regulated and B2B SaaS teams.'
  },
  {
    id: 'paris',
    name: 'Paris Tech Hub',
    city: 'Paris (Station F)',
    country: 'France',
    x: 215,
    y: 95,
    orbit: 'Enterprise SaaS & Simulation',
    scoutCount: 11,
    dealSize: '$1.9M Avg Seed',
    status: 'qualified',
    role: 'Continental AI Node',
    strategy: 'Connecting EU proprietary IP with US industrial & energy enterprise pilots.'
  },
  {
    id: 'uae',
    name: 'UAE Capital Hub',
    city: 'Abu Dhabi / Dubai',
    country: 'United Arab Emirates',
    x: 255,
    y: 130,
    orbit: 'Treasury & Web3 Infra',
    scoutCount: 9,
    dealSize: '$3.2M Avg Round',
    status: 'qualified',
    role: 'Middle East Capital Node',
    strategy: 'Bridging GCC sovereign capital and US commercial customer access.'
  },
  {
    id: 'india',
    name: 'India Innovation Hub',
    city: 'Hyderabad (T-Hub)',
    country: 'India',
    x: 290,
    y: 145,
    orbit: 'Workflow AI & Tech Platform',
    scoutCount: 18,
    dealSize: '$2.1M Avg Round',
    status: 'qualified',
    role: 'Scaled Engineering Bridge',
    strategy: 'Deploying high-margin software platforms into US mid-market & enterprise.'
  },
  {
    id: 'singapore',
    name: 'Singapore Hub',
    city: 'Singapore',
    country: 'SE Asia',
    x: 325,
    y: 180,
    orbit: 'Cross-Border Supply & Health',
    scoutCount: 8,
    dealSize: '$2.8M Avg Round',
    status: 'qualified',
    role: 'APAC Expansion Corridor',
    strategy: 'Unlocking bilateral US-ASEAN commercial partnerships.'
  }
];

// Live Simulated Scout Log Events for radar ticker
const LIVE_SCOUT_EVENTS = [
  { time: 'Just now', hub: 'London', text: 'Audited B2B Cyber Platform: $2.4M Seed, 0 US footprint. QUALIFIED.', type: 'verified' },
  { time: '1m ago', hub: 'Paris', text: 'Detected Enterprise SaaS at Station F: founder direct contact verified.', type: 'qualified' },
  { time: '3m ago', hub: 'India', text: 'Screened Workflow AI at T-Hub: Tech platform verified, US presence checked.', type: 'verified' },
  { time: '6m ago', hub: 'UAE', text: 'Cross-border treasury platform vetted: TVB Market Access fit confirmed.', type: 'qualified' },
  { time: '9m ago', hub: 'Austin', text: 'Austin Bridge readiness review completed for UK fintech cohort.', type: 'bridge' }
];

interface ScoutRadarAnimationProps {
  onSelectHub?: (node: RadarNode) => void;
  onExploreScaleups?: () => void;
  onOpenOutreach?: () => void;
}

export const ScoutRadarAnimation: React.FC<ScoutRadarAnimationProps> = ({
  onSelectHub,
  onExploreScaleups,
  onOpenOutreach
}) => {
  const [selectedNode, setSelectedNode] = useState<RadarNode>(RADAR_NODES[0]);
  const [eventIndex, setEventIndex] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  // Rotate simulated live events
  useEffect(() => {
    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % LIVE_SCOUT_EVENTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const triggerManualPulse = () => {
    setPulseKey((prev) => prev + 1);
  };

  const austinNode = RADAR_NODES[0];
  const satelliteNodes = RADAR_NODES.slice(1);

  return (
    <div className="w-full rounded-2xl bg-white/95 border border-slate-200/90 shadow-lg shadow-slate-200/50 p-4 sm:p-5 flex flex-col relative overflow-hidden backdrop-blur-xl">
      {/* Background ambient lighting accents */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-100/40 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-150 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 font-display tracking-tight">
                Autonomous Scouting Radar
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              6 Global Hubs • Real-time Parameter Monitoring
            </p>
          </div>
        </div>

        {/* Pulse button */}
        <button
          onClick={triggerManualPulse}
          className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Send manual radar pulse sweep"
        >
          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
          <span>Ping Radar</span>
        </button>
      </div>

      {/* Interactive Radar Visualizer Screen */}
      <div className="relative my-3 rounded-xl bg-slate-950 overflow-hidden border border-slate-900 shadow-inner flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Radar concentric distance circles & crosshairs */}
        <svg 
          viewBox="0 0 360 240" 
          className="w-full h-56 sm:h-64 select-none"
        >
          <defs>
            {/* Gradient for rotating radar beam */}
            <linearGradient id="radarSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>

            {/* Glowing filter for nodes */}
            <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Concentric Radar Rings centered near Austin & transatlantic center */}
          <circle cx="180" cy="120" r="110" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="180" cy="120" r="80" fill="none" stroke="#1e293b" strokeWidth="1" />
          <circle cx="180" cy="120" r="50" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="180" cy="120" r="20" fill="none" stroke="#0f766e" strokeWidth="1" strokeOpacity="0.4" />

          {/* Crosshair axis lines */}
          <line x1="180" y1="10" x2="180" y2="230" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="20" y1="120" x2="340" y2="120" stroke="#1e293b" strokeWidth="1" strokeOpacity="0.6" />

          {/* 360-degree Animated Rotating Radar Sweep Beam */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "180px 120px" }}
          >
            <path
              d="M 180 120 L 290 120 A 110 110 0 0 0 258 42 Z"
              fill="url(#radarSweepGradient)"
            />
            <line x1="180" y1="120" x2="290" y2="120" stroke="#34d399" strokeWidth="1.5" strokeOpacity="0.8" />
          </motion.g>

          {/* Manual / Automatic Ripple Burst from Austin Launchpad */}
          <motion.circle
            key={`pulse-${pulseKey}`}
            cx={austinNode.x}
            cy={austinNode.y}
            r="8"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            initial={{ r: 8, opacity: 0.9 }}
            animate={{ r: 90, opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          />

          {/* Transatlantic Corridor Flight Arcs connecting satellite hubs to Austin */}
          {satelliteNodes.map((sat) => {
            // Cubic bezier control point to create an elegant transatlantic curve
            const midX = (sat.x + austinNode.x) / 2;
            const midY = Math.min(sat.y, austinNode.y) - 35;
            const pathD = `M ${sat.x} ${sat.y} Q ${midX} ${midY} ${austinNode.x} ${austinNode.y}`;
            const isHighlighted = selectedNode.id === sat.id;

            return (
              <g key={`corridor-${sat.id}`}>
                {/* Arc Pathway */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isHighlighted ? "#10b981" : "#334155"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? "none" : "3 3"}
                  strokeOpacity={isHighlighted ? 0.9 : 0.4}
                  className="transition-all duration-300"
                />

                {/* Animated Data Packets traveling along the path into Austin */}
                <motion.circle
                  r={isHighlighted ? 3.5 : 2.5}
                  fill={isHighlighted ? "#34d399" : "#38bdf8"}
                  filter="url(#emeraldGlow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{ 
                    duration: isHighlighted ? 2.4 : 3.6, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: sat.x * 0.005 
                  }}
                  style={{
                    offsetPath: `path('${pathD}')`,
                  }}
                />
              </g>
            );
          })}

          {/* Austin Launchpad Node (Central TVB Bridge Node) */}
          <g 
            className="cursor-pointer group"
            onClick={() => {
              setSelectedNode(austinNode);
              if (onSelectHub) onSelectHub(austinNode);
            }}
          >
            {/* Pulsing halo */}
            <circle cx={austinNode.x} cy={austinNode.y} r="12" fill="#10b981" fillOpacity="0.2" className="animate-pulse" />
            {/* Core anchor */}
            <circle cx={austinNode.x} cy={austinNode.y} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" filter="url(#emeraldGlow)" />
            {/* Label */}
            <text 
              x={austinNode.x} 
              y={austinNode.y + 18} 
              fill="#34d399" 
              fontSize="10" 
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              AUSTIN BASE (TX)
            </text>
            <text 
              x={austinNode.x} 
              y={austinNode.y + 28} 
              fill="#94a3b8" 
              fontSize="8" 
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              US Gateway
            </text>
          </g>

          {/* Satellite Global Hub Nodes */}
          {satelliteNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <g 
                key={node.id} 
                className="cursor-pointer group"
                onClick={() => {
                  setSelectedNode(node);
                  if (onSelectHub) onSelectHub(node);
                }}
              >
                {/* Outer focus circle */}
                {isSelected && (
                  <circle 
                    cx={node.x} 
                    cy={node.y} 
                    r="10" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.5" 
                    className="animate-spin"
                    strokeDasharray="3 3" 
                  />
                )}
                {/* Glowing Node Dot */}
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={isSelected ? 5 : 4} 
                  fill={isSelected ? "#10b981" : "#38bdf8"} 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                  filter="url(#emeraldGlow)"
                  className="transition-all duration-200"
                />
                {/* Node Text Label */}
                <text 
                  x={node.x} 
                  y={node.y - 8} 
                  fill={isSelected ? "#ffffff" : "#cbd5e1"} 
                  fontSize="9" 
                  fontFamily="sans-serif"
                  fontWeight={isSelected ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {node.city.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Live Radar Compass Watermark Badge */}
        <div className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 pointer-events-none backdrop-blur-sm">
          <Compass className="w-3 h-3 text-emerald-400" />
          <span>RADAR: EN ROUTE TO AUSTIN</span>
        </div>

        {/* Dynamic target lock tag on selected node */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 pointer-events-none backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Target Corridor: <strong className="text-white">{selectedNode.name}</strong></span>
        </div>
      </div>

      {/* Selected Corridor Card & Telemetry Details */}
      <div className="rounded-xl bg-slate-50 border border-slate-200/90 p-3 text-xs mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {selectedNode.role}
            </span>
            <span className="font-bold text-slate-900">
              {selectedNode.city}, {selectedNode.country}
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold text-emerald-700">
            {selectedNode.scoutCount} Scaleups Scouted
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          <strong className="text-slate-800">Expansion Thesis:</strong> {selectedNode.strategy}
        </p>

        <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Target className="w-3.5 h-3.5 text-emerald-600" />
            <span>Orbit: <strong className="text-slate-800">{selectedNode.orbit}</strong></span>
          </div>
          <div className="font-mono text-slate-600">
            Avg Capital: <strong className="text-slate-900">{selectedNode.dealSize}</strong>
          </div>
        </div>
      </div>

      {/* Interactive Global Hub Selector Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 text-xs no-scrollbar">
        {RADAR_NODES.map((node) => {
          const isActive = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => {
                setSelectedNode(node);
                if (onSelectHub) onSelectHub(node);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-emerald-500'}`} />
              <span>{node.city.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Real-time Event Feed Ticker */}
      <div className="mt-2.5 pt-2.5 border-t border-slate-150 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0 font-semibold">
            {LIVE_SCOUT_EVENTS[eventIndex].time}
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={eventIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-slate-600 truncate"
            >
              {LIVE_SCOUT_EVENTS[eventIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>

        <span className="text-[10px] font-mono text-slate-600 shrink-0 ml-2 hidden sm:inline">
          Rule 1-4 Enforced
        </span>
      </div>
    </div>
  );
};
