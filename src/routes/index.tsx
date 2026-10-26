import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Wordmark } from "@/components/Wordmark";
import { Globe } from "@/components/Globe";
import kosaLogo from "@/assets/logos/kosa-en-wide.png";
import nipaLogo from "@/assets/logos/nipa-en.png";
import msitLogo from "@/assets/logos/msit.png";
import mddiLogo from "@/assets/logos/mddi.png";
import lorongLogo from "@/assets/logos/lorong-ai.png";
import { JUDGES } from "@/data/speakers";
import { companies } from "@/data/companies";
import { STARTUP_IMAGES, STARTUP_LOGOS } from "@/data/companyImages";
import {
  EVENT_ADDRESS,
  DINNER_ADDRESS,
  DINNER_MAP_URL,
  DINNER_VENUE,
  EVENT_DAY_SHORT,
  EVENT_MAP_URL,
  EVENT_NAME,
  EVENT_TIME,
  EVENT_VENUE,
  CREDITS,
  MEETUP_ADDRESS,
  MEETUP_DAY_SHORT,
  MEETUP_MAP_URL,
  MEETUP_TIME,
  MEETUP_VENUE,
  ONE_ON_ONE_OPEN,
} from "@/data/timeslots";

export const Route = createFileRoute("/")({
  component: Landing,
});

const ORGANIZER_EMAIL = "support@lodestart.ai";
const KOSA_SITE = "https://www.sw.or.kr";
// Partner logos, shown on white with no role labels (Tammy, 25 Oct):
// Korea's MSIT · NIPA · KOSA, then Singapore's MDDI · Lorong AI.
const PARTNERS = [
  { name: "Ministry of Science and ICT (MSIT)", logo: msitLogo, href: "https://www.msit.go.kr/eng/", h: "h-10" },
  { name: "National IT Industry Promotion Agency (NIPA)", logo: nipaLogo, href: "https://www.nipa.kr/eng/", h: "h-7" },
  { name: "Korea AI·Software Industry Association (KOSA)", logo: kosaLogo, href: KOSA_SITE, h: "h-7" },
  { name: "Ministry of Digital Development and Information (MDDI)", logo: mddiLogo, href: "https://www.mddi.gov.sg/", h: "h-14" },
  { name: "Lorong AI", logo: lorongLogo, href: "https://go.gov.sg/lorongai", h: "h-7" },
];
// The two organisers, one line each.
const ORGANISERS = [
  { name: "Korea AI·Software Industry Association (KOSA)", logo: kosaLogo, href: KOSA_SITE, h: "h-8",
    blurb: "Korea's industry association for AI and software companies. KOSA selected the five startups and brings them to Singapore." },
  { name: "Lorong AI", logo: lorongLogo, href: "https://go.gov.sg/lorongai", h: "h-9",
    blurb: "Singapore's hub for the AI community, set up by the Ministry of Digital Development and Information, and host of the pitching and networking evening." },
];

// Who each startup serves → what it gives them; shown on cards that have
// no product photo yet. Condensed from each company's own description.
const LEDGER: Record<string, [from: string, to: string]> = {
  stellarvision: ["Defence & disaster agencies", "SAR satellite intelligence"],
  clotho: ["SMEs & public agencies", "automated grant compliance"],
  hellofriends: ["Migrant workers", "multilingual AI kiosks"],
  shareplat: ["Utility crews", "cable-routing robots"],
  mediaiplus: ["Biotechs", "AI-matched global CROs"],
};

function ContactOrganizer() {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(ORGANIZER_EMAIL);
    } catch {
      // Locked-down browsers: the address is still shown below the button
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }
  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        title={ORGANIZER_EMAIL}
        className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 sm:px-4 sm:text-sm"
      >
        {copied ? "Email copied" : <><span className="sm:hidden">Contact</span><span className="hidden sm:inline">Contact Organizer</span></>}
      </button>
      {copied && (
        <span className="absolute right-0 top-full z-40 mt-2 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs font-medium text-navy shadow-elegant">
          {ORGANIZER_EMAIL}
        </span>
      )}
    </div>
  );
}

function Place({ venue, address, map }: { venue: string; address: string; map: string }) {
  return (
    <div className="text-sm text-navy">
      {map ? (
        <a href={map} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-primary/30 underline-offset-2 hover:text-primary">
          {venue}
        </a>
      ) : (
        <span className="font-semibold">{venue}</span>
      )}
      <span className="text-muted-foreground">, {address}</span>
    </div>
  );
}

// Scroll reveal: marks [data-reveal] elements visible as they enter.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// 3D tilt + light sheen for [data-tilt] cards, magnetic pull for [data-magnet].
function useTiltAndMagnet() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches) return;
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt],[data-magnet]");
      if (!t) return;
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      if (t.hasAttribute("data-tilt")) {
        t.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`); t.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
        t.style.setProperty("--px", `${((x + 0.5) * 100).toFixed(1)}%`); t.style.setProperty("--py", `${((y + 0.5) * 100).toFixed(1)}%`);
      } else {
        t.style.setProperty("--tx", `${(x * 14).toFixed(1)}px`); t.style.setProperty("--ty", `${(y * 10).toFixed(1)}px`);
      }
    };
    const onLeave = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-tilt],[data-magnet]");
      if (t) ["--rx", "--ry", "--tx", "--ty"].forEach((v) => t.style.removeProperty(v));
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerout", onLeave, { passive: true });
    return () => { removeEventListener("pointermove", onMove); removeEventListener("pointerout", onLeave); };
  }, []);
}

// Each entry stays on one line (the clip span is inline-block).
const HEADLINE = ["KR-SG AI Connect", "Pitching &", "Networking"];

function Landing() {
  useReveal();
  useTiltAndMagnet();
  return (
    <div className="min-h-screen">
      {/* HEADER — white bar above the hero, as in the mock-up */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
          {/* phones: Contact sits beside the wordmark so the link row never overflows (320px) */}
          <div className="flex items-center justify-between gap-3">
            <a href="#top" className="min-w-0">
              <Wordmark />
            </a>
            <span className="md:hidden"><ContactOrganizer /></span>
          </div>
          <nav className="-mx-2.5 flex items-center gap-0.5 text-[13px] font-semibold text-navy sm:gap-1.5 sm:text-sm md:mx-0 md:gap-2">
            <a href="#rsvp" className="rounded-md px-2.5 py-2 transition hover:bg-secondary md:px-3.5">RSVP</a>
            <a href="#startups" className="rounded-md px-2.5 py-2 transition hover:bg-secondary md:px-3.5">Companies</a>
            {JUDGES.length > 0 && <a href="#judges" className="rounded-md px-2.5 py-2 transition hover:bg-secondary md:px-3.5">Judges</a>}
            <a href="#about" className="rounded-md px-2.5 py-2 transition hover:bg-secondary md:px-3.5">About</a>
            <a href="/lounge" className="rounded-md px-2.5 py-2 transition hover:bg-secondary md:px-3.5">Lounge</a>
            <span className="ml-2 hidden md:block"><ContactOrganizer /></span>
          </nav>
        </div>
      </header>

      {/* HERO — night earth, routes into Singapore */}
      <section id="top" className="relative isolate overflow-hidden bg-[#08142e] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="hidden h-full md:block"><Globe align="xMaxYMid" /></div>
          <div className="h-full md:hidden"><Globe align="xMidYMid" focus="corridor" /></div>
          {/* keeps the copy readable where it crosses the globe */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#08142e_0%,rgb(8_20_46/0.85)_30%,rgb(8_20_46/0.1)_62%,transparent_100%)] max-md:bg-[linear-gradient(180deg,rgb(8_20_46/0.9)_0%,rgb(8_20_46/0.7)_55%,transparent_80%)]" />
        </div>

        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 pb-56 pt-14 sm:px-6 md:pb-20 md:pt-20 md:min-h-[620px] lg:py-28">
          <h1 className="hero-title max-w-2xl text-[clamp(2.5rem,7vw,4.4rem)] font-extrabold leading-[1.02] text-white" aria-label={HEADLINE.join(" ")}>
            {HEADLINE.map((w, i) => (
              <span key={w} aria-hidden>
                <span className="hero-word-clip">
                  <span className={`hero-word ${i === HEADLINE.length - 1 ? "text-yellow" : ""}`} style={{ "--i": i } as CSSProperties}>{w}</span>
                </span>{" "}
                {(i === 1 || i === 3) && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-in [--i:5] mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-[1.0625rem]">
            Korea and Singapore, together on AI for the public sector. Selected AI startups from Korea and Singapore
            pitch at Lorong AI to agencies, investors and AI builders, then meet them 1:1.
          </p>
          <div className="hero-in [--i:6] mt-8 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
            <Link to="/book" search={{ day: "7" }} data-magnet className="btn-hero magnet flex flex-col items-center rounded-full px-7 py-2.5 text-center leading-tight">
              <span className="text-base font-bold sm:text-[1.0625rem]">RSVP for Demo Day</span>
              <span className="mt-0.5 text-[11px] font-medium opacity-80">{EVENT_DAY_SHORT}</span>
            </Link>
            {ONE_ON_ONE_OPEN && (
              <Link to="/book" search={{ day: "5" }} data-magnet className="btn-outline-hero magnet flex flex-col items-center rounded-full px-7 py-2.5 text-center leading-tight">
                <span className="text-base font-bold sm:text-[1.0625rem]">Book a 1:1 meeting</span>
                <span className="mt-0.5 text-[11px] font-medium opacity-70">{MEETUP_DAY_SHORT}</span>
              </Link>
            )}
          </div>
          {/* co-host lockup, one logo per country, as on joint KR–SG event art */}
          <div className="hero-in [--i:8] mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="w-full text-xs font-medium text-white/60 sm:w-auto sm:pr-1">Organised by</span>
            <span className="inline-flex h-9 items-center rounded-lg bg-white px-2.5 sm:h-11 sm:px-3.5"><img src={kosaLogo} alt="Korea AI·Software Industry Association (KOSA)" className="h-[18px] w-auto sm:h-6" /></span>
            <span aria-hidden className="text-lg font-light text-white/60">×</span>
            <span className="inline-flex h-9 items-center rounded-lg bg-white px-2.5 sm:h-11 sm:px-3.5"><img src={lorongLogo} alt="Lorong AI" className="h-[18px] w-auto sm:h-6" /></span>
          </div>
        </div>

      </section>

      {/* Cohort marquee: logos (names until supplied) glide under the hero */}
      <section className="border-b border-border bg-white">
        <div className="marquee relative py-5" aria-hidden>
          <div className="marquee-track">
            {[...companies, ...companies].map((c, i) => (
              <span key={`${c.slug}-${i}`} className="mx-6 inline-flex shrink-0 items-center gap-6 font-display text-2xl font-semibold text-navy/80">
                {STARTUP_LOGOS[c.slug] ? (
                  <span className="inline-flex h-12 w-36 items-center justify-center px-4">
                    <img src={STARTUP_LOGOS[c.slug]} alt="" className="max-h-7 max-w-full object-contain" />
                  </span>
                ) : (
                  c.name
                )}
                <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN — two days. One big line per card says what matters (day + time);
          everything else is small. Details repeat on the RSVP page. */}
      {/* navy band to match the hero (Tammy, 26 Oct); the cards stay white */}
      <section id="rsvp" className="relative isolate overflow-hidden bg-[#08142e] text-white">
      <div aria-hidden className="dotgrid pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2 data-reveal className="max-w-xl text-3xl font-bold text-white md:text-4xl">Two days in Singapore</h2>
        <p className="mt-3 max-w-xl text-white/70">
          For investors, corporates and ecosystem partners. Register for either day or both.
        </p>

        <div data-reveal className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-border text-foreground shadow-[0_30px_70px_-30px_rgb(0_0_0/0.7)] [perspective:1200px] md:grid-cols-2">
          <article data-tilt className="tilt flex flex-col bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-muted-foreground">Demo Day</h3>
            <p className="mt-2 font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-tight text-navy">
              {EVENT_DAY_SHORT}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-primary">{EVENT_TIME}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Two pitching sessions at Lorong AI, then a networking dinner at The Meeting Point. Registration from 14:30.
            </p>
            <div className="mt-4">
              <Place venue={EVENT_VENUE} address={EVENT_ADDRESS} map={EVENT_MAP_URL} />
              <div className="mt-1.5"><Place venue={`Dinner · ${DINNER_VENUE}`} address={DINNER_ADDRESS} map={DINNER_MAP_URL} /></div>
            </div>
            <div className="mt-auto pt-7">
              <Link to="/book" search={{ day: "7" }} className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                RSVP for Demo Day
              </Link>
            </div>
          </article>
          <article data-tilt className="tilt flex flex-col bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-muted-foreground">1:1 business meetings</h3>
            <p className="mt-2 font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-tight text-navy">
              {MEETUP_DAY_SHORT}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-primary">{MEETUP_TIME}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Three 40-minute rounds with the startups you pick, the afternoon after the pitches.
            </p>
            <div className="mt-4">
              <Place venue={MEETUP_VENUE} address={MEETUP_ADDRESS} map={MEETUP_MAP_URL} />
            </div>
            <div className="mt-auto pt-7">
              {ONE_ON_ONE_OPEN ? (
                <Link to="/book" search={{ day: "5" }} className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Book a 1:1 meeting
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">Booking opens soon.</span>
              )}
            </div>
          </article>

        </div>
      </div>
      </section>

      {/* STARTUPS */}
      <section id="startups" className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <h2 data-reveal className="text-3xl font-bold text-navy md:text-4xl">The startups</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Open a profile for more, or book a 1:1 straight away.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((c, i) => (
              <article key={c.slug} data-reveal style={{ "--rd": `${(i % 3) * 70}ms` } as CSSProperties} data-tilt className="card-startup tilt group flex flex-col overflow-hidden rounded-xl">
                <Link to="/companies/$slug" params={{ slug: c.slug }} className="relative block aspect-[3/2] overflow-hidden bg-hero-gradient">
                  {STARTUP_IMAGES[c.slug] ? (
                    <img
                      src={STARTUP_IMAGES[c.slug]}
                      alt={`${c.name}: ${c.sector}`}
                      loading="lazy"
                      className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]`}
                    />
                  ) : (
                    // No product photo yet: the "serves" line from the hero, set large.
                    <>
                      <span aria-hidden className="dotgrid absolute inset-0" />
                      <span className="absolute inset-0 flex items-end p-3 font-display text-lg font-semibold leading-tight text-white sm:p-4 sm:text-xl">
                        {LEDGER[c.slug]?.[1] ?? c.sector}
                      </span>
                    </>
                  )}
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <Link to="/companies/$slug" params={{ slug: c.slug }} className="flex h-10 items-center" title={c.name}>
                    {STARTUP_LOGOS[c.slug] ? (
                      <img src={STARTUP_LOGOS[c.slug]} alt={c.name} className={`${c.slug === "mediaiplus" ? "max-h-10" : "max-h-7 sm:max-h-8"} max-w-[120px] object-contain object-left sm:max-w-[150px]`} />
                    ) : (
                      <span className="font-display text-lg font-bold text-navy">{c.name}</span>
                    )}
                  </Link>
                  <div className="text-xs font-semibold text-primary">{c.sector}</div>
                  <p className="line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{c.tagline}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
                    <Link
                      to="/companies/$slug"
                      params={{ slug: c.slug }}
                      className="text-[13px] font-semibold text-navy transition hover:text-primary"
                    >
                      View profile
                    </Link>
                    {ONE_ON_ONE_OPEN && (
                      <Link
                        to="/book"
                        search={{ day: "5", company: c.slug }}
                        className="rounded-full border border-primary px-4 py-2 text-[13px] font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                      >
                        Book a 1:1
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* JUDGES — hidden while the list in src/data/speakers.ts is empty.
          Same shape as the CMK site: centred, greyscale portraits. */}
      {JUDGES.length > 0 && (
        <section id="judges" className="relative isolate overflow-hidden bg-hero-gradient text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-24">
            <p data-reveal className="text-sm font-semibold text-yellow">Demo Day · {EVENT_DAY_SHORT}</p>
            <h2 data-reveal className="mt-2 text-3xl font-bold md:text-5xl">Who You'll Meet</h2>
            <div className="mt-12 grid grid-cols-2 justify-items-center gap-x-6 gap-y-10 md:grid-cols-4">
              {JUDGES.map((j, i) => (
                <div key={j.name} data-reveal style={{ "--rd": `${i * 90}ms` } as CSSProperties} className="group flex flex-col items-center text-center">
                  <img
                    src={j.photo}
                    alt={j.name}
                    loading="lazy"
                    className="h-32 w-32 rounded-full object-cover ring-4 ring-white/90 grayscale transition duration-500 group-hover:scale-105 group-hover:ring-yellow md:h-40 md:w-40"
                  />
                  <div className="mt-4 font-display text-lg font-bold uppercase tracking-wide text-yellow">{j.name}</div>
                  {j.title && <div className="mt-1 max-w-[15rem] text-sm leading-snug text-white/85">{j.title}</div>}
                  <div className="mt-0.5 max-w-[15rem] text-balance text-sm font-semibold leading-snug">{j.org}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT — a Korea–Singapore programme (Tammy, 25 Oct) */}
      <section id="about" className="relative isolate overflow-hidden bg-hero-gradient text-white">
        <div aria-hidden className="dotgrid pointer-events-none absolute inset-0 -z-10" />
        <div data-reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="max-w-2xl text-2xl font-bold md:text-3xl">Korea and Singapore, together on AI</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            KR-SG AI Connect is a joint Korea–Singapore programme on AI for the public sector. From 2 to 6 November,
            selected AI startups from Korea and Singapore work with agencies, investors and the AI community: a market-entry
            workshop, the pitching and networking evening at Lorong AI, 1:1 business meetings and visits to
            ecosystem partners.
          </p>

          <h3 className="mt-14 border-t border-white/15 pt-10 text-sm font-medium text-lichen">Organisers</h3>
          <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-8">
            {ORGANISERS.map((o) => (
              <div key={o.name} className="flex flex-col gap-5 sm:flex-row sm:items-center md:flex-col md:items-stretch xl:flex-row xl:items-center">
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="flex h-20 w-full shrink-0 items-center justify-center rounded-xl bg-white px-5 shadow-sm sm:w-56 md:w-full xl:w-56">
                  <img src={o.logo} alt={o.name} className={`${o.h} w-auto max-w-full object-contain`} />
                </a>
                <div>
                  <p className="font-semibold">{o.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">{o.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS — logos only, on white */}
      <section aria-label="Partners" className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-8 px-4 py-12 sm:px-6 xl:justify-between">
          {PARTNERS.map((o) => (
            <a key={o.name} href={o.href} target="_blank" rel="noopener noreferrer" title={o.name} className="transition hover:opacity-80">
              <img src={o.logo} alt={o.name} className={`${o.h} w-auto object-contain`} />
            </a>
          ))}
        </div>
      </section>

      <footer className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6">
          <Wordmark />
          <div>
            <a href={`mailto:${ORGANIZER_EMAIL}`} className="font-semibold text-primary hover:underline">{ORGANIZER_EMAIL}</a>
          </div>
          <div className="w-full border-t border-border pt-6 text-xs">
            © {EVENT_NAME}. {CREDITS}.
          </div>
        </div>
      </footer>
    </div>
  );
}
