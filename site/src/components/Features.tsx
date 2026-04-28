import "./Features.css";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "Real React Error Boundary",
    body: (
      <>
        Catches errors thrown during rendering, lifecycle and constructors. Same contract as{" "}
        <code>react-error-boundary</code>: <code>fallback</code>, <code>fallbackRender</code>, <code>onError</code>,{" "}
        <code>onReset</code>, <code>resetKeys</code>.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: "Accessible by default",
    body: (
      <>
        The fallback renders with <code>role="alert"</code> and <code>aria-live="assertive"</code>, respects{" "}
        <code>prefers-reduced-motion</code>, and surfaces the component stack via a native <code>&lt;details&gt;</code>{" "}
        element.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
    title: "Themeable via CSS variables",
    body: (
      <>
        No theme provider. Override <code>--ragm-fg</code>, <code>--ragm-bg</code>,{" "}
        <code>--ragm-blink-duration</code>, <code>--ragm-font-family</code> and friends on any selector — even per{" "}
        <code>:has()</code> or media query.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    ),
    title: "Tiny and tree-shakeable",
    body: (
      <>
        ~2 KB ESM gzipped, dual ESM + CJS, full <code>.d.ts</code>. Zero runtime dependencies — only React as a peer.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18" />
      </svg>
    ),
    title: "Inline or fullscreen portal",
    body: (
      <>
        Renders inline by default, or wrap the takeover in a <code>document.body</code>-mounted portal with{" "}
        <code>portal</code> for the authentic Amiga full-bleed experience.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "TypeScript-first",
    body: (
      <>
        Strongly typed props and exports. <code>useAmigaGuru()</code> hook for triggering errors from function
        components. Plays nice with React 18 &amp; 19, strict mode, and SSR.
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">What's in the box</span>
          <h2>
            A real error boundary, <span className="gradient-text">with personality</span>.
          </h2>
          <p>One component. Standard React idioms. Standard CSS. Nothing else to learn.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
