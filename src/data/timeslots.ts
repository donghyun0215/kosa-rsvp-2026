export interface Timeslot {
  id: string;
  label: string;
  time: string;
}

// ── K-GovTech Open Innovation Day in Singapore (KOSA) ──
// Everything event-specific lives in this file, so a confirmed venue or time
// is a one-line change. Source: "[마스터파일] KOSA" (주요 안내 + 일정표_TBC),
// read 12 Oct. Programme 2–6 Nov; public days are the 1:1 business
// meetings (Tue 3 Nov) and the Demo Day (Wed 4 Nov).
export const SITE_URL = "https://kosa-rsvp-2026.vercel.app";
// Organisers as KOSA asked (15 Oct): 주무부처 MSIT · 전담기관 NIPA · 지원기관 KOSA.
export const CREDITS = "Ministry of Science and ICT (MSIT) · National IT Industry Promotion Agency (NIPA) · Korea AI·Software Industry Association (KOSA)";

// Official name from KOSA (15 Oct).
export const EVENT_NAME = "K-GovTech Open Innovation Day in Singapore";
export const EVENT_NAME_SHORT = "K-GovTech";
export const EVENT_NAME_LINE1 = "K-GovTech Open Innovation Day in Singapore";
export const EVENT_NAME_LINE2 = "1:1 Meetings & Demo Day";

export const EVENT_DATE = "Wednesday, 4 November 2026";
export const EVENT_DAY_SHORT = "Wed 4 Nov";
export const EVENT_TIME = "14:30 – 20:00";
// Main tab lists Suntec Room 302; the timetable still says "suntec or another place".
export const EVENT_VENUE = "Suntec Singapore Convention & Exhibition Centre, Level 3, Room 302";
export const EVENT_ADDRESS = "1 Raffles Boulevard, Singapore 039593";
export const EVENT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Suntec+Singapore+Convention+%26+Exhibition+Centre+1+Raffles+Boulevard";

// Public 1:1 self-booking, same model as KIMST/CMK.
export const ONE_ON_ONE_OPEN = true;

// 1:1 meetings Tue 3 Nov at NULDAM: three 40-minute rounds (timetable;
// interns already booked against these times). IDs are stable references
// stored in bookings — change labels/times freely, never the ids.
export const TIMESLOTS: Timeslot[] = [
  { id: "slot1", label: "Round 1", time: "14:30 – 15:10" },
  { id: "slot2", label: "Round 2", time: "15:20 – 16:00" },
  { id: "slot3", label: "Round 3", time: "16:10 – 16:50" },
];
export const MEETUP_TIME = "14:30 – 16:50";
export const MEETUP_DATE = "Tuesday, 3 November 2026";
export const MEETUP_DAY_SHORT = "Tue 3 Nov";
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
    title: "Talks & IR pitching",
    time: "15:00 – 17:10",
    description: "Opening remarks, a keynote, then six startup pitches (7 min pitch, 5 min Q&A each). Registration and coffee from 14:30.",
  },
  {
    id: "lunch",
    title: "Networking dinner",
    time: "17:10 – 20:00",
    description: "Catered dinner with the founders, agencies, investors and partners in the room.",
  },
  {
    id: "meetups",
    title: "1:1 Business Meetings",
    time: `${MEETUP_DAY_SHORT} · ${MEETUP_TIME}`,
    description: "Private meetings with the startups of your choice, the afternoon before the Demo Day.",
  },
];

// Demo Day run of show (timetable, TBC). Shown on the RSVP page.
export const DEMO_AGENDA: [time: string, item: string][] = [
  ["14:30 – 15:00", "Registration and networking reception (coffee & snacks)"],
  ["15:00 – 15:10", "Opening and congratulatory remarks"],
  ["15:10 – 15:25", "Keynote"],
  ["15:25 – 15:30", "Introduction of the judges"],
  ["15:30 – 15:55", "IR pitching, session 1 (3 startups)"],
  ["16:10 – 16:20", "Break"],
  ["16:20 – 16:45", "IR pitching, session 2 (3 startups)"],
  ["17:00 – 17:10", "Group photo"],
  ["17:10 – 20:00", "Networking dinner"],
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
