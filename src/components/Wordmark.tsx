// Event wordmark: programme name, not the host (Tammy, 13 Oct). KOSA's own
// logo lives in the "Hosted by" block. `compact`: name only on phones.
export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${light ? "text-white" : "text-navy"}`}>
      <span className="font-display text-lg font-extrabold leading-none tracking-tight sm:text-xl">K-GovTech</span>
      <span className={`h-6 w-px ${light ? "bg-white/30" : "bg-border"} ${compact ? "max-sm:hidden" : ""}`} aria-hidden />
      <span className={`text-[10px] font-medium leading-[1.25] sm:text-[11px] ${light ? "text-white/75" : "text-muted-foreground"} ${compact ? "max-sm:hidden" : ""}`}>
        Open Innovation Day in Singapore
        <br />
        3–4 Nov 2026
      </span>
    </span>
  );
}
