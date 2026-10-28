// Demo Day judges (Tue 3 Nov). Source: Tammy's email to Lorong AI (27 Oct),
// three confirmed so far; a fourth may come from Lorong AI. Photos from
// LinkedIn, greyscale. Titles from their LinkedIn profiles.
import jeffreyPaine from "@/assets/people/jeffrey-paine.jpg";
import jeremySim from "@/assets/people/jeremy-sim.jpg";
import peterChang from "@/assets/people/peter-chang.jpg";
// Added 29 Oct (Tammy): the two KISED Demo Day judges, same photos.
import zhenZhenOng from "@/assets/people/zhen-zhen-ong.jpg";
import wonkiKim from "@/assets/people/wonki-kim.jpg";
export interface Person {
  name: string;
  title: string;
  org: string;
  photo: string;
}

export const CONGRATULATORY: Person | null = null;

export const JUDGES: Person[] = [
  { name: "Jeffrey Paine", title: "Founding Partner", org: "Golden Gate Ventures", photo: jeffreyPaine },
  { name: "Jeremy Sim", title: "Innovation Director", org: "Mistletoe", photo: jeremySim },
  // ponytail: title not confirmed; org from his LinkedIn
  { name: "Dr. Peter Chang", title: "", org: "A*STAR Institute of Microelectronics (IME)", photo: peterChang },
  { name: "Zhen Zhen Ong", title: "", org: "Openspace Ventures", photo: zhenZhenOng },
  { name: "Won-Ki Kim", title: "", org: "Lighthouse Canton", photo: wonkiKim },
];
