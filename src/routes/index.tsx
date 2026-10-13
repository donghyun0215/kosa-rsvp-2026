import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { Wordmark } from "@/components/Wordmark";
import globeArt from "@/assets/globe-asia.webp";
import kosaLogoWhite from "@/assets/logos/kosa-white.png";
import { JUDGES } from "@/data/speakers";
import { companies } from "@/data/companies";
import { STARTUP_IMAGES, STARTUP_LOGOS } from "@/data/companyImages";
import {
  EVENT_ADDRESS,
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

// Who each startup serves → what it gives them; shown on cards that have
// no product photo yet. Condensed from each company's own description.
const LEDGER: Record<string, [from: string, to: string]> = {
  stellarvision: ["Defence & disaster agencies", "SAR satellite intelligence"],
  clotho: ["SMEs & public agencies", "automated grant compliance"],
  hellofriends: ["Migrant workers", "multilingual AI kiosks"],
  shareplat: ["Utility crews", "cable-routing robots"],
  mediaiplus: ["Biotechs", "AI-matched global CROs"],
  llumos: ["Grant-funded companies", "end-to-end expense filing"],
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

const HEADLINE = ["Korea", "GovTech", "Demo", "Day"];

// Hero art (Tammy's mock-up: night earth with routes). Asia at night is
// NASA Black Marble rendered as a globe on #08142E (three.js, 2880×1300);
// city points are that render's projected coordinates, so routes land on
// the real city lights. Every route ends in Singapore; Seoul's is orange.
const CITY: Record<string, [number, number]> = {
  seoul: [2148, 131], tokyo: [2404, 165], hongkong: [1875, 553], manila: [2067, 773],
  bangkok: [1497, 788], hcmc: [1664, 883], singapore: [1587, 1131],
};
const ROUTES = ["seoul", "tokyo", "hongkong", "manila", "hcmc", "bangkok"];
function arc(from: string, to: string) {
  const [x1, y1] = CITY[from], [x2, y2] = CITY[to];
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
  const bow = 0.22; // bulge to the right of the direction of travel
  return `M${x1} ${y1} Q${mx - dy * bow} ${my + dx * bow} ${x2} ${y2}`;
}
function Globe({ align }: { align: "xMaxYMid" | "xMidYMid" }) {
  return (
    <svg viewBox="0 0 2880 1300" preserveAspectRatio={`${align} slice`} className="absolute inset-0 h-full w-full">
      <g className="globe-drift">
        <image href={globeArt} width="2880" height="1300" />
        {ROUTES.map((c, i) => (
          <path key={c} d={arc(c, "singapore")} pathLength={1} className={`route ${c === "seoul" ? "route-main" : ""}`} style={{ "--i": i } as CSSProperties} />
        ))}
        {ROUTES.map((c, i) => (
          <path key={`p-${c}`} d={arc(c, "singapore")} pathLength={1} className="route-pulse" style={{ "--i": i } as CSSProperties} />
        ))}
        {ROUTES.map((c, i) => (
          <circle key={`c-${c}`} cx={CITY[c][0]} cy={CITY[c][1]} r={c === "seoul" ? 11 : 8} className={`city ${c === "seoul" ? "city-hub" : ""}`} style={{ "--i": i } as CSSProperties} />
        ))}
        <circle cx={CITY.singapore[0]} cy={CITY.singapore[1]} r="12" className="city-ring" />
        <circle cx={CITY.singapore[0]} cy={CITY.singapore[1]} r="13" className="city city-hub" style={{ "--i": 6 } as CSSProperties} />
      </g>
    </svg>
  );
}

function Landing() {
  useReveal();
  useTiltAndMagnet();
  return (
    <div className="min-h-screen">
      {/* HEADER — white bar above the hero, as in the mock-up */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="min-w-0">
            <Wordmark />
          </a>
          <nav className="-mx-1 flex items-center gap-1.5 text-xs font-semibold text-navy sm:text-sm md:mx-0 md:gap-2">
            <a href="#rsvp" className="rounded-md bg-secondary px-2.5 py-2 hover:bg-accent md:px-4">RSVP</a>
            <a href="#startups" className="rounded-md bg-secondary px-2.5 py-2 hover:bg-accent md:px-4">Companies</a>
            {JUDGES.length > 0 && <a href="#judges" className="rounded-md bg-secondary px-2.5 py-2 hover:bg-accent md:px-4">Judges</a>}
            <a href="#about" className="rounded-md bg-secondary px-2.5 py-2 hover:bg-accent md:px-4">About</a>
            <a href="/lounge" className="rounded-md bg-secondary px-2.5 py-2 hover:bg-accent md:px-4">Lounge</a>
            <span className="ml-auto md:ml-2"><ContactOrganizer /></span>
          </nav>
        </div>
      </header>

      {/* HERO — night earth, routes into Singapore */}
      <section id="top" className="relative isolate overflow-hidden bg-[#08142e] text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="hidden h-full md:block"><Globe align="xMaxYMid" /></div>
          <div className="h-full md:hidden"><Globe align="xMidYMid" /></div>
          {/* keeps the copy readable where it crosses the globe */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#08142e_0%,rgb(8_20_46/0.85)_30%,rgb(8_20_46/0.1)_62%,transparent_100%)] max-md:bg-[linear-gradient(180deg,rgb(8_20_46/0.9)_0%,rgb(8_20_46/0.7)_55%,transparent_80%)]" />
        </div>

        <div className="mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 pb-56 pt-14 sm:px-6 md:pb-20 md:pt-20 md:min-h-[620px] lg:py-28">
          <p className="hero-in text-xs font-bold uppercase tracking-[0.16em] text-yellow">KOSA · Singapore 2026</p>
          <h1 className="hero-title mt-4 max-w-2xl text-[clamp(2.5rem,7vw,4.4rem)] font-extrabold leading-[1.02] text-white" aria-label={HEADLINE.join(" ")}>
            {HEADLINE.map((w, i) => (
              <span key={w} aria-hidden>
                <span className="hero-word-clip">
                  <span className="hero-word" style={{ "--i": i } as CSSProperties}>{w}</span>
                </span>{" "}
                {i === 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="hero-in [--i:5] mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-[1.0625rem]">
            Six Korean GovTech companies take the stage in Singapore to pitch breakthrough solutions and demonstrate
            technology built for better public services. Meet the founders, experience live demos, and explore
            opportunities for pilots and cross-border partnerships.
          </p>
          <div className="hero-in [--i:6] mt-8 flex flex-wrap gap-3">
            <Link to="/book" search={{ day: "7" }} data-magnet className="btn-hero magnet rounded-full px-6 py-3.5 text-sm font-semibold">
              Join Demo Day →
            </Link>
            {ONE_ON_ONE_OPEN && (
              <Link to="/book" search={{ day: "5" }} data-magnet className="btn-outline-hero magnet rounded-full px-6 py-3.5 text-sm font-semibold">
                Schedule a 1:1 Meeting
              </Link>
            )}
          </div>
          <p className="hero-in [--i:7] mt-8 text-sm font-medium text-white/70">
            1:1 meetings {MEETUP_DAY_SHORT} · Demo Day {EVENT_DAY_SHORT}
          </p>
        </div>

      </section>

      {/* Cohort marquee: logos (names until supplied) glide under the hero */}
      <section className="bg-[#08142e]">
        <div className="marquee relative border-t border-white/10 py-5" aria-hidden>
          <div className="marquee-track">
            {[...companies, ...companies].map((c, i) => (
              <span key={`${c.slug}-${i}`} className="mx-6 inline-flex shrink-0 items-center gap-6 font-display text-2xl font-semibold text-white/80">
                {STARTUP_LOGOS[c.slug] ? (
                  <span className="inline-flex h-12 w-36 items-center justify-center rounded-lg bg-white/95 px-4">
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
      <section id="rsvp" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2 data-reveal className="max-w-xl text-3xl font-bold text-navy md:text-4xl">Two days in Singapore</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          For investors, corporates and ecosystem partners. Register for either day or both.
        </p>

        <div data-reveal className="mt-10 grid gap-px rounded-2xl border border-border bg-border shadow-[var(--shadow-card)] [perspective:1200px] md:grid-cols-2">
          <article data-tilt className="tilt flex flex-col bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-muted-foreground">1:1 business meetings</h3>
            <p className="mt-2 font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-tight text-navy">
              {MEETUP_DAY_SHORT}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-primary">{MEETUP_TIME}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Three 40-minute rounds with the startups you pick, the afternoon before the pitches.
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
          <article data-tilt className="tilt flex flex-col bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-muted-foreground">Demo Day</h3>
            <p className="mt-2 font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none tracking-tight text-navy">
              {EVENT_DAY_SHORT}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-primary">{EVENT_TIME}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Six startup pitches and a keynote, then a networking dinner. Registration and coffee from 14:30.
            </p>
            <div className="mt-4">
              <Place venue={EVENT_VENUE} address={EVENT_ADDRESS} map={EVENT_MAP_URL} />
            </div>
            <div className="mt-auto pt-7">
              <Link to="/book" search={{ day: "7" }} className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                RSVP for the Demo Day
              </Link>
            </div>
          </article>

        </div>
      </section>

      {/* STARTUPS */}
      <section id="startups" className="border-t border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <h2 data-reveal className="text-3xl font-bold text-navy md:text-4xl">The startups</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Open a profile for more, or book a 1:1 straight away.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 [perspective:1200px] sm:gap-4 lg:grid-cols-3">
            {companies.map((c, i) => (
              <article key={c.slug} data-reveal style={{ "--rd": `${(i % 3) * 70}ms` } as CSSProperties} data-tilt className="card-startup tilt group flex flex-col overflow-hidden rounded-xl">
                <Link to="/companies/$slug" params={{ slug: c.slug }} className="relative block aspect-[3/2] overflow-hidden bg-hero-gradient">
                  {STARTUP_IMAGES[c.slug] ? (
                    <img
                      src={STARTUP_IMAGES[c.slug]}
                      alt={`${c.name}: ${c.sector}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
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
                <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                  <Link to="/companies/$slug" params={{ slug: c.slug }} className="flex h-8 items-center" title={c.name}>
                    {STARTUP_LOGOS[c.slug] ? (
                      <img src={STARTUP_LOGOS[c.slug]} alt={c.name} className="max-h-7 max-w-[120px] object-contain object-left sm:max-h-8 sm:max-w-[150px]" />
                    ) : (
                      <span className="font-display text-lg font-bold text-navy">{c.name}</span>
                    )}
                  </Link>
                  <div className="text-xs font-semibold text-primary">{c.sector}</div>
                  <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">{c.tagline}</p>
                  <div className="mt-auto flex flex-col gap-2 pt-2">
                    <Link
                      to="/companies/$slug"
                      params={{ slug: c.slug }}
                      className="rounded-full border border-primary px-3 py-2 text-center text-xs font-semibold text-primary hover:bg-primary/10"
                    >
                      View profile
                    </Link>
                    {ONE_ON_ONE_OPEN && (
                      <Link
                        to="/book"
                        search={{ day: "5", company: c.slug }}
                        className="rounded-full bg-primary px-3 py-2 text-center text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                      >
                        Book a 1:1 meeting
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

      {/* HOST — KOSA only for now (same rule as KISED: hosts first) */}
      <section id="about" className="relative isolate overflow-hidden bg-hero-gradient text-white">
        <div aria-hidden className="dotgrid pointer-events-none absolute inset-0 -z-10" />
        <div data-reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <h2 className="max-w-2xl text-2xl font-bold md:text-3xl">About the K-GovTech Open Innovation Day</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">
            A KOSA programme that takes Korean GovTech startups to Singapore to meet public agencies, investors and
            partners. The six startups selected in Korea spend 2–6 November in Singapore for a market-entry workshop,
            1:1 business meetings, the IR / Demo Day and visits to ecosystem partners.
          </p>

          <div className="mt-12 border-t border-white/15 pt-10">
            <p className="text-sm font-medium text-lichen">Hosted by</p>
            <div className="mt-4 max-w-xl">
              <a href={KOSA_SITE} target="_blank" rel="noopener noreferrer" className="inline-flex">
                <img src={kosaLogoWhite} alt="KOSA — Korea AI·Software Industry Association" className="h-14 w-auto" />
              </a>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Korea's industry association for AI and software companies. It represents its members on policy and
                runs programmes that help them grow at home and abroad, including this one.
              </p>
            </div>
          </div>
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
