// KOSA wordmark as in Tammy's mock-up: "KOSA" | association name on two
// lines. `compact`: "KOSA" only on phones, for crowded headers.
export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${light ? "text-white" : "text-navy"}`}>
      <span className="font-display text-xl font-extrabold leading-none tracking-tight">KOSA</span>
      <span className={`h-6 w-px ${light ? "bg-white/30" : "bg-border"} ${compact ? "max-sm:hidden" : ""}`} aria-hidden />
      <span className={`text-[10px] font-medium leading-[1.2] ${light ? "text-white/75" : "text-muted-foreground"} ${compact ? "max-sm:hidden" : ""}`}>
        Korea AI·Software
        <br />
        Industry Association
      </span>
    </span>
  );
}
