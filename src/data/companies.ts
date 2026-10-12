// KOSA GovTech Singapore 2026 — six Korean GovTech startups.
// Source: "[마스터파일] KOSA" › 참여기업 정보 (12 Oct): each company's own
// English one-line description, split into tagline + solution. The rest of
// each profile fills in once the one-pagers land (four of six received;
// Stellarvision, Clotho and MEDIAIPLUS still pending). IR decks are NOT
// published (CMK lesson, 7 Oct). Sector labels are ours — short, for cards.

export interface Company {
  slug: string;
  name: string;
  displayName: string;
  tagline: string;
  sector: string;
  stage: string;
  track: "track1" | "track2";
  website: string;
  email: string;
  phone: string;
  problem: string[];
  solution: string[];
  keyFeatures: string[];
  targetAudience: string[];
  businessModel: string[];
  businessSnapshot: string[];
  team: { name: string; role: string; bio: string[] }[];
  seekingOpportunities: string[];
  /** Public path to an English IR deck PDF. Left unset on purpose (see above). */
  irdeck?: string;
  /** Public path to the programme one-pager PDF. */
  onepager?: string;
}

// One cohort on this event; track2 kept empty so shared components compile.
export const TRACKS = {
  track1: {
    title: "KOSA GovTech Singapore 2026",
    theme: "Six Korean GovTech startups selected by KOSA",
    dates: "3 – 4 November 2026",
  },
  track2: {
    title: "",
    theme: "",
    dates: "",
  },
} as const;

export const companies: Company[] = [
  {
    slug: "stellarvision",
    name: "Stellarvision",
    displayName: "Stellarvision",
    tagline: "Satellite data innovation company specializing in SAR (Synthetic Aperture Radar) analytics and AI-driven geospatial intelligence.",
    sector: "Satellite SAR · Geospatial AI",
    stage: "Founded 2021",
    track: "track1",
    website: "https://www.stellarvision.co.kr",
    email: "",
    phone: "",
    problem: [],
    solution: [
      "Satellite data search and analysis, SAR-to-EO conversion and AI object detection.",
      "Built for defense, public-sector and disaster-management organizations."
    ],
    keyFeatures: [],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [],
    team: [],
    seekingOpportunities: [],
  },
  {
    slug: "clotho",
    name: "Clotho",
    displayName: "Clotho Inc.",
    tagline: "AI-driven administrative automation (AX) platform “Hello Unicorn” that manages government-grant execution, compliance and risk prediction for SMEs and public agencies.",
    sector: "Administrative AI · Grant compliance",
    stage: "Founded 2023",
    track: "track1",
    website: "https://hellounicorn.site",
    email: "",
    phone: "",
    problem: [],
    solution: [
      "Hello Unicorn: grant execution, compliance and risk prediction in one platform."
    ],
    keyFeatures: [],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [],
    team: [],
    seekingOpportunities: [],
  },
  {
    slug: "hellofriends",
    name: "HelloFriends",
    displayName: "HelloFriends Co., Ltd.",
    tagline: "Multilingual AI kiosks providing Singapore's migrant community trusted admin answers and safe referrals.",
    sector: "Multilingual AI kiosks · Public services",
    stage: "Founded 2023",
    track: "track1",
    website: "https://gobridge.co.kr",
    email: "",
    phone: "",
    problem: [],
    solution: [
      "GoBridge: a RAG-based AI information kiosk for Singapore's migrant workers."
    ],
    keyFeatures: [],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [],
    team: [],
    seekingOpportunities: [],
  },
  {
    slug: "shareplat",
    name: "SharePlat",
    displayName: "SharePlat Inc.",
    tagline: "Physical AI robots for safer, faster utility infrastructure work.",
    sector: "Physical AI · Utility infrastructure",
    stage: "Founded 2023",
    track: "track1",
    website: "https://shareplat.net",
    email: "",
    phone: "",
    problem: [],
    solution: [
      "ACRL: an autonomous cable-routing line-bot that lays guide lines along existing utility cables.",
      "Built on a VLA dual-arm robot platform for logistics, manufacturing, shipbuilding and agriculture."
    ],
    keyFeatures: [],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [],
    team: [],
    seekingOpportunities: [],
  },
  {
    slug: "mediaiplus",
    name: "MEDIAIPLUS",
    displayName: "MEDIAIPLUS",
    tagline: "Bridging the gap between bio-techs and global CROs with AI.",
    sector: "Clinical-trial AI · CRO matching",
    stage: "Founded 2018",
    track: "track1",
    website: "https://mediaiplus.com",
    email: "",
    phone: "",
    problem: [],
    solution: [
      "FiCRO: an AI-powered, data-driven CRO matching platform that cuts clinical-trial preparation time and cost."
    ],
    keyFeatures: [],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [],
    team: [],
    seekingOpportunities: [],
  },
  {
    slug: "llumos",
    name: "LLUMOS",
    displayName: "LLUMOS Co., Ltd.",
    tagline: "Vertical AI agent for grant administration: it understands the company and handles each grant expense end to end.",
    sector: "Vertical AI agent · Grant administration",
    stage: "Founded 2024",
    track: "track1",
    website: "https://llumos.co/en",
    email: "",
    phone: "",
    problem: [],
    solution: [
      "Handles each grant expense from rule judgment to evidence, filing and approval."
    ],
    keyFeatures: [],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [],
    team: [],
    seekingOpportunities: [],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

// Companies that take 1:1 bookings: the whole cohort on this event.
export const MEETUP_COMPANIES: Company[] = companies;
