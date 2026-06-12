import { sponsors } from "../data/sponsors";
import "./Sponsors.css";

const SPONSOR_URL = "https://github.com/sponsors/gfazioli";
const DONATE_URL = "https://donate.stripe.com/fZu4gy4Tn3b1dgudGx0co00";

export function Sponsors() {
  return (
    <section className="section sponsors" id="sponsors">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Support</span>
          <h2 className="sponsors-title">Sponsors</h2>
          <p>
            If my open-source work saves you or your team time, consider sponsoring its development. Sponsors get their
            name or logo featured here and across all my projects&apos; documentation sites.
          </p>
        </div>

        <div className="sponsors-wall">
          {sponsors.map(s => (
            <a
              key={s.key}
              className="sponsor"
              href={s.href ?? `https://github.com/${s.github}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                className="sponsor-avatar"
                src={`https://github.com/${s.github}.png`}
                alt={`${s.name} avatar`}
                width={72}
                height={72}
                loading="lazy"
              />
              <span className="sponsor-name">{s.name}</span>
            </a>
          ))}

          <a className="sponsor sponsor-slot" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
            <span className="sponsor-avatar" aria-hidden="true">
              <span className="sponsor-slot-plus">+</span>
            </span>
            <span className="sponsor-name">Your logo here</span>
          </a>
        </div>

        <div className="sponsors-cta">
          <a className="sponsors-cta-btn" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
            <span className="sponsors-cta-heart" aria-hidden="true">
              ❤
            </span>
            Become a sponsor
          </a>
          <a className="coffee-cta-btn" href={DONATE_URL} target="_blank" rel="noreferrer noopener">
            <span className="coffee-cta-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
                <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
                <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
                <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5" />
                <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
              </svg>
            </span>
            Buy me a coffee
          </a>
        </div>
      </div>
    </section>
  );
}
