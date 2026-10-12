// Programme wordmark (text until KOSA supplies a logo). The radar mark
// matches the favicon. `compact`: mark only on phones, for crowded headers.
export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display font-bold tracking-tight ${light ? "text-white" : "text-navy"}`}>
      <svg viewBox="0 0 512 512" className="h-6 w-6 shrink-0" aria-hidden>
        <rect width="512" height="512" rx="104" fill={light ? "#ffffff" : "#0F2A2C"} />
        <circle cx="256" cy="256" r="150" fill="none" stroke={light ? "#0F2A2C" : "#BFE3DA"} strokeWidth="28" opacity="0.55" />
        <circle cx="256" cy="256" r="72" fill="none" stroke="#14A08E" strokeWidth="28" />
        <path d="M256 256 L256 106 A150 150 0 0 1 362 150 Z" fill="#F2C14E" />
      </svg>
      <span className={`text-[15px] leading-none sm:text-base ${compact ? "max-sm:sr-only" : ""}`}>
        KOSA GovTech
        {!compact && <span className={`ml-1.5 hidden font-medium sm:inline ${light ? "text-white/70" : "text-muted-foreground"}`}>Singapore 2026</span>}
      </span>
    </span>
  );
}
