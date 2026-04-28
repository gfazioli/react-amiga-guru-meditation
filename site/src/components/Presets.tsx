import { type CSSProperties } from "react";
import { AmigaErrorBoundary } from "react-amiga-guru-meditation";
import { configToCSSVars, useThemeConfig } from "../hooks/useThemeConfig";
import { PRESETS } from "../presets";
import "./Presets.css";

const PREVIEW_ERROR = new Error("crash");

export function Presets() {
  const { setConfig } = useThemeConfig();

  return (
    <section className="section presets" id="presets">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Preset gallery</span>
          <h2>
            Or start from a <span className="gradient-text">preset</span>.
          </h2>
          <p>Click any card to load it into the builder above. Then tweak, copy, ship.</p>
        </div>

        <div className="presets-grid">
          {PRESETS.map((preset) => {
            const stageStyle = configToCSSVars(preset.config) as CSSProperties;
            return (
              <button
                key={preset.id}
                type="button"
                className="preset-card"
                onClick={() => {
                  setConfig(preset.config);
                  document.querySelector("#builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-label={`Load ${preset.name} preset`}
              >
                <div className="preset-stage" style={stageStyle}>
                  <AmigaErrorBoundary
                    show
                    error={PREVIEW_ERROR}
                    showDetails={false}
                    noBlink={preset.config.noBlink}
                    formatGuru={() => "#00000003.48454C50"}
                    title="Software Failure."
                  />
                </div>
                <div className="preset-meta">
                  <h3>{preset.name}</h3>
                  <p>{preset.description}</p>
                </div>
                <span className="preset-arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
