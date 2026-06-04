import { sponsors } from "../data/sponsors";
import "./Sponsors.css";

const SPONSOR_URL = "https://github.com/sponsors/gfazioli";

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
          {sponsors.map((s) => (
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
        </div>
      </div>
    </section>
  );
}
