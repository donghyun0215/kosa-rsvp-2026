// Product photos and logos, cropped from each startup's one-pager (12 Oct).
// Clotho's come from its IR deck (no one-pager yet).
import imgStellarvision from "@/assets/startups/stellarvision.jpg";
import imgHellofriends from "@/assets/startups/hellofriends.jpg";
import imgShareplat from "@/assets/startups/shareplat.jpg";
import imgMediaiplus from "@/assets/startups/mediaiplus.jpg";
import imgClotho from "@/assets/startups/clotho.jpg";
// Nora AI: the mascot from its own website (hinora.co og-image), set on its lavender.
import imgNora from "@/assets/startups/nora-ai.jpg";
import logoStellarvision from "@/assets/startups/logos/stellarvision.png";
import logoHellofriends from "@/assets/startups/logos/hellofriends.png";
import logoShareplat from "@/assets/startups/logos/shareplat.png";
import logoMediaiplus from "@/assets/startups/logos/mediaiplus.png";
import logoClotho from "@/assets/startups/logos/clotho.png";
// Nora AI: the mascot + wordmark from its own site header (hinora.co).
import logoNora from "@/assets/startups/logos/nora-ai.png";

export const STARTUP_IMAGES: Record<string, string> = {
  stellarvision: imgStellarvision,
  hellofriends: imgHellofriends,
  shareplat: imgShareplat,
  mediaiplus: imgMediaiplus,
  clotho: imgClotho,
  "nora-ai": imgNora,
};

export const STARTUP_LOGOS: Record<string, string> = {
  stellarvision: logoStellarvision,
  hellofriends: logoHellofriends,
  shareplat: logoShareplat,
  mediaiplus: logoMediaiplus,
  clotho: logoClotho,
  "nora-ai": logoNora,
};
