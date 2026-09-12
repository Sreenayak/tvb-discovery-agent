import React, { useRef, useEffect } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  XCircle, 
  ShieldCheck, 
  Maximize2,
  Trash2
} from 'lucide-react';
import { AgentDiscoveryLog } from '../types';

interface AgentTerminalLogsProps {
  logs: AgentDiscoveryLog[];
  onClearLogs?: () => void;
  onClose: () => void;
}

export const AgentTerminalLogs: React.FC<AgentTerminalLogsProps> = ({
  logs,
  onClearLogs,
  onClose
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);

  const getStageBadge = (stage: AgentDiscoveryLog['stage']) => {
    switch (stage) {
      case 'source_discovery':
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-purple-50 text-purple-700 border border-purple-200 rounded font-semibold">SOURCE</span>;
      case 'extraction':
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 rounded font-semibold">EXTRACT</span>;
      case 'parameter_audit':
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-amber-50 text-amber-800 border border-amber-200 rounded font-semibold">AUDIT</span>;
      case 'verification':
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-cyan-50 text-cyan-800 border border-cyan-200 rounded font-semibold">VERIFY</span>;
      case 'qualification':
      case 'complete':
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold">QUALIFIED</span>;
      case 'error':
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-rose-50 text-rose-700 border border-rose-200 rounded font-semibold">ERROR</span>;
      default:
        return <span className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-600 rounded">LOG</span>;
    }
  };

  const getStatusIcon = (status: AgentDiscoveryLog['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />;
      case 'error':
        return <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white rounded border border-slate-200 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              <span className="font-mono text-emerald-700 font-semibold">AGENT_ORCHESTRATOR_TRACE</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">
              Autonomous multi-point parameter auditing &amp; source discovery stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onClearLogs && (
              <button 
                onClick={onClearLogs}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded cursor-pointer transition-colors"
                title="Clear Logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2 py-0.5 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded border border-slate-200 shadow-2xs cursor-pointer transition-colors"
            >
              Hide Terminal
            </button>
          </div>
        </div>

        {/* Logs Scroll Window */}
        <div 
          ref={scrollRef}
          className="mt-2.5 max-h-56 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-2 pr-2"
        >
          {logs.length === 0 ? (
            <div className="py-6 text-center text-slate-400 italic">
              No recent logs. Click "Run Autonomous Scout" to initiate an autonomous scouting run.
            </div>
          ) : (
            logs.map((log) => (
              <div 
                key={log.id} 
                className="p-2 rounded-lg bg-white border border-slate-200/80 hover:border-slate-300 transition-colors flex items-start gap-2.5 shadow-2xs"
              >
                {getStatusIcon(log.status)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-400 text-[10px]">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    {getStageBadge(log.stage)}
                    {log.companyName && (
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-800 rounded font-semibold text-[10px] border border-slate-200/60">
                        {log.companyName}
                      </span>
                    )}
                  </div>
                  
                  <p className="mt-1 text-slate-800 break-words font-sans text-xs">
                    {log.message}
                  </p>
                  
                  {log.details && (
                    <p className="mt-0.5 text-slate-500 text-[11px] break-words">
                      ↳ {log.details}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
