export interface Theory {
  name: string;
  author: string;
  year: number;
  description: string;
}

export interface Variable {
  name: string;
  proxy: string;
  description: string;
}

export interface Author {
  name: string;
  institution: string;
  hIndex: number;
  specialty: string;
  country: string;
}

export interface Paper {
  title: string;
  authors: string;
  year: number;
  citations: number;
  journal: string;
}

export interface Methodology {
  name: string;
  fullName: string;
  useCase: string;
}

export interface Contradiction {
  finding1: string;
  finding2: string;
  explanation: string;
  context1: string;
  context2: string;
}

export interface Gap {
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  opportunityScore: number;
}

export interface TimelineEntry {
  year: string;
  development: string;
  paradigm: string;
}

export interface ResearchReport {
  topic: string;
  subtitle: string;
  paperCount: number;
  theories: Theory[];
  variables: Variable[];
  authors: Author[];
  papers: Paper[];
  methodologies: Methodology[];
  contradictions: Contradiction[];
  gaps: Gap[];
  timeline: TimelineEntry[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'theory' | 'variable' | 'author' | 'method' | 'finding';
  description: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

const financialStabilityReport: ResearchReport = {
  topic: 'Financial Stability',
  subtitle: 'Banking sector resilience, systemic risk, and prudential regulation',
  paperCount: 3847,
  theories: [
    {
      name: 'Financial Instability Hypothesis',
      author: 'Hyman Minsky',
      year: 1977,
      description: 'Argues that stability itself breeds instability — prolonged prosperity encourages risk-taking and debt accumulation, planting the seeds of future crises.',
    },
    {
      name: 'Basel Accords Capital Framework',
      author: 'Basel Committee on Banking Supervision',
      year: 1988,
      description: 'Risk-weighted capital adequacy requirements ensuring banks maintain sufficient buffers to absorb losses and protect depositors.',
    },
    {
      name: 'Too-Big-To-Fail Theory',
      author: 'Stern & Feldman',
      year: 2004,
      description: 'Systemically important institutions receive implicit government guarantees, distorting incentives and concentrating risk in the financial system.',
    },
    {
      name: 'Financial Accelerator Theory',
      author: 'Bernanke, Gertler & Gilchrist',
      year: 1996,
      description: 'Credit market frictions amplify and propagate shocks through the economy via balance sheet mechanisms and collateral constraints.',
    },
    {
      name: 'Market Discipline Hypothesis',
      author: 'Calomiris & Kahn',
      year: 1991,
      description: 'Uninsured creditors impose discipline on bank risk-taking when information is transparent and closure threats are credible.',
    },
  ],
  variables: [
    { name: 'Z-Score', proxy: '(ROA + CAR) / σ(ROA)', description: 'Distance to default; higher values indicate greater stability' },
    { name: 'Non-Performing Loan Ratio', proxy: 'NPL / Total Loans', description: 'Asset quality indicator; rising NPLs signal deteriorating credit risk' },
    { name: 'Capital Adequacy Ratio', proxy: 'Tier 1 Capital / RWA', description: 'Regulatory buffer against unexpected losses; Basel minimum is 8%' },
    { name: 'Net Interest Margin', proxy: 'Net Interest Income / Earning Assets', description: 'Profitability proxy; low NIM compresses ability to absorb shocks' },
    { name: 'Loan-to-Deposit Ratio', proxy: 'Total Loans / Total Deposits', description: 'Liquidity measure; high LDR signals reliance on wholesale funding' },
    { name: 'Return on Assets', proxy: 'Net Income / Total Assets', description: 'Profitability and operational efficiency indicator' },
  ],
  authors: [
    { name: 'Franklin Allen', institution: 'Imperial College London', hIndex: 71, specialty: 'Systemic Risk & Financial Crises', country: 'UK' },
    { name: 'Thorsten Beck', institution: 'European University Institute', hIndex: 64, specialty: 'Bank Regulation & Development Finance', country: 'Germany' },
    { name: 'Stijn Claessens', institution: 'IMF Research Department', hIndex: 58, specialty: 'Banking Sector Fragility', country: 'Netherlands' },
    { name: 'Luc Laeven', institution: 'European Central Bank', hIndex: 55, specialty: 'Bank Governance & Crises', country: 'Belgium' },
    { name: 'Asli Demirguc-Kunt', institution: 'World Bank Group', hIndex: 67, specialty: 'Financial Development & Stability', country: 'Turkey' },
  ],
  papers: [
    { title: 'Bank Competition and Financial Stability', authors: 'Beck, Demirguc-Kunt & Levine', year: 2006, citations: 2841, journal: 'Journal of Financial Services Research' },
    { title: 'Deposit Insurance around the World', authors: 'Demirguc-Kunt, Kane & Laeven', year: 2008, citations: 1937, journal: 'Journal of Financial Intermediation' },
    { title: 'The Real Effects of Financial Sector Interventions during Crises', authors: 'Laeven & Valencia', year: 2013, citations: 2104, journal: 'Journal of Money, Credit and Banking' },
    { title: 'Capital Regulation in a Macroeconomic Model with Three Layers of Default', authors: 'Clerc et al.', year: 2015, citations: 893, journal: 'International Journal of Central Banking' },
    { title: 'Too Much Finance?', authors: 'Arcand, Berkes & Panizza', year: 2015, citations: 1621, journal: 'Journal of Economic Growth' },
  ],
  methodologies: [
    { name: 'System GMM', fullName: 'System Generalized Method of Moments', useCase: 'Dynamic panel estimation controlling for endogeneity and unobserved heterogeneity' },
    { name: 'Fixed Effects', fullName: 'Within-Group Fixed Effects Estimator', useCase: 'Controlling for time-invariant bank-level characteristics in panel data' },
    { name: 'Panel ARDL', fullName: 'Panel Autoregressive Distributed Lag', useCase: 'Long-run and short-run relationships between stability indicators and macroeconomic variables' },
    { name: 'DiD', fullName: 'Difference-in-Differences', useCase: 'Evaluating causal effects of regulatory changes or policy interventions' },
  ],
  contradictions: [
    {
      finding1: 'Bank competition enhances stability by reducing franchise value concentration',
      finding2: 'Bank competition increases fragility through excessive risk-taking',
      context1: 'US & EU banking markets (Boyd & De Nicolo, 2005)',
      context2: 'Emerging market economies (Jiménez et al., 2013)',
      explanation: 'The competition-stability nexus is non-linear. In developed markets with strong supervision, competition improves efficiency and reduces systemic concentration. In emerging economies with weak institutions, competition intensifies charter value erosion and moral hazard.',
    },
    {
      finding1: 'Higher capital ratios significantly reduce bank failure probability',
      finding2: 'Capital requirements have negligible effects on bank risk behavior',
      context1: 'Advanced economy banks post-Basel II (Berger et al., 2008)',
      context2: 'African banking sectors with weak enforcement (Adusei, 2015)',
      explanation: 'Regulatory arbitrage and supervisory capture in jurisdictions with weak enforcement neutralize the theoretical risk-reducing effects of capital requirements. Enforcement quality mediates the capital-stability relationship.',
    },
    {
      finding1: 'Deposit insurance reduces bank runs and promotes systemic stability',
      finding2: 'Blanket deposit insurance increases moral hazard and systemic fragility',
      context1: 'Crises prevention literature (Diamond & Dybvig, 1983)',
      context2: 'Post-crisis cross-country evidence (Demirguc-Kunt & Detragiache, 2002)',
      explanation: 'The design and coverage of deposit insurance determines its effect. Unlimited guarantees without co-insurance remove market discipline entirely, fueling excessive risk-taking. The optimal design balances panic prevention with incentive preservation.',
    },
  ],
  gaps: [
    {
      title: 'Climate Risk Transmission to Banking Stability in SSA',
      description: 'No comprehensive panel studies examine how physical and transition climate risks propagate to bank balance sheets in Sub-Saharan Africa, where agricultural loan exposure is high.',
      severity: 'High',
      opportunityScore: 94,
    },
    {
      title: 'FinTech Disruption and Traditional Bank Stability',
      description: 'The stability implications of digital lending platforms competing with traditional banks are understudied, especially deposit migration and liquidity management effects.',
      severity: 'High',
      opportunityScore: 91,
    },
    {
      title: 'Governance Quality as Moderator in Regulation-Stability Nexus',
      description: 'Most studies treat institutional quality as a control variable rather than a moderating variable, missing how governance shapes regulatory effectiveness.',
      severity: 'Medium',
      opportunityScore: 78,
    },
    {
      title: 'Cross-Border Spillover Effects in Regional Currency Unions',
      description: 'Banking stability spillovers within ECOWAS and SADC are understudied despite increasing financial integration in these blocs.',
      severity: 'Medium',
      opportunityScore: 73,
    },
  ],
  timeline: [
    { year: '1977–1980', development: 'Minsky\'s Financial Instability Hypothesis formalized; deregulation era begins in US', paradigm: 'Theoretical Foundation' },
    { year: '1988', development: 'Basel I Accord establishes 8% minimum capital adequacy ratio globally', paradigm: 'Regulatory Architecture' },
    { year: '1997–1998', development: 'Asian Financial Crisis reveals vulnerabilities in bank-centric emerging markets', paradigm: 'Crisis & Learning' },
    { year: '2004', development: 'Basel II introduces risk-sensitive capital floors and three-pillar framework', paradigm: 'Advanced Risk Measurement' },
    { year: '2007–2009', development: 'Global Financial Crisis exposes systemic risk, shadow banking, and too-big-to-fail', paradigm: 'Paradigm Disruption' },
    { year: '2010–2013', development: 'Basel III introduces liquidity ratios (LCR, NSFR) and macroprudential tools', paradigm: 'Post-Crisis Reform' },
    { year: '2015–2019', development: 'FinTech emergence challenges regulatory perimeter; digital bank runs studied', paradigm: 'Digital Disruption' },
    { year: '2020–2024', development: 'COVID-19 stress tests; climate risk integrated into prudential frameworks', paradigm: 'Contemporary Challenges' },
  ],
};

const centralBankIndependenceReport: ResearchReport = {
  topic: 'Central Bank Independence',
  subtitle: 'Monetary authority autonomy, credibility, and macroeconomic outcomes',
  paperCount: 2614,
  theories: [
    {
      name: 'Time-Inconsistency Theory',
      author: 'Kydland & Prescott',
      year: 1977,
      description: 'Discretionary monetary policy creates an inflationary bias as central banks exploit short-run Phillips curve trade-offs; commitment via independence resolves this.',
    },
    {
      name: 'Conservative Central Banker Hypothesis',
      author: 'Rogoff',
      year: 1985,
      description: 'Delegating monetary policy to an inflation-averse central banker credibly lowers inflationary expectations even at some sacrifice of output stabilization.',
    },
    {
      name: 'Inflation Targeting Framework',
      author: 'Svensson',
      year: 1997,
      description: 'Explicit inflation targets combined with central bank transparency and accountability achieve credibility without excessive output volatility.',
    },
    {
      name: 'Political Business Cycle Theory',
      author: 'Nordhaus',
      year: 1975,
      description: 'Politically dependent central banks expand money supply before elections to boost output, creating predictable cycles of inflation and stabilization.',
    },
    {
      name: 'Unpleasant Monetarist Arithmetic',
      author: 'Sargent & Wallace',
      year: 1981,
      description: 'Fiscal dominance can render monetary tightening futile — future money creation to cover fiscal deficits undermines present price stability.',
    },
  ],
  variables: [
    { name: 'CBI Index', proxy: 'Cukierman-Webb-Neyapti (CWN) Score', description: 'Legal independence measured across term security, policy objectives, and financial autonomy' },
    { name: 'Turnover Rate', proxy: 'Central bank governor turnover per year', description: 'De facto independence proxy; high turnover signals political interference' },
    { name: 'Inflation Rate', proxy: 'CPI annual change (%)', description: 'Primary outcome variable in CBI-inflation studies' },
    { name: 'Inflation Volatility', proxy: 'Standard deviation of monthly CPI', description: 'Credibility measure; low volatility indicates anchored expectations' },
    { name: 'Output Gap', proxy: 'Actual minus potential GDP (%)', description: 'Captures sacrifice ratio and output-inflation trade-offs' },
  ],
  authors: [
    { name: 'Alex Cukierman', institution: 'Tel Aviv University', hIndex: 48, specialty: 'Central Bank Independence Measurement', country: 'Israel' },
    { name: 'Lars Svensson', institution: 'Stockholm School of Economics', hIndex: 56, specialty: 'Inflation Targeting & Monetary Policy', country: 'Sweden' },
    { name: 'Alberto Alesina', institution: 'Harvard University', hIndex: 71, specialty: 'Political Economy of Monetary Policy', country: 'Italy' },
    { name: 'Nergiz Dincer', institution: 'TOBB University', hIndex: 22, specialty: 'CBI & Transparency in Emerging Markets', country: 'Turkey' },
    { name: 'Donato Masciandaro', institution: 'Bocconi University', hIndex: 35, specialty: 'Central Bank Governance', country: 'Italy' },
  ],
  papers: [
    { title: 'Central Bank Independence and Macroeconomic Performance', authors: 'Alesina & Summers', year: 1993, citations: 3421, journal: 'Journal of Money, Credit and Banking' },
    { title: 'Measuring Central Bank Independence', authors: 'Cukierman, Webb & Neyapti', year: 1992, citations: 4817, journal: 'World Bank Economic Review' },
    { title: 'Central Bank Transparency and Credibility', authors: 'Dincer & Eichengreen', year: 2014, citations: 1243, journal: 'International Journal of Central Banking' },
    { title: 'CBI and Financial Stability: Panel Evidence', authors: 'Klomp & de Haan', year: 2009, citations: 892, journal: 'European Journal of Political Economy' },
    { title: 'Does CBI Matter in Developing Countries?', authors: 'Acemoglu et al.', year: 2008, citations: 2105, journal: 'Journal of the European Economic Association' },
  ],
  methodologies: [
    { name: 'IV-2SLS', fullName: 'Instrumental Variables — Two-Stage Least Squares', useCase: 'Addressing endogeneity between CBI and inflation outcomes' },
    { name: 'Panel VAR', fullName: 'Panel Vector Autoregression', useCase: 'Dynamic interactions between CBI, inflation, and output across countries' },
    { name: 'System GMM', fullName: 'System Generalized Method of Moments', useCase: 'Dynamic panel models with persistent CBI indices' },
    { name: 'Synthetic Control', fullName: 'Synthetic Control Method', useCase: 'Evaluating effects of specific CBI reforms in individual countries' },
  ],
  contradictions: [
    {
      finding1: 'CBI robustly reduces inflation in both developed and developing economies',
      finding2: 'CBI effects on inflation are weak or absent in low-income countries',
      context1: 'OECD cross-country analysis (Alesina & Summers, 1993)',
      context2: 'Sub-Saharan Africa panel evidence (Neyapti, 2001)',
      explanation: 'Legal CBI indices measure de jure independence but not de facto autonomy. In SSA, weak legal institutions, fiscal dominance, and political interference mean formal independence does not translate into genuine monetary policy autonomy.',
    },
    {
      finding1: 'CBI positively affects banking sector stability through credible policy frameworks',
      finding2: 'CBI weakens financial stability by reducing lender-of-last-resort responsiveness',
      context1: 'Advanced economy panel data (Crowe & Meade, 2008)',
      context2: 'Crisis episode analysis (Goodhart & Schoenmaker, 1995)',
      explanation: 'The independence-stability nexus depends on whether CBI is accompanied by appropriate financial stability mandates. Strictly inflation-focused independent banks may be slower to intervene during banking crises, creating a tension with macroprudential objectives.',
    },
  ],
  gaps: [
    {
      title: 'CBI and Financial Stability in African Currency Unions',
      description: 'The CFA franc zone and ECOWAS monetary cooperation provide natural experiments for studying CBI spillovers, yet panel evidence for this context is sparse.',
      severity: 'High',
      opportunityScore: 88,
    },
    {
      title: 'Digital Currency Issuance and CBI Erosion',
      description: 'How CBDCs and stablecoins affect central bank balance sheet independence and monetary transmission is an entirely new and unstudied dimension.',
      severity: 'High',
      opportunityScore: 95,
    },
    {
      title: 'CBI and Income Inequality Transmission',
      description: 'The distributional consequences of CBI-driven low-inflation policies on wage dynamics and inequality are underexplored outside Western economies.',
      severity: 'Medium',
      opportunityScore: 71,
    },
    {
      title: 'Fiscal Dominance Threshold Effects',
      description: 'At what public debt-to-GDP threshold does fiscal dominance neutralize CBI? Non-linear modeling of this threshold remains a gap.',
      severity: 'Medium',
      opportunityScore: 76,
    },
  ],
  timeline: [
    { year: '1975', development: 'Nordhaus identifies political business cycles from monetary policy manipulation', paradigm: 'Political Economy Foundation' },
    { year: '1977', development: 'Kydland & Prescott formalize time-inconsistency — Nobel Prize-winning contribution', paradigm: 'Theoretical Breakthrough' },
    { year: '1985', development: 'Rogoff\'s conservative central banker model establishes delegation rationale', paradigm: 'Institutional Design' },
    { year: '1988–1993', development: 'Alesina, Cukierman et al. provide first empirical CBI-inflation evidence', paradigm: 'Empirical Confirmation' },
    { year: '1997–2000', development: 'Inflation targeting adoption spreads globally; New Zealand, UK, Canada lead', paradigm: 'Policy Adoption Wave' },
    { year: '2008–2012', development: 'GFC forces CBI re-evaluation; QE blurs fiscal-monetary boundary', paradigm: 'Crisis Reappraisal' },
    { year: '2015–2020', development: 'Accountability debates intensify; transparency and communication research grows', paradigm: 'Governance & Legitimacy' },
    { year: '2021–2024', development: 'Post-COVID inflation surge tests CBI credibility; CBDC policy independence questions emerge', paradigm: 'Contemporary Test' },
  ],
};

function genericReport(topic: string): ResearchReport {
  return {
    topic,
    subtitle: `Emerging scholarly field with growing interdisciplinary interest`,
    paperCount: Math.floor(Math.random() * 3000) + 500,
    theories: [
      { name: 'Foundational Framework', author: 'Various Scholars', year: 1990, description: 'Core theoretical underpinning explaining causal mechanisms in this domain.' },
      { name: 'Structural Theory', author: 'Leading Researchers', year: 2001, description: 'Institutional and structural factors shaping outcomes in this field.' },
      { name: 'Behavioral Dimension', author: 'Interdisciplinary Team', year: 2010, description: 'Agent-level behavioral and cognitive factors interacting with structural variables.' },
      { name: 'Dynamic Systems View', author: 'Complex Systems Group', year: 2015, description: 'Non-linear feedback dynamics and emergent properties in the system.' },
    ],
    variables: [
      { name: 'Primary Index', proxy: 'Composite multi-dimensional measure', description: 'Core dependent variable capturing the central outcome of interest' },
      { name: 'Institutional Quality', proxy: 'World Governance Indicators', description: 'Regulatory quality, rule of law, and government effectiveness' },
      { name: 'Economic Development', proxy: 'Log GDP per capita', description: 'Development stage as potential moderator' },
      { name: 'Human Capital', proxy: 'Tertiary enrollment rate', description: 'Skill and knowledge infrastructure indicator' },
    ],
    authors: [
      { name: 'Dr. Sarah Mitchell', institution: 'Oxford University', hIndex: 42, specialty: `${topic} Theory`, country: 'UK' },
      { name: 'Prof. James Okonkwo', institution: 'University of Ghana', hIndex: 28, specialty: `${topic} in Emerging Markets`, country: 'Ghana' },
      { name: 'Dr. Maria Santos', institution: 'World Bank Research', hIndex: 35, specialty: `Policy Applications of ${topic}`, country: 'Brazil' },
    ],
    papers: [
      { title: `The Political Economy of ${topic}`, authors: 'Mitchell & Chen', year: 2018, citations: 734, journal: 'Journal of Development Economics' },
      { title: `${topic} in Emerging Markets: Panel Evidence`, authors: 'Okonkwo et al.', year: 2020, citations: 412, journal: 'World Development' },
      { title: `Institutional Determinants of ${topic}`, authors: 'Santos & López', year: 2021, citations: 289, journal: 'Journal of Institutional Economics' },
    ],
    methodologies: [
      { name: 'System GMM', fullName: 'System Generalized Method of Moments', useCase: 'Dynamic panel with endogenous regressors' },
      { name: 'Fixed Effects', fullName: 'Panel Fixed Effects', useCase: 'Controlling for unobserved heterogeneity' },
      { name: 'Quantile Regression', fullName: 'Panel Quantile Regression', useCase: 'Heterogeneous effects across distribution' },
    ],
    contradictions: [
      {
        finding1: `${topic} significantly improves macroeconomic outcomes in advanced economies`,
        finding2: `${topic} effects are negligible or negative in low-income contexts`,
        context1: 'OECD panel analysis',
        context2: 'SSA cross-sectional evidence',
        explanation: 'Institutional quality mediates the relationship — outcomes depend heavily on complementary governance infrastructure, enforcement capacity, and human capital.',
      },
    ],
    gaps: [
      { title: `${topic} in Fragile States`, description: 'No systematic evidence on how conflict and state fragility moderate outcomes in this domain.', severity: 'High', opportunityScore: 89 },
      { title: `Digital Technology and ${topic}`, description: 'How digitalization transforms mechanisms and outcomes in this field is understudied.', severity: 'High', opportunityScore: 92 },
      { title: `Gender Dimensions of ${topic}`, description: 'Gendered heterogeneity in effects and access is rarely examined in the existing literature.', severity: 'Medium', opportunityScore: 74 },
    ],
    timeline: [
      { year: '1980–1990', development: 'Early theoretical work lays foundational concepts', paradigm: 'Foundation' },
      { year: '1990–2000', development: 'First empirical tests using cross-country data', paradigm: 'Empirical Turn' },
      { year: '2000–2010', development: 'Panel data methods applied; institutional moderators introduced', paradigm: 'Methodological Advance' },
      { year: '2010–2020', development: 'Heterogeneity and context-dependence recognized; developing country focus grows', paradigm: 'Nuanced Understanding' },
      { year: '2020–2024', development: 'COVID-19 and digitalization create new research questions', paradigm: 'Contemporary Disruption' },
    ],
  };
}

const reports: Record<string, ResearchReport> = {
  'financial stability': financialStabilityReport,
  'central bank independence': centralBankIndependenceReport,
  'cbi': centralBankIndependenceReport,
};

export function getReport(topic: string): ResearchReport {
  const key = topic.toLowerCase().trim();
  return reports[key] ?? genericReport(topic);
}

export function getGraphData(topic: string): GraphData {
  const report = getReport(topic);
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const cx = 500;
  const cy = 350;
  const spread = (angle: number, r: number) => ({
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  });

  report.theories.slice(0, 4).forEach((t, i) => {
    const pos = spread((i / 4) * 2 * Math.PI, 200);
    nodes.push({ id: `t${i}`, label: t.name.split(' ').slice(0, 3).join(' '), type: 'theory', description: t.description, ...pos, vx: 0, vy: 0 });
  });

  report.variables.slice(0, 4).forEach((v, i) => {
    const pos = spread((i / 4) * 2 * Math.PI + 0.4, 320);
    nodes.push({ id: `v${i}`, label: v.name, type: 'variable', description: v.description, ...pos, vx: 0, vy: 0 });
  });

  report.methodologies.slice(0, 3).forEach((m, i) => {
    const pos = spread((i / 3) * 2 * Math.PI + 1.0, 260);
    nodes.push({ id: `m${i}`, label: m.name, type: 'method', description: m.useCase, ...pos, vx: 0, vy: 0 });
  });

  report.authors.slice(0, 3).forEach((a, i) => {
    const pos = spread((i / 3) * 2 * Math.PI + 2.0, 370);
    nodes.push({ id: `a${i}`, label: a.name.split(' ').slice(-1)[0], type: 'author', description: `${a.name}, ${a.institution}`, ...pos, vx: 0, vy: 0 });
  });

  // Theory → Variable edges
  edges.push(
    { source: 't0', target: 'v0', label: 'explains' },
    { source: 't0', target: 'v2', label: 'predicts' },
    { source: 't1', target: 'v1', label: 'measures' },
    { source: 't1', target: 'v3', label: 'shapes' },
    { source: 't2', target: 'v0', label: 'links' },
    { source: 't3', target: 'v1', label: 'moderates' },
  );
  // Method → Variable edges
  edges.push(
    { source: 'm0', target: 'v0', label: 'estimates' },
    { source: 'm1', target: 'v2', label: 'tests' },
    { source: 'm2', target: 'v3', label: 'models' },
  );
  // Author → Theory edges
  edges.push(
    { source: 'a0', target: 't0', label: 'advances' },
    { source: 'a1', target: 't1', label: 'critiques' },
    { source: 'a2', target: 't2', label: 'develops' },
  );

  return { nodes, edges };
}

export const trendingTopics = [
  { name: 'Financial Stability', growth: '+34%', description: 'Banking resilience, systemic risk, and macroprudential regulation', papers: 3847 },
  { name: 'AI in Education', growth: '+67%', description: 'Adaptive learning, personalized instruction, and EdTech outcomes', papers: 2103 },
  { name: 'Climate Finance', growth: '+89%', description: 'Green bonds, transition risk, and carbon pricing mechanisms', papers: 1876 },
  { name: 'Monetary Policy', growth: '+28%', description: 'Unconventional tools, forward guidance, and inflation dynamics', papers: 5241 },
  { name: 'Blockchain Banking', growth: '+112%', description: 'DeFi disruption, CBDC design, and crypto-asset regulation', papers: 1432 },
  { name: 'Central Bank Independence', growth: '+19%', description: 'Credibility, accountability, and institutional autonomy', papers: 2614 },
];

export const mostDebated = [
  {
    topic: 'Competition vs. Stability in Banking',
    sides: 2,
    description: 'Does bank competition improve or undermine financial stability? Evidence sharply diverges by region and institution type.',
    hot: true,
  },
  {
    topic: 'CBI in Developing Economies',
    sides: 2,
    description: 'Legal independence vs. de facto autonomy — does formal CBI deliver inflation control in low-income countries?',
    hot: true,
  },
  {
    topic: 'FinTech: Complement or Substitute?',
    sides: 2,
    description: 'Digital lending platforms: do they deepen financial inclusion or amplify systemic risk?',
    hot: false,
  },
];

export const emergingFields = [
  { name: 'Climate Risk & Banking Stability', prediction: 'Will dominate SSA banking research by 2026', confidence: 92 },
  { name: 'CBDC Monetary Transmission', prediction: 'Central bank digital currencies reshape policy frameworks globally', confidence: 88 },
  { name: 'AI-Driven Credit Scoring', prediction: 'Machine learning displaces traditional risk models in banking', confidence: 85 },
];
