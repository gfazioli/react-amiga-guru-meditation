export interface Sponsor {
  /** Stable key for React lists. */
  key: string;
  /** Display name shown under the avatar. */
  name: string;
  /** GitHub username — used for the avatar (`https://github.com/<github>.png`). */
  github: string;
  /** Optional override link; defaults to the sponsor's GitHub profile. */
  href?: string;
}

export const sponsors: Sponsor[] = [{ key: "kastov", name: "kastov", github: "kastov" }];
