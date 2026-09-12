import React, { useState } from 'react';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle, 
  Eye, 
  Trash2, 
  Globe, 
  Building2, 
  Mail, 
  UserCheck, 
  AlertTriangle, 
  ArrowUpDown, 
  Send, 
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { CompanyRecord } from '../types';

interface CompanyTableProps {
  companies: CompanyRecord[];
  onSelectCompany: (company: CompanyRecord) => void;
  onDeleteCompany: (id: string) => void;
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

export const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  onSelectCompany,
  onDeleteCompany,
  onOpenOutreach
}) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  if (companies.length === 0) {
    return (
      <div className="py-20 text-center bg-white border border-slate-200 rounded-2xl my-4 max-w-2xl mx-auto shadow-sm">
        <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-900 font-display">No Candidates Found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Adjust your filters or initiate the Autonomous Scout agent to discover and audit new scale-ups across global hubs.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white border border-slate-200/90 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          
          {/* Table Header */}
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th scope="col" className="py-4 pl-5 pr-3 min-w-[200px]">Candidate / URL</th>
              <th scope="col" className="px-3 py-4 min-w-[220px]">Value Proposition</th>
              <th scope="col" className="px-3 py-4 min-w-[150px]">Orbit &amp; Sector</th>
              <th scope="col" className="px-3 py-4 min-w-[140px]">HQ / TVB Hub</th>
              <th scope="col" className="px-3 py-4 min-w-[130px]">Funding / Bracket</th>
              <th scope="col" className="px-3 py-4 min-w-[170px]">Executive Founder</th>
              <th scope="col" className="px-3 py-4 min-w-[180px]">Direct Email (Sanitized)</th>
              <th scope="col" className="px-3 py-4 min-w-[140px]">Mandate Verification</th>
              <th scope="col" className="py-4 pl-3 pr-5 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {companies.map((company) => {
              const isQualified = company.audit.overallMatch;
              const hasVerifiedEmail = Boolean(company.verifiedEmail && company.verifiedEmail.trim().length > 0);
              const avatarStyle = getMonogramGradient(company.name);

              return (
                <tr 
                  key={company.id}
                  onClick={() => onSelectCompany(company)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  
                  {/* Company Name & Website with Jewel Avatar */}
                  <td className="py-4 pl-5 pr-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${avatarStyle} border flex items-center justify-center font-bold text-xs shrink-0 transition-transform group-hover:scale-105`}>
                        {company.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors truncate tracking-tight text-sm">
                          {company.name}
                        </div>
                        {company.website && (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-emerald-600 transition-colors truncate mt-0.5"
                          >
                            <span>{company.website.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-3 py-4 text-slate-600 leading-relaxed line-clamp-2 max-w-sm">
                    {company.description}
                  </td>

                  {/* Industry & Orbit */}
                  <td className="px-3 py-4">
                    <div className="font-medium text-slate-800 truncate">{company.industry}</div>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-50 text-cyan-800 border border-cyan-200/80">
                      {company.tvbOrbit}
                    </span>
                  </td>

                  {/* Country & Hub */}
                  <td className="px-3 py-4">
                    <div className="text-slate-800 font-medium">{company.country}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{company.tvbHub}</span>
                    </div>
                  </td>

                  {/* Funding/Revenue */}
                  <td className="px-3 py-4">
                    <div className="font-mono font-bold text-emerald-700 text-xs">
                      {company.fundingDisplay}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {company.audit.fundingType || 'Venture Round'}
                    </div>
                  </td>

                  {/* Executive Name & Role */}
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>{company.executiveName || '—'}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 pl-5">
                      {company.executiveRole || 'Executive'}
                    </div>
                  </td>

                  {/* Verified Email - STRICT: blank if unverified! */}
                  <td className="px-3 py-4">
                    {hasVerifiedEmail ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 truncate max-w-[160px]" title={company.verifiedEmail}>
                          {company.verifiedEmail}
                        </span>
                        <button
                          onClick={(e) => handleCopyEmail(company.verifiedEmail, e)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
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
                      <span 
                        className="text-slate-400 italic text-[10px] bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 inline-block"
                        title="Strict TVB Policy: Left blank because executive email is unverified"
                      >
                        [Blank: Unverified]
                      </span>
                    )}
                  </td>

                  {/* Mandate Verification Indicator & 4 Dots */}
                  <td className="px-3 py-4">
                    <div className="space-y-1">
                      {isQualified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          TVB Qualified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Flagged
                        </span>
                      )}
                      {/* 4 Micro-audit Dots */}
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 pl-0.5" title="Rules: $1M-$5M | Tech Platform | Minimal US | Verified Email">
                        <span className={`w-1.5 h-1.5 rounded-full ${company.audit.fundingInRange ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                        <span className={`w-1.5 h-1.5 rounded-full ${company.audit.isPlatform ? 'bg-cyan-500' : 'bg-amber-400'}`} />
                        <span className={`w-1.5 h-1.5 rounded-full ${company.audit.minimalUSPresence ? 'bg-indigo-500' : 'bg-amber-400'}`} />
                        <span className={`w-1.5 h-1.5 rounded-full ${hasVerifiedEmail ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 pl-3 pr-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {onOpenOutreach && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenOutreach(company);
                          }}
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 hover:text-emerald-900 rounded-lg transition-all text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer"
                          title="Generate TVB Catalysis Dossier & Founder Outreach"
                        >
                          <Send className="w-3 h-3 text-emerald-600" />
                          <span className="hidden sm:inline">Catalyze</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCompany(company);
                        }}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="View Full Audit Breakdown"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCompany(company.id);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove Company"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
      
      {/* Table Footer Summary */}
      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          Showing <span className="font-semibold text-slate-800">{companies.length}</span> scaleup records in scout repository
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            {companies.filter(c => c.audit.overallMatch).length} 100% Qualified
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            {companies.filter(c => !c.audit.overallMatch).length} Flagged
          </span>
        </div>
      </div>

    </div>
  );
};
