// Product photos and logos, cropped from each startup's one-pager (12 Oct).
// Clotho and MEDIAIPLUS have none yet — cards fall back to text.
import imgStellarvision from "@/assets/startups/stellarvision.jpg";
import imgHellofriends from "@/assets/startups/hellofriends.jpg";
import imgShareplat from "@/assets/startups/shareplat.jpg";
import imgLlumos from "@/assets/startups/llumos.jpg";
import logoStellarvision from "@/assets/startups/logos/stellarvision.png";
import logoHellofriends from "@/assets/startups/logos/hellofriends.png";
import logoShareplat from "@/assets/startups/logos/shareplat.png";
import logoLlumos from "@/assets/startups/logos/llumos.png";

export const STARTUP_IMAGES: Record<string, string> = {
  stellarvision: imgStellarvision,
  hellofriends: imgHellofriends,
  shareplat: imgShareplat,
  llumos: imgLlumos,
};

export const STARTUP_LOGOS: Record<string, string> = {
  stellarvision: logoStellarvision,
  hellofriends: logoHellofriends,
  shareplat: logoShareplat,
  llumos: logoLlumos,
};
