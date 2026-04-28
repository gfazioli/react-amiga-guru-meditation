import { useEffect, useState, type CSSProperties } from "react";
import { AmigaErrorBoundary } from "react-amiga-guru-meditation";
import {
  configToCSSVars,
  FONT_STACKS,
  useThemeConfig,
  type FontStyleKey,
  type ThemeConfig,
} from "../hooks/useThemeConfig";
import { CopyButton } from "./CopyButton";
import "./Builder.css";

type NumKey = "borderWidth" | "blinkDuration" | "fontSize" | "padding";

interface NumControl {
  key: NumKey;
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  format?: (v: number) => string;
}

const SIZE_CONTROLS: NumControl[] = [
  { key: "borderWidth", label: "Border", min: 0, max: 16, unit: "px" },
  { key: "padding", label: "Padding", min: 8, max: 64, unit: "px" },
  { key: "fontSize", label: "Font size", min: 12, max: 32, unit: "px" },
];

const TIMING_CONTROLS: NumControl[] = [
  {
    key: "blinkDuration",
    label: "Blink duration",
    min: 3,
    max: 30,
    step: 1,
    format: (v) => `${(v / 10).toFixed(1)}s`,
  },
];

const FONT_OPTIONS: { id: FontStyleKey; label: string }[] = [
  { id: "serif", label: "Serif" },
  { id: "mono", label: "Mono" },
  { id: "sans", label: "Sans" },
];

const PREVIEW_ERROR = new Error("Stack overflow at line 0x4242: cosmic ray flipped a bit.");

export function Builder() {
  const { config, patch, reset, shareUrl } = useThemeConfig();

  return (
    <section className="section builder" id="builder">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Live theme builder</span>
          <h2>
            Tune it. <span className="gradient-text">Copy it.</span> Ship it.
          </h2>
          <p>Every visual knob maps to a CSS variable. Tweak the controls, share the URL, paste the snippet.</p>
        </div>

        <div className="builder-grid">
          <div className="builder-controls">
            <NumGroup title="Style" controls={SIZE_CONTROLS} config={config} patch={patch} />
            <NumGroup
              title="Animation"
              controls={TIMING_CONTROLS}
              config={config}
              patch={patch}
              transformValue={(k, v) => (k === "blinkDuration" ? v / 10 : v)}
              transformDisplay={(k, v) => (k === "blinkDuration" ? v * 10 : v)}
            />

            <div className="builder-group">
              <h4>Font</h4>
              <div className="builder-rows">
                <div className="builder-row builder-row-pills">
                  <span className="builder-row-label">Family</span>
                  <div className="builder-pills" role="radiogroup" aria-label="Font family">
                    {FONT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={config.fontFamily === opt.id}
                        className={`builder-pill ${config.fontFamily === opt.id ? "active" : ""}`}
                        onClick={() => patch({ fontFamily: opt.id })}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="builder-group">
              <h4>Options</h4>
              <div className="builder-rows">
                <CheckRow
                  label="Disable blink"
                  checked={config.noBlink}
                  onChange={(v) => patch({ noBlink: v })}
                />
                <CheckRow
                  label="Show component stack"
                  checked={config.showDetails}
                  onChange={(v) => patch({ showDetails: v })}
                />
              </div>
            </div>

            <div className="builder-group">
              <h4>Colors</h4>
              <div className="builder-rows">
                <ColorRow label="Foreground" value={config.fg} onChange={(v) => patch({ fg: v })} />
                <ColorRow label="Background" value={config.bg} onChange={(v) => patch({ bg: v })} />
              </div>
            </div>

            <div className="builder-actions">
              <button type="button" className="btn btn-secondary" onClick={reset}>
                Reset
              </button>
              <CopyButton text={shareUrl} variant="secondary" label="Copy share URL">
                <span>Share URL</span>
              </CopyButton>
            </div>
          </div>

          <BuilderPreview config={config} />
        </div>
      </div>
    </section>
  );
}

function NumGroup({
  title,
  controls,
  config,
  patch,
  transformValue,
  transformDisplay,
}: {
  title: string;
  controls: NumControl[];
  config: ThemeConfig;
  patch: (delta: Partial<ThemeConfig>) => void;
  transformValue?: (k: NumKey, raw: number) => number;
  transformDisplay?: (k: NumKey, stored: number) => number;
}) {
  return (
    <div className="builder-group">
      <h4>{title}</h4>
      <div className="builder-rows">
        {controls.map((c) => {
          const stored = config[c.key];
          const sliderValue = transformDisplay ? transformDisplay(c.key, stored) : stored;
          return (
            <NumRow
              key={c.key}
              control={c}
              value={sliderValue}
              onChange={(raw) => {
                const next = transformValue ? transformValue(c.key, raw) : raw;
                patch({ [c.key]: next } as Partial<ThemeConfig>);
              }}
              displayValue={stored}
            />
          );
        })}
      </div>
    </div>
  );
}

function NumRow({
  control,
  value,
  onChange,
  displayValue,
}: {
  control: NumControl;
  value: number;
  onChange: (v: number) => void;
  displayValue: number;
}) {
  const display = control.format ? control.format(value) : `${displayValue}${control.unit ?? ""}`;
  return (
    <label className="builder-row builder-row-num">
      <span className="builder-row-label">{control.label}</span>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="builder-row-value">{display}</span>
    </label>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="builder-row builder-row-check">
      <span className="builder-row-label">{label}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);

  return (
    <div className="builder-row builder-row-color">
      <span className="builder-row-label">{label}</span>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} aria-label={`${label} color`} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if (/^#[0-9a-fA-F]{6}$/.test(text)) onChange(text);
          else setText(value);
        }}
        spellCheck={false}
        className="builder-color-input"
        aria-label={`${label} hex`}
      />
    </div>
  );
}

function BuilderPreview({ config }: { config: ThemeConfig }) {
  const [tab, setTab] = useState<"jsx" | "css">("jsx");
  const previewStyle = configToCSSVars(config) as CSSProperties;

  return (
    <div className="builder-preview">
      <div className="builder-preview-stage" style={previewStyle}>
        <AmigaErrorBoundary
          show
          error={PREVIEW_ERROR}
          showDetails={config.showDetails}
          noBlink={config.noBlink}
        />
      </div>

      <div className="builder-code">
        <div className="builder-code-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "jsx"}
            className={tab === "jsx" ? "active" : ""}
            onClick={() => setTab("jsx")}
          >
            JSX
          </button>
          <button
            role="tab"
            aria-selected={tab === "css"}
            className={tab === "css" ? "active" : ""}
            onClick={() => setTab("css")}
          >
            CSS
          </button>
          <span className="builder-code-spacer" />
          <CopyButton
            text={tab === "jsx" ? jsxSnippet(config) : cssSnippet(config)}
            variant="ghost"
            className="copy-btn-ghost"
            label="Copy snippet"
          >
            <span>Copy</span>
          </CopyButton>
        </div>
        <pre className="builder-code-block">
          <code>{tab === "jsx" ? jsxSnippet(config) : cssSnippet(config)}</code>
        </pre>
      </div>
    </div>
  );
}

function jsxSnippet(c: ThemeConfig): string {
  const inline: string[] = [];
  if (c.noBlink) inline.push("  noBlink");
  if (!c.showDetails) inline.push("  showDetails={false}");
  return `<AmigaErrorBoundary
  onError={(err) => report(err)}
${inline.join("\n")}${inline.length ? "\n" : ""}  style={{
    "--ragm-fg": "${c.fg}",
    "--ragm-bg": "${c.bg}",
    "--ragm-border-width": "${c.borderWidth}px",
    "--ragm-blink-duration": "${c.blinkDuration}s",
    "--ragm-font-size": "${c.fontSize}px",
    "--ragm-padding": "${c.padding}px",
    "--ragm-font-family": ${JSON.stringify(FONT_STACKS[c.fontFamily])},
  }}
>
  <App />
</AmigaErrorBoundary>`;
}

function cssSnippet(c: ThemeConfig): string {
  return `.guru {
  --ragm-fg: ${c.fg};
  --ragm-bg: ${c.bg};
  --ragm-border-width: ${c.borderWidth}px;
  --ragm-blink-duration: ${c.blinkDuration}s;
  --ragm-font-size: ${c.fontSize}px;
  --ragm-padding: ${c.padding}px;
  --ragm-font-family: ${FONT_STACKS[c.fontFamily]};
}`;
}
