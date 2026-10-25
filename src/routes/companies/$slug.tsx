import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Wordmark } from "@/components/Wordmark";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { companies, getCompanyBySlug, type Company } from "@/data/companies";
import { HIGHLIGHTS } from "@/data/profileHighlights";
import { useShow } from "@/lib/useShow";
import { EVENT_DATE, EVENT_VENUE, ONE_ON_ONE_OPEN, MEETUP_DATE, EVENT_NAME, CREDITS } from "@/data/timeslots";
import { STARTUP_IMAGES, STARTUP_LOGOS } from "@/data/companyImages";

export const Route = createFileRoute("/companies/$slug")({
  component: CompanyOnePager,
  loader: ({ params }) => {
    const company = getCompanyBySlug(params.slug);
    if (!company) throw notFound();
    return company;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${EVENT_NAME}` },
          { name: "description", content: loaderData.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold text-navy">Company not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary hover:underline">
          ← Back to all startups
        </Link>
      </div>
    </div>
  ),
});

// A GovTech profile reads like a public-sector service brief: what it does,
// who it serves, who already uses it and what they want to pilot, then the
// detail in clearly labelled sections with a contents list that follows the
// reader. Pattern borrowed from government design systems (summary lists,
// inset text, contents and pagination) because the audience here is
// agencies and their partners.

function lead(s: string): [string | null, string] {
  const m = s.match(/^([^:]{2,40}):\s+(.+)$/);
  return m ? [m[1], m[2]] : [null, s];
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="brief-list">
      {items.map((item, i) => {
        const [l, t] = lead(item);
        return (
          <li key={i}>
            {l && <b className="font-semibold text-navy">{l}: </b>}
            {t}
          </li>
        );
      })}
    </ul>
  );
}

// Product shot in a window frame that tilts toward the pointer.
function Window({ src, alt, domain }: { src: string; alt: string; domain: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
  };
  const reset = () => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); };
  return (
    <div className="window-stage" onPointerMove={onMove} onPointerLeave={reset}>
      <div ref={ref} className="window">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#0b1a36] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          {domain && <span className="ml-3 truncate rounded bg-white/10 px-2 py-0.5 text-[11px] text-white/60">{domain}</span>}
        </div>
        <img src={src} alt={alt} className="max-h-[22rem] w-full object-cover object-top" />
      </div>
    </div>
  );
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} data-show className="brief-section scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-navy md:text-[1.75rem]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function CompanyOnePager() {
  const company = Route.useLoaderData();
  return <Profile key={company.slug} company={company} />;
}

function Profile({ company }: { company: Company }) {
  useShow([company.slug]);
  const logo = STARTUP_LOGOS[company.slug];
  const photo = STARTUP_IMAGES[company.slug];
  const onePager = company.onepager ?? null;
  const irDeck = company.irdeck ?? null;
  const hasMeetups = ONE_ON_ONE_OPEN && company.track === "track1";
  const bookLabel = hasMeetups ? "Book a 1:1 meeting" : "RSVP for the Demo Day";
  const bookSearch: Record<string, string> = hasMeetups ? { day: "5", company: company.slug } : { day: "7" };
  const hl = HIGHLIGHTS[company.slug];
  const idx = companies.findIndex((c) => c.slug === company.slug);
  const next = companies[(idx + 1) % companies.length];
  const prev = companies[(idx - 1 + companies.length) % companies.length];
  const site = company.website?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const domain = site?.split("/")[0] ?? "";

  const sections = [
    company.problem.length ? { id: "problem", title: "The problem" } : null,
    company.solution.length || company.keyFeatures.length ? { id: "how", title: "How it works" } : null,
    company.businessModel.length || company.targetAudience.length ? { id: "model", title: "Users and business model" } : null,
    company.businessSnapshot.length ? { id: "record", title: "Track record" } : null,
    { id: "singapore", title: "In Singapore" },
    company.team.length ? { id: "team", title: "Team" } : null,
  ].filter(Boolean) as { id: string; title: string }[];
  const active = useScrollSpy(sections.map((x) => x.id));

  return (
    <div className="min-h-screen bg-background">
      <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px]">
        <div id="read-progress" className="h-full origin-left scale-x-0 bg-primary" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center"><Wordmark compact /></Link>
          <nav className="flex shrink-0 items-center gap-2 text-sm font-semibold text-navy">
            <span className="hidden tabular-nums text-navy/45 sm:inline">Company {idx + 1} of {companies.length}</span>
            <Link to="/" hash="startups" className="rounded-md px-2.5 py-2 font-medium transition hover:bg-secondary">All companies</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-hero-gradient pb-28 text-white md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 sm:px-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-14 lg:pt-14">
          <div>
            <div className="hero-in flex flex-wrap items-center gap-3">
              {logo && (
                <span className="inline-flex h-12 items-center rounded-lg bg-white px-4">
                  <img src={logo} alt={`${company.name} logo`} className="h-7 w-auto max-w-[10rem] object-contain" />
                </span>
              )}
              <span className="text-sm font-medium text-yellow">{company.sector}</span>
            </div>
            <h1 className="hero-in mt-6 text-[clamp(2.3rem,5.4vw,3.9rem)] font-bold leading-[1.04] tracking-tight [--i:1]">{company.displayName}</h1>
            <p className="hero-in mt-5 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl [--i:2]">{hl?.does ?? company.tagline}</p>
            <div className="hero-in mt-8 flex flex-wrap gap-3 [--i:3]">
              <Link to="/book" search={bookSearch} className="btn-hero inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold">{bookLabel}</Link>
              {onePager && <a href={onePager} target="_blank" rel="noopener noreferrer" className="btn-outline-hero inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold">One-pager (PDF)</a>}
              {irDeck && <a href={irDeck} target="_blank" rel="noopener noreferrer" className="btn-outline-hero inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold">IR deck (PDF)</a>}
              {company.website && <a href={company.website} target="_blank" rel="noopener noreferrer" className="btn-outline-hero inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold">Website</a>}
            </div>
          </div>
          {photo && <div className="hero-in [--i:2]"><Window src={photo} alt={`${company.name} product`} domain={domain} /></div>}
        </div>
      </section>

      {/* AT A GLANCE — overlaps the hero */}
      {hl && (
        <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 sm:px-6">
          <section aria-labelledby="glance" data-show className="glance">
            <h2 id="glance" className="text-sm font-semibold text-primary">At a glance</h2>
            <dl className="mt-4 divide-y divide-border">
              <div className="glance-row"><dt>What it does</dt><dd>{hl.does}</dd></div>
              <div className="glance-row"><dt>Who it serves</dt><dd>{hl.serves}</dd></div>
              <div className="glance-row">
                <dt>{hl.referencesLabel ?? "Proven with"}</dt>
                <dd className="flex flex-wrap gap-2">{hl.references.map((r) => <span key={r} className="ref-chip">{r}</span>)}</dd>
              </div>
              <div className="glance-row"><dt>Wants to pilot</dt><dd className="font-semibold text-navy">{hl.ask}</dd></div>
              <div className="glance-row"><dt>Stage</dt><dd>{company.stage}</dd></div>
            </dl>
            <div className="figures mt-6 grid border-t border-border pt-6 sm:grid-cols-3">
              {hl.figures.map(([v, l], i) => (
                <div key={l} className="figure" style={{ "--i": i } as CSSProperties}>
                  <div className="text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-none tracking-tight text-navy tabular-nums">{v}</div>
                  <div className="mt-2 text-sm leading-snug text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* BRIEF */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-sm font-semibold text-navy">On this page</p>
            <ol className="toc mt-3">
              {sections.map((x) => (
                <li key={x.id}>
                  <a href={`#${x.id}`} aria-current={active === x.id ? "true" : undefined} className={active === x.id ? "is-on" : ""}>{x.title}</a>
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-navy">Meet {company.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{hasMeetups ? MEETUP_DATE : `${EVENT_DATE}`}</p>
              <Link to="/book" search={bookSearch} className="btn-hero mt-3 flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold">{bookLabel}</Link>
            </div>
          </div>
        </aside>

        <div className="min-w-0 max-w-3xl space-y-16">
          {company.problem.length > 0 && (
            <Section id="problem" title="The problem">
              {hl?.problem && <p className="mb-5 text-xl font-semibold leading-snug text-navy/80">{hl.problem}</p>}
              <List items={company.problem} />
            </Section>
          )}

          {(company.solution.length > 0 || company.keyFeatures.length > 0) && (
            <Section id="how" title="How it works">
              {company.solution.length > 0 && (
                <ol className="component-list">
                  {company.solution.map((item, i) => {
                    const [l, t] = lead(item);
                    return (
                      <li key={i}>
                        {l ? <><b className="block text-base font-semibold text-navy">{l}</b><span>{t.charAt(0).toUpperCase() + t.slice(1)}</span></> : <span className="text-navy/85">{t}</span>}
                      </li>
                    );
                  })}
                </ol>
              )}
              {company.keyFeatures.length > 0 && (
                <>
                  <h3 className="mt-8 text-base font-semibold text-navy">What it can do</h3>
                  <ul className="check-list mt-3">
                    {company.keyFeatures.map((f, i) => {
                      const [l, t] = lead(f);
                      return <li key={i}>{l && <b className="font-semibold text-navy">{l}: </b>}{t}</li>;
                    })}
                  </ul>
                </>
              )}
            </Section>
          )}

          {(company.businessModel.length > 0 || company.targetAudience.length > 0) && (
            <Section id="model" title="Users and business model">
              <div className="grid gap-8 md:grid-cols-2">
                {company.targetAudience.length > 0 && <div><h3 className="text-base font-semibold text-navy">Who uses it</h3><div className="mt-3"><List items={company.targetAudience} /></div></div>}
                {company.businessModel.length > 0 && <div><h3 className="text-base font-semibold text-navy">How it earns</h3><div className="mt-3"><List items={company.businessModel} /></div></div>}
              </div>
            </Section>
          )}

          {company.businessSnapshot.length > 0 && (
            <Section id="record" title="Track record">
              {company.businessSnapshot.filter((x) => lead(x)[0]).length * 2 < company.businessSnapshot.length ? (
                <List items={company.businessSnapshot} />
              ) : (
              <dl className="record">
                {company.businessSnapshot.map((item, i) => {
                  const [l, t] = lead(item);
                  return (
                    <div key={i} className="record-row">
                      <dt>{l ?? " "}</dt>
                      <dd>{t}</dd>
                    </div>
                  );
                })}
              </dl>
              )}
            </Section>
          )}

          <Section id="singapore" title="In Singapore">
            {hl && (
              <div className="inset">
                <p className="text-sm font-semibold text-primary">Their ask</p>
                <p className="mt-1 text-lg font-semibold leading-snug text-navy">{hl.ask}</p>
              </div>
            )}
            <h3 className="mt-6 text-base font-semibold text-navy">They want to meet</h3>
            <div className="mt-3"><List items={company.seekingOpportunities.filter((x) => !hl || x.slice(0, 24).toLowerCase() !== hl.ask.slice(0, 24).toLowerCase())} /></div>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/book" search={bookSearch} className="btn-hero inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold">{bookLabel}</Link>
              <span className="text-sm text-muted-foreground">{hasMeetups ? `1:1 meetings · ${MEETUP_DATE}` : `${EVENT_DATE} · ${EVENT_VENUE}`}</span>
            </div>
          </Section>

          {company.team.length > 0 && (
            <Section id="team" title="Team">
              <ul className="grid gap-3 sm:grid-cols-2">
                {company.team.map((m) => (
                  <li key={m.name} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-sm font-bold text-yellow">
                        {m.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-navy">{m.name}</span>
                        <span className="block text-sm text-muted-foreground">{m.role}</span>
                      </span>
                    </div>
                    {m.bio.length > 0 && <ul className="mt-3 space-y-1 text-[13px] leading-relaxed text-muted-foreground">{m.bio.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                  </li>
                ))}
              </ul>
              {(site || company.email || company.phone) && (
                <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm text-navy">
                  {site && <a href={company.website} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">{site}</a>}
                  {company.email && <a href={`mailto:${company.email}`} className="underline-offset-4 hover:underline">{company.email}</a>}
                  {company.phone && <span>{company.phone}</span>}
                </p>
              )}
            </Section>
          )}

          {/* pagination */}
          <nav aria-label="More companies" className="pager grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
            <Link to="/companies/$slug" params={{ slug: prev.slug }} className="pager-link">
              <span className="text-sm font-semibold text-primary">← Previous</span>
              <span className="mt-1 block text-lg font-bold text-navy">{prev.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{prev.sector}</span>
            </Link>
            <Link to="/companies/$slug" params={{ slug: next.slug }} className="pager-link sm:text-right">
              <span className="text-sm font-semibold text-primary">Next →</span>
              <span className="mt-1 block text-lg font-bold text-navy">{next.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">{next.sector}</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* mobile booking bar */}
      <div className="mobile-book fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/book" search={bookSearch} className="btn-hero flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold">{bookLabel} with {company.name}</Link>
      </div>

      <footer className="border-t border-border bg-background pb-20 lg:pb-0">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 sm:px-6">
          <Wordmark />
          <div className="text-xs text-muted-foreground">© {EVENT_NAME} · {CREDITS}</div>
        </div>
      </footer>
    </div>
  );
}
