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

const climateFinanceReport: ResearchReport = {
  topic: 'Climate Finance',
  subtitle: 'Green investment, transition risk, and climate risk transmission to financial markets',
  paperCount: 1876,
  theories: [
    {
      name: 'Climate Minsky Moment',
      author: 'Carney & Breeden',
      year: 2015,
      description: 'A sudden revaluation of carbon-intensive assets triggered by abrupt policy shifts or climate events could produce systemic financial instability analogous to the 2008 liquidity crisis.',
    },
    {
      name: 'Stranded Asset Theory',
      author: 'Carbon Tracker Initiative',
      year: 2011,
      description: 'Fossil fuel assets exceed the carbon budget implied by 2°C targets; a fraction of reserves must remain unburned, creating write-down risk for energy-sector lenders.',
    },
    {
      name: 'Green Bond Signaling Hypothesis',
      author: 'Flammer',
      year: 2021,
      description: 'Green bond issuance signals genuine environmental commitment and attracts socially responsible investors, reducing cost of capital for low-carbon transitions.',
    },
    {
      name: 'Climate Beta Framework',
      author: 'Bolton & Kacperczyk',
      year: 2021,
      description: 'Firms with higher carbon emissions carry a systematic climate risk premium; investors demand compensation for transition risk exposure in asset pricing.',
    },
    {
      name: 'Physical Risk Transmission Channel',
      author: 'Battiston et al.',
      year: 2017,
      description: 'Direct physical climate shocks (floods, droughts) and indirect second-order network effects transmit risk through bank loan portfolios and insurance balance sheets.',
    },
  ],
  variables: [
    { name: 'Green Bond Premium', proxy: 'Yield spread vs. conventional bond (bps)', description: 'Greenium measures investor preference for certified green instruments' },
    { name: 'Carbon Intensity', proxy: 'Scope 1 + 2 CO₂e emissions / Revenue (tCO₂/USD)', description: 'Transition risk exposure; high intensity signals stranded asset vulnerability' },
    { name: 'Climate Value-at-Risk', proxy: 'Policy-scenario equity value loss (%)', description: 'Potential portfolio loss under 2°C/1.5°C warming pathways' },
    { name: 'ESG Score', proxy: 'MSCI/S&P composite rating (0–100)', description: 'Environmental, social, governance performance; proxy for sustainability commitment' },
    { name: 'Physical Risk Index', proxy: 'Notre Dame Country Vulnerability Score', description: 'Country-level exposure to chronic and acute physical climate hazards' },
    { name: 'Green Credit Ratio', proxy: 'Green loans / Total bank loan portfolio', description: 'Bank-level climate alignment; rising ratio indicates transition finance leadership' },
  ],
  authors: [
    { name: 'Patrick Bolton', institution: 'Columbia Business School', hIndex: 63, specialty: 'Climate Risk & Asset Pricing', country: 'USA' },
    { name: 'Stefano Battiston', institution: 'University of Zurich', hIndex: 44, specialty: 'Climate Network Contagion', country: 'Switzerland' },
    { name: 'Caroline Flammer', institution: 'Columbia University', hIndex: 29, specialty: 'Green Bond Markets', country: 'USA' },
    { name: 'Mats Persson', institution: 'Stockholm Environment Institute', hIndex: 31, specialty: 'Climate Policy & Finance', country: 'Sweden' },
    { name: 'Rabah Arezki', institution: 'African Development Bank', hIndex: 38, specialty: 'Climate Finance for Africa', country: 'Algeria' },
  ],
  papers: [
    { title: 'Hedging Climate Risk', authors: 'Bolton & Kacperczyk', year: 2021, citations: 1842, journal: 'Journal of Financial Economics' },
    { title: 'Climate Change and Long-Run Discount Rates', authors: 'Gollier & Weitzman', year: 2010, citations: 2317, journal: 'Review of Environmental Economics' },
    { title: 'A Climate Stress Test of the EU Financial System', authors: 'Battiston et al.', year: 2017, citations: 1104, journal: 'Nature Climate Change' },
    { title: 'Green Bonds: Effectiveness and Implications', authors: 'Flammer', year: 2021, citations: 932, journal: 'Management Science' },
    { title: 'The Carbon Premium around the World', authors: 'Aswani, Raghunandan & Rajgopal', year: 2023, citations: 411, journal: 'Journal of Accounting Research' },
  ],
  methodologies: [
    { name: 'Panel ARDL', fullName: 'Panel Autoregressive Distributed Lag', useCase: 'Long-run co-integration between climate indicators and financial stability measures' },
    { name: 'Climate Stress Test', fullName: 'NGFS Scenario-Based Stress Testing', useCase: 'Quantifying bank portfolio losses under 1.5°C, 2°C, and disorderly transition scenarios' },
    { name: 'Event Study', fullName: 'Abnormal Returns Event Study', useCase: 'Market reaction to green bond issuance, climate policy announcements, and extreme weather events' },
    { name: 'Network Analysis', fullName: 'Financial Network Contagion Modeling', useCase: 'Mapping second-order climate shock transmission through interbank and supply-chain linkages' },
  ],
  contradictions: [
    {
      finding1: 'Green bonds carry a significant yield discount (greenium) of 5–15 bps',
      finding2: 'No statistically significant greenium exists in most bond markets',
      context1: 'European investment-grade corporate bond market (Zerbib, 2019)',
      context2: 'Emerging market sovereign green bonds (Larcker & Watts, 2020)',
      explanation: 'The greenium depends heavily on market depth, certification rigor, and investor base composition. In shallow emerging markets, liquidity risk offsets ESG premiums and the price signal disappears.',
    },
    {
      finding1: 'Higher carbon emissions carry a significant cross-sectional return premium',
      finding2: 'Carbon risk is not priced in equities — investors systematically underestimate transition exposure',
      context1: 'US equity markets 2005–2019 (Bolton & Kacperczyk, 2021)',
      context2: 'Global equity sample with policy uncertainty controls (Engle et al., 2020)',
      explanation: 'Short investment horizons and political uncertainty about climate policy timing create ambiguity about when transition costs will be realized, causing markets to oscillate between pricing and ignoring carbon risk.',
    },
    {
      finding1: 'Bank climate stress tests reveal manageable losses well within existing capital buffers',
      finding2: 'Stress tests severely underestimate systemic losses by ignoring network amplification',
      context1: 'ECB climate stress test 2022 (published results)',
      context2: 'Second-order contagion modeling (Battiston et al., 2017)',
      explanation: 'First-generation stress tests apply shocks to individual portfolios in isolation. Network contagion through interbank exposures, fire-sale dynamics, and supply-chain cascades can amplify losses by 3–5× beyond direct exposures.',
    },
  ],
  gaps: [
    {
      title: 'Physical Climate Risk and SSA Bank Portfolios',
      description: 'No comprehensive panel studies quantify how drought, flood, and temperature shocks transmit to NPL ratios in Sub-Saharan African banks with high agricultural loan concentration.',
      severity: 'High',
      opportunityScore: 96,
    },
    {
      title: 'Green Bond Market Development in Africa',
      description: 'Africa issues under 1% of global green bonds despite high climate vulnerability. Barriers to issuance and institutional investor demand in frontier markets are understudied.',
      severity: 'High',
      opportunityScore: 93,
    },
    {
      title: 'Transition Risk in Petro-Dependent Economies',
      description: 'Oil-exporting economies (Nigeria, Angola, Ghana) face sovereign and banking sector transition risk from global decarbonization, yet portfolio-level quantification is absent.',
      severity: 'High',
      opportunityScore: 91,
    },
    {
      title: 'Climate Finance and Financial Inclusion Nexus',
      description: 'Whether green finance instruments can simultaneously advance climate objectives and financial inclusion for smallholder farmers and SMEs in developing economies is unexplored.',
      severity: 'Medium',
      opportunityScore: 81,
    },
  ],
  timeline: [
    { year: '1992', development: 'UN Earth Summit; UNFCCC established — climate as global policy priority', paradigm: 'Policy Foundation' },
    { year: '1997', development: 'Kyoto Protocol; first binding carbon reduction commitments create transition risk concept', paradigm: 'Regulatory Architecture' },
    { year: '2007–2008', development: 'World Bank and EIB issue first labeled green bonds; market born', paradigm: 'Instrument Innovation' },
    { year: '2015', development: 'Paris Agreement + Carney\'s "Tragedy of the Horizon" speech catalyze climate finance research', paradigm: 'Academic Surge' },
    { year: '2017', development: 'TCFD recommendations establish disclosure framework; Battiston network contagion model published', paradigm: 'Measurement Advance' },
    { year: '2019–2020', development: 'EU Taxonomy, Green Bond Standard; ESG investing mainstreams globally', paradigm: 'Standardization' },
    { year: '2021–2022', development: 'NGFS climate scenarios; ECB & Fed run first mandatory climate stress tests', paradigm: 'Prudential Integration' },
    { year: '2023–2024', development: 'Nature-related financial risk (TNFD) expands beyond climate; biodiversity finance emerges', paradigm: 'Beyond Climate' },
  ],
};

const monetaryPolicyReport: ResearchReport = {
  topic: 'Monetary Policy',
  subtitle: 'Unconventional tools, transmission mechanisms, and inflation dynamics in modern economies',
  paperCount: 5241,
  theories: [
    {
      name: 'New Keynesian IS-LM Framework',
      author: 'Clarida, Galí & Gertler',
      year: 1999,
      description: 'The modern synthesis model where monetary policy affects output via the IS curve and inflation via the New Keynesian Phillips Curve, with forward-looking expectations playing a central role.',
    },
    {
      name: 'Bank Credit Channel',
      author: 'Bernanke & Blinder',
      year: 1988,
      description: 'Monetary policy works partly through banks\' willingness and ability to supply loans, not just through interest rates — bank health mediates monetary transmission strength.',
    },
    {
      name: 'Forward Guidance Theory',
      author: 'Eggertsson & Woodford',
      year: 2003,
      description: 'At the zero lower bound, credible commitments about future policy paths can stimulate demand by shaping long-run expectations even when current rates cannot be cut further.',
    },
    {
      name: 'Quantitative Easing Transmission',
      author: 'Krishnamurthy & Vissing-Jørgensen',
      year: 2011,
      description: 'Large-scale asset purchases work through portfolio balance, signaling, and liquidity channels — lowering long-term yields and stimulating risk-taking in the financial system.',
    },
    {
      name: 'Fiscal-Monetary Interaction Theory',
      author: 'Sargent & Wallace',
      year: 1981,
      description: 'In high-debt environments, monetary tightening may be unsustainable if fiscal authorities force future monetization — the fiscal theory of the price level constrains monetary autonomy.',
    },
  ],
  variables: [
    { name: 'Policy Interest Rate', proxy: 'Central bank overnight lending rate (%)', description: 'Primary monetary policy instrument; signals stance and shapes short-term credit costs' },
    { name: 'Money Supply (M2)', proxy: 'Broad money / GDP ratio', description: 'Quantity-theory indicator; rapid M2 growth linked to inflationary pressure' },
    { name: 'Yield Curve Slope', proxy: '10-year minus 3-month government bond yield (bps)', description: 'Inversion predicts recessions; flattening signals tight monetary conditions' },
    { name: 'Inflation Expectations', proxy: 'Consensus Forecast survey 1-year ahead CPI (%)', description: 'Forward-looking credibility measure; well-anchored expectations signal effective communication' },
    { name: 'Shadow Rate', proxy: 'Wu-Xia shadow federal funds rate (%)', description: 'Measures effective monetary stance when policy rate is at zero lower bound' },
    { name: 'Bank Lending Rate Spread', proxy: 'Prime lending rate minus policy rate (bps)', description: 'Transmission efficiency; high spread indicates impaired monetary pass-through' },
  ],
  authors: [
    { name: 'Ben Bernanke', institution: 'Brookings Institution', hIndex: 87, specialty: 'Monetary Policy & Financial Crises', country: 'USA' },
    { name: 'Michael Woodford', institution: 'Columbia University', hIndex: 72, specialty: 'New Keynesian Theory & Interest Rate Rules', country: 'USA' },
    { name: 'Olivier Blanchard', institution: 'Peterson Institute', hIndex: 89, specialty: 'Macro Policy & Fiscal-Monetary Interactions', country: 'France' },
    { name: 'Hyun Song Shin', institution: 'Bank for International Settlements', hIndex: 61, specialty: 'International Monetary Transmission', country: 'South Korea' },
    { name: 'Mthuli Ncube', institution: 'African Development Bank', hIndex: 29, specialty: 'Monetary Policy in Developing Economies', country: 'Zimbabwe' },
  ],
  papers: [
    { title: 'What Have We Learned Since October 1979?', authors: 'Bernanke', year: 2004, citations: 3812, journal: 'Federal Reserve Bank of St. Louis Review' },
    { title: 'Interest and Prices: Foundations of a Theory of Monetary Policy', authors: 'Woodford', year: 2003, citations: 6724, journal: 'Princeton University Press' },
    { title: 'Rethinking Macroeconomic Policy', authors: 'Blanchard, Dell\'Ariccia & Mauro', year: 2010, citations: 4103, journal: 'Journal of Money, Credit and Banking' },
    { title: 'Effects of Monetary Policy on the Federal Funds Rate', authors: 'Bernanke & Blinder', year: 1992, citations: 5289, journal: 'American Economic Review' },
    { title: 'Monetary Policy Transmission in Emerging Markets', authors: 'Mishra, Montiel & Spilimbergo', year: 2012, citations: 1247, journal: 'IMF Economic Review' },
  ],
  methodologies: [
    { name: 'SVAR', fullName: 'Structural Vector Autoregression', useCase: 'Identifying monetary policy shocks and their dynamic effects on output and inflation' },
    { name: 'Local Projections', fullName: 'Jordà Local Projection Estimator', useCase: 'Flexible estimation of impulse responses without imposing VAR lag structure' },
    { name: 'DSGE', fullName: 'Dynamic Stochastic General Equilibrium', useCase: 'Structural policy simulation with microfounded agent behavior and welfare analysis' },
    { name: 'FAVAR', fullName: 'Factor-Augmented VAR', useCase: 'Extracting information from large data panels to identify monetary policy transmission' },
  ],
  contradictions: [
    {
      finding1: 'Quantitative easing significantly reduced long-term yields and stimulated economic recovery',
      finding2: 'QE effects on real economy were modest; primary benefit was preventing financial market dysfunction',
      context1: 'Fed QE1 event studies (Krishnamurthy & Vissing-Jørgensen, 2011)',
      context2: 'Cross-country QE macro effects (Borio & Zabai, 2016)',
      explanation: 'Event-study estimates capture immediate asset price responses but overstate real economy effects. Macro VAR estimates show QE raised growth modestly but the primary channel was portfolio rebalancing into riskier assets rather than a traditional credit stimulus.',
    },
    {
      finding1: 'Monetary policy transmission is equally effective in African economies as in advanced ones',
      finding2: 'Monetary transmission is severely impaired in SSA due to bank structure and dollarization',
      context1: 'Interest rate pass-through studies (Égert & MacDonald, 2009)',
      context2: 'SSA-specific SVAR evidence (Mishra et al., 2012)',
      explanation: 'Shallow money markets, high reserve requirements, state bank dominance, and significant informal sectors create wedges between policy rates and lending rates in Sub-Saharan Africa, blunting conventional monetary channels.',
    },
  ],
  gaps: [
    {
      title: 'Monetary Policy Transmission in High-Informality Economies',
      description: 'When more than 60% of economic activity is informal (as in many SSA economies), standard transmission channels via formal credit markets reach only a small fraction of the economy. Quantification of this impairment is sparse.',
      severity: 'High',
      opportunityScore: 90,
    },
    {
      title: 'Post-COVID Inflation Dynamics in Emerging Markets',
      description: 'The 2021–2023 global inflation surge had heterogeneous causes across economies. Supply-side vs. demand-side decomposition for African and Asian economies lags the rich literature on US/EU dynamics.',
      severity: 'High',
      opportunityScore: 87,
    },
    {
      title: 'CBDC and Monetary Policy Transmission',
      description: 'How retail CBDC adoption affects bank deposit funding, the money multiplier, and interest rate pass-through is theoretically modeled but empirically untested in live CBDC deployments.',
      severity: 'High',
      opportunityScore: 94,
    },
    {
      title: 'Climate Change and Monetary Policy Frameworks',
      description: 'Whether and how central banks should incorporate climate considerations into inflation targeting and reserve requirements is debated at the policy level but understudied empirically.',
      severity: 'Medium',
      opportunityScore: 82,
    },
  ],
  timeline: [
    { year: '1968–1975', development: 'Friedman challenges Keynesian consensus; monetarist school establishes money supply primacy', paradigm: 'Monetarist Revolution' },
    { year: '1979–1983', development: 'Volcker disinflation — Fed raises rates to 20%; proves credibility can break inflationary expectations', paradigm: 'Credibility Doctrine' },
    { year: '1993', development: 'Taylor Rule published — systematic rule linking policy rate to inflation and output gaps', paradigm: 'Rules-Based Framework' },
    { year: '1997–2005', development: 'Inflation targeting adoption spreads; Woodford\'s "Interest and Prices" synthesizes New Keynesian macro', paradigm: 'New Keynesian Synthesis' },
    { year: '2008–2015', development: 'Zero lower bound reached; QE, forward guidance, and negative rates deployed globally', paradigm: 'Unconventional Tools Era' },
    { year: '2015–2019', development: 'Secular stagnation debate; neutral rate (r*) falls globally; "lower for longer" paradigm', paradigm: 'Low Rate Regime' },
    { year: '2021–2023', development: 'Post-COVID inflation surge; fastest tightening cycle since Volcker tests credibility frameworks', paradigm: 'Inflation Resurgence' },
    { year: '2023–2024', development: 'Central banks navigate restrictive policy without recession; debate over r* level intensifies', paradigm: 'Soft Landing Debate' },
  ],
};

const blockchainBankingReport: ResearchReport = {
  topic: 'Blockchain Banking',
  subtitle: 'DeFi disruption, CBDC design, and crypto-asset regulation in the financial system',
  paperCount: 1432,
  theories: [
    {
      name: 'DeFi Disintermediation Hypothesis',
      author: 'Zetzsche, Arner & Buckley',
      year: 2020,
      description: 'Decentralized finance protocols replicate banking functions (lending, market-making, insurance) without intermediaries, fundamentally challenging the institutional basis of banking regulation.',
    },
    {
      name: 'CBDC Money Channel Theory',
      author: 'Andolfatto',
      year: 2021,
      description: 'Central bank digital currency, by granting all agents direct access to the central bank balance sheet, reshapes monetary transmission, deposit competition, and the credit creation process.',
    },
    {
      name: 'Crypto Contagion Hypothesis',
      author: 'Bouri et al.',
      year: 2021,
      description: 'Crypto asset markets exhibit significant return and volatility spillovers to traditional financial markets, particularly during stress periods, creating new systemic risk channels.',
    },
    {
      name: 'Blockchain Trust Framework',
      author: 'Catalini & Gans',
      year: 2016,
      description: 'Distributed ledgers reduce the cost of verification and networking, enabling new organizational forms that substitute cryptographic trust for institutional trust in financial transactions.',
    },
    {
      name: 'Stablecoin Run Theory',
      author: 'Gorton & Zhang',
      year: 2021,
      description: 'Algorithmic and reserve-backed stablecoins are susceptible to bank-run dynamics; imperfect backing creates information-insensitive money that can become suddenly information-sensitive during crises.',
    },
  ],
  variables: [
    { name: 'DeFi TVL', proxy: 'Total Value Locked in DeFi protocols (USD bn)', description: 'Aggregate liquidity committed to decentralized lending, DEX, and derivatives platforms' },
    { name: 'CBDC Adoption Rate', proxy: 'CBDC wallets / banked population (%)', description: 'Penetration metric for live and pilot CBDC programs (Nigeria eNaira, Jamaica JAM-DEX, etc.)' },
    { name: 'Crypto-Stock Correlation', proxy: 'Rolling 90-day Pearson ρ (BTC/ETH vs S&P 500)', description: 'Diversification benefit metric; rising correlation reduces hedge properties' },
    { name: 'Stablecoin Market Cap', proxy: 'USDT + USDC + others (USD bn)', description: 'Shadow-money measure; rapid growth may indicate displacement of bank deposits' },
    { name: 'Blockchain Settlement Finality', proxy: 'Time to irreversible transaction (seconds)', description: 'Infrastructure efficiency; impacts cross-border payment cost and speed' },
    { name: 'Crypto Exchange Volume', proxy: '24h spot + derivatives volume (USD bn)', description: 'Market depth and liquidity proxy for price discovery and manipulation risk' },
  ],
  authors: [
    { name: 'Tobias Adrian', institution: 'IMF Monetary & Capital Markets', hIndex: 44, specialty: 'CBDC Design & Digital Money', country: 'Germany' },
    { name: 'Raphael Auer', institution: 'Bank for International Settlements', hIndex: 31, specialty: 'Stablecoins & CBDC Architecture', country: 'Switzerland' },
    { name: 'Eswar Prasad', institution: 'Cornell University', hIndex: 52, specialty: 'Digital Currency & Monetary Futures', country: 'India' },
    { name: 'Hyun Song Shin', institution: 'BIS Research', hIndex: 61, specialty: 'Crypto Systemic Risk & FinTech', country: 'South Korea' },
    { name: 'Olumide Alabi', institution: 'Central Bank of Nigeria', hIndex: 14, specialty: 'CBDC in Sub-Saharan Africa', country: 'Nigeria' },
  ],
  papers: [
    { title: 'The Technology of Retail CBDC', authors: 'Auer & Böhme', year: 2020, citations: 1243, journal: 'BIS Quarterly Review' },
    { title: 'The Future of Money', authors: 'Prasad', year: 2021, citations: 987, journal: 'Harvard University Press' },
    { title: 'DeFi: On Blockchain- and Smart Contract-Based Financial Markets', authors: 'Schär', year: 2021, citations: 1876, journal: 'Federal Reserve Bank of St. Louis Review' },
    { title: 'Stablecoins: Risks, Potential and Regulation', authors: 'Bullmann, Klemm & Pinna', year: 2019, citations: 743, journal: 'ECB Occasional Paper' },
    { title: 'Crypto Assets and Their Risks for Financial Stability', authors: 'Adrian & Mancini-Griffoli', year: 2019, citations: 892, journal: 'IMF FinTech Note' },
  ],
  methodologies: [
    { name: 'Event Study', fullName: 'Crypto Market Event Study', useCase: 'Measuring market reaction to regulatory announcements, exchange failures, and protocol upgrades' },
    { name: 'Panel GARCH', fullName: 'Panel GARCH-DCC Model', useCase: 'Dynamic conditional correlations between crypto and traditional asset returns during crisis periods' },
    { name: 'Network Analysis', fullName: 'DeFi Liquidity Network Mapping', useCase: 'Mapping TVL flows, protocol interdependencies, and systemic risk concentration in DeFi' },
    { name: 'Agent-Based Modeling', fullName: 'ABM Monetary Simulation', useCase: 'Simulating CBDC adoption dynamics, bank disintermediation, and deposit migration scenarios' },
  ],
  contradictions: [
    {
      finding1: 'CBDC issuance would cause significant bank disintermediation by diverting deposits to central banks',
      finding2: 'CBDC design features (holding limits, non-interest-bearing) can prevent material disintermediation',
      context1: 'Theoretical DSGE modeling (Fernández-Villaverde et al., 2021)',
      context2: 'BIS survey of CBDC design and financial stability (Auer et al., 2022)',
      explanation: 'The disintermediation risk is real but controllable through design — tiered remuneration, holding caps, and waterfall arrangements can preserve commercial bank funding while delivering payment system benefits.',
    },
    {
      finding1: 'Crypto assets provide meaningful portfolio diversification benefits',
      finding2: 'Crypto-traditional market correlations surge during crises, eliminating diversification precisely when needed',
      context1: 'Pre-2020 low-volatility period studies (Corbet et al., 2018)',
      context2: 'COVID-19 and 2022 rate-rise period analysis (Bouri et al., 2021)',
      explanation: 'Crypto diversification is regime-dependent. In normal markets, low correlation holds. During systemic stress, crypto becomes a risk-off asset that falls with equities as leveraged investors deleveraged across all asset classes.',
    },
  ],
  gaps: [
    {
      title: 'CBDC Design for Low-Income, Low-Connectivity Economies',
      description: 'Existing CBDC research focuses on advanced economy architectures. Offline functionality, feature-phone compatibility, and agent-banking integration for SSA populations is theoretically underdeveloped.',
      severity: 'High',
      opportunityScore: 95,
    },
    {
      title: 'Cross-Border DeFi Regulatory Arbitrage',
      description: 'DeFi protocols operate across jurisdictions simultaneously, enabling regulatory arbitrage. How regulators can coordinate without stifling innovation in permissionless systems is an open governance question.',
      severity: 'High',
      opportunityScore: 88,
    },
    {
      title: 'Crypto Asset Contagion to Emerging Market Banks',
      description: 'Most contagion studies focus on developed markets. Whether crypto volatility transmits through wealth effects, remittance corridors, or informal exchange to banking stability in frontier markets is unstudied.',
      severity: 'Medium',
      opportunityScore: 84,
    },
    {
      title: 'Environmental Footprint of Proof-of-Work Banking Infrastructure',
      description: 'The energy cost of CBDC vs. traditional payment infrastructure vs. PoW crypto is not systematically compared using comparable functional unit accounting.',
      severity: 'Medium',
      opportunityScore: 71,
    },
  ],
  timeline: [
    { year: '2008–2009', development: 'Satoshi Nakamoto publishes Bitcoin whitepaper; genesis block mined January 2009', paradigm: 'Genesis' },
    { year: '2013–2015', development: 'Ethereum whitepaper (2013), mainnet launch (2015); smart contracts enable programmable money', paradigm: 'Platform Layer' },
    { year: '2017', development: 'ICO boom; $5.6B raised; first major crypto regulatory actions globally', paradigm: 'Speculative Surge' },
    { year: '2019–2020', development: 'Libra/Diem proposal triggers CBDC research sprint; China launches digital yuan pilot', paradigm: 'Institutional Awakening' },
    { year: '2020', development: 'DeFi Summer — Uniswap, Compound, Aave TVL explodes from $1B to $15B in months', paradigm: 'DeFi Emergence' },
    { year: '2021', development: 'Bitcoin reaches $69K; NFT mania; El Salvador adopts BTC as legal tender', paradigm: 'Mainstream Crossover' },
    { year: '2022', development: 'Terra/LUNA collapse ($40B); FTX fraud ($8B losses); crypto winter tests systemic risk thesis', paradigm: 'Stress Test' },
    { year: '2023–2024', development: 'Bitcoin ETF approvals; BIS reports 130+ CBDC projects; MiCA regulation enacted in EU', paradigm: 'Regulated Integration' },
  ],
};

const aiEducationReport: ResearchReport = {
  topic: 'AI in Education',
  subtitle: 'Adaptive learning, intelligent tutoring, and the equity implications of EdTech in global classrooms',
  paperCount: 2103,
  theories: [
    {
      name: 'Cognitive Load Theory',
      author: 'Sweller',
      year: 1988,
      description: 'Working memory has limited capacity; effective instruction minimizes extraneous cognitive load while maximizing germane learning. AI-adaptive systems can dynamically calibrate this balance per learner.',
    },
    {
      name: 'Zone of Proximal Development',
      author: 'Vygotsky',
      year: 1978,
      description: 'Optimal learning occurs in the zone between what a learner can do alone and with guidance. Intelligent tutoring systems operationalize this by providing scaffolding exactly at the learner\'s current boundary.',
    },
    {
      name: 'Mastery Learning Framework',
      author: 'Bloom',
      year: 1968,
      description: 'Students achieve mastery when given sufficient time and appropriate feedback — constraints AI systems remove by personalizing pace and providing instant, granular diagnostic feedback at scale.',
    },
    {
      name: 'AI Feedback Loop Theory',
      author: 'Hattie & Timperley',
      year: 2007,
      description: 'Feedback is the most powerful influence on learning achievement. AI generates formative feedback at a frequency and specificity that human instructors cannot match at scale.',
    },
    {
      name: 'Digital Divide Amplification Hypothesis',
      author: 'Warschauer',
      year: 2003,
      description: 'Technology adoption in education systematically advantages already-privileged learners who have better devices, connectivity, and home support — potentially widening achievement gaps if AI EdTech is deployed without equity safeguards.',
    },
  ],
  variables: [
    { name: 'Learning Gain Score', proxy: 'Post-test minus pre-test normalized (Cohen\'s d)', description: 'Primary outcome; effect size of AI-assisted instruction relative to control condition' },
    { name: 'Time-on-Task Ratio', proxy: 'Active engagement time / Total session time (%)', description: 'Attention and engagement proxy; AI systems often increase this vs. passive instruction' },
    { name: 'Dropout Reduction Rate', proxy: '(Control dropout% − Treatment dropout%) / Control dropout%', description: 'Retention effect; personalized AI reduces dropout by adapting difficulty to keep students in flow' },
    { name: 'Equity Index', proxy: 'SD reduction in learning outcomes across SES quintiles', description: 'Distributional measure; AI should narrow, not widen, gaps across socioeconomic strata' },
    { name: 'Teacher Displacement Risk Score', proxy: 'Tasks automatable / Total teaching task inventory (%)', description: 'Labor market impact; varies sharply by subject, level, and institutional context' },
    { name: 'Bandwidth Requirement', proxy: 'Minimum Mbps for full AI platform functionality', description: 'Infrastructure constraint; high bandwidth requirements exclude low-connectivity learners' },
  ],
  authors: [
    { name: 'John Hattie', institution: 'University of Melbourne', hIndex: 78, specialty: 'Learning Effectiveness & Meta-Analysis', country: 'Australia' },
    { name: 'Ryan Baker', institution: 'University of Pennsylvania', hIndex: 52, specialty: 'Learning Analytics & EDM', country: 'USA' },
    { name: 'Mutlu Cukurova', institution: 'University College London', hIndex: 31, specialty: 'AI & Human-AI Collaboration in Learning', country: 'UK' },
    { name: 'Beaty Akpan', institution: 'University of Port Harcourt', hIndex: 18, specialty: 'EdTech in African Classrooms', country: 'Nigeria' },
    { name: 'Kofi Acheampong', institution: 'University of Ghana', hIndex: 16, specialty: 'AI Education Equity in SSA', country: 'Ghana' },
  ],
  papers: [
    { title: 'Visible Learning: A Synthesis of 800+ Meta-Analyses', authors: 'Hattie', year: 2009, citations: 28400, journal: 'Routledge' },
    { title: 'Educational Data Mining and Learning Analytics', authors: 'Baker & Inventado', year: 2014, citations: 2341, journal: 'Learning Analytics' },
    { title: 'AI in Education: A Systematic Review', authors: 'Chen, Xie & Hwang', year: 2020, citations: 3871, journal: 'Computers & Education' },
    { title: 'Intelligent Tutoring Systems: 40 Years On', authors: 'VanLehn', year: 2011, citations: 4218, journal: 'International Journal of AI in Education' },
    { title: 'Large Language Models as Tutors', authors: 'Cukurova et al.', year: 2023, citations: 892, journal: 'Nature Human Behaviour' },
  ],
  methodologies: [
    { name: 'RCT', fullName: 'Randomized Controlled Trial', useCase: 'Gold standard for causal AI vs. traditional instruction comparisons; random assignment to treatment/control' },
    { name: 'Learning Analytics', fullName: 'Log-Data Learning Analytics', useCase: 'Clickstream and time-series analysis of learner interaction with AI platforms at scale' },
    { name: 'PSM', fullName: 'Propensity Score Matching', useCase: 'Quasi-experimental estimation of AI EdTech effects when random assignment is infeasible' },
    { name: 'Meta-Analysis', fullName: 'Systematic Review & Meta-Analysis', useCase: 'Pooling effect sizes across studies to identify overall AI learning impact and moderators' },
  ],
  contradictions: [
    {
      finding1: 'Intelligent tutoring systems achieve learning gains equivalent to one-on-one human tutoring',
      finding2: 'AI tutors show moderate effects at best, with heterogeneous results across subjects and contexts',
      context1: 'Carnegie Learning Cognitive Tutor controlled studies (Ritter et al., 2007)',
      context2: 'Large-scale MOOC and adaptive platform meta-analysis (Zawacki-Richter et al., 2019)',
      explanation: 'The "2-sigma" claim overstates average AI effects. Well-designed ITS in constrained subjects (algebra, grammar) approach human tutoring. In open-ended, discussion-intensive subjects, AI tutors underperform experienced human instructors significantly.',
    },
    {
      finding1: 'AI personalization narrows achievement gaps by providing more support to lower-performing students',
      finding2: 'AI EdTech widens inequality — advantaged students extract more value from AI tools through better digital literacy and home support',
      context1: 'US K-12 adaptive platform studies (Pane et al., 2015)',
      context2: 'LMIC EdTech deployments (Muralidharan et al., 2019)',
      explanation: 'Equity outcomes depend entirely on implementation design. When AI replaces teacher interaction with disadvantaged students rather than supplementing it, gaps widen. When AI is used as scaffolding alongside strong teacher support, gaps narrow.',
    },
  ],
  gaps: [
    {
      title: 'AI Tutoring in Low-Bandwidth African Classrooms',
      description: 'Virtually all large-scale AI EdTech research comes from high-connectivity contexts. Offline-capable, lightweight AI tutoring for resource-constrained African schools remains an understudied design challenge.',
      severity: 'High',
      opportunityScore: 97,
    },
    {
      title: 'Long-Term Learning Outcomes Beyond Test Scores',
      description: 'Most AI EdTech evaluations measure immediate or short-term test performance. Longitudinal effects on critical thinking, creativity, and labor market outcomes are essentially unmeasured.',
      severity: 'High',
      opportunityScore: 88,
    },
    {
      title: 'LLM-as-Tutor Accuracy and Hallucination Risks',
      description: 'Large language models as tutors risk confidently presenting incorrect information, yet the frequency and severity of factual errors in subject-specific tutoring is not systematically benchmarked.',
      severity: 'High',
      opportunityScore: 92,
    },
    {
      title: 'AI Bias in Student Assessment and Opportunity Allocation',
      description: 'Automated grading, early-warning systems, and college recommendation algorithms may encode racial, gender, and socioeconomic biases that shape educational opportunities. Auditing evidence is sparse.',
      severity: 'High',
      opportunityScore: 94,
    },
  ],
  timeline: [
    { year: '1960–1970', development: 'PLATO computer-assisted instruction system; Skinner\'s teaching machines — first CAI era', paradigm: 'Computer-Assisted Instruction' },
    { year: '1982–1990', development: 'LISP-based ITS (GUIDON, PROUST); cognitive science meets AI for adaptive tutoring', paradigm: 'Intelligent Tutoring Systems' },
    { year: '1990–2000', development: 'Educational data mining emerges; Bayesian knowledge tracing models student learning', paradigm: 'Learning Modeling' },
    { year: '2008–2014', development: 'MOOC explosion (Coursera, edX, Udacity); big data learning analytics scale up', paradigm: 'Open Learning at Scale' },
    { year: '2016–2019', development: 'Deep learning enables NLP-based feedback; Duolingo, Khan Academy AI features grow', paradigm: 'Deep Learning Era' },
    { year: '2020', development: 'COVID-19 forces global ed-tech adoption; AI tools deployed without rigorous evaluation', paradigm: 'Pandemic Acceleration' },
    { year: '2022–2023', development: 'ChatGPT and LLM tutors reshape AI-education landscape; academic integrity crises', paradigm: 'LLM Disruption' },
    { year: '2024', development: 'AI literacy curricula mandated globally; policy debates over LLM in high-stakes assessment', paradigm: 'Governance & Equity' },
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
  'climate finance': climateFinanceReport,
  'monetary policy': monetaryPolicyReport,
  'blockchain banking': blockchainBankingReport,
  'blockchain': blockchainBankingReport,
  'defi': blockchainBankingReport,
  'cbdc': blockchainBankingReport,
  'ai in education': aiEducationReport,
  'edtech': aiEducationReport,
  'education ai': aiEducationReport,
};

export interface PaperWithField extends Paper {
  field: string;
  fieldColor: string;
}

export function getPapersDatabase(): PaperWithField[] {
  const fields = [
    { report: financialStabilityReport, color: '#00D4FF' },
    { report: centralBankIndependenceReport, color: '#A855F7' },
    { report: climateFinanceReport, color: '#00FF88' },
    { report: monetaryPolicyReport, color: '#FBB924' },
    { report: blockchainBankingReport, color: '#FF6B35' },
    { report: aiEducationReport, color: '#EF4444' },
  ];
  return fields.flatMap(({ report, color }) =>
    report.papers.map(p => ({ ...p, field: report.topic, fieldColor: color }))
  );
}

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
