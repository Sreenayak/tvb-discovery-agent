import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Mail, 
  Globe2, 
  TrendingUp, 
  Building2, 
  UserCheck, 
  Layers,
  Sparkles,
  Compass
} from 'lucide-react';
import { CompanyRecord } from '../types';

interface AuditModalProps {
  company: CompanyRecord | null;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ company, onClose }) => {
  if (!company) return null;

  const { audit } = company;
  const isOverallQualified = audit.overallMatch;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6 pr-8 relative z-10">
          <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-200 shadow-2xs flex items-center justify-center font-bold text-emerald-800 text-lg shrink-0">
            {company.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                {company.name}
              </h2>
              {isOverallQualified ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  TVB Qualified
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Flagged (Criteria Gaps)
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1.5 flex-wrap">
              <span>{company.industry}</span>
              <span className="text-slate-300">•</span>
              <span>{company.country} ({company.tvbHub})</span>
              {company.website && (
                <>
                  <span className="text-slate-300">•</span>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-medium transition-colors inline-flex items-center gap-0.5"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-700 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
          {company.description}
        </p>

        {/* 4 Strict Parameter Audit Cards */}
        <div className="mb-6">
          <h3 className="text-xs uppercase font-mono tracking-wider text-slate-600 font-bold mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            TVB Target Profile Parameter Scorecard
          </h3>

          <div className="space-y-3">
            
            {/* 1. Funding / Revenue Rule */}
            <div className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
              audit.fundingInRange 
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                : 'bg-rose-50/50 border-rose-200 text-slate-800'
            }`}>
              <div className="flex items-start gap-2.5">
                {audit.fundingInRange ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-xs text-slate-900">
                    Rule 1: Revenue or Funding ($1M – $5M USD)
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    Amount: <span className="font-mono font-bold text-emerald-800">{company.fundingDisplay}</span> ({audit.fundingType})
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {audit.fundingInRange 
                      ? 'Within TVB target bracket of 1 million to 5 million USD.' 
                      : 'Outside TVB mandated 1M - 5M range.'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                audit.fundingInRange ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {audit.fundingInRange ? 'PASS' : 'FAIL'}
              </span>
            </div>

            {/* 2. Tech Platform Rule */}
            <div className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
              audit.isTechPlatform 
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                : 'bg-rose-50/50 border-rose-200 text-slate-800'
            }`}>
              <div className="flex items-start gap-2.5">
                {audit.isTechPlatform ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-xs text-slate-900">
                    Rule 2: Operates Tech-Related Platform
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    Category: <span className="text-cyan-800 font-semibold">{audit.techCategory}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Verified proprietary software, SaaS, AI engine, or digital infrastructure.
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                audit.isTechPlatform ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {audit.isTechPlatform ? 'PASS' : 'FAIL'}
              </span>
            </div>

            {/* 3. Non-US Footprint Rule */}
            <div className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
              audit.minimalUSPresence 
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                : 'bg-rose-50/50 border-rose-200 text-slate-800'
            }`}>
              <div className="flex items-start gap-2.5">
                {audit.minimalUSPresence ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-xs text-slate-900">
                    Rule 3: Minimal to No US Presence
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    Headquarters: <span className="text-indigo-800 font-semibold">{audit.headquarters}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {audit.usPresenceDetail}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                audit.minimalUSPresence ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {audit.minimalUSPresence ? 'PASS' : 'FAIL'}
              </span>
            </div>

            {/* 4. Executive Contact & Verified Email Rule */}
            <div className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
              (audit.executiveVerified && company.verifiedEmail) 
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                : 'bg-amber-50/50 border-amber-200 text-slate-800'
            }`}>
              <div className="flex items-start gap-2.5">
                {(audit.executiveVerified && company.verifiedEmail) ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-xs text-slate-900">
                    Rule 4: CEO / Co-Founder Name &amp; Verified Email
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    Executive: <span className="text-slate-900 font-semibold">{company.executiveName || '—'}</span> ({company.executiveRole})
                  </div>
                  <div className="text-xs mt-1">
                    Direct Email:{' '}
                    {company.verifiedEmail ? (
                      <span className="font-mono text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{company.verifiedEmail}</span>
                    ) : (
                      <span className="text-amber-700 italic">
                        [Blank: Unverified per TVB instruction "leave field blank and not put generic information"]
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                (audit.executiveVerified && company.verifiedEmail) ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {(audit.executiveVerified && company.verifiedEmail) ? 'PASS' : 'UNVERIFIED'}
              </span>
            </div>

          </div>
        </div>

        {/* TVB Strategic Fit Thesis */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-800 uppercase tracking-wider font-mono mb-2">
            <Compass className="w-3.5 h-3.5 text-cyan-600" />
            TVB Venture Catalyst Strategic Thesis
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {audit.tvbStrategicFitReason}
          </p>
          <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <span>Aligned Orbit: <strong className="text-slate-800">{company.tvbOrbit}</strong></span>
            <span>Target Hub: <strong className="text-slate-800">{company.tvbHub}</strong></span>
          </div>
        </div>

        {/* Discovered Origin */}
        <div className="text-[11px] text-slate-500 flex items-center justify-between">
          <span>Source: {company.sourceOrigin}</span>
          <span>Scouted: {new Date(company.discoveredAt).toLocaleDateString()}</span>
        </div>

      </motion.div>
    </div>
  );
};
