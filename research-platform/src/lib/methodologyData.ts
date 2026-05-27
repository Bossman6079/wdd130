export interface MethodologyRecommendation {
  name: string;
  fullName: string;
  rank: 'Primary' | 'Alternative' | 'Supplementary';
  suitability: number;
  rationale: string;
  assumptions: string[];
  diagnostics: string[];
  software: string[];
  pitfalls: string[];
  references: string[];
}

export interface MethodResult {
  summary: string;
  primary: MethodologyRecommendation;
  alternatives: MethodologyRecommendation[];
  concerns: string[];
}

export interface VariableEntry {
  name: string;
  category: string;
  definition: string;
  proxies: { label: string; formula: string; note: string }[];
  strengths: string[];
  weaknesses: string[];
  datasets: { name: string; coverage: string; url_hint: string }[];
  papers: { citation: string; use: string }[];
  related: string[];
}

// ─── METHODOLOGY ENGINE ────────────────────────────────────────────────────

export function recommendMethodology(input: {
  dataType: string;
  panelDimension: string;
  endogeneity: boolean;
  timeSeries: boolean;
  policyEval: boolean;
  sampleSize: string;
  depVar: string;
}): MethodResult {
  const { dataType, endogeneity, timeSeries, policyEval, panelDimension, sampleSize } = input;

  if (policyEval) {
    return {
      summary: 'Your setup — evaluating a policy intervention — calls for a causal identification strategy. Difference-in-Differences is the natural first choice when a treatment/control structure exists.',
      primary: {
        name: 'DiD',
        fullName: 'Difference-in-Differences',
        rank: 'Primary',
        suitability: 94,
        rationale: 'DiD isolates the causal effect of a policy by comparing treated and control units before and after the intervention, removing time-invariant confounders and common trends.',
        assumptions: ['Parallel trends pre-treatment', 'No anticipation effects', 'Stable unit treatment value (SUTVA)', 'No spillovers between treated/control'],
        diagnostics: ['Pre-trend test (event study plot)', 'Callaway & Sant\'Anna heterogeneous treatment timing test', 'Placebo regressions using pre-period data'],
        software: ['Stata: didregress, csdid', 'R: did package (Callaway-Sant\'Anna)', 'Python: econml'],
        pitfalls: ['Staggered adoption violates classical DiD — use Callaway-Sant\'Anna or Sun-Abraham estimator', 'Clustering SEs at the treatment unit level'],
        references: ['Callaway & Sant\'Anna (2021, JoE)', 'Goodman-Bacon (2021, JoE)', 'Athey & Imbens (2022, JoE)'],
      },
      alternatives: [
        {
          name: 'IV-2SLS',
          fullName: 'Instrumental Variables — Two-Stage Least Squares',
          rank: 'Alternative',
          suitability: 78,
          rationale: 'If parallel trends are untenable but a valid instrument exists (e.g., distance to treatment center, lottery assignment), IV-2SLS achieves identification.',
          assumptions: ['Instrument relevance (F-stat > 10)', 'Exclusion restriction', 'Monotonicity'],
          diagnostics: ['First-stage F-statistic', 'Sargan/Hansen overidentification test', 'Weak instrument tests (Kleibergen-Paap)'],
          software: ['Stata: ivreg2', 'R: AER::ivreg', 'Python: linearmodels'],
          pitfalls: ['Weak instruments inflate IV standard errors severely', 'LATE interpretation — only identifies effect for compliers'],
          references: ['Angrist & Pischke (2009, MHE)', 'Bound et al. (1995, JASA)'],
        },
        {
          name: 'RDD',
          fullName: 'Regression Discontinuity Design',
          rank: 'Supplementary',
          suitability: 65,
          rationale: 'If treatment assignment is based on a threshold (e.g., loan size, score cutoff), RDD exploits this for clean causal identification near the cutoff.',
          assumptions: ['No manipulation of running variable at cutoff', 'Continuity of potential outcomes', 'Local randomization around threshold'],
          diagnostics: ['McCrary density test for sorting', 'Placebo cutoffs', 'Bandwidth sensitivity analysis'],
          software: ['Stata: rdrobust, rddensity', 'R: rdrobust package'],
          pitfalls: ['External validity limited to observations near the cutoff', 'Bandwidth selection is sensitive'],
          references: ['Imbens & Lemieux (2008, JoE)', 'Calonico et al. (2014, Econometrica)'],
        },
      ],
      concerns: [
        'Verify parallel trends visually with an event study plot before proceeding',
        'Staggered rollout requires heterogeneous treatment estimators — classical TWFE DiD is biased',
        'Cluster standard errors at the unit of treatment assignment',
      ],
    };
  }

  if (dataType === 'panel' && endogeneity) {
    const isShortPanel = panelDimension === 'large-N-small-T';
    return {
      summary: `Panel data with endogenous regressors is the classic domain of System GMM. The Arellano-Bover/Blundell-Bond estimator is the gold standard for ${isShortPanel ? 'large-N, small-T' : 'dynamic'} panels.`,
      primary: {
        name: 'System GMM',
        fullName: 'System Generalized Method of Moments (Blundell-Bond)',
        rank: 'Primary',
        suitability: 96,
        rationale: 'System GMM simultaneously addresses endogeneity through internal instruments (lagged levels and differences), controls for unobserved country/bank fixed effects, and handles dynamic persistence in the dependent variable.',
        assumptions: ['No serial correlation in error terms (AR2 test)', 'Instruments are valid (Hansen J-test)', 'Stationarity of panel series'],
        diagnostics: ['AR(1) and AR(2) Arellano-Bond autocorrelation tests', 'Hansen J overidentification test (p > 0.1)', 'Difference-in-Hansen test for subset of instruments', 'Instrument count < N (avoid instrument proliferation)'],
        software: ['Stata: xtabond2 (Roodman)', 'R: pgmm (plm package)', 'Python: linearmodels DynamicPanel'],
        pitfalls: ['Instrument proliferation weakens Hansen test — collapse instruments or limit lags', 'Two-step GMM requires Windmeijer (2005) finite-sample corrected SEs', 'Check N > instruments'],
        references: ['Arellano & Bond (1991, RES)', 'Blundell & Bond (1998, JoE)', 'Roodman (2009, Stata Journal)'],
      },
      alternatives: [
        {
          name: 'FE-IV',
          fullName: 'Fixed Effects with External Instruments',
          rank: 'Alternative',
          suitability: 80,
          rationale: 'If you have valid external instruments (e.g., legal origin, colonial history, geographic variables), FE-IV is cleaner and easier to defend than GMM.',
          assumptions: ['Instrument relevance and exclusion restriction', 'Time-invariant individual effects absorbed by FE'],
          diagnostics: ['First-stage F-statistic > 10', 'Durbin-Wu-Hausman endogeneity test', 'Overidentification tests'],
          software: ['Stata: xtivreg2', 'R: plm + ivreg'],
          pitfalls: ['Finding valid external instruments in macro-finance is genuinely hard', 'Within-transformation eliminates time-invariant instruments'],
          references: ['Hausman (1978, Econometrica)', 'Staiger & Stock (1997, Econometrica)'],
        },
        {
          name: 'Panel ARDL',
          fullName: 'Panel Autoregressive Distributed Lag (Pooled Mean Group)',
          rank: 'Supplementary',
          suitability: 72,
          rationale: 'If you want to distinguish long-run vs. short-run dynamics and test cointegration, PMG/MG Panel ARDL is appropriate — especially for macro-level panels.',
          assumptions: ['Long-run homogeneity (for PMG)', 'Variables are I(0) or I(1)', 'Cointegration between variables'],
          diagnostics: ['Im-Pesaran-Shin or Fisher unit root tests', 'Pedroni/Westerlund cointegration tests', 'Hausman test: PMG vs. MG'],
          software: ['Stata: xtpmg', 'R: ardl package', 'EViews: PMG estimator'],
          pitfalls: ['Requires T > 20 for reliable long-run estimates', 'Sensitive to variable selection for the ARDL specification'],
          references: ['Pesaran, Shin & Smith (1999, JRSS)', 'Im, Pesaran & Shin (2003, JoE)'],
        },
      ],
      concerns: [
        'Validate GMM instruments rigorously — many published papers fail the Hansen test',
        'Report both one-step and two-step GMM; prefer two-step with Windmeijer SEs',
        'Limit instrument lag depth (typically 2–4 lags) to avoid proliferation',
        `Sample size note: ${sampleSize === 'small' ? 'Small N weakens GMM — consider bootstrap SEs' : 'Your sample size is adequate for GMM'}`,
      ],
    };
  }

  if (timeSeries) {
    return {
      summary: 'Time series data with potential cointegration calls for bounds testing (ARDL) to capture both long-run equilibrium and short-run dynamics.',
      primary: {
        name: 'ARDL Bounds',
        fullName: 'Autoregressive Distributed Lag Bounds Testing',
        rank: 'Primary',
        suitability: 91,
        rationale: 'ARDL handles mixed-order integration (I(0) and I(1) variables), estimates both long-run and short-run coefficients, and is robust for small samples — common in time series macroeconomics.',
        assumptions: ['No I(2) variables', 'Structural stability (CUSUM test)', 'No serial correlation in residuals'],
        diagnostics: ['Pesaran-Shin-Smith bounds F-test', 'CUSUM / CUSUM-sq stability tests', 'Breusch-Godfrey LM test for autocorrelation', 'White heteroskedasticity test'],
        software: ['EViews: ARDL module', 'Stata: ardl command', 'R: ARDL package'],
        pitfalls: ['Bounds test has low power in small samples (T < 30)', 'Lag selection via AIC/SBC — results sensitive to lag length'],
        references: ['Pesaran & Shin (1999)', 'Pesaran, Shin & Smith (2001, JRSS)'],
      },
      alternatives: [
        {
          name: 'VECM',
          fullName: 'Vector Error Correction Model',
          rank: 'Alternative',
          suitability: 74,
          rationale: 'If all variables are I(1) and cointegrated, VECM captures the speed of adjustment toward long-run equilibrium more explicitly than ARDL.',
          assumptions: ['All series are I(1)', 'Johansen cointegration exists', 'No structural breaks'],
          diagnostics: ['Johansen trace and max-eigenvalue cointegration tests', 'Residual autocorrelation tests', 'Lag exclusion tests'],
          software: ['EViews: VAR/VECM', 'Stata: vecm', 'R: vars package'],
          pitfalls: ['Sensitive to lag order selection', 'Requires all I(1) — mixed orders require ARDL instead'],
          references: ['Johansen (1988, JEconometrics)', 'Engle & Granger (1987, Econometrica)'],
        },
      ],
      concerns: [
        'Test for structural breaks (Zivot-Andrews) before running ARDL — SSA data often has regime changes',
        'Check for ARCH effects in residuals if using financial data',
      ],
    };
  }

  // Default: standard panel
  return {
    summary: 'For a standard panel without strong endogeneity concerns, Fixed Effects is the workhorse — but always run the Hausman test to confirm FE over RE.',
    primary: {
      name: 'Fixed Effects',
      fullName: 'Within-Group Fixed Effects Panel Estimator',
      rank: 'Primary',
      suitability: 85,
      rationale: 'FE controls for all time-invariant unobserved heterogeneity (country culture, geography, legal origin), isolating within-unit variation for identification.',
      assumptions: ['Strict exogeneity of regressors', 'No correlation between errors across time (or cluster SEs)', 'Balanced or missing-at-random panel'],
      diagnostics: ['Hausman test vs. Random Effects', 'F-test for joint significance of unit effects', 'Cluster-robust standard errors at the unit level', 'Wooldridge serial correlation test'],
      software: ['Stata: xtreg, fe', 'R: plm(effect="individual", model="within")', 'Python: linearmodels PanelOLS'],
      pitfalls: ['Eliminates time-invariant variables — cannot estimate effect of legal origin, colonial history, etc.', 'Strict exogeneity violated by lagged dependent variables — use GMM instead'],
      references: ['Mundlak (1978, Econometrica)', 'Chamberlain (1982, RES)'],
    },
    alternatives: [
      {
        name: 'Random Effects',
        fullName: 'Generalized Least Squares Random Effects',
        rank: 'Alternative',
        suitability: 62,
        rationale: 'If Hausman test fails to reject (unit effects uncorrelated with regressors), RE is more efficient and allows time-invariant regressors.',
        assumptions: ['Unit effects uncorrelated with regressors', 'Normal distribution of random effects'],
        diagnostics: ['Hausman specification test', 'Breusch-Pagan LM test for random effects', 'Wooldridge test'],
        software: ['Stata: xtreg, re', 'R: plm(model="random")'],
        pitfalls: ['Hausman test rejection invalidates RE — almost always use FE in practice'],
        references: ['Hausman (1978, Econometrica)'],
      },
    ],
    concerns: [
      'Run Hausman test — if p < 0.05 use FE, otherwise RE is feasible',
      'Cluster standard errors at country/bank level for panel data',
      'If your dependent variable is persistent (like Z-score), add lagged DV and switch to GMM',
    ],
  };
}

// ─── VARIABLE DATABASE ──────────────────────────────────────────────────────

export const variableDatabase: VariableEntry[] = [
  {
    name: 'Bank Stability (Z-Score)',
    category: 'Financial Stability',
    definition: 'A distance-to-default measure capturing the number of standard deviations bank returns must fall before equity is wiped out. Higher values indicate greater stability.',
    proxies: [
      { label: 'Z-Score', formula: '(ROA + CAR) / σ(ROA)', note: 'Most common; σ computed over rolling 3–5 year window' },
      { label: 'Log Z-Score', formula: 'ln(Z-Score)', note: 'Used when Z-Score is right-skewed; improves normality' },
      { label: 'Inverse Z-Score', formula: '1 / Z-Score', note: 'Reframes as fragility rather than stability measure' },
    ],
    strengths: ['Forward-looking; captures buffer before insolvency', 'Available for large samples via BankFocus/Fitch', 'Theoretically grounded in option-pricing framework'],
    weaknesses: ['Sensitive to window length for σ(ROA)', 'Backward-looking if using historical ROA', 'Aggregated to bank level — misses off-balance-sheet risks'],
    datasets: [
      { name: 'BankFocus (Bureau van Dijk)', coverage: 'Global banks, 2000–present', url_hint: 'bvdinfo.com/bankfocus' },
      { name: 'Fitch Connect', coverage: 'Global banks, 1990–present', url_hint: 'fitchsolutions.com' },
      { name: 'World Bank Global Financial Development', coverage: 'Country-level aggregates, 1960–2022', url_hint: 'data.worldbank.org/indicator' },
    ],
    papers: [
      { citation: 'Beck, Demirguc-Kunt & Levine (2006, JFSR)', use: 'Seminal application to competition-stability nexus' },
      { citation: 'Laeven & Levine (2009, JFE)', use: 'Ownership structure and Z-score' },
      { citation: 'Berger, Klapper & Turk-Ariss (2009, JFSR)', use: 'Competition-fragility vs competition-stability debate' },
    ],
    related: ['Non-Performing Loan Ratio', 'Capital Adequacy Ratio', 'Return on Assets'],
  },
  {
    name: 'Non-Performing Loan Ratio',
    category: 'Financial Stability',
    definition: 'The share of loans that are past due or unlikely to be repaid. A rising NPL ratio signals deteriorating credit quality and potential future bank losses.',
    proxies: [
      { label: 'NPL Ratio', formula: 'Gross NPL / Total Gross Loans × 100', note: 'Standard IMF/World Bank definition' },
      { label: 'Net NPL Ratio', formula: '(NPL − Provisions) / Total Loans', note: 'Adjusts for provisioning adequacy' },
      { label: 'NPL Coverage Ratio', formula: 'Loan Loss Provisions / NPL', note: 'Measures adequacy of bank reserves' },
    ],
    strengths: ['Directly measures asset quality', 'Reported in regulatory filings; widely available', 'Leading indicator of future bank distress'],
    weaknesses: ['Backward-looking — reflects past underwriting decisions', 'Manipulation risk: banks may evergreen loans to hide NPLs', 'Cross-country NPL definitions vary (90-day vs 180-day rule)'],
    datasets: [
      { name: 'IMF Financial Soundness Indicators', coverage: '190+ countries, 2005–present', url_hint: 'data.imf.org/FSI' },
      { name: 'World Bank Global Financial Development Database', coverage: '200+ countries, 1990–2022', url_hint: 'data.worldbank.org/GFDD' },
      { name: 'BankFocus Individual Bank Data', coverage: 'Global bank-level, 2000–present', url_hint: 'bvdinfo.com' },
    ],
    papers: [
      { citation: 'Klein (2013, IMF WP)', use: 'Macroeconomic determinants of NPLs in Europe' },
      { citation: 'Nkusu (2011, IMF WP)', use: 'NPLs and macrofinancial vulnerabilities' },
      { citation: 'Louzis, Vouldis & Metaxas (2012, JBF)', use: 'Greek bank NPL determinants' },
    ],
    related: ['Z-Score', 'Loan Loss Provisions', 'Capital Adequacy Ratio'],
  },
  {
    name: 'Central Bank Independence Index',
    category: 'Monetary Policy',
    definition: 'A composite measure of the legal and institutional autonomy of a central bank from government control, covering terms of governors, policy objectives, and financial independence.',
    proxies: [
      { label: 'CWN Index', formula: 'Composite of 16 legal characteristics (0–1 scale)', note: 'Cukierman, Webb & Neyapti (1992) — most cited' },
      { label: 'GMT Index', formula: 'Grilli, Masciandaro & Tabellini (1991) composite', note: 'Focuses on OECD; political + economic independence' },
      { label: 'Dincer-Eichengreen Transparency Index', formula: 'Combined CBI + transparency score', note: 'Updated through 2020; captures communication practices' },
    ],
    strengths: ['Captures legal framework comprehensively', 'Wide country-year coverage (CWN updated by Bodea & Hicks)', 'Allows cross-country comparison'],
    weaknesses: ['De jure vs. de facto gap — legal independence ≠ actual autonomy', 'Static within reform episodes — misses gradual erosion', 'Subjectivity in coding legal texts'],
    datasets: [
      { name: 'Cukierman-Webb-Neyapti Dataset', coverage: '70+ countries, 1950–2020 (Bodea-Hicks update)', url_hint: 'Available from authors / World Bank' },
      { name: 'Dincer-Eichengreen CBI Database', coverage: '120 countries, 1998–2020', url_hint: 'Available via IJCB journal supplement' },
      { name: 'Central Bank Hub (BIS)', coverage: 'Institutional data, qualitative', url_hint: 'bis.org/cbhub' },
    ],
    papers: [
      { citation: 'Cukierman, Webb & Neyapti (1992, WB Econ Rev)', use: 'Foundational CBI measurement paper' },
      { citation: 'Alesina & Summers (1993, JMCB)', use: 'CBI-inflation correlation in OECD countries' },
      { citation: 'Dincer & Eichengreen (2014, IJCB)', use: 'Updated CBI and transparency indices' },
    ],
    related: ['Governor Turnover Rate', 'Inflation Rate', 'Inflation Volatility'],
  },
  {
    name: 'Financial Development Index',
    category: 'Financial Development',
    definition: 'A multi-dimensional index capturing depth, access, and efficiency of financial institutions and markets in an economy.',
    proxies: [
      { label: 'Private Credit / GDP', formula: 'Domestic credit to private sector / GDP × 100', note: 'Most widely used depth proxy; World Bank data' },
      { label: 'IMF FD Index', formula: 'Composite of 6 sub-indices (depth, access, efficiency)', note: 'Svirydzenka (2016) IMF WP; most comprehensive' },
      { label: 'Stock Market Cap / GDP', formula: 'Listed market cap / GDP', note: 'Markets dimension; complements credit-based measures' },
    ],
    strengths: ['IMF composite captures multi-dimensional nature', 'Private Credit proxy has 200+ country coverage', 'Well-established in the growth-finance literature'],
    weaknesses: ['Private Credit / GDP conflates quantity with quality', 'IMF FD index has gaps for SSA pre-2000', '"Too much finance" problem — non-linear effects above ~100% GDP threshold'],
    datasets: [
      { name: 'World Bank Financial Development', coverage: '200+ countries, 1960–2022', url_hint: 'data.worldbank.org/GFDD' },
      { name: 'IMF Financial Development Database', coverage: '183 countries, 1980–2019', url_hint: 'IMF.org/FDdatabase (Svirydzenka 2016)' },
      { name: 'BIS Credit Statistics', coverage: '43 countries, 1961–present', url_hint: 'bis.org/statistics/totcredit' },
    ],
    papers: [
      { citation: 'King & Levine (1993, QJE)', use: 'Finance-growth nexus founding paper' },
      { citation: 'Arcand, Berkes & Panizza (2015, JEG)', use: '"Too much finance?" non-linear threshold finding' },
      { citation: 'Svirydzenka (2016, IMF WP)', use: 'Comprehensive IMF FD index construction' },
    ],
    related: ['Private Credit / GDP', 'Interest Rate Spread', 'Bank Concentration'],
  },
  {
    name: 'Institutional Quality',
    category: 'Governance',
    definition: 'Composite measures of the quality of governance, legal institutions, rule of law, and public sector effectiveness in a country.',
    proxies: [
      { label: 'WGI Composite', formula: 'Average of 6 World Governance Indicators (−2.5 to +2.5)', note: 'Kaufmann et al.; most cited in cross-country work' },
      { label: 'Rule of Law', formula: 'Single WGI dimension (−2.5 to +2.5)', note: 'Most relevant for financial sector studies' },
      { label: 'ICRG Index', formula: 'International Country Risk Guide composite (0–100)', note: 'Covers political, financial, economic risk; higher frequency than WGI' },
      { label: 'Polity IV Score', formula: 'Democracy-autocracy scale (−10 to +10)', note: 'Captures political regime type; available from 1800' },
    ],
    strengths: ['WGI covers 200+ countries annually from 1996', 'ICRG allows higher-frequency analysis', 'Multiple dimensions allow decomposition of governance effects'],
    weaknesses: ['WGI uses perception-based surveys — endogeneity risk', 'Aggregation masks heterogeneity of governance dimensions', 'Breaks in series across index revisions'],
    datasets: [
      { name: 'World Bank WGI Database', coverage: '215 countries, 1996–2022', url_hint: 'info.worldbank.org/governance/wgi' },
      { name: 'ICRG (PRS Group)', coverage: '140 countries, 1984–present', url_hint: 'prsgroup.com/icrg — requires subscription' },
      { name: 'V-Dem Dataset', coverage: '180 countries, 1789–present', url_hint: 'v-dem.net — free download' },
    ],
    papers: [
      { citation: 'Kaufmann, Kraay & Mastruzzi (2010, WB WP)', use: 'WGI construction and methodology' },
      { citation: 'Acemoglu, Johnson & Robinson (2001, AER)', use: 'Institutions as fundamental cause of development' },
      { citation: 'La Porta et al. (1998, JPE)', use: 'Legal origins and financial development' },
    ],
    related: ['Rule of Law', 'Corruption Index', 'Political Stability'],
  },
];

export function searchVariables(query: string): VariableEntry[] {
  if (!query.trim()) return variableDatabase;
  const q = query.toLowerCase();
  return variableDatabase.filter(v =>
    v.name.toLowerCase().includes(q) ||
    v.category.toLowerCase().includes(q) ||
    v.definition.toLowerCase().includes(q) ||
    v.related.some(r => r.toLowerCase().includes(q)) ||
    v.proxies.some(p => p.label.toLowerCase().includes(q))
  );
}
