export type ReaderPath = {
  question: string;
  href: string;
  answer: string;
};

export const readerPaths: ReaderPath[] = [
  {
    question: "Which Chinese toolmakers should I watch?",
    href: "/firms",
    answer:
      "Start with AMEC, NAURA, ACM Research Shanghai, Piotech, Jingce, SMEE, and BEIM.",
  },
  {
    question: "What does etch, deposition, or metrology require?",
    href: "/segments/deposition",
    answer:
      "Open the segment briefs to see which role families and disciplines sit behind each tool family.",
  },
  {
    question: "Where might the talent come from?",
    href: "/supply",
    answer:
      "Use the supply page for feeder disciplines, institutions, and the limits of official education data.",
  },
  {
    question: "What should a corporate analyst monitor?",
    href: "/firms/amec",
    answer:
      "Look for field application hiring, service training, customer validation, repeat orders, and support categories.",
  },
  {
    question: "Where is the source record strongest?",
    href: "/explorer",
    answer:
      "Use the explorer and map to inspect filings, park documents, shortage notices, and source records by city or firm.",
  },
  {
    question: "How reliable is this?",
    href: "/methodology",
    answer:
      "Read the methodology and source ledger for evidence types, verification status, and limits.",
  },
];
