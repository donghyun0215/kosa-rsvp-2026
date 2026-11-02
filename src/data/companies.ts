// K-GovTech Open Innovation Day in Singapore — five Korean GovTech startups.
// Source: each startup's programme one-pager (12 Oct, via the KOSA master
// sheet links). Copy follows the companies' own wording (light edits for
// grammar). Clotho's profile follows its one-pager of 2 Nov (it was
// translated from its Korean IR deck until then). IR decks are
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

// track1: the five Korean startups (KOSA) — Demo Day + 1:1s.
// track2: Singapore startups from the Lorong AI community — Demo Day only.
export const TRACKS = {
  track1: {
    title: "KR-SG AI Connect Pitching & Networking",
    theme: "Five Korean GovTech startups selected by KOSA",
    dates: "3 – 4 November 2026",
  },
  track2: {
    title: "KR-SG AI Connect Pitching & Networking",
    theme: "AI startups from Singapore's Lorong AI community",
    dates: "3 November 2026",
  },
} as const;

export const companies: Company[] = [
  {
    slug: "stellarvision",
    onepager: "/onepagers/stellarvision.pdf",
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
    tagline: "The AI agent transforming complex grant administration and management-risk prediction for SME owners and public institutions.",
    sector: "Administrative AI · Grant compliance",
    stage: "Pre-A bridge round",
    track: "track1",
    website: "https://hellounicorn.site",
    email: "lhsgee@gmail.com",
    phone: "+82 10-9326-9904",
    problem: [
      "Administrative overload: grant execution, documentation, settlement reports and audits drain excessive hours from SME founders.",
      "Rapid regulatory changes: labour, tax and R&D compliance rules shift faster than lean startup teams can track.",
      "Late-surfacing risk: grant deadlines, loan repayments and fixed overheads collide, exposing cash shortages when it is already too late.",
    ],
    solution: [
      "AI-powered SME decision engine: Hello Unicorn turns structured grant and R&D workflows into automated AI routines for proactive management.",
      "Predictive risk and compliance checks: continuously evaluates runway, audits payroll allocations across projects and triggers early mitigation warnings.",
    ],
    keyFeatures: [
      "Stability analysis and runway forecaster: real-time visibility into cash runway, stability grades and action-oriented cash-shortfall alerts.",
      "Automated payroll and compliance checker: pre-submission audits that flag overlapping project participation, over-allocation and changing regulatory traps.",
      "Institutional SGMS console: a central console for government agencies to oversee programme budgets, track settlements and review risk queues.",
    ],
    targetAudience: [],
    businessModel: [
      "B2B managed and SaaS admin: KRW 450K–800K (about US$320–570) a month per SME for managed admin, plus B2B add-on services.",
      "B2G and institutional licensing: deployment of the SGMS platform, Stability APIs and Growth Navigator tools for enterprises and public agencies.",
    ],
    businessSnapshot: [
      "Cumulative revenue: KRW 2.5B (about US$1.8M) from 2023 to August 2026, profitable or break-even every year.",
      "Users and retention: 14,840 sign-ups to date, a 98% three-month renewal rate and 72% re-entrusting Clotho with their next grant cycle.",
      "Government validation: An active risk-prediction PoC with KOSME (Korea SMEs and Startups Agency) under NIPA GovTech 2026.",
      "Patents and awards: Patented AI-driven business plan generation (KR 10-2831092); Excellence Awards from KOSME and NIPA.",
    ],
    team: [
      {"name": "Hyun Suk Lee", "role": "Founder & CEO", "bio": ["Research administration and startup operations experience since 2018.", "Expertise in IT service planning, UX/UI design and public–private project management.", "Drives GovTech development, institutional partnerships and cross-border startup collaboration."]},
      {"name": "Chaegyeom Song", "role": "CTO", "bio": ["Leads service engineering, core data-asset architecture and algorithm design."]},
      {"name": "Doyoung Kim", "role": "PM, Research Admin & Data", "bio": ["Oversees research-admin operations, data collection, labelling and workflow structuring."]},
    ],
    seekingOpportunities: [
      "Public agency and GovTech partners: co-designing pilot PoCs using SGMS or the Stability API with Singapore public agencies.",
      "SME-serving ecosystem partners: banks, lenders, accounting and corporate secretarial firms, and SME associations.",
      "Investors: regional investors for the ongoing Pre-A bridge round (target KRW 450M).",
    ],
    onepager: "/onepagers/clotho.pdf",
  },
  {
    slug: "hellofriends",
    onepager: "/onepagers/hellofriends.pdf",
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
      "100,000+ foreigner consultation records across HelloFriends' businesses · 7 patents · 100% visa Q&A accuracy certified (Jan 2026).",
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
    onepager: "/onepagers/shareplat.pdf",
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
    onepager: "/onepagers/mediaiplus.pdf",
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
  // Lorong AI cohort. Source: Nora AI's KR-SG AI Connect one-pager, as
  // lightly edited by Tammy (30 Oct). Photo and logo come from hinora.co.
  {
    slug: "nora-ai",
    name: "Nora AI",
    displayName: "Nora AI",
    tagline: "Prevention and early-intervention tool for behavioural and emotional challenges in early childhood.",
    sector: "Parenting AI · Early childhood",
    stage: "Fundraising",
    track: "track2",
    website: "https://hinora.co",
    email: "mialiu@hinora.co",
    phone: "+65 9640 9568",
    problem: [
      "Limited access to support: evidence-based parenting support is expensive, with long waiting lists for professional help.",
      "The advice-to-action gap: parents struggle to apply positive parenting strategies consistently in everyday situations.",
    ],
    solution: [
      "AI-powered coaching: personalised feedback from real parent–child interaction recordings.",
      "Evidence-based strategies: clinically grounded parenting techniques made practical for everyday life.",
      "Progress tracking: track parenting skills and strengthen parent–child relationships over time.",
    ],
    keyFeatures: [
      "AI voice analysis.",
      "Real-time personalised reports.",
      "Evidence-based learning modules.",
    ],
    targetAudience: [],
    businessModel: [
      "B2C subscriptions: paid subscriptions for parents to access AI coaching and personalised parenting support.",
      "B2B partnerships: with clinics, hospitals and social service organisations to support families at scale.",
      "Enterprise & licensing: licensing AI-powered parenting technology to healthcare providers and family service organisations.",
    ],
    businessSnapshot: [
      "User traction: 2,700+ families reached across Singapore and Taiwan.",
      "Research recognition: pilot findings presented at NUS's Behavioural and Implementation Sciences in Health conference (September 2026).",
      "Innovation: provisional patent for AI-powered caregiver–child interaction analysis through voice.",
    ],
    team: [
      {"name": "Mia Liu", "role": "Co-Founder & CEO", "bio": ["Former Lead AI Product Manager at Temasek and J.P. Morgan.", "Leads product development and business strategy."]},
      {"name": "Dr. Qiu Yihui", "role": "Co-Founder & CAO", "bio": ["PhD in Machine Learning with AI research expertise.", "Leads AI development and technology innovation."]},
      {"name": "Prof. Yi-Chuen Chen", "role": "Clinical Consultant", "bio": ["Clinical child psychologist based in Taiwan.", "Designs and validates the clinical framework for digital delivery."]},
    ],
    seekingOpportunities: [
      "Fundraising.",
      "Market entry to South Korea.",
      "Partnerships.",
    ],
  },
  // Lorong AI cohort. Source: DactSec's one-pager (31 Oct, on the CMK
  // template). Photo is the product screen from dactsec.ai; logo from the one-pager.
  {
    slug: "dactsec",
    name: "DactSec.ai",
    displayName: "DactSec.ai",
    tagline: "Redacts sensitive data from prompts before they reach the AI provider, on-premises.",
    sector: "AI data security · Enterprise",
    stage: "Pre-revenue",
    track: "track2",
    website: "https://www.dactsec.ai",
    email: "preet@enginelitix.ai",
    phone: "+1 917 497 5931",
    problem: [
      "Enterprises using AI have a sensitive data problem: personal, financial and company-specific data leaks out.",
      "Users paste in client information, and each division has its own sensitive patterns. IB and M&A teams handle company names (acquirer and target), project names and more.",
    ],
    solution: [
      "Redacts sensitive data, including company-specific custom patterns.",
      "Sits between the company's or division's AI gateway and the AI provider (Claude and others): redacts the request, then puts the sensitive data back into the response.",
      "Compliance report that logs incidents in line with PDPA requirements.",
    ],
    keyFeatures: [
      "Invisible: the user never sees the redaction, and the AI provider never sees the data.",
      "On-premises: even DactSec never sees the sensitive data.",
      "Math-based AI, no LLMs (that would defeat the purpose).",
      "PDPA-aligned compliance reporting.",
    ],
    targetAudience: [],
    businessModel: [
      "Aimed at enterprises with LLM gateways or wrappers: bank divisions, government divisions and others.",
      "Moat is custom patterns: they take one to two weeks or more to build, and extracting institutional knowledge is harder than it looks. The founder is known for doing it mathematically.",
      "Planned pricing: S$23k a year for generic patterns, unlimited usage, per gateway, up to 100 users. Custom-pattern pricing is being validated.",
      "On-site custom pattern extraction; installed on-premises with licence, support and maintenance included.",
    ],
    businessSnapshot: [
      "Pre-revenue.",
      "Demoed at SWITCH 2026 and ContainerDays, with a highly positive response from banks and interest from smaller companies too.",
    ],
    team: [
      {"name": "Preet Singh", "role": "Founder & CEO", "bio": ["Vendor to a Fortune 50 company; ex-Microsoft AI and IBM.", "Founder of two companies, with 20+ years of research and industry experience (University of Rochester, Northwestern, CMU)."]},
    ],
    seekingOpportunities: [
      "Clients: any company or agency with LLM wrappers or AI gateways, such as banks and government agencies.",
      "Design partners.",
      "Market access.",
      "Investors.",
    ],
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return companies.find((c) => c.slug === slug);
}

// Companies that take 1:1 bookings: the Korean cohort (track1) only.
export const MEETUP_COMPANIES: Company[] = companies.filter((c) => c.track === "track1");
