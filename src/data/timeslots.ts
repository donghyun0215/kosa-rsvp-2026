export interface Timeslot {
  id: string;
  label: string;
  time: string;
}

// ── KR-SG AI Connect Pitching & Networking (KOSA × Lorong AI) ──
// Renamed from "K-GovTech Open Innovation Day in Singapore" per the KOSA ×
// Lorong AI plan (24 Oct; name still marked TBD there).
// Everything event-specific lives in this file, so a confirmed venue or time
// is a one-line change. Source: "[마스터파일] KOSA" (주요 안내 + 일정표_TBC),
// read 12 Oct. Programme 2–6 Nov; public days are the Demo Day (Tue 3 Nov,
// Lorong AI) and the 1:1 business meetings (Wed 4 Nov, NULDAM) — order
// swapped by Tammy on 23 Oct.
export const SITE_URL = "https://kosa-rsvp-2026.vercel.app";
// A Korea–Singapore programme (Tammy, 25 Oct): organised by KOSA and Lorong AI,
// with Korea's MSIT and NIPA and Singapore's MDDI.
export const CREDITS = "Organised by the Korea AI·Software Industry Association (KOSA) and Lorong AI, with Korea's Ministry of Science and ICT (MSIT) and NIPA and Singapore's Ministry of Digital Development and Information (MDDI)";

export const EVENT_NAME = "KR-SG AI Connect Pitching & Networking";
export const EVENT_NAME_SHORT = "KR-SG AI Connect";
export const EVENT_NAME_LINE1 = "KR-SG AI Connect";
export const EVENT_NAME_LINE2 = "Pitching & Networking · 1:1 Meetings";

export const EVENT_DATE = "Tuesday, 3 November 2026";
export const EVENT_DAY_SHORT = "Tue 3 Nov";
export const EVENT_TIME = "14:30 – 20:00";
// Tammy, 23 Oct: Demo Day moves from Suntec to Lorong AI (Vidacity, one-north).
export const EVENT_VENUE = "Lorong AI";
export const EVENT_ADDRESS = "Vidacity, Level 3, 69 Ayer Rajah Crescent, Singapore 139961";
export const EVENT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Lorong+AI+69+Ayer+Rajah+Crescent+Singapore+139961";
// Pitching runs at Lorong AI; the networking dinner moves to The Meeting Point.
export const DINNER_VENUE = "The Meeting Point";
export const DINNER_ADDRESS = "73B Ayer Rajah Crescent, Singapore 139966";
export const DINNER_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=The+Meeting+Point+73B+Ayer+Rajah+Crescent+Singapore+139966";

// Public 1:1 self-booking, same model as KIMST/CMK.
export const ONE_ON_ONE_OPEN = true;

// 1:1 meetings Wed 4 Nov at NULDAM: three 40-minute rounds (ops sheet
// "1:1 밋업", Tammy 23 Oct). IDs are stable references
// stored in bookings — change labels/times freely, never the ids.
export const TIMESLOTS: Timeslot[] = [
  { id: "slot1", label: "Round 1", time: "14:30 – 15:10" },
  { id: "slot2", label: "Round 2", time: "15:20 – 16:00" },
  { id: "slot3", label: "Round 3", time: "16:10 – 16:50" },
];
export const MEETUP_TIME = "14:30 – 16:50";
export const MEETUP_DATE = "Wednesday, 4 November 2026";
export const MEETUP_DAY_SHORT = "Wed 4 Nov";
export const MEETUP_VENUE = "NULDAM Space";
export const MEETUP_ADDRESS = "2 Orchard Link, #02-14/15, *SCAPE, Singapore 237978";
export const MEETUP_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=*SCAPE+2+Orchard+Link+Singapore+237978";

// Kept for API compatibility with the booking engine; every company offers
// every round.
export const ROUND3_COMPANY_SLUGS: string[] = [];
export function isSlotOffered(_companySlug: string, _timeslotId: string): boolean {
  return true;
}

export interface ProgramBlock {
  id: "showcase" | "lunch" | "meetups";
  title: string;
  time: string;
  description: string;
}

// NOTE: ids map to RSVP columns (attend_showcase / attend_lunch /
// attend_meetups). "lunch" is the networking dinner — legacy column name.
export const PROGRAM: ProgramBlock[] = [
  {
    id: "showcase",
    title: "Startup pitching",
    time: "15:00 – 17:10",
    description: "Welcome from Lorong AI and KOSA, then two pitching sessions (5 min pitch, 5 min Q&A each) and the judges' feedback. Registration from 14:30.",
  },
  {
    id: "lunch",
    title: "Networking dinner",
    time: "17:10 – 20:00",
    description: "Dinner at The Meeting Point with the founders, agencies, investors and partners.",
  },
  {
    id: "meetups",
    title: "1:1 Business Meetings",
    time: `${MEETUP_DAY_SHORT} · ${MEETUP_TIME}`,
    description: "Private meetings with the startups of your choice, the afternoon after the Demo Day.",
  },
];

// Demo Day run of show (KOSA × Lorong AI proposed agenda, 24 Oct). Shown on the RSVP page.
// Third element: venue, when a row isn't at EVENT_VENUE.
export const DEMO_AGENDA: [time: string, item: string, venue?: string][] = [
  ["14:30 – 15:00", "Registration and reception"],
  ["15:00 – 15:02", "Opening"],
  ["15:02 – 15:10", "Introduction to Lorong AI and welcome remarks"],
  ["15:10 – 15:18", "Introduction to KOSA"],
  ["15:18 – 15:20", "Introduction of the judges"],
  ["15:20 – 16:00", "Pitching session 1 (4 startups)"],
  ["16:00 – 16:10", "Break"],
  ["16:10 – 16:50", "Pitching session 2 (4 startups)"],
  ["16:50 – 17:00", "Judges' overall feedback"],
  ["17:00 – 17:10", "Group photo"],
  ["17:10 – 20:00", "Networking dinner", DINNER_VENUE],
];

// ── Legacy side-track exports (no side track on this event) ─────────
export const NULDAM_VENUE = "";
export const NULDAM_ADDRESS = "";
export const NULDAM_MAP_URL = "";
export interface NuldamTrack {
  id: "track1" | "track2";
  dateLabel: string;
  timeRange: string;
  slots: Timeslot[];
}
export const NULDAM_TRACKS: NuldamTrack[] = [];
export const NULDAM_COMPANY_SLUGS: Record<"track1" | "track2", string[]> = { track1: [], track2: [] };
export function isNuldamCompany(_slug: string): boolean {
  return false;
}

export interface SlotInfo {
  label: string;
  time: string;
  context: string;
}

const slotIndex: Record<string, SlotInfo> = {};
for (const t of TIMESLOTS) {
  slotIndex[t.id] = { label: `1:1 ${t.label}`, time: t.time, context: `Business Meetings · ${MEETUP_DATE}` };
}

export function getSlotInfo(id: string): SlotInfo {
  return slotIndex[id] ?? { label: id, time: "", context: "" };
}
