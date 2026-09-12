import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertTriangle, 
  Eye, 
  Building2, 
  Globe2, 
  TrendingUp, 
  Mail, 
  UserCheck,
  Send,
  Sparkles,
  Layers
} from 'lucide-react';
import { CompanyRecord } from '../types';

interface CompanyCardViewProps {
  companies: CompanyRecord[];
  onSelectCompany: (company: CompanyRecord) => void;
  onOpenOutreach?: (company: CompanyRecord) => void;
}

const getMonogramGradient = (name: string) => {
  const gradients = [
    'from-emerald-100 to-teal-50 text-emerald-800 border-emerald-200 shadow-2xs',
    'from-cyan-100 to-blue-50 text-cyan-800 border-cyan-200 shadow-2xs',
    'from-indigo-100 to-purple-50 text-indigo-800 border-indigo-200 shadow-2xs',
    'from-amber-100 to-yellow-50 text-amber-800 border-amber-200 shadow-2xs',
    'from-rose-100 to-pink-50 text-rose-800 border-rose-200 shadow-2xs',
    'from-teal-100 to-emerald-50 text-teal-800 border-teal-200 shadow-2xs',
  ];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return gradients[sum % gradients.length];
};

export const CompanyCardView: React.FC<CompanyCardViewProps> = ({
  companies,
  onSelectCompany,
  onOpenOutreach
}) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((company) => {
        const isQualified = company.audit.overallMatch;
        const hasEmail = Boolean(company.verifiedEmail && company.verifiedEmail.trim().length > 0);
        const avatarStyle = getMonogramGradient(company.name);

        return (
          <div
            key={company.id}
            onClick={() => onSelectCompany(company)}
            className="bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden shadow-2xs"
          >
            <div>
              {/* Top Row: Name, Orbit & Status */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${avatarStyle} border flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform`}>
                    {company.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm tracking-tight truncate">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Globe2 className="w-3 h-3 text-slate-400" />
                      <span>{company.country}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-500">{company.tvbHub.split(' ')[0]} Hub</span>
                    </div>
                  </div>
                </div>

                {isQualified ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    Qualified
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                    Flagged
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3.5">
                {company.description}
              </p>

              {/* Badges: Orbit, Funding & Architecture */}
              <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80 rounded-full">
                  {company.tvbOrbit}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                  {company.fundingDisplay}
                </span>
                <span className="px-2.5 py-0.5 text-[10px] text-slate-500 bg-slate-100 rounded-full border border-slate-200/80">
                  {company.industry}
                </span>
              </div>

              {/* Mandate 4-Point Health Micro-Strip */}
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 mb-3 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">Audit Matrix:</span>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className={`inline-flex items-center gap-0.5 ${company.audit.fundingInRange ? 'text-emerald-700 font-medium' : 'text-amber-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${company.audit.fundingInRange ? 'bg-emerald-500' : 'bg-amber-400'}`} /> $1-5M
                  </span>
                  <span className={`inline-flex items-center gap-0.5 ${company.audit.isPlatform ? 'text-cyan-700 font-medium' : 'text-amber-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${company.audit.isPlatform ? 'bg-cyan-500' : 'bg-amber-400'}`} /> Platform
                  </span>
                  <span className={`inline-flex items-center gap-0.5 ${company.audit.minimalUSPresence ? 'text-indigo-700 font-medium' : 'text-amber-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${company.audit.minimalUSPresence ? 'bg-indigo-500' : 'bg-amber-400'}`} /> 0-US
                  </span>
                  <span className={`inline-flex items-center gap-0.5 ${hasEmail ? 'text-emerald-700 font-medium' : 'text-slate-400'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${hasEmail ? 'bg-emerald-500' : 'bg-slate-300'}`} /> Email
                  </span>
                </div>
              </div>

              {/* Executive Details Box */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-3 text-xs">
                <div className="flex items-center justify-between text-slate-700 mb-1.5">
                  <span className="text-[11px] text-slate-500">Executive:</span>
                  <span className="font-semibold text-slate-900">{company.executiveName || '—'}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Direct Email:</span>
                  {hasEmail ? (
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 truncate max-w-[140px]">
                        {company.verifiedEmail}
                      </span>
                      <button
                        onClick={(e) => handleCopyEmail(company.verifiedEmail, e)}
                        className="p-1 hover:text-slate-800 text-slate-400 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                        title="Copy Email"
                      >
                        {copiedEmail === company.verifiedEmail ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic text-[10px]">
                      [Strictly Blank: Unverified]
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-700 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>URL</span>
                  </a>
                )}
                {onOpenOutreach && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenOutreach(company);
                    }}
                    className="inline-flex items-center gap-1 text-emerald-800 hover:text-emerald-900 font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all text-[11px] shadow-2xs cursor-pointer"
                    title="Generate TVB Catalysis Dossier & Executive Outreach"
                  >
                    <Send className="w-3 h-3 text-emerald-600" />
                    <span>Catalyze</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => onSelectCompany(company)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-emerald-700 font-medium transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Audit Dossier</span>
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
};
