export type GlobalTalentContextRow = {
  economy: string;
  publicSignal: string;
  howToUse: string;
  sourceIds: string[];
};

export const globalTalentContextIntro =
  "Other economies also treat semiconductor talent as a constraint, but public metrics differ. Use these as context, not as direct comparisons.";

export const globalTalentContextRows: GlobalTalentContextRow[] = [
  {
    economy: "United States",
    publicSignal:
      "Industry and policy sources frame semiconductor engineers and technicians as a national shortage risk.",
    howToUse:
      "Useful for demand-side language and workforce categories, not as a like-for-like benchmark against PRC education counts.",
    sourceIds: ["SEC_SIA_WORKFORCE_2023", "SEC_MCKINSEY_TALENT_2024"],
  },
  {
    economy: "Japan",
    publicSignal:
      "Public discussion emphasizes rebuilding semiconductor manufacturing and supplier talent after a long capacity trough.",
    howToUse:
      "Useful as context for mature-tool and supplier know-how, not as a direct comparator to Chinese university output.",
    sourceIds: ["public-source talent supply appendix"],
  },
  {
    economy: "South Korea",
    publicSignal:
      "Public records and industry commentary treat semiconductor talent as a constraint for fabs, memory, logic, and suppliers.",
    howToUse:
      "Useful for understanding cluster absorption pressure, not for ranking against PRC feeder institutions.",
    sourceIds: ["public-source talent supply appendix"],
  },
  {
    economy: "Taiwan",
    publicSignal:
      "The talent issue is often described through foundry, equipment-support, process, and technician bottlenecks.",
    howToUse:
      "Useful for role-family context around process integration and field support, not as a scoreboard item.",
    sourceIds: ["public-source talent supply appendix"],
  },
  {
    economy: "Europe",
    publicSignal:
      "Policy and industry sources frame semiconductor skills as a bottleneck across fabs, research institutes, and equipment ecosystems.",
    howToUse:
      "Useful for comparator caveats because public metrics vary by country, program, and funding scheme.",
    sourceIds: ["SEC_DELOITTE_2026", "SEC_MCKINSEY_TALENT_2024"],
  },
];
