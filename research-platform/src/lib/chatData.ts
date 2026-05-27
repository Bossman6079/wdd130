export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const responses: Record<string, string> = {
  default: `That's a rich question. The literature is divided on this, with at least two distinct schools of thought. Early theoretical work established the foundational mechanism, but empirical evidence — especially from developing economies — reveals significant heterogeneity. Institutional quality, legal frameworks, and data availability all moderate the relationship. The most cited papers suggest the effect is context-dependent and non-linear, which means your research context matters enormously for the interpretation.`,
};

const fieldResponses: Record<string, Record<string, string>> = {
  'financial stability': {
    'why do findings differ': `Great question. The divergence in Financial Stability findings stems from three core sources:\n\n**1. Definitional inconsistency** — Some studies use Z-scores, others use NPL ratios, CAR, or systemic risk measures. These capture fundamentally different dimensions of stability.\n\n**2. Sample heterogeneity** — Pooling OECD banks with SSA banks ignores massive institutional differences. The competition-stability nexus, for instance, is positive in developed markets but ambiguous or negative in weak-institution environments.\n\n**3. Endogeneity** — Stability and most explanatory variables (capital, competition, regulation) are simultaneously determined. Studies not using IV, GMM, or natural experiments risk reverse causality.\n\nThe most honest answer: many contradictions in this literature are **methodological artifacts**, not true disagreements about the underlying reality.`,
    'best methodology': `For a panel study on banking stability, the methodological hierarchy looks like this:\n\n**Tier 1 — System GMM (Arellano-Bond/Blundell-Bond)**\n→ Handles endogeneity, unobserved heterogeneity, and dynamic persistence of Z-scores\n→ Use 2-step with Windmeijer-corrected SEs\n→ Validate with Hansen J-stat and AR(2) test\n\n**Tier 2 — Panel Fixed Effects with IV**\n→ Appropriate if your focal variable is plausibly exogenous\n→ Hausman test to choose FE over RE\n\n**Tier 3 — Quantile Panel Regression**\n→ Captures heterogeneous effects across the stability distribution\n→ Reveals if results hold only for already-fragile banks\n\nAvoid OLS — it's inconsistent for dynamic panels and will overstate persistence.`,
    'research gap': `The most underexplored gaps in Financial Stability as of 2024:\n\n🔴 **Climate Risk → Bank Balance Sheets in SSA** — Physical risk (agricultural loan exposure) and transition risk (carbon-intensive sectors) have no comprehensive panel treatment for Africa.\n\n🔴 **FinTech Deposit Migration** — Digital wallets pulling deposits from traditional banks affect the LDR and liquidity management in ways the literature hasn't modeled.\n\n🟡 **Governance as Moderator** — Most studies include WGI as a control. Nobody has properly modeled it as an interaction term asking: "Does regulatory quality change the slope of the capital-stability relationship?"\n\n🟡 **Post-COVID Structural Breaks** — Bai-Perron tests on pre/post-2020 panels are conspicuously absent.\n\nAny of these would make a strong PhD contribution.`,
    default: `The Financial Stability literature has evolved dramatically since Minsky's Financial Instability Hypothesis (1977). The field now integrates banking theory, macroprudential regulation, and institutional economics. Key debates revolve around: (1) the competition-stability nexus, (2) the role of capital regulation, (3) deposit insurance design, and (4) systemic risk measurement. The methodological frontier has shifted toward System GMM, quantile approaches, and network models. What specific aspect would you like to explore?`,
  },
  'central bank independence': {
    'why do findings differ': `The CBI-inflation literature shows a striking pattern: strong results in OECD countries, weak or null results in developing economies. Here's why:\n\n**De jure vs. de facto independence** — Legal CBI indices (Cukierman-Webb-Neyapti) measure what's written in central bank laws. But in many SSA and low-income countries, political interference operates informally — through budget pressures, informal appointments, or fiscal dominance. The gap between legal and actual independence explains most of the divergence.\n\n**Fiscal dominance** — When governments run large deficits, central banks are often pressured to monetize debt regardless of their formal mandate. Sargent & Wallace (1981) showed that in fiscally dominant regimes, tight monetary policy today may actually increase future inflation.\n\n**Sample period effects** — Pre-1990 studies show stronger CBI-inflation links because the variation in inflation was larger. Post-2008 QE has muddied the relationship in developed economies too.`,
    default: `Central Bank Independence research has moved through several waves. The 1990s empirical work (Alesina, Cukierman) found robust negative correlations between CBI and inflation in OECD countries. The 2000s brought skepticism about developing economies, where de facto independence often diverges from de jure indices. Post-GFC, the debate shifted to whether CBI is compatible with financial stability mandates, unconventional policy tools, and accountability demands. Current frontiers include CBDC governance, climate mandates, and the political economy of CBI erosion. What would you like to dig into?`,
  },
};

export function getMockResponse(field: string, userMessage: string): string {
  const fieldKey = field.toLowerCase().trim();
  const msgKey = userMessage.toLowerCase();

  const fieldData = fieldResponses[fieldKey];
  if (fieldData) {
    for (const [key, resp] of Object.entries(fieldData)) {
      if (key !== 'default' && msgKey.includes(key)) return resp;
    }
    return fieldData.default ?? responses.default;
  }

  if (msgKey.includes('gap') || msgKey.includes('underexplored')) {
    return `In the ${field} literature, the most pressing gaps are methodological (non-linear models rarely applied), geographic (SSA and South Asia under-represented), and temporal (post-2020 evidence thin). Digital transformation variables are almost entirely missing from empirical models. Any of these represents a viable research contribution.`;
  }
  if (msgKey.includes('method') || msgKey.includes('gmm') || msgKey.includes('regression')) {
    return `For ${field} research, methodology choice depends on your data structure. Panel data with endogenous regressors → System GMM. Time-series with cointegration → ARDL bounds test. Policy evaluation with treatment/control groups → Difference-in-Differences. Heterogeneous treatment effects → Quantile regression. The key question is whether your focal variable is endogenous — if so, GMM or IV is essential.`;
  }
  if (msgKey.includes('theory') || msgKey.includes('theoretical')) {
    return `The theoretical landscape of ${field} is contested. Foundational frameworks from the 1980s–1990s established the core mechanisms, but institutional and behavioral extensions from the 2000s revealed that context mediates almost everything. The emerging synthesis is that structural factors (institutions, development level, governance) determine which theoretical predictions hold empirically.`;
  }

  return `The ${field} literature shows significant evolution over the past four decades. Early theoretical work established mechanisms that empirical research has since both confirmed and complicated. The most important insight is that results are highly context-dependent — developed vs. developing economies, pre vs. post-crisis periods, and strong vs. weak institutional environments all produce systematically different findings. What specific angle — theory, methodology, contradictions, or gaps — would you like to explore?`;
}

export const suggestedQuestions = [
  'Why do findings differ across regions?',
  'What is the best methodology for this topic?',
  'What are the key research gaps?',
  'Which theories are most contested?',
  'How has this field evolved since 2008?',
  'What variables are most commonly used?',
];
