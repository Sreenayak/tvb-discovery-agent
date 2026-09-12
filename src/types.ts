export type TVBOrbit = 
  | 'AI & Automation'
  | 'Cybersecurity'
  | 'Healthcare'
  | 'Education'
  | 'Digital Twin'
  | 'Travel & Mobility'
  | 'Fintech & Payments'
  | 'Other Tech Platform';

export type TVBHub = 
  | 'UK Hub (London/UK)'
  | 'Paris/France Hub'
  | 'India Hub (Hyderabad/Bangalore)'
  | 'UAE Hub (Dubai/Abu Dhabi)'
  | 'Singapore/SE Asia Hub'
  | 'Continental Europe'
  | 'LATAM Hub';

export type USPresenceLevel = 'Zero' | 'Minimal' | 'Moderate (Flagged)' | 'Heavy (Disqualified)';

export type TVBGrowthEngine = 
  | 'Executive Advisory (Operator-led CXO support)'
  | 'Market Access (US Enterprise Bridge & Austin Base)'
  | 'Scale-Up Marketplace (Costco for scale-ups discount engine)'
  | 'Capital Readiness (Pre-Series A & Metric Auditing)';

export type OutreachStatus = 'New Lead' | 'Brief Generated' | 'Outreach Sent' | 'Meeting Scheduled';

export interface ParameterAudit {
  fundingInRange: boolean; // $1M - $5M USD
  fundingAmountUSD: number;
  fundingDisplay: string;
  fundingType: 'Seed' | 'Pre-Series A' | 'Series A' | 'Bootstrapped Revenue' | 'Grant + Angel';
  
  isTechPlatform: boolean; // Operates proprietary software/tech platform
  techCategory: string;

  minimalUSPresence: boolean; // True if minimal or no US presence
  headquarters: string;
  country: string;
  usPresenceDetail: string;

  executiveVerified: boolean;
  executiveName: string;
  executiveRole: string;
  verifiedEmail: string; // Left blank if unverified
  emailConfidence: 'High' | 'Medium' | 'Unverified (Blank)';
  executiveLinkedIn?: string;

  overallMatch: boolean; // Passes all TVB parameters
  tvbOrbit: TVBOrbit;
  tvbHub: TVBHub;
  tvbStrategicFitReason: string;
  notes?: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  website: string;
  description: string;
  industry: string;
  tvbOrbit: TVBOrbit;
  tvbHub: TVBHub;
  country: string;
  city: string;
  foundedYear?: number;
  
  fundingDisplay: string;
  fundingAmountUSD: number;
  revenueOrFunding: 'Funding' | 'Revenue' | 'Blended';
  
  executiveName: string;
  executiveRole: string;
  verifiedEmail: string; // STRICT: Blank if unverified
  executiveLinkedIn?: string;
  
  usPresence: USPresenceLevel;
  audit: ParameterAudit;
  discoveredAt: string;
  sourceOrigin: string; // Sourced platform/directory/search query
  tags: string[];
  outreachStatus?: OutreachStatus;
}

export interface AgentDiscoveryLog {
  id: string;
  timestamp: string;
  stage: 'source_discovery' | 'extraction' | 'parameter_audit' | 'verification' | 'qualification' | 'complete' | 'error';
  message: string;
  details?: string;
  companyName?: string;
  status: 'info' | 'success' | 'warning' | 'error';
}

export interface DiscoveryStats {
  totalScouted: number;
  totalQualified: number;
  fullyVerifiedEmails: number;
  averageFundingUSD: number;
  orbitBreakdown: Record<string, number>;
  hubBreakdown: Record<string, number>;
  recentRunsCount: number;
}
