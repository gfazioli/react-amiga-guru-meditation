import "./Upgrade.css";

interface Step {
  title: string;
  description: string;
  before: string;
  after: string;
}

const STEPS: Step[] = [
  {
    title: "Drop styled-components, import the stylesheet",
    description:
      "v3 shipped CSS at runtime via styled-components. v4 ships a static stylesheet — import it once, anywhere in your app.",
    before: `// nothing — styles were injected at runtime`,
    after: `// at the top of your app
import "react-amiga-guru-meditation/styles.css";`,
  },
  {
    title: "Theme via CSS variables, not props",
    description:
      "The backgroundColor / color props are gone. Set --ragm-* CSS variables on any selector — even a media query, a :has(), a ThemeProvider you already have.",
    before: `<AmigaErrorBoundary
  backgroundColor="#111"
  color="#0f0"
>
  <App />
</AmigaErrorBoundary>`,
    after: `/* in your CSS */
.guru-theme {
  --ragm-bg: #111;
  --ragm-fg: #0f0;
}

/* in JSX */
<div className="guru-theme">
  <AmigaErrorBoundary>
    <App />
  </AmigaErrorBoundary>
</div>`,
  },
  {
    title: "New error API: fallback / fallbackRender / onError",
    description:
      "v3 only had show / error / errorInfo. v4 follows the react-error-boundary contract: render a custom fallback, hook into onError for logging, and reset declaratively with resetKeys.",
    before: `<AmigaErrorBoundary>
  <App />
</AmigaErrorBoundary>`,
    after: `<AmigaErrorBoundary
  onError={(err, info) => report(err, info)}
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>retry</button>
    </div>
  )}
  resetKeys={[route]}
>
  <App />
</AmigaErrorBoundary>`,
  },
  {
    title: "Inline by default, portal opt-in",
    description:
      "v3 always rendered into a portal at document.body. v4 renders inline where you mount it — pass portal to opt back into the full-bleed Amiga takeover.",
    before: `// always portaled to <body>
<AmigaErrorBoundary>
  <App />
</AmigaErrorBoundary>`,
    after: `// inline (default)
<AmigaErrorBoundary>
  <App />
</AmigaErrorBoundary>

// or full-bleed Amiga takeover
<AmigaErrorBoundary portal>
  <App />
</AmigaErrorBoundary>`,
  },
];

export function Upgrade() {
  return (
    <section className="section upgrade" id="upgrade">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Migrating</span>
          <h2>
            Coming from <span className="gradient-text">v3</span>?
          </h2>
          <p>Four small changes to land on v4. Requires React 18+.</p>
        </div>

        <ol className="upgrade-list">
          {STEPS.map((step, i) => (
            <li className="upgrade-step" key={step.title}>
              <span className="upgrade-step-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="upgrade-step-body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <div className="upgrade-diff">
                  <div className="upgrade-diff-col upgrade-diff-before">
                    <span className="upgrade-diff-label">v3</span>
                    <pre>
                      <code>{step.before}</code>
                    </pre>
                  </div>
                  <div className="upgrade-diff-col upgrade-diff-after">
                    <span className="upgrade-diff-label">v4</span>
                    <pre>
                      <code>{step.after}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
