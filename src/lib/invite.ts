// Outreach invitation email, served by /api/invite and sent from the invite
// Google Sheet. Signed by Tammy as KOCHAM vice chairman whichever sender the sheet uses. Built from the same constants as the
// site, so a confirmed venue or time is picked up without touching the sheet.
// {{GREETING}} is replaced per recipient by the sheet script.
import { companies as cohort } from "@/data/companies";

// The invite lists the Korean cohort; Singapore startups sit in the teaser.
const companies = cohort.filter((c) => c.track === "track1");
import {
  EVENT_ADDRESS,
  EVENT_DATE,
  EVENT_NAME,
  EVENT_NAME_LINE1,
  DINNER_VENUE,
  DINNER_ADDRESS,
  EVENT_NAME_LINE2,
  EVENT_TIME,
  EVENT_VENUE,
  MEETUP_ADDRESS,
  MEETUP_DATE,
  MEETUP_TIME,
  MEETUP_VENUE,
  ONE_ON_ONE_OPEN,
  PROGRAM,
  SITE_URL as SITE,
  TIMESLOTS,
} from "@/data/timeslots";

// ── per-event copy and colours ──
const C = { brand: "#0b7468", accent: "#f2c14e", ink: "#10233a", muted: "#4a5b59", line: "#d6e2e0" };
// Joint Korea–Singapore framing (Tammy, 25–26 Oct): one organiser per country up top.
const HOST_LINE = "KOSA × Lorong AI";
const DATES = "3–4 November 2026 · Singapore";
const SUBJECT = "Invitation: KR-SG AI Connect | Startup Pitching & Networking";
// Tammy's copy (26 Oct). Set to "" to drop the deadline line.
const RSVP_BY = "";
// 10/27: sent as "K-Innovation Partners", signed by Tammy as KOCHAM vice chairman.
const SIGN = "Tammy Ahn<br>Vice Chairman, Korea Chamber of Commerce in Singapore (KOCHAM)";
// One line per startup for the "Featuring" list (falls back to the site tagline).
const LINES: Record<string, string> = {
  stellarvision: "SAR satellite data and AI analytics for defence, public-sector and disaster response",
  clotho: "AI platform that manages government-grant execution, compliance and risk",
  hellofriends: "Multilingual AI kiosks giving migrant workers trusted public-service answers",
  shareplat: "Physical AI robots for safer, faster utility infrastructure work",
  mediaiplus: "AI matching between biotechs and global CROs for faster clinical trials",
};
const ORDER: ("demo" | "meetup")[] = ["demo", "meetup"]; // chronological
const SG_LINE = "AI startups from the Lorong AI community. Line-up to be announced on the event website.";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const F = "font-family:Arial,Helvetica,sans-serif;";
const P = `margin:0 0 14px;${F}font-size:14px;line-height:21px;color:#222222;`;

export function buildInvite(_team = false, unsub = false): { subject: string; html: string; text: string } {
  const showcase = PROGRAM.find((p) => p.id === "showcase");
  const dinner = PROGRAM.find((p) => p.id === "lunch");
  const demoRows: [string, string][] = [
    // registration row only when doors open before the programme starts
    ...(showcase && showcase.time.startsWith(EVENT_TIME.split("–")[0].trim()) ? [] : [[EVENT_TIME.split("–")[0].trim(), "Registration"] as [string, string]]),
    ...(showcase ? [[showcase.time, showcase.title] as [string, string]] : []),
    ...(dinner ? [[dinner.time, dinner.title] as [string, string]] : []),
  ];
  const [h1, m1, h2, m2] = (TIMESLOTS[0]?.time.match(/\d+/g) ?? []).map(Number);
  const mins = (h2 * 60 + m2) - (h1 * 60 + m1);
  const rounds = `Private ${mins}-minute meetings with the startups you choose (${TIMESLOTS.length} rounds)`;

  const btn = (href: string, label: string) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px;"><tr><td style="background:${C.brand};border-radius:2px;"><a href="${href}" style="display:block;padding:11px 16px;${F}font-size:12px;font-weight:bold;letter-spacing:0.7px;color:#ffffff;text-decoration:none;text-transform:uppercase;">${label}&nbsp;&nbsp;→</a></td></tr></table>`;
  const card = (kicker: string, rows: [string, string][], venue: string, address: string, cta: string) => `
<tr><td style="padding:22px 36px 0;">
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${C.line};border-left:5px solid ${C.brand};"><tr><td style="padding:16px 18px;">
  <div style="${F}font-size:11px;letter-spacing:1.2px;font-weight:bold;color:${C.brand};text-transform:uppercase;">${esc(kicker)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px;">
   ${rows.map(([t, w]) => `<tr><td style="padding:3px 14px 3px 0;${F}font-size:13px;font-weight:bold;color:${C.brand};white-space:nowrap;vertical-align:top;">${esc(t)}</td><td style="padding:3px 0;${F}font-size:14px;color:${C.ink};">${esc(w)}</td></tr>`).join("")}
  </table>
  <div style="${F}padding-top:10px;font-size:13px;line-height:19px;color:${C.muted};">${esc(venue)}<br>${esc(address)}</div>
  ${cta}
 </td></tr></table>
</td></tr>`;

  const blocks = {
    demo: card(`Demo Day · ${EVENT_DATE}`, demoRows, `Pitching Sessions @ ${EVENT_VENUE}, ${EVENT_ADDRESS}`, `Networking Dinner @ ${DINNER_VENUE}, ${DINNER_ADDRESS}`, btn(`${SITE}/book?day=7`, "RSVP for the Demo Day")),
    meetup: ONE_ON_ONE_OPEN
      ? card(`1:1 Business Meetings · ${MEETUP_DATE}`, [[MEETUP_TIME, rounds]], MEETUP_VENUE, MEETUP_ADDRESS, btn(`${SITE}/book?day=5`, "Book a 1:1 meeting"))
      : "",
  };

  const lineOf = (c: (typeof companies)[number]) => LINES[c.slug] ?? c.tagline;
  const featuring = companies
    .map((c, i) => `<tr><td style="padding:5px 10px 5px 0;${F}font-size:13px;line-height:18px;color:${C.brand};font-weight:bold;vertical-align:top;white-space:nowrap;">${String(i + 1).padStart(2, "0")}</td><td style="padding:5px 0;${F}font-size:13px;line-height:18px;color:${C.ink};"><b>${esc(c.name)}</b> <span style="color:${C.muted};">— ${esc(lineOf(c))}</span></td></tr>`)
    .join("");

  // "From Singapore" teaser. No numbered slots: the Singapore count is not
  // confirmed yet, and two placeholder rows read as "two companies".
  // Email-safe: tables, inline styles, no images or web fonts.
  const sgTeaser = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;background:${C.ink};"><tr><td style="padding:22px 22px 20px;">
  <div style="${F}font-size:11px;letter-spacing:1.4px;font-weight:bold;color:${C.accent};text-transform:uppercase;">+ From Singapore</div>
  <div style="${F}padding-top:8px;font-size:34px;line-height:36px;letter-spacing:-1px;font-weight:800;color:#ffffff;">Coming soon.</div>
  <div style="${F}padding-top:8px;font-size:14px;line-height:20px;color:#d5dee8;">AI startups from Singapore's Lorong AI community are joining the line-up.</div>
  <div style="${F}padding-top:12px;font-size:13px;font-weight:bold;color:${C.accent};">Revealed on the event website soon.</div>
 </td></tr></table>`;

  // Tammy's draft (26 Oct), tightened. The cards below carry times and
  // addresses, so the letter only names the two days.
  const dayLine = (d: string) => esc(d.replace(" 2026", ""));
  const intro = [
    "I hope this email finds you well.",
    "Following the launch of the Korea–Singapore AI Alliance in March 2026 to strengthen bilateral cooperation in artificial intelligence, we are delighted to invite you to <b>KR-SG AI Connect: Pitching &amp; Networking</b>.",
    "Co-organised by the Korea AI·Software Industry Association (KOSA) and Lorong AI, representing the AI ecosystems of Korea and Singapore respectively, this inaugural joint event brings together leading AI startups, public-sector stakeholders, investors and industry partners for live pitches, product demos and strategic networking.",
    "The event will showcase a curated cohort of promising Korean AI startups alongside homegrown AI innovators from Singapore's Lorong AI community. The full startup line-up will be published on the event website.",
    `<b>Day 1: Demo Day &amp; Networking Dinner · ${dayLine(EVENT_DATE)}</b><br>Demo Day at ${esc(EVENT_VENUE)} (14:30–17:00)<br>Networking Dinner at ${esc(DINNER_VENUE)}, JTC LaunchPad @ one-north (17:00–20:00)` +
      (ONE_ON_ONE_OPEN ? `<br><br><b>Day 2: 1:1 Meetings · ${dayLine(MEETUP_DATE)}</b><br>Curated business matching sessions with the participating startups (${esc(MEETUP_TIME)}, ${esc(MEETUP_VENUE)})` : ""),
    `Please confirm your attendance via the link below${RSVP_BY ? ` by <b>${esc(RSVP_BY)}</b>` : ""}.<br>&#128073; <a href="${SITE}/book?day=7" style="color:${C.brand};font-weight:bold;">Click here to RSVP</a>`,
    "It would mean a great deal to have you join us for this milestone collaboration. We look forward to welcoming you.",
  ];

  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:16px 12px;background:#ffffff;">
<div style="max-width:600px;margin:0 auto;padding:4px 4px 18px;text-align:left;">
<p style="${P}">{{GREETING}}</p>
${intro.map((l) => `<p style="${P}">${l}</p>`).join("\n")}
<p style="${P}">Warm regards,<br><br>${SIGN}</p>
</div>
<table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${C.line};">
<tr><td style="background:${C.brand};padding:14px 36px 20px;">
 <div style="${F}font-size:10px;letter-spacing:0.9px;font-weight:bold;color:#ffffff;text-transform:uppercase;">${esc(HOST_LINE)}</div>
 <div style="${F}padding-top:14px;font-size:26px;line-height:30px;letter-spacing:-0.6px;font-weight:800;color:#ffffff;">${esc(EVENT_NAME_LINE1)}<br>${esc(EVENT_NAME_LINE2)}</div>
 <div style="${F}padding-top:6px;font-size:13px;font-weight:bold;color:${C.accent};">${esc(DATES)}</div>
</td></tr>
${ORDER.map((k) => blocks[k]).join("")}
<tr><td style="padding:22px 36px 24px;">
 <div style="${F}font-size:11px;letter-spacing:1.4px;font-weight:bold;color:${C.brand};text-transform:uppercase;">Featuring · From Korea</div>
 <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">${featuring}</table>
 ${sgTeaser}
 <div style="${F}padding-top:12px;font-size:14px;"><a href="${SITE}/#startups" style="color:${C.brand};font-weight:bold;">View the startup profiles →</a></div>
</td></tr>
</table>
<p style="max-width:600px;margin:14px auto 0;${F}font-size:12px;color:#8a8f9e;">${
  // {{UNSUB}} = per-recipient link, filled in by the invite sheet (it asks with ?unsub=1)
  unsub
    ? `Don't want invitations like this? <a href="{{UNSUB}}" style="color:#8a8f9e;text-decoration:underline;">Unsubscribe</a>`
    : `If you would rather not receive invitations like this, just let us know.`
}</p>
</body></html>`;

  const plain = (s: string) => s.replace(/<br>/g, "\n").replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&#128073; /g, "→ ");
  const demoText = [`DEMO DAY · ${EVENT_DATE}`, ...demoRows.map(([t, w]) => `${t}  ${w}`), `Pitching Sessions @ ${EVENT_VENUE}, ${EVENT_ADDRESS}`, `Networking Dinner @ ${DINNER_VENUE}, ${DINNER_ADDRESS}`, `RSVP: ${SITE}/book?day=7`];
  const meetText = ONE_ON_ONE_OPEN
    ? [`1:1 BUSINESS MEETINGS · ${MEETUP_DATE}`, `${MEETUP_TIME}  ${rounds}`, `${MEETUP_VENUE}, ${MEETUP_ADDRESS}`, `Book: ${SITE}/book?day=5`]
    : [];
  const text = [
    "{{GREETING}}",
    "",
    ...intro.map(plain).flatMap((l) => [l, ""]),
    "Warm regards,",
    "",
    plain(SIGN),
    "",
    "----",
    ...ORDER.flatMap((k) => [...(k === "demo" ? demoText : meetText), ""]),
    "Featuring, from Korea:",
    ...companies.map((c, i) => `${String(i + 1).padStart(2, "0")} ${c.name} — ${lineOf(c)}`),
    "",
    "From Singapore:",
    SG_LINE,
    `Startup profiles: ${SITE}/#startups`,
    "",
    unsub
      ? "Don't want invitations like this? Unsubscribe: {{UNSUB}}"
      : `If you would rather not receive invitations like this, just let us know.`,
  ].join("\n");

  return { subject: SUBJECT, html, text };
}
