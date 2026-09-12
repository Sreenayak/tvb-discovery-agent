import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Search, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { CompanyRecord } from '../types';

interface AuditTargetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuditTarget: (urlOrName: string, notes?: string) => Promise<CompanyRecord | null>;
}

export const AuditTargetModal: React.FC<AuditTargetModalProps> = ({
  isOpen,
  onClose,
  onAuditTarget
}) => {
  const [targetInput, setTargetInput] = useState('');
  const [notes, setNotes] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInput.trim() || isAuditing) return;
    
    setError(null);
    setIsAuditing(true);
    try {
      const result = await onAuditTarget(targetInput.trim(), notes.trim() || undefined);
      if (result) {
        setTargetInput('');
        setNotes('');
        onClose();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to audit company');
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
      >
        
        <button
          onClick={onClose}
          disabled={isAuditing}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Target Profile Company Audit
            </h2>
            <p className="text-xs text-slate-500">
              Evaluate any candidate platform against TVB's 4 parameter rules.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Company Name or Platform URL <span className="text-emerald-600">*</span>
            </label>
            <input
              type="text"
              required
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="e.g. upflow.io or ThreatWorx or https://example.com"
              className="w-full bg-white text-sm text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              disabled={isAuditing}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Context Notes (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. European B2B fintech, estimated $2.5M seed round"
              className="w-full bg-white text-xs text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
              disabled={isAuditing}
            />
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Auditing Workflow:</div>
            <div>• Verifies funding / revenue metric inside $1M–$5M USD</div>
            <div>• Validates tech-platform architecture &amp; TVB Orbit</div>
            <div>• Audits headquarters location for minimal/no US presence</div>
            <div>• Validates CEO/Founder email (unverified strictly left blank)</div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isAuditing}
              className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isAuditing || !targetInput.trim()}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isAuditing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Agent Auditing Target...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Execute Parameter Audit</span>
                </>
              )}
            </button>
          </div>
        </form>

      </motion.div>
    </div>
  );
};
