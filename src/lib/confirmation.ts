// Personal schedule email, used for:
//  - "confirm": sent right after a successful RSVP (sendConfirmation)
//  - "week" / "3day" / "meetup-eve" / "demo-eve": scheduled reminders, pulled
//    by the Apps Script mailer from /api/reminders at the trigger time
// HTML + plain text.
import { getCompanyBySlug } from "@/data/companies";
import {
  EVENT_ADDRESS,
  EVENT_MAP_URL,
  EVENT_VENUE,
  MEETUP_ADDRESS,
  MEETUP_MAP_URL,
  MEETUP_VENUE,
  EVENT_NAME,
  PROGRAM,
  SITE_URL as SITE,
  TIMESLOTS,
} from "@/data/timeslots";

const EVENT_TITLE = EVENT_NAME;

export type MailKind = "confirm" | "week" | "3day" | "meetup-eve" | "demo-eve";

const COPY: Record<MailKind, { subject: string; headline: string; intro: string }> = {
  confirm: {
    subject: `Your RSVP is confirmed — ${EVENT_TITLE}`,
    headline: "Your RSVP is confirmed",
    intro: `Thank you for registering for the <b>${EVENT_TITLE}</b>. Here is your schedule:`,
  },
  week: {
    subject: "Your schedule for KOSA GovTech Singapore (3–4 Nov)",
    headline: "One week to go",
    intro: `The <b>${EVENT_TITLE}</b> is just one week away, and we're looking forward to seeing you. Here is your schedule:`,
  },
  "3day": {
    subject: "Your schedule for KOSA GovTech Singapore this week (3–4 Nov)",
    headline: "3 days to go",
    intro: `Only three days until the <b>${EVENT_TITLE}</b>. Here is a quick recap of your schedule:`,
  },
  "meetup-eve": {
    subject: "Your 1:1 meetings tomorrow (Tue 3 Nov)",
    headline: "Your 1:1 meetings are tomorrow",
    intro: "A quick reminder that your 1:1 meetings with the startups are <b>tomorrow, Tuesday 3 November</b>. Here are the details:",
  },
  "demo-eve": {
    subject: "See you tomorrow at the GovTech Demo Day (Wed 4 Nov)",
    headline: "See you tomorrow",
    intro: `The <b>${EVENT_TITLE}</b> is <b>tomorrow, Wednesday 4 November</b>. Here is your schedule:`,
  },
};

// Reminders open with a short, plain note (reads like a normal email, not a
// newsletter); the designed schedule card follows underneath. The RSVP
// confirmation keeps its original single-card layout.
const PERSONAL: Partial<Record<MailKind, string[]>> = {
  week: [
    "A quick note ahead of KOSA GovTech Singapore next week. I've put your schedule below so it's easy to find.",
    "Looking forward to seeing you!",
  ],
  "3day": [
    "Just a friendly reminder that KOSA GovTech Singapore is this week. Your schedule is below. If anything has changed on your side, simply reply to this email.",
    "See you soon!",
  ],
  "meetup-eve": [
    `Your 1:1 meetings with the startups are tomorrow (Tue 3 Nov) at ${MEETUP_VENUE}. The details are below. Please arrive 5–10 minutes before your first meeting.`,
    "See you tomorrow!",
  ],
  "demo-eve": [
    `See you tomorrow at ${EVENT_VENUE} for the Demo Day! Your schedule and check-in details are below.`,
    "Looking forward to it!",
  ],
};

export interface ConfirmationInput {
  kind?: MailKind; // default "confirm"
  fullName: string;
  attendShowcase: boolean;
  attendLunch: boolean;
  meetings: { timeslot_id: string; company_id: string }[];
}

export interface ConfirmationEmail {
  subject: string;
  html: string;
  text: string;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const programTime = (id: "showcase" | "lunch") => PROGRAM.find((b) => b.id === id)?.time ?? "";

function gcal(text: string, dates: string, location: string, details: string): string {
  const p = new URLSearchParams({ action: "TEMPLATE", text, dates, ctz: "Asia/Singapore", location, details });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}

export function buildConfirmation(input: ConfirmationInput): ConfirmationEmail {
  const kind = input.kind ?? "confirm";
  const copy = COPY[kind];
  const introText = copy.intro.replace(/<\/?b>/g, "");
  const order = new Map(TIMESLOTS.map((t, i) => [t.id, i]));
  const meetings = input.meetings
    .filter((m) => order.has(m.timeslot_id))
    .sort((a, b) => (order.get(a.timeslot_id) ?? 0) - (order.get(b.timeslot_id) ?? 0))
    .map((m) => {
      const slot = TIMESLOTS.find((t) => t.id === m.timeslot_id)!;
      return { round: slot.label, time: slot.time, company: getCompanyBySlug(m.company_id)?.name ?? m.company_id };
    });
  const demoDay: string[] = [];
  if (input.attendShowcase) demoDay.push(`Registration from 14:30 · Talks & pitches ${programTime("showcase")}`);
  if (input.attendLunch) demoDay.push(`Networking dinner ${programTime("lunch")}`);

  const meetupsCal = gcal(
    "KOSA GovTech · 1:1 Business Meetings",
    "20261103T143000/20261103T165000",
    `${MEETUP_VENUE}, ${MEETUP_ADDRESS}`,
    ["Your 1:1 meetings:", ...meetings.map((m) => `• ${m.round} ${m.time} — ${m.company}`), "", `Manage: ${SITE}/book#manage`].join("\n"),
  );
  const demoCal = gcal(
    "KOSA GovTech · Singapore Demo Day",
    "20261104T143000/20261104T200000",
    `${EVENT_VENUE}, ${EVENT_ADDRESS}`,
    [...demoDay.map((d) => `• ${d}`), "", SITE].join("\n"),
  );

  // ── plain text
  const personal = PERSONAL[kind];
  const t: string[] = personal
    ? [`Hi ${input.fullName},`, "", ...personal.flatMap((l) => [l, ""]), "Best,", "The LodestarT team", "", "----", ""]
    : [`Dear ${input.fullName},`, "", introText, ""];
  if (meetings.length) {
    t.push("TUE 3 NOV · 1:1 BUSINESS MEETINGS");
    for (const m of meetings) t.push(`• ${m.round} · ${m.time} — ${m.company}`);
    t.push(`${MEETUP_VENUE}, ${MEETUP_ADDRESS}`, ...(MEETUP_MAP_URL ? [`Map: ${MEETUP_MAP_URL}`] : []), "Please arrive 5–10 minutes before your first meeting.", "");
  }
  if (demoDay.length) {
    t.push("WED 4 NOV · DEMO DAY");
    for (const d of demoDay) t.push(`• ${d}`);
    t.push(`${EVENT_VENUE}, ${EVENT_ADDRESS}`, ...(EVENT_MAP_URL ? [`Map: ${EVENT_MAP_URL}`] : []), "");
  }
  // "slots still open" only while booking is still useful (not on the eves)
  const nudge = (kind === "week" || kind === "3day") && meetings.length === 0;
  if (nudge) t.push(`A few 1:1 meeting slots on Tue 3 Nov are still open: ${SITE}/book?day=5`, "");
  const onTheDay = kind === "demo-eve";
  if (onTheDay) {
    t.push("ON THE DAY");
    t.push("• Check-in: scan the QR code at the entrance and enter this email address to collect your name badge.");
    t.push(`• Networking Lounge: a private, attendee-only directory of everyone in the room — ${SITE}/lounge`, "");
  }
  t.push(`View or cancel your 1:1 meetings: ${SITE}/book#manage`);
  t.push(`Startup one-pagers: ${SITE}/#startups`, "");
  t.push("Need to change something? Re-submit the RSVP form with the same email, or simply reply to this email.", "");
  if (!personal) t.push("Warm regards,", "LodestarT team, for KOSA GovTech Singapore 2026");

  // ── HTML
  const F = "font-family:Arial,Helvetica,sans-serif;";
  const link = (href: string, label: string) =>
    `<a href="${esc(href)}" style="color:#0b7468;font-weight:bold;text-decoration:underline;">${esc(label)}</a>`;
  const block = (kicker: string, rows: string[], venue: string, address: string, map: string, cal: string, note?: string) => `
    <tr><td style="padding:0 32px 18px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d3dfdb;border-left:5px solid #0b7468;">
        <tr><td style="padding:16px 18px;">
          <div style="${F}font-size:11px;letter-spacing:1.2px;font-weight:bold;color:#0b7468;text-transform:uppercase;">${esc(kicker)}</div>
          ${rows.map((r) => `<div style="${F}padding-top:8px;font-size:15px;line-height:21px;color:#0f2a2c;font-weight:bold;">${r}</div>`).join("")}
          <div style="${F}padding-top:10px;font-size:13px;line-height:19px;color:#4a5b59;">${esc(venue)}<br>${esc(address)}</div>
          ${note ? `<div style="${F}padding-top:6px;font-size:12px;line-height:17px;color:#4a5b59;">${esc(note)}</div>` : ""}
          <div style="${F}padding-top:10px;font-size:13px;line-height:19px;">${map ? `${link(map, "Open in Google Maps")} &nbsp;·&nbsp; ` : ""}${link(cal, "Add to Google Calendar")}</div>
        </td></tr>
      </table>
    </td></tr>`;

  const P = `margin:0 0 14px;${F}font-size:14px;line-height:21px;color:#222222;`;
  const personalHtml = personal
    ? `<div style="max-width:600px;margin:0 auto;padding:4px 4px 18px;text-align:left;">
<p style="${P}">Hi ${esc(input.fullName)},</p>
${personal.map((l) => `<p style="${P}">${esc(l)}</p>`).join("\n")}
<p style="${P}">Best,<br>The LodestarT team</p>
</div>`
    : "";
  const pageBg = personal ? "#ffffff" : "#f2f5f3";
  const html = `<!doctype html><html><body style="margin:0;padding:0;background:${pageBg};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${pageBg};"><tr><td style="padding:${personal ? "16px" : "20px"} 12px;">
${personalHtml}
<table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;${personal ? "border:1px solid #d3dfdb;" : ""}">
  <tr><td style="background:#0b7468;padding:22px 32px;">
    <div style="${F}font-size:10px;letter-spacing:1px;font-weight:bold;color:#ffffff;text-transform:uppercase;">KOSA | GovTech Singapore 2026</div>
    <div style="${F}padding-top:8px;font-size:24px;line-height:28px;font-weight:800;color:#ffffff;">${esc(copy.headline)}</div>
    <div style="${F}padding-top:4px;font-size:13px;font-weight:bold;color:#f2c14e;">1:1 Meetings &amp; Demo Day · 3–4 November 2026</div>
  </td></tr>
  ${personal ? `<tr><td style="padding:20px 32px 0;"></td></tr>` : `<tr><td style="padding:24px 32px 16px;${F}font-size:15px;line-height:22px;color:#0f2a2c;">
    Dear <strong>${esc(input.fullName)}</strong>,<br><br>
    ${copy.intro}
  </td></tr>`}
  ${meetings.length ? block("Tue 3 Nov · 1:1 Business Meetings", meetings.map((m) => `${esc(m.round)} · ${esc(m.time)} — ${esc(m.company)}`), MEETUP_VENUE, MEETUP_ADDRESS, MEETUP_MAP_URL, meetupsCal, "Please arrive 5–10 minutes before your first meeting.") : ""}
  ${demoDay.length ? block("Wed 4 Nov · Demo Day", demoDay.map(esc), EVENT_VENUE, EVENT_ADDRESS, EVENT_MAP_URL, demoCal) : ""}
  ${onTheDay ? `<tr><td style="padding:0 32px 16px;${F}font-size:14px;line-height:21px;color:#0f2a2c;">
    <div style="${F}font-size:11px;letter-spacing:1.2px;font-weight:bold;color:#0b7468;text-transform:uppercase;padding-bottom:6px;">On the day</div>
    <b>Check-in:</b> scan the QR code at the entrance and enter this email address to collect your name badge — please keep this email handy.<br>
    <b>Networking Lounge:</b> a private, attendee-only directory of everyone in the room, so conversations can continue after the event. ${link(`${SITE}/lounge`, "Open the lounge")}
  </td></tr>` : ""}
  ${nudge ? `<tr><td style="padding:0 32px 16px;${F}font-size:14px;line-height:21px;color:#0f2a2c;">
    <div style="background:#fdf6e3;border:1px solid #f2c14e;padding:12px 14px;">A few <b>1:1 meeting slots on Tue 3 Nov</b> are still open — ${link(`${SITE}/book?day=5`, "book a meeting")}.</div>
  </td></tr>` : ""}
  <tr><td style="padding:4px 32px 22px;${F}font-size:14px;line-height:21px;color:#0f2a2c;">
    ${link(`${SITE}/book#manage`, "View or cancel your 1:1 meetings")}<br>
    ${link(`${SITE}/#startups`, "Browse the startup one-pagers")}<br><br>
    Need to change something? Re-submit the RSVP form with the same email, or simply reply to this email.
  </td></tr>
  ${personal ? "" : `<tr><td style="background:#f2f5f3;border-top:1px solid #d3dfdb;padding:18px 32px;${F}font-size:14px;line-height:20px;color:#0f2a2c;">
    Warm regards,<br><strong style="color:#0b7468;">LodestarT team</strong><br><span style="font-size:12px;color:#4a5b59;">for KOSA GovTech Singapore 2026</span>
  </td></tr>`}
</table></td></tr></table></body></html>`;

  return { subject: copy.subject, html, text: t.join("\n") };
}
