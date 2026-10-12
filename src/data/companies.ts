// KOSA GovTech Singapore 2026 — six Korean GovTech startups.
// Source: each startup's programme one-pager (12 Oct, via the KOSA master
// sheet links). Copy follows the companies' own wording (light edits for
// grammar). Clotho has no one-pager yet (Korean IR only) — its card keeps
// the one-line description from 참여기업 정보 until it arrives. IR decks are
// NOT published (CMK lesson, 7 Oct). Sector labels are ours.
// ponytail: one-pager PDFs aren't linked yet — several still carry another
// programme's footer (CMK / AroundX).

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
    displayName: "Stellarvision Inc.",
    tagline: "Intelligence solutions built on SAR (Synthetic Aperture Radar) satellite data and AI analytics.",
    sector: "Satellite SAR · Geospatial AI",
    stage: "Pre-Series A",
    track: "track1",
    website: "https://www.stellarvision.co.kr",
    email: "business@stellarvision.kr",
    phone: "",
    problem: [],
    solution: [
      "StellarHub (launching Q4 2026): one platform to search, purchase and analyse satellite data with AI.",
      "A virtual constellation of 10+ satellite data partners: SAR, EO and hyperspectral in one place.",
      "LandSight: land monitoring for illegal encroachment and land-change detection.",
    ],
    keyFeatures: [
      "StellarSHIP: dark vessel detection.",
      "FluidVision: pipeline leak detection.",
      "DisasterMap: post-disaster monitoring.",
      "Each solution is ready for joint PoCs.",
    ],
    targetAudience: [],
    businessModel: [],
    businessSnapshot: [
      "300% annual revenue growth · USD 3M Pre-Series A.",
      "25+ contracts · 17+ patents & IP · ISO 9001 · DQ certified.",
      "LandSight supplied to K-water and Jeju Airport (Korea Airports Corporation).",
      "Global PoCs: Indonesia (dark vessels & mining), France (DroneSAR with Thales), Ecuador (with a local partner).",
    ],
    team: [],
    seekingOpportunities: [
      "StellarHub data partners: satellite operators and agencies joining the SAR / EO / hyperspectral platform.",
      "Early-access customers: defence, government and enterprise teams piloting StellarHub before launch.",
      "Regional resellers and SI partners to distribute StellarHub and run joint PoCs.",
    ],
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
      "Hello Unicorn: grant execution, compliance and risk prediction in one platform.",
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
    stage: "Founded 2023 · no outside funding",
    track: "track1",
    website: "https://gobridge.co.kr",
    email: "thinkbig90@naver.com",
    phone: "+82 10-5250-3694",
    problem: [
      "1.22M Work Permit holders rely on employers who control their permits, passports and phones (phase 1: domestic and construction workers).",
      "Official channels are English-first and need a phone, login or visit during office hours.",
      "Fearing dismissal, workers avoid MOM and NGOs, so small doubts become disputes; salary claims grew 33% in two years to 10,801 in 2025.",
    ],
    solution: [
      "GoBridge: 24/7 kiosks at MRT stations, malls and community centres, with no phone, login, data or call charges.",
      "RAG-based AI answers from a verified, NGO-reviewed knowledge base of Singapore labour law.",
      "Routes workers to MOM, MWC, HealthServe or NGOs with a printed referral slip in their language.",
    ],
    keyFeatures: [
      "Ask in 28 languages, including Bahasa Indonesia, Bengali, Tamil and Burmese.",
      "Check labour laws, ask whether an employer's actions are legal, and safely report exploitation.",
      "AI sorts each case and prints an anonymous referral slip for MOM, MWC or partner NGOs.",
    ],
    targetAudience: [
      "Users: migrant workers in Singapore, starting with domestic and construction workers.",
      "B2G clients: Singapore government agencies funding GoBridge as a public service.",
      "Partners: government-backed research agencies such as A*STAR, for AI development (AI3) and kiosk deployment (ARTC).",
    ],
    businessModel: [
      "B2G kiosk platform contracts with governments, as with Ansan City in Korea.",
      "Capital-light: local partners handle hardware; NGOs and sites provide content and reach.",
      "The RAG backend is localised per market: Singapore first, then Hong Kong and Malaysia.",
    ],
    businessSnapshot: [
      "Ansan City: KRW 240M (~USD 170K) GovTech-funded project, 3 kiosks serving 5,000+ foreign residents.",
      "KRW 205M (~USD 145K) revenue in 2025, up 2.1× from 2024, with zero outside funding.",
      "Campus kiosk PoCs at Chonnam National and Sahmyook; paid advisory with 5 universities.",
      "Gwangju Metropolitan City agreement signed; kiosk delivery across Gwangju and Jeonnam scheduled for 2027.",
      "100,000+ admin consultation records · 7 patents · 100% visa Q&A accuracy certified (Jan 2026).",
    ],
    team: [
      {"name": "Tom Kang", "role": "Founder & CEO", "bio": ["Founded HelloFriends in 2023.", "7 years supporting international students in a university finance department.", "Leads B2G partnerships, including Ansan City."]},
      {"name": "Junhyuk Kim", "role": "CTO", "bio": ["Former National Security Research Institute researcher.", "Founded and led a software & IoT company (2017–2023).", "Leads in-house development and security architecture."]},
      {"name": "Wong Ka Ching", "role": "Overseas Business Development", "bio": ["Singaporean; speaks English, Mandarin, Cantonese and Korean (TOPIK 6).", "9 years of work experience in Singapore, 5 in marketing & operations.", "Leads GoBridge localisation and liaison with Singapore agencies and NGOs."]},
    ],
    seekingOpportunities: [
      "Government investment and partnerships with government, NGOs and A*STAR.",
      "2 to 3 pilot kiosk sites in Singapore.",
      "Onsite discussions and surveys to adapt the kiosk service to Singapore's needs.",
    ],
  },
  {
    slug: "shareplat",
    name: "SharePlat",
    displayName: "SharePlat Inc.",
    tagline: "Physical AI robots for safer, faster utility infrastructure work.",
    sector: "Physical AI · Utility infrastructure",
    stage: "Seed",
    track: "track1",
    website: "https://shareplat.net",
    email: "seun80@naver.com",
    phone: "+82 70-8777-9224",
    problem: [
      "Utility cable installation relies on repeated aerial-lift positioning and hazardous work near live power lines.",
      "Manual routing increases labour hours, traffic interruptions, safety risks and project delays.",
    ],
    solution: [
      "ACRL (Autonomous Cable-Routing Line-bot) rides existing messenger wires and cables, automatically laying a guide line for new installations.",
      "Ground-level operators supervise progress remotely, reducing elevated manual work.",
    ],
    keyFeatures: [
      "On-device vision AI recognises cable hangers and obstacles, even with weak connectivity.",
      "Variable arm and clamping wheels pass narrow hanger sections while keeping line contact.",
      "Guide-line reel, tension sensing and an operator app for controlled routing and alerts.",
    ],
    targetAudience: [
      "Singapore: ACRL-U for underground ducts and cable tunnels.",
      "ASEAN: overhead-line ACRL with utilities, telecoms and contractors.",
    ],
    businessModel: [
      "Hardware sales to public utilities, telecom operators and infrastructure contractors.",
      "RaaS subscription, maintenance and deployment support for lower upfront costs.",
      "Field-operation data and AI-based maintenance reporting services.",
    ],
    businessSnapshot: [
      "2025 revenue KRW 1.193B (2023: KRW 384M; 2024: KRW 684M).",
      "KRW 300M seed investment · 3 registered and 5 pending patents.",
      "Industrial work with Kia / Hyundai Motor Group and HD Hyundai Samho.",
      "2026 KEPCO GovTech field validation in progress; 10-span pilot target.",
      "2026 field-trial targets: 95% hanger pass, 90% span routing, 50% faster work, 80% less lift use.",
    ],
    team: [
      {"name": "Jihun Lee", "role": "Founder & CEO", "bio": ["20 years of software and robotics development.", "Leads international partnerships, pilot strategy and commercialisation."]},
      {"name": "Junhyuk Park", "role": "AI & Global BD", "bio": ["Works on robotic vision and object-detection AI.", "Supports global buyer meetings and on-site PoC demonstrations."]},
      {"name": "In-house R&D team", "role": "5 R&D staff", "bio": ["Integrated robotics hardware, navigation and edge AI."]},
    ],
    seekingOpportunities: [
      "Singapore PoC and ACRL-U co-development partners.",
      "ASEAN distributors.",
    ],
  },
  {
    slug: "mediaiplus",
    name: "MEDIAIPLUS",
    displayName: "MEDIAIPLUS, Inc.",
    tagline: "AI-powered business intelligence for clinical trial efficiency.",
    sector: "Clinical-trial AI · CRO matching",
    stage: "Founded 2018",
    track: "track1",
    website: "https://hello.mediaiplus.com",
    email: "business@mediaiplus.com",
    phone: "+82 10 4831 0130",
    problem: [
      "Clinical trial and regulatory information is fragmented across countries, so collecting and comparing data takes time.",
      "Network-dependent CRO searches limit access to comparable capability data and delay partner selection.",
      "Limited specialist resources and budgets raise trial-preparation burdens for emerging drug and medical device developers.",
    ],
    solution: [
      "MediC: integrates global clinical trial data to analyse comparable studies, competing drugs, trial designs and regulatory guidelines.",
      "FiCRO: matches sponsor requirements with CRO capabilities using AI to find suitable trial partners worldwide.",
      "Connects analysis with partner selection, cutting the time and workload of trial preparation.",
    ],
    keyFeatures: [
      "Search and analytics across 770,000+ global clinical trial records and 29,700+ CRO profiles.",
      "AI-powered CRO recommendations using 20+ criteria, including therapeutic expertise, geography, development stage and execution history.",
    ],
    targetAudience: [],
    businessModel: [
      "MediC: B2B licensing for clinical trial data analytics (pharma, biotech, medical device and research institutions).",
      "FiCRO: per-RFP fees for digital CRO discovery and matching.",
    ],
    businessSnapshot: [
      "2025 revenue approx. USD 1.37M, 4.7× growth since 2023.",
      "Total funding raised approx. USD 1.5M.",
      "Global network of 230+ partners.",
      "IFA Best in Tech for Good winner; Edison Awards and WSA nominee.",
    ],
    team: [
      {"name": "Jihee Jung", "role": "Founder & CEO", "bio": ["Pharmacist with a master's degree in the pharmaceutical industry.", "6+ years of MR/MSL experience at Roche Korea, Mundipharma Korea and Bayer Korea."]},
      {"name": "NamGoo Song", "role": "CDPO", "bio": ["Machine learning and data extraction expert.", "Leads AI analytics and platform development."]},
      {"name": "Nayeon Ryoo", "role": "Director", "bio": ["PhD in biotechnology.", "Functional genomics, drug development and clinical trial data analysis."]},
    ],
    seekingOpportunities: [
      "Pilot projects with Singapore pharma, biotech and medtech companies.",
      "CRO partnerships for Southeast Asian expansion.",
      "Investor connections for AI development and regional growth.",
    ],
  },
  {
    slug: "llumos",
    name: "LUMOS",
    displayName: "LLUMOS Co., Ltd.",
    tagline: "Vertical AI agent for grant administration: it understands the company and handles each grant expense end to end, from rule judgment to evidence, filing and approval.",
    sector: "Vertical AI agent · Grant administration",
    stage: "Raising Pre-A · founded 2024",
    track: "track1",
    website: "https://llumos.co/en",
    email: "jin@llumos.co",
    phone: "+82 10-3257-3247",
    problem: [
      "Slow: an accounting-firm review reply takes 1–2 months, so a project gets only about two review cycles.",
      "Every programme differs: 22,000 programme calls, each with its own rules; one cost line can need 10–19 documents.",
      "Mistakes cost money: rejected spend is clawed back. In Singapore, EDG claims are paid only after outcome and audit checks.",
      "The only fix today is more people: agencies and audit firms grow headcount with every new company and programme.",
    ],
    solution: [
      "Company memory (ESM): finance, budget, transactions and evidence kept as one model.",
      "Rule judgment: “Can we spend this?” answered with the cited clause; in a grey zone it asks for the one fact that decides it.",
      "Documents & approval: finds missing evidence, fills forms with company data, routes to the authority and records the result.",
    ],
    keyFeatures: [
      "#1 on rule citation: the same base model goes from 0.000 to 0.648 with LUMOS training and version-aware retrieval.",
      "#1 on document extraction: admin-document score 0.757, filling original HWPX forms as-is.",
      "Self-improving: learns daily from real work and expert feedback; new programme onboarding cut from 3 months to 1 week.",
    ],
    targetAudience: [
      "Grant-claim auditors and accounting firms.",
      "Programme operators and agencies.",
      "Credit & company-data providers, SI / cloud partners and SME finance teams.",
    ],
    businessModel: [
      "Agencies: supply, build and operate contracts — one contract brings hundreds of portfolio companies.",
      "Usage fees: KRW 0.4–1.2M (≈USD 280–850) per company per month; per-engagement contracts for accounting firms.",
      "Grant-spend marketplace: commission when a matched supplier deal closes.",
    ],
    businessSnapshot: [
      "Revenue KRW 554M in FY2025 (+132%); FY2026E KRW 1.0B. Profitable 2 years, zero debt.",
      "83.3% voluntary adoption (265 of 318 LIPS SMEs); agency renewal grew from 318 to 450.",
      "Median resolution time 3 days, down from 1–2 months, with 0 clawbacks.",
      "KRW 8.85B of grant spend processed; 1,414 work requests.",
      "Partners: KODIT BASA two-way API (~560K SMEs), NICE BizINFO, KODATA PoC, NIPA GovTech, TIPA & KEIT data.",
    ],
    team: [
      {"name": "Kyungjin Kim", "role": "Founder & CEO", "bio": ["Korean Certified Public Accountant.", "Deloitte Anjin — grant-fund audit & tax; Shinhan Securities IPO team.", "Built in-house tax software."]},
      {"name": "AI Lead", "role": "AI", "bio": ["Multimodal post-training at LG AI Research · CVPR 2026."]},
      {"name": "Dev Lead", "role": "Engineering", "bio": ["Full-stack engineer, 12 years · multiple AI hackathon awards."]},
    ],
    seekingOpportunities: [
      "One paid pilot where grant claims and accounting evidence review overlap.",
      "Partners: claim audit teams, programme operators, accounting reviewers, company-data providers and Microsoft partners.",
      "Investors for the Pre-A round with an ASEAN B2B or GovTech focus.",
    ],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

// Companies that take 1:1 bookings: the whole cohort on this event.
export const MEETUP_COMPANIES: Company[] = companies;
