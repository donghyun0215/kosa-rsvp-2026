// Demo Day judges and speakers (Wed 4 Nov). ponytail: empty until KOSA
// confirms the line-up — the "Who You'll Meet" section hides while empty.
export interface Person {
  name: string;
  title: string;
  org: string;
  photo: string;
}

export const CONGRATULATORY: Person | null = null;

export const JUDGES: Person[] = [];
