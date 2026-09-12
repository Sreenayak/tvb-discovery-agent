import express from 'express';
import dotenv from 'dotenv';
import {
  getCompanies,
  runAutonomousDiscovery,
  auditSingleTarget,
  getLogs,
  getStats,
  deleteCompany,
  generateCsvExport,
  getCompanyById
} from './agent';

dotenv.config();

export const app = express();

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'TVB Autonomous Discovery Agent',
    timestamp: new Date().toISOString(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Companies List
app.get('/api/companies', (req, res) => {
  try {
    const { orbit, hub, search, verifiedOnly } = req.query;
    const companies = getCompanies({
      orbit: orbit as string,
      hub: hub as string,
      search: search as string,
      verifiedOnly: verifiedOnly === 'true'
    });
    res.json({ success: true, count: companies.length, companies });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Single Company
app.get('/api/companies/:id', (req, res) => {
  const company = getCompanyById(req.params.id);
  if (!company) {
    return res.status(404).json({ success: false, error: 'Company not found' });
  }
  res.json({ success: true, company });
});

// Delete Company
app.delete('/api/companies/:id', (req, res) => {
  const deleted = deleteCompany(req.params.id);
  res.json({ success: deleted });
});

// Autonomous Discovery Trigger
app.post('/api/discover', async (req, res) => {
  try {
    const { hub, orbit, customQuery } = req.body || {};
    const result = await runAutonomousDiscovery({ hub, orbit, customQuery });
    res.json({ success: true, ...result });
  } catch (error: any) {
    console.error('Discovery agent error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Audit Target URL or Name
app.post('/api/audit-target', async (req, res) => {
  try {
    const { urlOrName, notes } = req.body;
    if (!urlOrName) {
      return res.status(400).json({ success: false, error: 'urlOrName is required' });
    }
    const audited = await auditSingleTarget({ urlOrName, notes });
    res.json({ success: true, company: audited });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Stats
app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json({ success: true, stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Logs
app.get('/api/logs', (req, res) => {
  try {
    const logs = getLogs();
    res.json({ success: true, logs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export CSV
app.get('/api/export/csv', (req, res) => {
  try {
    const csv = generateCsvExport();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="tvb-scouted-companies.csv"');
    res.send(csv);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export JSON
app.get('/api/export/json', (req, res) => {
  try {
    const companies = getCompanies();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="tvb-scouted-companies.json"');
    res.send(JSON.stringify(companies, null, 2));
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// TVB Reference Profile
app.get('/api/tvb-profile', (req, res) => {
  res.json({
    name: 'The Venture Build (TVB)',
    tagline: 'The future of scaling is not advising. It is execution.',
    website: 'https://theventurebuild.com',
    linkedIn: 'https://linkedin.com/company/90924902/',
    targetProfile: {
      fundingOrRevenue: '$1,000,000 to $5,000,000 USD',
      platformType: 'Tech-related proprietary software platform (B2B SaaS, AI, etc.)',
      geography: 'Minimal to zero presence in the US (UK, Paris, India, UAE, etc.)',
      executiveRequirement: 'CEO or Co-Founder name and verified direct email',
      validationPolicy: 'Leave unverified/untrue fields strictly blank with no generic placeholders'
    },
    orbits: [
      'Healthcare',
      'Education',
      'AI',
      'Cybersecurity',
      'Digital Twin',
      'Travel',
      'Fintech And Payments'
    ],
    hubs: [
      'Austin / Texas Hub (Home base & US Bridge)',
      'UK Hub (London)',
      'Paris / France Hub',
      'India Hub (T-Hub / Bangalore)',
      'UAE Hub (Dubai / Abu Dhabi)',
      'Singapore / Emerging'
    ],
    growthEngines: [
      'Executive Advisory (Operator-led CXO support)',
      'Market Access (Enterprise customers, channel partners)',
      'Scale-Up Marketplace ("Costco for scale-ups")',
      'Funding Advisory & Capital Readiness'
    ]
  });
});

export default app;
