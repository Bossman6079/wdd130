// ─── COLLABORATION DATA ─────────────────────────────────────────────────────

export interface Researcher {
  id: string;
  name: string;
  initials: string;
  institution: string;
  country: string;
  flagEmoji: string;
  hIndex: number;
  topics: string[];
  recentPaper: string;
  recentYear: number;
  available: boolean;
  seeking: string[];
  bio: string;
  color: string;
}

export const researchers: Researcher[] = [
  {
    id: 'r1', name: 'Dr. Kwame Asante', initials: 'KA',
    institution: 'University of Ghana', country: 'Ghana', flagEmoji: '🇬🇭',
    hIndex: 18, topics: ['Financial Stability', 'SSA Banking', 'Governance'],
    recentPaper: 'Capital Regulation and Bank Stability in ECOWAS', recentYear: 2023,
    available: true, seeking: ['Co-author', 'Data sharing'],
    bio: 'Assistant Professor specializing in SSA banking fragility, macroprudential regulation, and the role of institutional quality in financial system development.',
    color: '#00D4FF',
  },
  {
    id: 'r2', name: 'Prof. Aisha Diallo', initials: 'AD',
    institution: 'Université Cheikh Anta Diop', country: 'Senegal', flagEmoji: '🇸🇳',
    hIndex: 24, topics: ['Central Bank Independence', 'Monetary Policy', 'CFA Zone'],
    recentPaper: 'CBI and Inflation Dynamics in the WAEMU', recentYear: 2022,
    available: true, seeking: ['Co-author', 'PhD supervision', 'Conference panel'],
    bio: 'Full Professor and former Bank of West Africa advisor. Expert on monetary policy transmission in currency union contexts.',
    color: '#A855F7',
  },
  {
    id: 'r3', name: 'Dr. Fatima Al-Hassan', initials: 'FA',
    institution: 'Cairo University', country: 'Egypt', flagEmoji: '🇪🇬',
    hIndex: 21, topics: ['Islamic Banking', 'Financial Stability', 'MENA Finance'],
    recentPaper: 'Dual Banking Systems and Systemic Risk in MENA', recentYear: 2024,
    available: false, seeking: ['Data sharing', 'Peer review'],
    bio: 'Research Fellow at the African Development Bank. Focuses on Islamic finance stability, dual banking systems, and ESG integration in MENA banking.',
    color: '#00FF88',
  },
  {
    id: 'r4', name: 'Dr. Olumide Adeyemi', initials: 'OA',
    institution: 'University of Lagos', country: 'Nigeria', flagEmoji: '🇳🇬',
    hIndex: 15, topics: ['FinTech', 'Mobile Money', 'Financial Inclusion'],
    recentPaper: 'Mobile Money and Bank Disintermediation in Nigeria', recentYear: 2023,
    available: true, seeking: ['Co-author', 'Data sharing', 'Grant proposal'],
    bio: 'Lecturer and digital finance researcher. Strong background in mobile money data analysis, GSMA datasets, and FinTech regulation in West Africa.',
    color: '#FBB924',
  },
  {
    id: 'r5', name: 'Prof. Thandiwe Mokoena', initials: 'TM',
    institution: 'University of Cape Town', country: 'South Africa', flagEmoji: '🇿🇦',
    hIndex: 31, topics: ['Climate Finance', 'Green Banking', 'Sustainability'],
    recentPaper: 'Climate Stress Testing for Sub-Saharan Banks', recentYear: 2024,
    available: true, seeking: ['PhD students', 'Grant proposal', 'Conference keynote'],
    bio: 'Full Professor and Director of the African Climate Finance Lab. Pioneering climate risk integration into banking supervisory frameworks.',
    color: '#FF6B35',
  },
  {
    id: 'r6', name: 'Dr. Zara Mensah', initials: 'ZM',
    institution: 'KNUST', country: 'Ghana', flagEmoji: '🇬🇭',
    hIndex: 12, topics: ['Financial Stability', 'Governance', 'Panel Econometrics'],
    recentPaper: 'Institutional Quality and Bank NPL Ratios in SSA', recentYear: 2023,
    available: true, seeking: ['Co-author', 'Methodology collaboration'],
    bio: 'PhD graduate and Lecturer specializing in System GMM estimation for banking panels. Active contributor to SSA financial stability literature.',
    color: '#EF4444',
  },
];

export const discussions = [
  {
    id: 'd1', author: 'Dr. Kwame Asante', avatar: 'KA', color: '#00D4FF',
    topic: 'Financial Stability',
    title: 'Instrument proliferation in System GMM — practical solutions?',
    body: 'Running xtabond2 on a 35-country SSA panel. With T=18, my instrument count exceeds N. I\'ve tried collapsing instruments and limiting lag depth to 2. Anyone found a reliable rule for instrument count in SSA panels?',
    replies: 8, likes: 14, time: '2h ago', tags: ['Methodology', 'GMM', 'SSA'],
  },
  {
    id: 'd2', author: 'Prof. Thandiwe Mokoena', avatar: 'TM', color: '#FF6B35',
    topic: 'Climate Finance',
    title: 'Best climate risk proxy for bank loan portfolios in agriculture-heavy economies?',
    body: 'For SSA banks with 40%+ agricultural loan exposure, what\'s the most defensible climate risk proxy? SPEI drought index? Temperature anomalies? Physical risk scores from NGFS? Would love to compare notes.',
    replies: 12, likes: 23, time: '5h ago', tags: ['Climate Risk', 'SSA', 'Methodology'],
  },
  {
    id: 'd3', author: 'Dr. Olumide Adeyemi', avatar: 'OA', color: '#FBB924',
    topic: 'FinTech',
    title: 'GSMA data access for academic research — anyone gotten the full dataset?',
    body: 'Trying to get granular mobile money transaction data for Nigeria 2015–2023. GSMA says academic requests are free but the process is opaque. Has anyone navigated this successfully?',
    replies: 5, likes: 9, time: '1d ago', tags: ['Data', 'Mobile Money', 'GSMA'],
  },
  {
    id: 'd4', author: 'Dr. Zara Mensah', avatar: 'ZM', color: '#EF4444',
    topic: 'Governance',
    title: 'V-Dem vs WGI for institutional quality — which holds up better in SSA?',
    body: 'Using WGI Rule of Law as my governance proxy but reviewers keep flagging the perception-based nature. V-Dem has longer historical coverage and expert codings. Anyone compared their regression results using both?',
    replies: 17, likes: 31, time: '2d ago', tags: ['Governance', 'Data', 'Variables'],
  },
];

// ─── VISUALIZATION TEMPLATES ────────────────────────────────────────────────

export type DiagramType = 'conceptual' | 'causal' | 'methodology' | 'mindmap';

export interface DiagramNode {
  id: string; label: string; x: number; y: number;
  type: string; color: string; shape?: 'rect' | 'diamond' | 'ellipse' | 'circle';
}

export interface DiagramEdge {
  from: string; to: string; label?: string; dashed?: boolean;
}

export interface DiagramTemplate {
  name: string; nodes: DiagramNode[]; edges: DiagramEdge[];
}

export function getTemplate(type: DiagramType, topic: string): DiagramTemplate {
  if (type === 'conceptual') {
    return {
      name: `${topic} — Conceptual Framework`,
      nodes: [
        { id: 'iv',  label: 'Independent\nVariable', x: 120, y: 200, type: 'iv',  color: '#00D4FF', shape: 'rect' },
        { id: 'mod', label: 'Moderator', x: 320, y: 320, type: 'mod', color: '#EF4444', shape: 'diamond' },
        { id: 'med', label: 'Mediator',  x: 320, y: 200, type: 'med', color: '#FBB924', shape: 'ellipse' },
        { id: 'dv',  label: 'Dependent\nVariable',  x: 520, y: 200, type: 'dv',  color: '#00FF88', shape: 'rect' },
        { id: 'cv1', label: 'Control 1', x: 520, y: 320, type: 'cv',  color: '#8BA3B8', shape: 'rect' },
        { id: 'cv2', label: 'Control 2', x: 520, y: 380, type: 'cv',  color: '#8BA3B8', shape: 'rect' },
      ],
      edges: [
        { from: 'iv',  to: 'med', label: 'H1' },
        { from: 'med', to: 'dv',  label: 'H2' },
        { from: 'iv',  to: 'dv',  label: 'H3' },
        { from: 'mod', to: 'dv',  dashed: true, label: 'moderates' },
        { from: 'cv1', to: 'dv' },
        { from: 'cv2', to: 'dv' },
      ],
    };
  }

  if (type === 'causal') {
    return {
      name: `${topic} — Causal Chain`,
      nodes: [
        { id: 'cause',  label: 'Root\nCause',   x: 80,  y: 220, type: 'cause',  color: '#EF4444', shape: 'circle' },
        { id: 'mech1',  label: 'Mechanism 1', x: 240, y: 160, type: 'mech',   color: '#FBB924', shape: 'rect' },
        { id: 'mech2',  label: 'Mechanism 2', x: 240, y: 280, type: 'mech',   color: '#FBB924', shape: 'rect' },
        { id: 'effect', label: 'Primary\nEffect',  x: 400, y: 220, type: 'effect', color: '#00D4FF', shape: 'rect' },
        { id: 'outcome',label: 'Outcome',     x: 560, y: 220, type: 'outcome', color: '#00FF88', shape: 'circle' },
        { id: 'feedback',label: 'Feedback\nLoop', x: 320, y: 380, type: 'fb',    color: '#A855F7', shape: 'ellipse' },
      ],
      edges: [
        { from: 'cause',  to: 'mech1' },
        { from: 'cause',  to: 'mech2' },
        { from: 'mech1',  to: 'effect' },
        { from: 'mech2',  to: 'effect' },
        { from: 'effect', to: 'outcome' },
        { from: 'outcome',to: 'feedback', dashed: true },
        { from: 'feedback',to: 'cause',  dashed: true, label: 'feedback' },
      ],
    };
  }

  if (type === 'methodology') {
    return {
      name: `${topic} — Methodology Flowchart`,
      nodes: [
        { id: 's1', label: 'Research\nQuestion',   x: 320, y: 60,  type: 'start', color: '#00D4FF', shape: 'ellipse' },
        { id: 's2', label: 'Data\nCollection',     x: 320, y: 160, type: 'step',  color: '#E8F4FD', shape: 'rect' },
        { id: 'd1', label: 'Panel\nData?',          x: 320, y: 260, type: 'dec',   color: '#FBB924', shape: 'diamond' },
        { id: 's3', label: 'System\nGMM',           x: 160, y: 360, type: 'step',  color: '#00FF88', shape: 'rect' },
        { id: 's4', label: 'Time\nSeries',          x: 480, y: 360, type: 'step',  color: '#A855F7', shape: 'rect' },
        { id: 's5', label: 'Diagnostics\n& Tests',  x: 320, y: 440, type: 'step',  color: '#E8F4FD', shape: 'rect' },
        { id: 's6', label: 'Robust\nResults?',      x: 320, y: 520, type: 'dec',   color: '#FBB924', shape: 'diamond' },
        { id: 's7', label: 'Conclusion',            x: 320, y: 610, type: 'end',   color: '#00FF88', shape: 'ellipse' },
      ],
      edges: [
        { from: 's1', to: 's2' },
        { from: 's2', to: 'd1' },
        { from: 'd1', to: 's3', label: 'Yes' },
        { from: 'd1', to: 's4', label: 'No' },
        { from: 's3', to: 's5' },
        { from: 's4', to: 's5' },
        { from: 's5', to: 's6' },
        { from: 's6', to: 's7', label: 'Yes' },
        { from: 's6', to: 's2', label: 'No', dashed: true },
      ],
    };
  }

  // mindmap
  return {
    name: `${topic} — Theory Map`,
    nodes: [
      { id: 'center', label: topic,           x: 330, y: 270, type: 'center', color: '#00D4FF', shape: 'circle' },
      { id: 'n1', label: 'Theory 1',          x: 160, y: 150, type: 'branch', color: '#A855F7', shape: 'ellipse' },
      { id: 'n2', label: 'Theory 2',          x: 500, y: 150, type: 'branch', color: '#A855F7', shape: 'ellipse' },
      { id: 'n3', label: 'Methodology',       x: 160, y: 390, type: 'branch', color: '#FBB924', shape: 'ellipse' },
      { id: 'n4', label: 'Key Variables',     x: 500, y: 390, type: 'branch', color: '#00FF88', shape: 'ellipse' },
      { id: 'l1', label: 'Subtopic A',        x: 80,  y: 80,  type: 'leaf',   color: '#8BA3B8', shape: 'rect' },
      { id: 'l2', label: 'Subtopic B',        x: 240, y: 80,  type: 'leaf',   color: '#8BA3B8', shape: 'rect' },
      { id: 'l3', label: 'GMM / IV',          x: 80,  y: 460, type: 'leaf',   color: '#8BA3B8', shape: 'rect' },
      { id: 'l4', label: 'Panel ARDL',        x: 240, y: 460, type: 'leaf',   color: '#8BA3B8', shape: 'rect' },
    ],
    edges: [
      { from: 'center', to: 'n1' }, { from: 'center', to: 'n2' },
      { from: 'center', to: 'n3' }, { from: 'center', to: 'n4' },
      { from: 'n1', to: 'l1' }, { from: 'n1', to: 'l2' },
      { from: 'n3', to: 'l3' }, { from: 'n3', to: 'l4' },
    ],
  };
}

// ─── FORECAST DATA ──────────────────────────────────────────────────────────

export interface FieldForecast {
  topic: string;
  velocitySeries: { year: number; papers: number }[];
  citationSeries: { year: number; citations: number }[];
  forecastYears: { year: number; papers: number; confidence: number }[];
  risingKeywords: { word: string; growth: number; color: string }[];
  fundingTrends: { source: string; amount: string; trend: string; color: string }[];
  predictionSummary: string;
}

export const fieldForecasts: Record<string, FieldForecast> = {
  'Financial Stability': {
    topic: 'Financial Stability',
    velocitySeries: [
      { year: 2016, papers: 180 }, { year: 2017, papers: 210 }, { year: 2018, papers: 265 },
      { year: 2019, papers: 310 }, { year: 2020, papers: 380 }, { year: 2021, papers: 420 },
      { year: 2022, papers: 510 }, { year: 2023, papers: 590 }, { year: 2024, papers: 640 },
    ],
    citationSeries: [
      { year: 2016, citations: 4200 }, { year: 2017, citations: 5100 }, { year: 2018, citations: 6300 },
      { year: 2019, citations: 8100 }, { year: 2020, citations: 11200 }, { year: 2021, citations: 14800 },
      { year: 2022, citations: 18900 }, { year: 2023, citations: 22400 }, { year: 2024, citations: 25600 },
    ],
    forecastYears: [
      { year: 2025, papers: 720, confidence: 88 },
      { year: 2026, papers: 850, confidence: 74 },
      { year: 2027, papers: 980, confidence: 61 },
    ],
    risingKeywords: [
      { word: 'climate stress testing', growth: 340, color: '#00FF88' },
      { word: 'CBDC stability', growth: 280, color: '#00D4FF' },
      { word: 'FinTech systemic risk', growth: 210, color: '#A855F7' },
      { word: 'ESG bank performance', growth: 190, color: '#FBB924' },
      { word: 'crypto contagion', growth: 160, color: '#FF6B35' },
    ],
    fundingTrends: [
      { source: 'World Bank Research', amount: '$12M+', trend: '+45%', color: '#00D4FF' },
      { source: 'IMF Research Grants', amount: '$8M+', trend: '+32%', color: '#00FF88' },
      { source: 'BIS Innovation Hub', amount: '$15M+', trend: '+67%', color: '#A855F7' },
      { source: 'EU Horizon', amount: '$22M+', trend: '+28%', color: '#FBB924' },
    ],
    predictionSummary: 'Financial Stability research is entering a climate-digitalization convergence phase. By 2026, papers integrating climate risk with banking prudential frameworks will represent an estimated 25–30% of all new publications in this field. SSA-focused studies will grow faster than the field average, driven by IMF/World Bank capacity building programs.',
  },
  'Central Bank Independence': {
    topic: 'Central Bank Independence',
    velocitySeries: [
      { year: 2016, papers: 95 }, { year: 2017, papers: 112 }, { year: 2018, papers: 128 },
      { year: 2019, papers: 145 }, { year: 2020, papers: 180 }, { year: 2021, papers: 210 },
      { year: 2022, papers: 245 }, { year: 2023, papers: 270 }, { year: 2024, papers: 295 },
    ],
    citationSeries: [
      { year: 2016, citations: 2800 }, { year: 2017, citations: 3200 }, { year: 2018, citations: 3900 },
      { year: 2019, citations: 4800 }, { year: 2020, citations: 6200 }, { year: 2021, citations: 7800 },
      { year: 2022, citations: 9400 }, { year: 2023, citations: 11200 }, { year: 2024, citations: 12800 },
    ],
    forecastYears: [
      { year: 2025, papers: 330, confidence: 85 },
      { year: 2026, papers: 380, confidence: 70 },
      { year: 2027, papers: 420, confidence: 58 },
    ],
    risingKeywords: [
      { word: 'CBDC independence', growth: 520, color: '#00FF88' },
      { word: 'fiscal dominance threshold', growth: 190, color: '#00D4FF' },
      { word: 'CBI accountability', growth: 165, color: '#FBB924' },
      { word: 'de facto CBI', growth: 140, color: '#A855F7' },
      { word: 'CBI Africa panel', growth: 120, color: '#FF6B35' },
    ],
    fundingTrends: [
      { source: 'IMF Research', amount: '$6M+', trend: '+28%', color: '#00D4FF' },
      { source: 'BIS', amount: '$4M+', trend: '+22%', color: '#00FF88' },
      { source: 'Central Bank Grants', amount: '$9M+', trend: '+35%', color: '#A855F7' },
      { source: 'AFDB', amount: '$3M+', trend: '+41%', color: '#FBB924' },
    ],
    predictionSummary: 'The CBDC era is creating an entirely new dimension of CBI research. Questions about whether digital currency issuance and programmable monetary policy erode traditional independence frameworks are completely open. This sub-field will grow exponentially in 2025–2027. Researchers entering now have first-mover advantage.',
  },
};

export function getForecast(topic: string): FieldForecast {
  const key = Object.keys(fieldForecasts).find(k => topic.toLowerCase().includes(k.toLowerCase()));
  return key ? fieldForecasts[key] : {
    ...fieldForecasts['Financial Stability'],
    topic,
    predictionSummary: `The ${topic} field is showing strong momentum with above-average citation growth. Interdisciplinary integration with AI/ML methods and climate frameworks is the primary driver of new publication volume. SSA-specific evidence remains an underexplored frontier with high publication potential.`,
  };
}

// ─── GAMIFICATION ──────────────────────────────────────────────────────────

export interface Achievement {
  id: string; icon: string; title: string;
  description: string; unlocked: boolean; xp: number;
}

export const achievements: Achievement[] = [
  { id: 'a1', icon: '🔍', title: 'First Search',       description: 'Explored your first research field',              unlocked: true,  xp: 50  },
  { id: 'a2', icon: '🕸', title: 'Graph Explorer',     description: 'Opened the Knowledge Graph',                      unlocked: true,  xp: 75  },
  { id: 'a3', icon: '📝', title: 'Review Writer',      description: 'Generated your first literature review',          unlocked: true,  xp: 150 },
  { id: 'a4', icon: '⚙️', title: 'Method Master',      description: 'Used the Methodology AI recommender',             unlocked: true,  xp: 100 },
  { id: 'a5', icon: '💬', title: 'Field Conversant',   description: 'Had 5+ exchanges with the AI researcher',         unlocked: false, xp: 200 },
  { id: 'a6', icon: '🎓', title: 'Supervised',         description: 'Got your proposal reviewed by the AI Supervisor', unlocked: false, xp: 175 },
  { id: 'a7', icon: '🗄', title: 'Data Archaeologist', description: 'Explored 5+ datasets in the Dataset Hub',         unlocked: false, xp: 125 },
  { id: 'a8', icon: '🏆', title: 'Gap Hunter',         description: 'Identified 10+ research gaps across topics',      unlocked: false, xp: 300 },
  { id: 'a9', icon: '📊', title: 'Variable Expert',    description: 'Looked up 5+ variables in the database',          unlocked: false, xp: 100 },
  { id: 'a10',icon: '🤝', title: 'Collaborator',       description: 'Connected with 3+ researchers',                   unlocked: false, xp: 250 },
  { id: 'a11',icon: '🔮', title: 'Trend Spotter',      description: 'Explored 3+ emerging research trends',            unlocked: false, xp: 150 },
  { id: 'a12',icon: '⭐', title: 'LEXIS Scholar',      description: 'Earned 1,000 total XP',                           unlocked: false, xp: 500 },
];

export const leaderboard = [
  { rank: 1, name: 'Dr. K. Asante',  institution: 'UG',     xp: 4850, badge: '🏆', streak: 34 },
  { rank: 2, name: 'A. Diallo',      institution: 'UCAD',   xp: 4120, badge: '🥈', streak: 28 },
  { rank: 3, name: 'T. Mokoena',     institution: 'UCT',    xp: 3890, badge: '🥉', streak: 21 },
  { rank: 4, name: 'F. Al-Hassan',   institution: 'Cairo',  xp: 3240, badge: '⭐', streak: 19 },
  { rank: 5, name: 'O. Adeyemi',     institution: 'UNILAG', xp: 2970, badge: '⭐', streak: 15 },
  { rank: 6, name: 'You',            institution: 'You',    xp: 375,  badge: '🌱', streak: 3  },
];
