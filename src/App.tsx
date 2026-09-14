import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { AnimatedHeroHome } from './components/AnimatedHeroHome';
import { HeroParameters } from './components/HeroParameters';
import { DiscoveryAgentControl } from './components/DiscoveryAgentControl';
import { AgentTerminalLogs } from './components/AgentTerminalLogs';
import { CompanyTable } from './components/CompanyTable';
import { CompanyCardView } from './components/CompanyCardView';
import { AuditModal } from './components/AuditModal';
import { AuditTargetModal } from './components/AuditTargetModal';
import { TVBInfoModal } from './components/TVBInfoModal';
import { ProjectReadmeModal } from './components/ProjectReadmeModal';
import { CatalysisOutreachModal } from './components/CatalysisOutreachModal';
import { CompanyRecord, AgentDiscoveryLog, DiscoveryStats, TVBOrbit, TVBHub, OutreachStatus } from './types';
import { 
  LayoutList, 
  LayoutGrid, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  ShieldCheck,
  Check,
  Compass,
  ArrowUp,
  Send,
  Sparkles
} from 'lucide-react';

const ORBITS_FILTER: (TVBOrbit | 'All')[] = [
  'All',
  'AI & Automation',
  'Cybersecurity',
  'Healthcare',
  'Education',
  'Digital Twin',
  'Travel & Mobility',
  'Fintech & Payments'
];

export default function App() {
  const [companies, setCompanies] = useState<CompanyRecord[]>([]);
  const [stats, setStats] = useState<DiscoveryStats | null>(null);
  const [logs, setLogs] = useState<AgentDiscoveryLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDiscovering, setIsDiscovering] = useState<boolean>(false);
  
  // View states
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showLogs, setShowLogs] = useState<boolean>(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrbit, setSelectedOrbit] = useState<string>('All');
  const [selectedHub, setSelectedHub] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  
  // Modals
  const [selectedCompany, setSelectedCompany] = useState<CompanyRecord | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isAuditTargetModalOpen, setIsAuditTargetModalOpen] = useState<boolean>(false);
  const [isTVBInfoModalOpen, setIsTVBInfoModalOpen] = useState<boolean>(false);
  const [isReadmeModalOpen, setIsReadmeModalOpen] = useState<boolean>(false);
  const [isCatalysisModalOpen, setIsCatalysisModalOpen] = useState<boolean>(false);
  const [catalysisTargetCompany, setCatalysisTargetCompany] = useState<CompanyRecord | null>(null);

  // Section Refs
  const consoleRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Status notification toast
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const scrollToConsole = () => {
    consoleRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const fetchJson = async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${url} returned HTTP ${response.status}`);
        }
        return response.json();
      };

      const [compRes, statsRes, logsRes] = await Promise.all([
        fetchJson('/api/companies'),
        fetchJson('/api/stats'),
        fetchJson('/api/logs')
      ]);

      const compData = compRes;
      const statsData = statsRes;
      const logsData = logsRes;

      if (compData.success) setCompanies(compData.companies);
      if (statsData.success) setStats(statsData.stats);
      if (logsData.success) setLogs(logsData.logs);
    } catch (err: any) {
      console.error('Failed to load companies:', err);
      showNotification(err.message || 'Failed to fetch companies from backend service.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Run autonomous discovery
  const handleRunDiscovery = async (options: { hub?: string; orbit?: string; customQuery?: string } = {}) => {
    try {
      setIsDiscovering(true);
      setShowLogs(true);
      scrollToConsole();
      showNotification('Autonomous agent dispatched. Scouting venture ecosystems...', 'info');

      const response = await fetch('/api/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });

      const data = await response.json();
      if (data.success) {
        showNotification(`Discovery completed: Evaluated and added ${data.scoutedCount} platforms.`, 'success');
        fetchData();
      } else {
        showNotification(data.error || 'Discovery error occurred.', 'error');
      }
    } catch (err: any) {
      showNotification(err.message || 'Discovery network error', 'error');
    } finally {
      setIsDiscovering(false);
    }
  };

  // Audit a single target URL or company name
  const handleAuditTarget = async (urlOrName: string, notes?: string): Promise<CompanyRecord | null> => {
    try {
      showNotification(`Auditing ${urlOrName} against TVB criteria...`, 'info');
      const response = await fetch('/api/audit-target', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urlOrName, notes })
      });
      const data = await response.json();
      if (data.success) {
        showNotification(`Audit complete for ${data.company.name}.`, 'success');
        fetchData();
        setSelectedCompany(data.company);
        setIsAuditModalOpen(true);
        return data.company;
      } else {
        throw new Error(data.error || 'Failed to audit company');
      }
    } catch (err: any) {
      showNotification(err.message || 'Audit error', 'error');
      return null;
    }
  };

  // Delete company
  const handleDeleteCompany = async (id: string) => {
    try {
      const response = await fetch(`/api/companies/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        setCompanies(prev => prev.filter(c => c.id !== id));
        showNotification('Company removed from scout list.', 'info');
        fetch('/api/stats').then(res => res.json()).then(d => {
          if (d.success) setStats(d.stats);
        });
      }
    } catch (err: any) {
      showNotification('Failed to remove company.', 'error');
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    window.location.href = '/api/export/csv';
    showNotification('Downloading clean CSV export of scouted companies...', 'success');
  };

  // Export JSON
  const handleExportJson = () => {
    window.location.href = '/api/export/json';
    showNotification('Downloading JSON export...', 'success');
  };

  // TVB Catalysis Outreach Engine handlers
  const handleOpenCatalysisForCompany = (comp?: CompanyRecord) => {
    if (comp) {
      setCatalysisTargetCompany(comp);
    } else if (companies.length > 0) {
      const preferred = companies.find(c => c.audit.overallMatch) || companies[0];
      setCatalysisTargetCompany(preferred);
    }
    setIsCatalysisModalOpen(true);
  };

  const handleUpdateOutreachStatus = (companyId: string, status: OutreachStatus) => {
    setCompanies(prev => prev.map(c => {
      if (c.id === companyId) {
        return { ...c, outreachStatus: status };
      }
      return c;
    }));
    showNotification(`Updated engagement status to "${status}"`, 'success');
  };

  // Filtered companies
  const filteredCompanies = companies.filter(c => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.executiveName.toLowerCase().includes(q) ||
        c.verifiedEmail.toLowerCase().includes(q)
      );
      if (!match) return false;
    }

    // Orbit filter
    if (selectedOrbit !== 'All' && c.tvbOrbit !== selectedOrbit) {
      return false;
    }

    // Hub filter
    if (selectedHub !== 'All' && !c.tvbHub.includes(selectedHub)) {
      return false;
    }

    // Verified only filter
    if (verifiedOnly && (!c.audit.overallMatch || !c.verifiedEmail)) {
      return false;
    }

    return true;
  });

  const qualifiedCount = companies.filter(c => c.audit.overallMatch).length;

  return (
    <div ref={topRef} className="min-h-screen bg-slate-50/80 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl border shadow-lg text-xs font-medium flex items-center gap-2 transition-all transform translate-y-0 ${
          notification.type === 'success' 
            ? 'bg-white text-emerald-800 border-emerald-300' 
            : notification.type === 'error'
            ? 'bg-white text-rose-800 border-rose-300'
            : 'bg-white text-slate-800 border-slate-300'
        }`}>
          {notification.type === 'success' ? <Check className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        onOpenTVBInfo={() => setIsTVBInfoModalOpen(true)}
        onOpenReadme={() => setIsReadmeModalOpen(true)}
        onOpenAuditTarget={() => setIsAuditTargetModalOpen(true)}
        onOpenCatalysisOutreach={() => handleOpenCatalysisForCompany()}
        onTriggerDiscovery={() => handleRunDiscovery({})}
        onScrollToHome={scrollToTop}
        onScrollToConsole={scrollToConsole}
        isDiscovering={isDiscovering}
        onExportCsv={handleExportCsv}
        showLogs={showLogs}
        onToggleLogs={() => setShowLogs(!showLogs)}
        qualifiedCount={qualifiedCount}
        totalCount={companies.length}
      />

      {/* 1. ANIMATED HOMEPAGE HERO WITH BACKGROUND KEN BURNS ZOOM */}
      <AnimatedHeroHome
        onScrollToConsole={scrollToConsole}
        onOpenAuditTarget={() => setIsAuditTargetModalOpen(true)}
        onOpenTVBInfo={() => setIsTVBInfoModalOpen(true)}
        onOpenCatalysisOutreach={() => handleOpenCatalysisForCompany()}
        onRunDiscovery={() => handleRunDiscovery({})}
        isDiscovering={isDiscovering}
        stats={stats}
      />

      {/* 2. STRICT CRITERIA & SCOUTING WORKSPACE CONSOLE */}
      <div ref={consoleRef} id="console-section" className="scroll-mt-16">
        
        {/* Hero Parameter Framework Banner */}
        <HeroParameters
          stats={stats}
          onSelectFilterVerifiedOnly={() => setVerifiedOnly(!verifiedOnly)}
          verifiedOnlyActive={verifiedOnly}
          onOpenTVBInfo={() => setIsTVBInfoModalOpen(true)}
        />

        {/* Autonomous Discovery Agent Control Bar */}
        <DiscoveryAgentControl
          onRunDiscovery={handleRunDiscovery}
          isDiscovering={isDiscovering}
          showLogs={showLogs}
          onToggleLogs={() => setShowLogs(!showLogs)}
        />

        {/* Live Agent Terminal / Logs */}
        {showLogs && (
          <AgentTerminalLogs
            logs={logs}
            onClose={() => setShowLogs(false)}
          />
        )}

        {/* Main Content Workspace */}
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Section Heading with TVB Brand */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  Scouted Scale-Up Directory
                </h2>
                <span className="px-2 py-0.5 text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md font-semibold">
                  {filteredCompanies.length} Active Records
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated against the 4 TVB parameters. Unverified fields are strictly left blank per mandate.
              </p>
            </div>

            {/* Quick action badges */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => handleOpenCatalysisForCompany()}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 font-semibold shadow-xs"
                title="Launch TVB Executive Catalysis & Outreach Pitch Engine"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-100" />
                <span>Catalysis Outreach Engine</span>
              </button>
            </div>
          </div>

          {/* Filter and View Mode Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
            
            {/* Left: Search, Hub and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              
              {/* Search Input */}
              <div className="relative min-w-[240px] max-w-md">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, tech, founder, or country..."
                  className="w-full bg-white text-xs text-slate-800 pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none shadow-2xs"
                />
              </div>

              {/* Hub Selector */}
              <select
                value={selectedHub}
                onChange={(e) => setSelectedHub(e.target.value)}
                className="bg-white text-xs text-slate-700 px-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="All">All Regional Hubs</option>
                <option value="UK">UK Hub</option>
                <option value="Paris">Paris/France Hub</option>
                <option value="India">India Hub</option>
                <option value="UAE">UAE Hub</option>
                <option value="Singapore">Singapore Hub</option>
                <option value="Continental Europe">Continental Europe</option>
              </select>

              {/* Verified Only Toggle Pill */}
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs ${
                  verifiedOnly
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Qualified Only</span>
              </button>
            </div>

            {/* Right: Export & Table/Grid View Switcher */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              
              {/* Export options */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
                <button
                  onClick={handleExportCsv}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 font-medium"
                  title="Download Clean CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={handleExportJson}
                  className="px-2.5 py-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 font-medium"
                  title="Download JSON"
                >
                  <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span>JSON</span>
                </button>
              </div>

              {/* Table / Grid Switcher */}
              <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'table' ? 'bg-slate-100 text-emerald-700 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Clean Table List View"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'cards' ? 'bg-slate-100 text-emerald-700 shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Grid Cards View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Orbit Filter Quick Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 text-xs scrollbar-none">
            <span className="text-[11px] uppercase font-mono text-slate-500 mr-1 shrink-0">TVB Orbits:</span>
            {ORBITS_FILTER.map((orbit) => (
              <button
                key={orbit}
                onClick={() => setSelectedOrbit(orbit)}
                className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs ${
                  selectedOrbit === orbit
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {orbit}
              </button>
            ))}
          </div>

          {/* Output Section Status Header */}
          <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
            <div>
              Showing <strong className="text-slate-900">{filteredCompanies.length}</strong> companies
              {selectedOrbit !== 'All' && <span> in <strong className="text-cyan-700">{selectedOrbit}</strong></span>}
              {verifiedOnly && <span className="text-emerald-700"> (Qualified &amp; Verified Emails Only)</span>}
            </div>
            
            <button
              onClick={fetchData}
              className="p-1 hover:text-slate-800 rounded transition-colors flex items-center gap-1 text-[11px]"
              title="Refresh repository"
            >
              <RefreshCw className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>

          {/* Primary Output List View (Clean List with Name, Description, Sector, Verified Email) */}
          {loading ? (
            <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center">
              <RefreshCw className="w-6 h-6 animate-spin text-emerald-600 mb-2" />
              <span className="text-xs">Loading target companies repository...</span>
            </div>
          ) : viewMode === 'table' ? (
            <CompanyTable
              companies={filteredCompanies}
              onSelectCompany={(comp) => {
                setSelectedCompany(comp);
                setIsAuditModalOpen(true);
              }}
              onDeleteCompany={handleDeleteCompany}
              onOpenOutreach={(comp) => handleOpenCatalysisForCompany(comp)}
            />
          ) : (
            <CompanyCardView
              companies={filteredCompanies}
              onSelectCompany={(comp) => {
                setSelectedCompany(comp);
                setIsAuditModalOpen(true);
              }}
              onOpenOutreach={(comp) => handleOpenCatalysisForCompany(comp)}
            />
          )}

        </main>
      </div>

      {/* Back to top floating pill */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-md backdrop-blur-md transition-all flex items-center gap-1.5 text-xs group"
          title="Back to Top"
        >
          <ArrowUp className="w-3.5 h-3.5 text-emerald-600 group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline font-medium">Top</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-xs font-mono">
              TVB
            </div>
            <span>The Venture Build Autonomous Scouting Engine • Operator-Led Venture Catalyst</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="https://theventurebuild.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-emerald-600 transition-colors"
            >
              theventurebuild.com
            </a>
            <span>•</span>
            <a 
              href="https://linkedin.com/company/90924902/" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-cyan-700 transition-colors"
            >
              TVB LinkedIn
            </a>
            <span>•</span>
            <button 
              onClick={() => handleOpenCatalysisForCompany()}
              className="hover:text-emerald-700 text-emerald-800 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Catalysis Engine</span>
            </button>
            <span>•</span>
            <button 
              onClick={() => setIsReadmeModalOpen(true)}
              className="hover:text-indigo-600 transition-colors"
            >
              README
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuditModal
        company={selectedCompany}
        onClose={() => {
          setIsAuditModalOpen(false);
          setSelectedCompany(null);
        }}
      />

      <AuditTargetModal
        isOpen={isAuditTargetModalOpen}
        onClose={() => setIsAuditTargetModalOpen(false)}
        onAuditTarget={handleAuditTarget}
      />

      <TVBInfoModal
        isOpen={isTVBInfoModalOpen}
        onClose={() => setIsTVBInfoModalOpen(false)}
      />

      <ProjectReadmeModal
        isOpen={isReadmeModalOpen}
        onClose={() => setIsReadmeModalOpen(false)}
      />

      <CatalysisOutreachModal
        isOpen={isCatalysisModalOpen}
        onClose={() => setIsCatalysisModalOpen(false)}
        company={catalysisTargetCompany || (companies.length > 0 ? companies[0] : null)}
        allCompanies={companies}
        onSelectCompany={(comp) => setCatalysisTargetCompany(comp)}
        onUpdateStatus={handleUpdateOutreachStatus}
      />

    </div>
  );
}
