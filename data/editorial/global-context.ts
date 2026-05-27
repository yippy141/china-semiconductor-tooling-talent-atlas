export type GlobalContextCard = {
  title: string;
  body: string;
  sourceNote: string;
};

export const globalContextCards: GlobalContextCard[] = [
  {
    title: "Talent is a global semiconductor constraint",
    body:
      "New fabs and tool supply chains are creating demand for engineers, technicians, and customer-support roles faster than many training systems can supply them.",
    sourceNote:
      "Use Deloitte, SIA/Oxford, and McKinsey sources from the ledger as framing.",
  },
  {
    title: "China's STEM scale matters, but toolmaking is narrower",
    body:
      "China's broad STEM pipeline gives domestic toolmakers a large upstream pool. The question is whether that pool converts into plasma, thin-film, optics, controls, service, and applications teams.",
    sourceNote:
      "Use CSET STEM PhD framing and MOE discipline sources as context.",
  },
  {
    title: "Support organizations separate product claims from production tools",
    body:
      "Mature equipment vendors compete through installed-base support, applications engineering, spare parts, training, and field service. Chinese filings show pieces of this structure, but not consistently by tool family.",
    sourceNote: "Use firm filings and comparator frame.",
  },
];
