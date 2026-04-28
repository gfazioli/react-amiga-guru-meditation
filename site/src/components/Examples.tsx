import { useState } from "react";
import { AmigaErrorBoundary } from "react-amiga-guru-meditation";
import "./Examples.css";

const TRIGGERS = [
  { id: "type", label: "TypeError", message: "Cannot read property 'foo' of undefined" },
  { id: "range", label: "RangeError", message: "Maximum call stack size exceeded" },
  { id: "ref", label: "ReferenceError", message: "process is not defined" },
  { id: "custom", label: "Custom", message: "💥 Something exploded right where you didn't expect it." },
] as const;

type TriggerId = (typeof TRIGGERS)[number]["id"];

function HealthyApp() {
  return (
    <div className="example-app">
      <div className="example-app-header">
        <span className="example-app-dot" data-state="green" />
        <span className="example-app-title">Production-ready content</span>
      </div>
      <p>
        Hello! I'm a perfectly behaving subtree. Click any button above to make me throw — your boundary will catch it
        and render a Guru Meditation. Click <strong>Reset</strong> to bring me back.
      </p>
    </div>
  );
}

function Bomb({ message }: { message: string }): never {
  throw new Error(message);
}

export function Examples() {
  const [trigger, setTrigger] = useState<TriggerId | null>(null);
  const [seed, setSeed] = useState(0);
  const [resets, setResets] = useState(0);
  const triggerDef = trigger ? TRIGGERS.find((t) => t.id === trigger) : null;

  return (
    <section className="section examples">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Live demo</span>
          <h2>
            A real boundary, <span className="gradient-text">a real error</span>.
          </h2>
          <p>Click a trigger to throw a real error inside the boundary. Reset wires through resetKeys.</p>
        </div>

        <div className="examples-card">
          <div className="examples-toolbar">
            <div className="examples-toolbar-buttons">
              {TRIGGERS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`btn btn-secondary ${trigger === t.id ? "active" : ""}`}
                  onClick={() => setTrigger(t.id)}
                >
                  💥 {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setTrigger(null);
                setSeed((s) => s + 1);
              }}
              disabled={trigger === null}
            >
              Reset
            </button>
          </div>

          <div className="examples-stage">
            <AmigaErrorBoundary
              resetKeys={[seed]}
              onError={(err) => {
                console.warn("[demo] caught:", err.message);
              }}
              onReset={() => setResets((r) => r + 1)}
            >
              {triggerDef ? <Bomb message={triggerDef.message} /> : <HealthyApp />}
            </AmigaErrorBoundary>
          </div>

          <div className="examples-state">
            <span>State:</span>
            <code>
              {JSON.stringify({
                triggered: trigger,
                resetKeys: [seed],
                onResetCalls: resets,
              })}
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
