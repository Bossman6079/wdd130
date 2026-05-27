export interface LitReview {
  topic: string;
  theoretical: Section[];
  empirical: Section[];
  synthesis: string;
  gaps: string[];
  hypotheses: Hypothesis[];
  framework: FrameworkNode[];
}

export interface Section {
  heading: string;
  body: string;
  citations: string[];
}

export interface Hypothesis {
  id: string;
  statement: string;
  basis: string;
  direction: 'positive' | 'negative' | 'non-linear';
}

export interface FrameworkNode {
  id: string;
  label: string;
  type: 'independent' | 'dependent' | 'mediator' | 'moderator' | 'control';
  x: number;
  y: number;
  arrowTo?: string[];
}

export interface SupervisorFeedback {
  overallScore: number;
  grade: string;
  sections: FeedbackSection[];
  strengths: string[];
  criticalIssues: string[];
  recommendations: string[];
}

export interface FeedbackSection {
  name: string;
  score: number;
  maxScore: number;
  status: 'strong' | 'adequate' | 'weak' | 'missing';
  comment: string;
  suggestions: string[];
}

export interface JournalEntry {
  name: string;
  abbreviation: string;
  impactFactor: number;
  quartile: string;
  topicFit: string[];
  methodologies: string[];
  avgAcceptanceRate: number;
  avgReviewTime: string;
  wordLimit: string;
  citationStyle: string;
  notes: string;
  scope: string;
}

export interface DatasetEntry {
  name: string;
  category: string;
  provider: string;
  coverage: string;
  frequency: string;
  variables: string[];
  format: string;
  access: 'Free' | 'Subscription' | 'Request';
  url: string;
  papers: number;
  description: string;
  tags: string[];
}

export interface TrendEntry {
  topic: string;
  status: 'rising' | 'peaking' | 'declining' | 'emerging';
  momentum: number;
  paperVelocity: string;
  horizon: string;
  rationale: string;
  keyDrivers: string[];
  relatedTopics: string[];
  citationAcceleration: number;
}

// ─── LITERATURE REVIEW MOCK ──────────────────────────────────────────────────

const financialStabilityReview: LitReview = {
  topic: 'Financial Stability',
  theoretical: [
    {
      heading: '2.1 Financial Instability Hypothesis',
      body: 'The theoretical foundation of financial stability research traces to Minsky\'s (1977) Financial Instability Hypothesis (FIH), which posits that capitalist economies are inherently prone to periodic financial crises. Minsky argued that stability itself sows the seeds of instability — prolonged periods of prosperity encourage speculative and Ponzi finance, eroding the buffers that sustain solvency. The FIH predicts that credit expansions driven by euphoric expectations will eventually collapse, triggering systemic fragility. This endogenous view of financial cycles contrasts sharply with the efficient markets paradigm, and found renewed empirical support following the 2007–2009 Global Financial Crisis (Bernanke, 2015; Brunnermeier, 2009).',
      citations: ['Minsky (1977)', 'Bernanke (2015)', 'Brunnermeier (2009)'],
    },
    {
      heading: '2.2 Basel Capital Adequacy Framework',
      body: 'The regulatory architecture underpinning modern banking stability derives from the Basel Accords. Basel I (1988) introduced risk-weighted capital adequacy requirements, establishing the 8% minimum Tier 1 capital ratio that anchors prudential regulation globally. Basel II (2004) refined risk sensitivity through internal ratings-based approaches and introduced the three-pillar structure of minimum capital, supervisory review, and market discipline. Following the failures exposed by the Global Financial Crisis, Basel III (2010–2013) added liquidity coverage ratios, net stable funding ratios, and countercyclical capital buffers, substantially strengthening the macroprudential dimension of banking supervision (BCBS, 2010; Demirguc-Kunt et al., 2013).',
      citations: ['BCBS (1988)', 'BCBS (2004)', 'BCBS (2010)', 'Demirguc-Kunt et al. (2013)'],
    },
    {
      heading: '2.3 Market Discipline and Deposit Insurance Theory',
      body: 'Diamond and Dybvig\'s (1983) seminal model of bank runs established the theoretical basis for deposit insurance as a stability mechanism. In their framework, demand deposit contracts create inherent fragility because rational depositors may run even on solvent banks if they anticipate others will withdraw first. Deposit insurance eliminates this coordination failure by removing the incentive to run. However, Calomiris and Kahn (1991) identified the trade-off: insurance that removes panic risk simultaneously eliminates market discipline by uninsured creditors, potentially inducing moral hazard and excessive risk-taking (Demirguc-Kunt & Detragiache, 2002).',
      citations: ['Diamond & Dybvig (1983)', 'Calomiris & Kahn (1991)', 'Demirguc-Kunt & Detragiache (2002)'],
    },
  ],
  empirical: [
    {
      heading: '3.1 Competition and Stability',
      body: 'The empirical relationship between bank competition and financial stability remains one of the most contested questions in banking research. The competition-fragility view, advanced by Marcus (1984) and Keeley (1990), holds that competition erodes charter value, incentivizing excessive risk-taking. In contrast, Boyd and De Nicolo (2005) advanced the competition-stability hypothesis, arguing that competition reduces loan rates and thereby lowers borrower default risk. Beck et al. (2006) examined a cross-country panel of 69 countries and found that concentrated banking systems are more prone to crisis, supporting the competition-stability view. However, Jiménez et al. (2013) found non-linear effects using Spanish bank data, with very high competition increasing fragility.',
      citations: ['Marcus (1984)', 'Keeley (1990)', 'Boyd & De Nicolo (2005)', 'Beck et al. (2006)', 'Jiménez et al. (2013)'],
    },
    {
      heading: '3.2 Capital Regulation and Bank Risk',
      body: 'A substantial empirical literature examines whether higher capital buffers reduce bank risk-taking and insolvency probability. Berger et al. (2008) found robust evidence that better-capitalized banks in advanced economies exhibit significantly lower failure rates, supporting the theoretical predictions of capital regulation. Using System GMM on a global bank panel, Laeven and Levine (2009) demonstrated that the effect of capital regulation on risk depends critically on ownership concentration, with large shareholders capable of overriding regulatory incentives. For African banking systems specifically, Adusei (2015) found that capital requirements have limited risk-reducing effects, attributing this to weak supervisory enforcement.',
      citations: ['Berger et al. (2008)', 'Laeven & Levine (2009)', 'Adusei (2015)'],
    },
    {
      heading: '3.3 Macroeconomic Determinants',
      body: 'A parallel stream of empirical literature investigates macroeconomic drivers of banking sector stability. GDP growth, inflation, interest rates, and credit cycles have been consistently identified as determinants of bank non-performing loans and Z-scores (Klein, 2013; Nkusu, 2011). The pro-cyclicality of bank lending — where credit expansions coincide with economic booms and contractions amplify downturns — has been well-documented across both developed and emerging market panels (Albertazzi & Gambacorta, 2009). For Sub-Saharan Africa, Boateng et al. (2018) found that macroeconomic volatility significantly increases banking fragility, with the effect amplified in countries with weaker institutional frameworks.',
      citations: ['Klein (2013)', 'Nkusu (2011)', 'Albertazzi & Gambacorta (2009)', 'Boateng et al. (2018)'],
    },
  ],
  synthesis: 'The financial stability literature reveals a field in productive tension. Theoretical frameworks — from Minsky\'s endogenous instability to the Basel regulatory architecture — provide powerful organizing lenses, but empirical evidence consistently reveals context-dependence. The competition-stability debate has not been resolved; rather, it has been productively complicated by recognition that the nexus is non-linear and mediated by institutional quality, market structure, and supervisory capacity. Capital regulation shows strong effects in advanced economies with robust enforcement but weaker effects in environments where supervisory capacity is limited — a finding with significant implications for SSA banking research. The most important emerging theme is that institutional context is not merely a control variable but the primary moderating force shaping whether regulatory mechanisms function as designed.',
  gaps: [
    'No comprehensive panel studies exist on climate risk transmission to SSA bank balance sheets, despite high agricultural loan exposure in these systems.',
    'The interaction between FinTech competition and traditional bank stability is theorized but not rigorously modeled in a panel econometric framework.',
    'Most capital regulation studies treat governance quality as a linear control; its moderating role in shaping the capital-stability slope coefficient is unexplored.',
    'Post-COVID structural break analysis using Bai-Perron tests has not been systematically applied to SSA banking panels.',
    'Cross-border contagion within ECOWAS and SADC monetary zones is understudied despite increasing regional financial integration.',
  ],
  hypotheses: [
    {
      id: 'H1',
      statement: 'Central bank independence is positively associated with banking sector Z-scores in Sub-Saharan Africa.',
      basis: 'Credible monetary policy frameworks reduce macroeconomic volatility that feeds into bank NPLs and insolvency risk (Crowe & Meade, 2008; Klomp & de Haan, 2009).',
      direction: 'positive',
    },
    {
      id: 'H2',
      statement: 'The positive effect of CBI on bank stability is conditional on institutional quality, being stronger in countries with higher governance scores.',
      basis: 'Institutional context mediates regulatory effectiveness (Acemoglu et al., 2008); formal independence requires complementary governance infrastructure to function.',
      direction: 'positive',
    },
    {
      id: 'H3',
      statement: 'Bank competition exhibits a non-linear (inverted-U) relationship with financial stability in SSA.',
      basis: 'The competition-stability nexus is non-linear (Jiménez et al., 2013); moderate competition is beneficial but excessive competition erodes charter value and discipline.',
      direction: 'non-linear',
    },
    {
      id: 'H4',
      statement: 'FinTech penetration negatively moderates the capital-stability relationship, weakening the effectiveness of capital requirements.',
      basis: 'Digital lending creates off-balance-sheet competition that reduces bank franchise value and may incentivize risk-compensating behavior (Boot et al., 2021).',
      direction: 'negative',
    },
  ],
  framework: [
    { id: 'cbi', label: 'Central Bank\nIndependence', type: 'independent', x: 80, y: 180, arrowTo: ['stability', 'transmission'] },
    { id: 'gov', label: 'Governance\nQuality', type: 'moderator', x: 80, y: 320, arrowTo: ['transmission'] },
    { id: 'transmission', label: 'Monetary Policy\nCredibility', type: 'mediator', x: 310, y: 250, arrowTo: ['stability'] },
    { id: 'stability', label: 'Bank Stability\n(Z-Score)', type: 'dependent', x: 530, y: 180 },
    { id: 'fintech', label: 'FinTech\nPenetration', type: 'moderator', x: 310, y: 380, arrowTo: ['stability'] },
    { id: 'gdp', label: 'GDP Growth', type: 'control', x: 530, y: 320 },
    { id: 'inf', label: 'Inflation', type: 'control', x: 530, y: 380 },
  ],
};

export function getLiteratureReview(topic: string): LitReview {
  const key = topic.toLowerCase().trim();
  if (key.includes('financial stability') || key.includes('bank stability') || key.includes('banking')) {
    return financialStabilityReview;
  }
  return {
    topic,
    theoretical: [
      {
        heading: '2.1 Foundational Theories',
        body: `The theoretical foundations of ${topic} research draw from several intellectual traditions. Early contributions established the core mechanisms through which the phenomenon operates, drawing on rational choice frameworks and institutional economics. Subsequent theoretical advances recognized that behavioral factors and structural constraints substantially moderate the core relationships. The current theoretical consensus emphasizes context-dependence and institutional mediation as central to understanding variation in outcomes across countries and time periods.`,
        citations: ['Seminal Author (1985)', 'Theoretical Pioneer (1992)', 'Synthesizer (2001)'],
      },
      {
        heading: '2.2 Institutional and Structural Dimensions',
        body: `A second theoretical stream emphasizes how institutional quality, legal frameworks, and structural factors shape outcomes in ${topic}. This literature draws heavily on North\'s (1990) institutional economics framework and La Porta et al.\'s (1998) legal origins theory. The core insight is that formal mechanisms only function as intended when supported by complementary institutional infrastructure — including rule of law, enforcement capacity, and bureaucratic quality.`,
        citations: ['North (1990)', 'La Porta et al. (1998)', 'Acemoglu et al. (2001)'],
      },
    ],
    empirical: [
      {
        heading: '3.1 Cross-Country Evidence',
        body: `The cross-country empirical literature on ${topic} has grown substantially since the early 2000s, facilitated by improved data availability from the World Bank, IMF, and regional development banks. Panel studies using fixed effects and GMM estimators consistently identify a positive and significant relationship between the focal variable and outcomes of interest in advanced economies, with substantially more heterogeneous results in developing country samples.`,
        citations: ['Panel Study (2008)', 'GMM Analysis (2012)', 'Cross-Country Evidence (2016)'],
      },
      {
        heading: '3.2 Developing Economy Evidence',
        body: `Evidence from Sub-Saharan Africa and other developing regions reveals important departures from patterns established in OECD samples. Institutional quality, data limitations, and structural differences in financial systems mean that theoretical predictions often fail to hold in these contexts. Several studies attribute this to the gap between de jure frameworks and de facto implementation capacity.`,
        citations: ['SSA Study (2015)', 'Developing Economy Panel (2018)', 'African Evidence (2020)'],
      },
    ],
    synthesis: `The ${topic} literature reveals productive tensions between theoretical predictions and empirical realities. Advanced economy findings do not translate uniformly to developing contexts, where institutional quality acts as a primary moderating force. The methodological frontier has shifted toward System GMM and heterogeneous panel approaches that better capture context-dependence. The most important unresolved question concerns the threshold conditions under which theoretical mechanisms activate.`,
    gaps: [
      `SSA regional heterogeneity: pooling diverse African economies obscures important within-region variation in ${topic} effects.`,
      `Non-linear threshold effects: PSTR and threshold regression models have rarely been applied to ${topic} data.`,
      `Post-COVID structural breaks: the 2020 shock likely altered long-run relationships in ways not yet documented.`,
      `Digital transformation variables are almost entirely absent from ${topic} empirical models.`,
    ],
    hypotheses: [
      { id: 'H1', statement: `${topic} is positively associated with macroeconomic stability outcomes.`, basis: 'Theoretical predictions and OECD evidence support a positive baseline relationship.', direction: 'positive' },
      { id: 'H2', statement: `The effect of ${topic} is moderated by institutional quality, being stronger in high-governance environments.`, basis: 'Institutional context mediates regulatory and policy effectiveness across all domains of development economics.', direction: 'positive' },
    ],
    framework: [
      { id: 'indep', label: topic, type: 'independent', x: 80, y: 200, arrowTo: ['med', 'dep'] },
      { id: 'mod', label: 'Governance\nQuality', type: 'moderator', x: 80, y: 340, arrowTo: ['med'] },
      { id: 'med', label: 'Institutional\nTransmission', type: 'mediator', x: 310, y: 270, arrowTo: ['dep'] },
      { id: 'dep', label: 'Outcome\nVariable', type: 'dependent', x: 530, y: 200 },
    ],
  };
}

// ─── SUPERVISOR FEEDBACK ────────────────────────────────────────────────────

export function getSupervisorFeedback(text: string): SupervisorFeedback {
  const lower = text.toLowerCase();
  const hasTopic = lower.length > 50;
  const hasMethod = lower.includes('gmm') || lower.includes('panel') || lower.includes('regression') || lower.includes('ardl') || lower.includes('ols');
  const hasTheory = lower.includes('theor') || lower.includes('hypothesis') || lower.includes('framework');
  const hasGap = lower.includes('gap') || lower.includes('unknown') || lower.includes('limited');
  const hasData = lower.includes('data') || lower.includes('sample') || lower.includes('countries') || lower.includes('panel');

  const methodScore = hasMethod ? 16 : 8;
  const theoryScore = hasTheory ? 18 : 9;
  const gapScore = hasGap ? 14 : 7;
  const dataScore = hasData ? 12 : 6;
  const writingScore = hasTopic ? 14 : 10;
  const total = methodScore + theoryScore + gapScore + dataScore + writingScore + 16;

  return {
    overallScore: total,
    grade: total >= 80 ? 'A' : total >= 65 ? 'B' : total >= 50 ? 'C' : 'D',
    sections: [
      {
        name: 'Problem Statement & Motivation',
        score: writingScore,
        maxScore: 20,
        status: writingScore >= 16 ? 'strong' : writingScore >= 12 ? 'adequate' : 'weak',
        comment: writingScore >= 16
          ? 'Clear identification of the research problem with strong motivation grounded in existing literature.'
          : 'The research problem is identifiable but the motivation lacks sufficient grounding in literature. Strengthen why this gap matters now.',
        suggestions: [
          'Open with the empirical puzzle — a fact the literature cannot yet explain',
          'Explicitly state what is unknown, for whom, and why it matters',
          'Connect the gap to policy relevance (central banks, regulators, multilaterals)',
        ],
      },
      {
        name: 'Theoretical Framework',
        score: theoryScore,
        maxScore: 25,
        status: hasTheory ? 'adequate' : 'weak',
        comment: hasTheory
          ? 'Theoretical grounding is present. Ensure you develop the causal mechanism — not just cite theories, but explain the transmission channels that generate your hypotheses.'
          : 'Missing theoretical framework. This is a critical weakness. Without theory, hypotheses lack logical foundation and reviewers will reject the paper.',
        suggestions: [
          'Map the causal pathway from IV → mediator → DV explicitly',
          'Identify which specific theory generates each hypothesis',
          'Address competing theoretical predictions — why do you expect your finding rather than the opposite?',
        ],
      },
      {
        name: 'Literature Coverage',
        score: gapScore,
        maxScore: 20,
        status: hasGap ? 'adequate' : 'weak',
        comment: hasGap
          ? 'Some awareness of existing literature shown. Ensure you cover seminal papers, recent panel evidence, and SSA-specific studies where applicable.'
          : 'Literature coverage appears thin. A doctoral proposal must demonstrate comprehensive command of the field — not just background, but critical synthesis.',
        suggestions: [
          'Cite the three most-cited papers on your topic (check Google Scholar)',
          'Include at least one meta-analysis or systematic review if available',
          'Explicitly position your contribution relative to the closest existing papers',
        ],
      },
      {
        name: 'Methodology Design',
        score: methodScore,
        maxScore: 20,
        status: hasMethod ? 'adequate' : 'weak',
        comment: hasMethod
          ? 'Methodology identified. Justify your choice — explain why this estimator is appropriate for your data structure and research question. Anticipate and address endogeneity.'
          : 'Methodology is missing or underdeveloped. This is a fatal flaw for empirical research proposals. Specify your estimator, data source, sample period, and identification strategy.',
        suggestions: [
          'State explicitly: data type (panel/TS), N×T dimensions, estimator, and identification strategy',
          'Address endogeneity — is your focal variable potentially endogenous? If so, how will you instrument?',
          'Plan robustness checks: alternative estimators, sub-samples, alternative proxies',
        ],
      },
      {
        name: 'Hypothesis Formulation',
        score: dataScore,
        maxScore: 15,
        status: hasData ? 'adequate' : 'weak',
        comment: hasData
          ? 'Data sources identified. Ensure your hypotheses are testable with available data and that proxy variables adequately capture theoretical constructs.'
          : 'Hypotheses appear too vague to test. Each hypothesis must specify a direction, a measurable proxy, and the theoretical basis for the expected sign.',
        suggestions: [
          'State hypotheses in testable form: "X is positively/negatively associated with Y"',
          'Identify the exact proxy for each theoretical construct',
          'Note potential data limitations and how they affect interpretation',
        ],
      },
    ],
    strengths: [
      hasTopic ? 'Research topic is relevant and timely given current literature trends' : 'Topic selection shows awareness of current academic debates',
      hasMethod ? 'Awareness of appropriate econometric methods demonstrated' : 'Academic writing style is appropriate for the genre',
      hasTheory ? 'Theoretical grounding shows familiarity with core frameworks' : 'Research question is clearly stated',
    ].filter(Boolean),
    criticalIssues: [
      !hasMethod && 'No econometric methodology specified — this must be addressed before submission',
      !hasTheory && 'Theoretical framework is missing — hypotheses without theory are unjustifiable',
      text.length < 200 && 'Proposal is too brief — doctoral proposals require 2,000–5,000 words minimum',
    ].filter(Boolean) as string[],
    recommendations: [
      'Develop a conceptual framework diagram showing IV → moderator/mediator → DV causal pathway',
      'Add a table mapping each hypothesis to its theoretical basis, proxy variable, and data source',
      'Engage with contradictory findings in the literature and explain why your context might differ',
      'Specify your identification strategy for addressing endogeneity in the focal relationship',
      'Add expected contributions: theoretical, methodological, and policy dimensions',
    ],
  };
}

// ─── JOURNAL INTELLIGENCE ───────────────────────────────────────────────────

export const journalDatabase: JournalEntry[] = [
  {
    name: 'Journal of Banking & Finance',
    abbreviation: 'JBF',
    impactFactor: 3.9,
    quartile: 'Q1',
    scope: 'Banking, financial markets, corporate finance, financial intermediation',
    topicFit: ['Financial Stability', 'Bank Regulation', 'Credit Risk', 'Capital Requirements'],
    methodologies: ['Panel GMM', 'Fixed Effects', 'Event Study', 'VAR'],
    avgAcceptanceRate: 12,
    avgReviewTime: '3–4 months',
    wordLimit: '12,000 words',
    citationStyle: 'APA / Harvard',
    notes: 'High rigor standard. Expects IV/GMM for identification. Empirical papers must address endogeneity explicitly.',
  },
  {
    name: 'Journal of Financial Stability',
    abbreviation: 'JFS',
    impactFactor: 3.1,
    quartile: 'Q1',
    scope: 'Systemic risk, macroprudential policy, financial crises, banking sector fragility',
    topicFit: ['Financial Stability', 'Systemic Risk', 'Macroprudential Policy', 'SSA Banking'],
    methodologies: ['System GMM', 'Panel ARDL', 'Quantile Regression', 'Network Analysis'],
    avgAcceptanceRate: 15,
    avgReviewTime: '2–3 months',
    wordLimit: '10,000 words',
    citationStyle: 'Elsevier Author Guidelines',
    notes: 'More receptive to developing country evidence than JBF. Regularly publishes SSA and MENA banking papers.',
  },
  {
    name: 'Economic Modelling',
    abbreviation: 'EM',
    impactFactor: 4.2,
    quartile: 'Q1',
    scope: 'Applied macroeconomics, monetary economics, financial modelling, panel econometrics',
    topicFit: ['Monetary Policy', 'Central Bank Independence', 'Financial Development', 'Growth'],
    methodologies: ['ARDL', 'Panel VAR', 'GMM', 'Bayesian Methods'],
    avgAcceptanceRate: 18,
    avgReviewTime: '2–4 months',
    wordLimit: '8,000 words',
    citationStyle: 'Elsevier',
    notes: 'Strong outlet for SSA panel studies. Accepts methodological contribution papers alongside empirical work.',
  },
  {
    name: 'Journal of International Money and Finance',
    abbreviation: 'JIMF',
    impactFactor: 3.8,
    quartile: 'Q1',
    scope: 'International finance, exchange rates, monetary transmission, open-economy macro',
    topicFit: ['Central Bank Independence', 'Monetary Policy', 'Exchange Rates', 'Financial Integration'],
    methodologies: ['Panel GMM', 'IV-2SLS', 'Cointegration', 'GARCH'],
    avgAcceptanceRate: 14,
    avgReviewTime: '3–5 months',
    wordLimit: '10,000 words',
    citationStyle: 'APA',
    notes: 'Highly competitive. CBI papers with cross-country panel evidence are well-cited in this journal.',
  },
  {
    name: 'Finance Research Letters',
    abbreviation: 'FRL',
    impactFactor: 7.4,
    quartile: 'Q1',
    scope: 'Short empirical notes on finance, banking, and financial markets',
    topicFit: ['Financial Stability', 'Bank Performance', 'FinTech', 'ESG Finance'],
    methodologies: ['OLS', 'Panel FE', 'GMM', 'Event Study'],
    avgAcceptanceRate: 22,
    avgReviewTime: '3–6 weeks',
    wordLimit: '4,500 words',
    citationStyle: 'Elsevier',
    notes: 'Fast turnaround. Ideal for shorter empirical contributions. Note: recent impact factor inflation — field perception varies.',
  },
  {
    name: 'Research in International Business and Finance',
    abbreviation: 'RIBAF',
    impactFactor: 6.3,
    quartile: 'Q1',
    scope: 'Corporate finance, banking, financial markets in international and emerging market context',
    topicFit: ['SSA Banking', 'Financial Stability', 'Governance & Finance', 'Emerging Markets'],
    methodologies: ['GMM', 'Fixed Effects', 'Quantile Regression', 'Panel ARDL'],
    avgAcceptanceRate: 20,
    avgReviewTime: '2–3 months',
    wordLimit: '10,000 words',
    citationStyle: 'Elsevier',
    notes: 'Excellent outlet for developing country banking papers. High acceptance of SSA panel evidence.',
  },
  {
    name: 'African Development Review',
    abbreviation: 'ADR',
    impactFactor: 1.9,
    quartile: 'Q2',
    scope: 'Development economics with African focus — finance, governance, poverty, growth',
    topicFit: ['SSA Finance', 'Financial Inclusion', 'Governance', 'Banking Development'],
    methodologies: ['GMM', 'Panel FE', 'ARDL', 'Probit/Logit'],
    avgAcceptanceRate: 25,
    avgReviewTime: '2–4 months',
    wordLimit: '8,000 words',
    citationStyle: 'APA',
    notes: 'Best-positioned for Africa-focused contributions. Lower IF but high relevance for SSA banking research.',
  },
];

// ─── DATASET HUB ────────────────────────────────────────────────────────────

export const datasetHub: DatasetEntry[] = [
  {
    name: 'BankFocus (Bureau van Dijk)',
    category: 'Bank-Level Financial Data',
    provider: 'Moody\'s / Bureau van Dijk',
    coverage: 'Global banks, 2000–present',
    frequency: 'Annual',
    variables: ['Total Assets', 'Capital Adequacy Ratio', 'NPL Ratio', 'ROA', 'ROE', 'NIM', 'Z-Score inputs', 'Loan-to-Deposit Ratio'],
    format: 'Excel / CSV via web portal',
    access: 'Subscription',
    url: 'bvdinfo.com/bankfocus',
    papers: 4800,
    description: 'The most comprehensive bank-level financial database. Covers balance sheet and income statement data for 30,000+ banks globally. Essential for cross-country banking studies.',
    tags: ['Banking', 'Financial Stability', 'Global', 'Panel Data'],
  },
  {
    name: 'World Bank Global Financial Development Database (GFDD)',
    category: 'Financial Development Indicators',
    provider: 'World Bank',
    coverage: '200+ countries, 1960–2022',
    frequency: 'Annual',
    variables: ['Private Credit / GDP', 'Bank Concentration', 'Net Interest Margin', 'Bank Z-Score', 'Stock Market Cap / GDP', 'Financial Openness'],
    format: 'CSV / API',
    access: 'Free',
    url: 'data.worldbank.org/GFDD',
    papers: 6200,
    description: 'Country-level financial development and stability indicators. Widely used in cross-country studies on finance-growth nexus and banking stability. Free and updated annually.',
    tags: ['Financial Development', 'Banking', 'Free', 'World Bank', 'Panel Data'],
  },
  {
    name: 'IMF Financial Soundness Indicators (FSI)',
    category: 'Macroprudential & Stability',
    provider: 'International Monetary Fund',
    coverage: '190+ countries, 2005–present',
    frequency: 'Quarterly / Annual',
    variables: ['Capital Adequacy', 'Asset Quality (NPL)', 'Earnings & Profitability', 'Liquidity', 'Sensitivity to Market Risk'],
    format: 'CSV / API',
    access: 'Free',
    url: 'data.imf.org/FSI',
    papers: 2100,
    description: 'Official macroprudential indicators submitted by central banks to the IMF. Highest data reliability for banking system soundness metrics. Essential for SSA financial stability research.',
    tags: ['Financial Stability', 'Macroprudential', 'IMF', 'Free', 'SSA'],
  },
  {
    name: 'Cukierman-Webb-Neyapti / Bodea-Hicks CBI Index',
    category: 'Central Banking & Monetary Policy',
    provider: 'Academic (World Bank / Author websites)',
    coverage: '100+ countries, 1950–2020',
    frequency: 'Annual (episodic updates)',
    variables: ['Legal CBI Index (0–1)', 'Governor Turnover Rate', 'CWN Sub-indices'],
    format: 'Excel',
    access: 'Free',
    url: 'worldbank.org / research.worldbank.org',
    papers: 3400,
    description: 'The canonical dataset for measuring central bank independence. Bodea and Hicks (2015) extended the original CWN indices to 2010. Essential for any CBI-inflation or CBI-stability study.',
    tags: ['Central Bank Independence', 'Monetary Policy', 'Free', 'Panel Data'],
  },
  {
    name: 'World Governance Indicators (WGI)',
    category: 'Governance & Institutions',
    provider: 'World Bank (Kaufmann, Kraay, Mastruzzi)',
    coverage: '215 countries, 1996–2022',
    frequency: 'Annual',
    variables: ['Rule of Law', 'Government Effectiveness', 'Control of Corruption', 'Regulatory Quality', 'Political Stability', 'Voice & Accountability'],
    format: 'Excel / CSV / API',
    access: 'Free',
    url: 'info.worldbank.org/governance/wgi',
    papers: 12000,
    description: 'The most widely used governance dataset in empirical economics. Six composite indicators covering all dimensions of institutional quality. Critical control variable in SSA banking and macro studies.',
    tags: ['Governance', 'Institutions', 'Free', 'World Bank', 'Control Variable'],
  },
  {
    name: 'IMF International Financial Statistics (IFS)',
    category: 'Macroeconomic Indicators',
    provider: 'International Monetary Fund',
    coverage: '190+ countries, 1948–present',
    frequency: 'Monthly / Quarterly / Annual',
    variables: ['GDP', 'Inflation (CPI)', 'Exchange Rates', 'Interest Rates', 'Money Supply', 'Balance of Payments'],
    format: 'CSV / API',
    access: 'Free',
    url: 'data.imf.org/IFS',
    papers: 9800,
    description: 'The primary source for macroeconomic time series data. Most macro control variables in banking studies (GDP growth, inflation, real interest rates) are sourced here.',
    tags: ['Macroeconomics', 'Monetary Policy', 'IMF', 'Free', 'Time Series'],
  },
  {
    name: 'Dincer-Eichengreen CBI & Transparency Database',
    category: 'Central Banking & Monetary Policy',
    provider: 'Academic (IJCB supplement)',
    coverage: '120 countries, 1998–2020',
    frequency: 'Annual',
    variables: ['CBI Index', 'Transparency Index', 'Political Independence Score', 'Economic Independence Score'],
    format: 'Excel',
    access: 'Free',
    url: 'ijcb.org (journal supplement)',
    papers: 890,
    description: 'Updated and expanded CBI dataset combining independence with central bank transparency scores. Preferred over CWN for post-2000 studies. Covers communication practices and policy transparency.',
    tags: ['Central Bank Independence', 'Transparency', 'Monetary Policy', 'Free'],
  },
  {
    name: 'GSMA Mobile Money Dataset',
    category: 'FinTech & Digital Finance',
    provider: 'GSMA Intelligence',
    coverage: '90+ countries (SSA focus), 2009–present',
    frequency: 'Annual',
    variables: ['Mobile Money Accounts', 'Transaction Volume', 'Agent Network', 'Mobile Money Penetration'],
    format: 'CSV (registration required)',
    access: 'Free',
    url: 'gsma.com/mobileeconomy',
    papers: 340,
    description: 'The primary data source for mobile money and FinTech penetration research. Especially valuable for SSA studies where mobile money is a primary financial inclusion vector.',
    tags: ['FinTech', 'Mobile Money', 'SSA', 'Financial Inclusion', 'Free'],
  },
];

// ─── EMERGING TRENDS ────────────────────────────────────────────────────────

export const emergingTrends: TrendEntry[] = [
  {
    topic: 'Climate Risk & Banking Stability',
    status: 'rising',
    momentum: 94,
    paperVelocity: '+340% in 3 years',
    horizon: 'Dominant by 2026–2027',
    rationale: 'Central bank mandates are expanding to include climate risk; ECB stress tests now include climate scenarios. SSA banks with high agricultural loan exposure are a natural research frontier.',
    keyDrivers: ['NGFS climate scenario framework', 'Basel IV climate risk guidelines', 'Paris Agreement bank alignment', 'Physical risk quantification advances'],
    relatedTopics: ['Bank Stability', 'Green Finance', 'Transition Risk', 'ESG Banking'],
    citationAcceleration: 3.4,
  },
  {
    topic: 'CBDC Design & Monetary Transmission',
    status: 'rising',
    momentum: 91,
    paperVelocity: '+280% in 2 years',
    horizon: 'Dominant by 2025–2026',
    rationale: 'Over 130 countries are exploring CBDCs. Fundamental questions about disintermediation, monetary transmission, and central bank independence in CBDC systems are entirely open.',
    keyDrivers: ['China DCEP pilot', 'ECB digital euro', 'eNaira (Nigeria) rollout', 'BIS CBDC research agenda'],
    relatedTopics: ['Central Bank Independence', 'Monetary Policy', 'Financial Stability', 'FinTech'],
    citationAcceleration: 4.1,
  },
  {
    topic: 'AI/ML in Credit Risk Modelling',
    status: 'rising',
    momentum: 88,
    paperVelocity: '+210% in 3 years',
    horizon: 'Mainstream by 2025',
    rationale: 'Machine learning models are displacing traditional logistic regression in bank credit scoring. Questions about interpretability, bias, and regulatory acceptance are hot research questions.',
    keyDrivers: ['Fintech lending growth', 'Regulatory sandboxes', 'XGBoost/LightGBM adoption in banking', 'Explainable AI regulation (EU AI Act)'],
    relatedTopics: ['Credit Risk', 'FinTech', 'Financial Inclusion', 'Bank Regulation'],
    citationAcceleration: 2.8,
  },
  {
    topic: 'FinTech & Bank Disintermediation',
    status: 'peaking',
    momentum: 76,
    paperVelocity: '+95% in 4 years',
    horizon: 'Maturing literature',
    rationale: 'The complement vs. substitute debate is approaching resolution. Research is now moving toward heterogeneous effects, interaction with regulation, and SSA-specific evidence.',
    keyDrivers: ['DeFi growth', 'Neobank expansion in SSA', 'Open banking regulation', 'Post-COVID digital acceleration'],
    relatedTopics: ['Financial Stability', 'Financial Inclusion', 'Bank Competition', 'Mobile Money'],
    citationAcceleration: 1.6,
  },
  {
    topic: 'Geopolitical Risk & Financial Markets',
    status: 'emerging',
    momentum: 82,
    paperVelocity: '+520% since 2022',
    horizon: 'Growing frontier 2024–2027',
    rationale: 'Russia-Ukraine war, US-China tensions, and sanctions regimes have created new research questions about geopolitical risk transmission to banking systems and monetary policy.',
    keyDrivers: ['Russia sanctions impact', 'Commodity price volatility', 'De-dollarization debates', 'SWIFT exclusion precedents'],
    relatedTopics: ['Monetary Policy', 'Financial Stability', 'Exchange Rates', 'Commodity Finance'],
    citationAcceleration: 5.2,
  },
  {
    topic: 'Post-COVID Debt Sustainability in SSA',
    status: 'emerging',
    momentum: 79,
    paperVelocity: '+180% since 2021',
    horizon: 'Active frontier 2024–2026',
    rationale: 'SSA sovereign debt surged post-pandemic; multiple debt restructurings and IMF programs create natural experiments for studying fiscal-monetary interactions and banking stability.',
    keyDrivers: ['Zambia/Ghana restructurings', 'China lending exposure', 'IMF program conditionality', 'Eurobond market fragility'],
    relatedTopics: ['Fiscal Dominance', 'Central Bank Independence', 'Sovereign Risk', 'Banking Stability'],
    citationAcceleration: 2.3,
  },
  {
    topic: 'Basel III Implementation in Developing Economies',
    status: 'peaking',
    momentum: 68,
    paperVelocity: '+60% in 5 years',
    horizon: 'Established, maturing',
    rationale: 'Basel III adoption in SSA and South Asia is incomplete and uneven. Research on compliance gaps, implementation capacity, and local-context modifications remains active.',
    keyDrivers: ['BCBS developing country implementation guidance', 'FSB monitoring reports', 'National adaptation of LCR/NSFR'],
    relatedTopics: ['Bank Regulation', 'Financial Stability', 'Capital Requirements', 'SSA Banking'],
    citationAcceleration: 0.9,
  },
  {
    topic: 'Green Bond Markets & Climate Finance',
    status: 'rising',
    momentum: 85,
    paperVelocity: '+390% in 4 years',
    horizon: 'Dominant by 2026',
    rationale: 'Green bond issuance has grown exponentially. Questions about pricing, verification, greenwashing, and impact on bank balance sheets are active research frontiers.',
    keyDrivers: ['COP28/29 climate commitments', 'EU Taxonomy Regulation', 'ICMA green bond principles', 'African Development Bank green issuance'],
    relatedTopics: ['Climate Finance', 'Financial Stability', 'ESG', 'Bank Regulation'],
    citationAcceleration: 3.7,
  },
];
