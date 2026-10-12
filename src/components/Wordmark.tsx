// KOSA logo (supplied 12 Oct; low-res source — swap for the vector file
// when KOSA sends it). `light` = white version for dark grounds.
// `compact`: slightly smaller, for crowded headers.
import kosaLogo from "@/assets/logos/kosa.png";
import kosaLogoWhite from "@/assets/logos/kosa-white.png";

export function Wordmark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <img
      src={light ? kosaLogoWhite : kosaLogo}
      alt="KOSA — Korea AI·Software Industry Association"
      className={`w-auto ${compact ? "h-9" : "h-10 sm:h-12"}`}
    />
  );
}
