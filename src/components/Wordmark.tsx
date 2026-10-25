// Event wordmark: programme name only, no date/format label (Tammy, 25 Oct).
// `compact` is kept for callers; the name alone already fits phones.
export function Wordmark({ light = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center ${light ? "text-white" : "text-navy"}`}>
      <span className="font-display text-lg font-extrabold leading-none tracking-tight sm:text-xl">KR-SG AI Connect</span>
    </span>
  );
}
