import { useEffect, useState, type CSSProperties } from "react";
import { AmigaErrorBoundary } from "react-amiga-guru-meditation";
import { CopyButton } from "./CopyButton";
import { configToCSSVars } from "../hooks/useThemeConfig";
import { PRESETS } from "../presets";
import "./Hero.css";

const HERO_ERROR = new Error("Something deep within your code path threw a wrench at React.");

export function Hero() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % PRESETS.length), 3600);
    return () => clearInterval(id);
  }, []);

  const preset = PRESETS[idx]!;
  const stageStyle = configToCSSVars(preset.config) as CSSProperties;

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> v4 · fully rewritten for React 18+
        </span>

        <h1>
          The Error Boundary that{" "}
          <span className="gradient-text">panics in style</span>.
        </h1>

        <p className="hero-sub">
          A React Error Boundary styled like the Amiga Guru Meditation. Accessible{" "}
          <code>role="alert"</code>, themeable via CSS variables, zero runtime dependencies.
        </p>

        <div className="hero-cta">
          <CopyButton text="npm install react-amiga-guru-meditation" variant="primary">
            <span className="hero-cta-cmd">
              <span className="hero-cta-prompt">$</span> npm install react-amiga-guru-meditation
            </span>
          </CopyButton>
          <a
            href="https://github.com/gfazioli/react-amiga-guru-meditation"
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.97 10.97 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="hero-showcase" aria-hidden="true" style={stageStyle}>
          <AmigaErrorBoundary
            show
            error={HERO_ERROR}
            showDetails={false}
            noBlink={preset.config.noBlink}
            formatGuru={() => "#00000003.48454C50"}
          />
          <div className="hero-showcase-meta">
            <span className="hero-showcase-name">{preset.name}</span>
            <span className="hero-showcase-hint">cycling presets — click any below</span>
          </div>
        </div>
      </div>
    </section>
  );
}
