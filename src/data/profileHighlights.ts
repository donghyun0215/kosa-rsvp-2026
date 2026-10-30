// Editorial layer for the startup profiles, written as a public-sector
// service brief: an "at a glance" summary, three key figures, the
// references a buyer will look for, and the company's pilot ask. Every
// figure and reference is taken from the company's one-pager (Clotho: IR
// deck) as summarised in companies.ts; the full text stays on the page.
export interface Highlight {
  /** One-line summary of what the service does. */
  does: string;
  /** Who uses or buys it. */
  serves: string;
  /** Public bodies and named partners already using or validating it. */
  references: string[];
  /** Label for the references row ("Proven with" unless they aren't public bodies). */
  referencesLabel?: string;
  /** The pilot or first step they want in Singapore. */
  ask: string;
  /** Label for the ask row ("Wants to pilot" unless it isn't a pilot). */
  askLabel?: string;
  figures: [value: string, label: string][];
  /** One-line problem headline; omitted when the one-pager has no problem section. */
  problem?: string;
}

export const HIGHLIGHTS: Record<string, Highlight> = {
  stellarvision: {
    does: "Search, buy and analyse SAR satellite data with AI, on one platform.",
    serves: "Defence, government and enterprise teams monitoring land, sea and infrastructure.",
    references: ["K-water", "Korea Airports Corporation (Jeju Airport)", "Thales (DroneSAR PoC, France)"],
    ask: "Early-access pilots of StellarHub before its Q4 2026 launch.",
    figures: [
      ["300%", "annual revenue growth"],
      ["25+", "contracts signed"],
      ["17+", "patents and IP"],
    ],
  },
  clotho: {
    does: "Runs government-grant execution, evidence and settlement, and flags the risks early.",
    serves: "Grant-funded SMEs, and the agencies and programme operators that manage them.",
    references: ["KOSME", "SEMAS", "Gwangju Metropolitan City"],
    ask: "A paid pilot in Singapore, leading to an annual contract and API integration.",
    figures: [
      ["KRW 1.6B", "cumulative revenue, with no outside investment"],
      ["<8%", "customer churn"],
      ["3M+", "operational grant records"],
    ],
    problem: "A grant runs for 24–36 months after selection, and the risk sits in spreadsheets and inboxes.",
  },
  hellofriends: {
    does: "24/7 kiosks that answer migrant workers' labour questions in 28 languages and refer cases safely.",
    serves: "Migrant workers in Singapore, starting with domestic and construction workers.",
    references: ["Ansan City", "Chonnam National University (campus PoC)", "Gwangju (agreement signed, delivery in 2027)"],
    ask: "2 to 3 pilot kiosk sites in Singapore.",
    figures: [
      ["28", "languages, including Bengali, Tamil and Burmese"],
      ["100,000+", "foreigner consultation records (across businesses by HelloFriends Co., Ltd.)"],
      ["100%", "visa Q&A accuracy, certified January 2026"],
    ],
    problem: "Many of Singapore's 1.22M Work Permit holders avoid official help, so small doubts turn into disputes.",
  },
  shareplat: {
    does: "A robot that rides existing cables and lays the guide line for new ones, supervised from the ground.",
    serves: "Public utilities, telecom operators and infrastructure contractors.",
    references: ["KEPCO (GovTech field validation)", "Hyundai Motor Group (industrial work)", "HD Hyundai Samho (industrial work)"],
    ask: "A Singapore PoC, and co-developing ACRL-U for underground ducts and cable tunnels.",
    figures: [
      ["KRW 1.19B", "2025 revenue, up from KRW 384M in 2023"],
      ["80%", "less aerial-lift use (2026 field-trial target)"],
      ["3 + 5", "patents registered + pending"],
    ],
    problem: "Cable work means aerial lifts and crews working right beside live power lines.",
  },
  mediaiplus: {
    does: "AI that analyses comparable clinical trials and matches sponsors with the right CRO.",
    serves: "Pharma, biotech and medical-device teams preparing clinical trials.",
    references: ["IFA Best in Tech for Good", "Edison Awards nominee", "WSA nominee"],
    referencesLabel: "Recognised by",
    ask: "Pilot projects with Singapore pharma, biotech and medtech companies.",
    figures: [
      ["770,000+", "global clinical trial records"],
      ["29,700+", "CRO profiles"],
      ["4.7×", "revenue growth since 2023"],
    ],
    problem: "Trial data is scattered by country, and finding a CRO still depends on who you know.",
  },
  "nora-ai": {
    does: "AI coaching for parents, built on recordings of real parent–child interactions.",
    serves: "Parents of young children, and the clinics, hospitals and family services that support them.",
    references: ["NUS Behavioural and Implementation Sciences in Health conference (pilot findings)"],
    referencesLabel: "Recognised by",
    ask: "Fundraising, partnerships and entry into the Korean market.",
    askLabel: "Looking for",
    figures: [
      ["2,700+", "families reached"],
      ["SG · TW", "live in Singapore and Taiwan"],
      ["Patent-pending", "voice analysis of caregiver–child interaction"],
    ],
    problem: "Expert parenting help is costly and slow to reach, and advice is hard to apply day to day.",
  },
};
