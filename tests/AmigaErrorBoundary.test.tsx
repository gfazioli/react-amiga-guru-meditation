import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useState } from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AmigaErrorBoundary, GuruMeditation, useAmigaGuru } from "../src";

// Suppress React's noisy error logging from componentDidCatch in tests
let errorSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  errorSpy.mockRestore();
});

function Boom({ message = "kaboom" }: { message?: string }): never {
  throw new Error(message);
}

function SafeChild() {
  return <div data-testid="safe">all good</div>;
}

describe("AmigaErrorBoundary", () => {
  it("renders children when no error is thrown", () => {
    render(
      <AmigaErrorBoundary>
        <SafeChild />
      </AmigaErrorBoundary>,
    );
    expect(screen.getByTestId("safe")).toBeInTheDocument();
  });

  it("catches a thrown error and renders the default fallback", () => {
    render(
      <AmigaErrorBoundary>
        <Boom message="boom-1" />
      </AmigaErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/Software Failure/i)).toBeInTheDocument();
    expect(screen.getByText(/boom-1/)).toBeInTheDocument();
  });

  it("calls onError with the caught error and component info", () => {
    const onError = vi.fn();
    render(
      <AmigaErrorBoundary onError={onError}>
        <Boom message="boom-2" />
      </AmigaErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    const [err, info] = onError.mock.calls[0]!;
    expect(err).toBeInstanceOf(Error);
    expect((err as Error).message).toBe("boom-2");
    expect(info).toHaveProperty("componentStack");
  });

  it("renders a static `fallback` ReactNode", () => {
    render(
      <AmigaErrorBoundary fallback={<div data-testid="static-fb">offline</div>}>
        <Boom />
      </AmigaErrorBoundary>,
    );
    expect(screen.getByTestId("static-fb")).toHaveTextContent("offline");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("invokes `fallbackRender` with error and reset callback", async () => {
    const user = userEvent.setup();
    const onReset = vi.fn();

    function App() {
      const [seed, setSeed] = useState(0);
      return (
        <AmigaErrorBoundary
          onReset={onReset}
          resetKeys={[seed]}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div role="alert">
              <span>{error.message}</span>
              <button
                onClick={() => {
                  resetErrorBoundary();
                  setSeed(1);
                }}
              >
                retry
              </button>
            </div>
          )}
        >
          {seed === 0 ? <Boom message="render-fail" /> : <div data-testid="recovered">ok</div>}
        </AmigaErrorBoundary>
      );
    }

    render(<App />);
    expect(screen.getByText("render-fail")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /retry/i }));
    expect(screen.getByTestId("recovered")).toBeInTheDocument();
    expect(onReset).toHaveBeenCalled();
  });

  it("resets automatically when `resetKeys` change", () => {
    function App({ k }: { k: number }) {
      return (
        <AmigaErrorBoundary resetKeys={[k]}>
          {k === 0 ? <Boom /> : <SafeChild />}
        </AmigaErrorBoundary>
      );
    }

    const { rerender } = render(<App k={0} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(<App k={1} />);
    expect(screen.getByTestId("safe")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders the error UI when `show` is true even without a real error", () => {
    render(
      <AmigaErrorBoundary show error={new Error("forced")}>
        <SafeChild />
      </AmigaErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/forced/)).toBeInTheDocument();
  });

  it("uses `formatGuru` to override the message", () => {
    render(
      <AmigaErrorBoundary show error={new Error("orig")} formatGuru={() => "#00000003.48454C50"}>
        <SafeChild />
      </AmigaErrorBoundary>,
    );
    expect(screen.getByText("#00000003.48454C50")).toBeInTheDocument();
  });

  it("respects a custom title", () => {
    render(
      <AmigaErrorBoundary show error={new Error("x")} title="Catastrophic failure">
        <SafeChild />
      </AmigaErrorBoundary>,
    );
    expect(screen.getByText("Catastrophic failure")).toBeInTheDocument();
  });

  it("renders into a portal when `portal` is true", () => {
    render(
      <AmigaErrorBoundary portal>
        <Boom message="portaled" />
      </AmigaErrorBoundary>,
    );
    const container = document.getElementById("amiga-guru");
    expect(container).not.toBeNull();
    expect(container).toContainElement(screen.getByRole("alert"));
  });

  it("renders into a portal with a custom container id", () => {
    render(
      <AmigaErrorBoundary portal="custom-guru">
        <Boom />
      </AmigaErrorBoundary>,
    );
    const container = document.getElementById("custom-guru");
    expect(container).not.toBeNull();
  });

  it("hides component stack details when `showDetails` is false", () => {
    render(
      <AmigaErrorBoundary showDetails={false}>
        <Boom />
      </AmigaErrorBoundary>,
    );
    expect(screen.queryByText(/component stack/i)).not.toBeInTheDocument();
  });

  it("forwards inline `style` (CSS variables) to the root", () => {
    render(
      <AmigaErrorBoundary
        show
        error={new Error("themed")}
        style={{ ["--ragm-fg" as string]: "#0f0" } as React.CSSProperties}
      >
        <SafeChild />
      </AmigaErrorBoundary>,
    );
    const root = screen.getByRole("alert");
    expect(root.style.getPropertyValue("--ragm-fg")).toBe("#0f0");
  });

  it("exports `GuruMeditation` as an alias of `AmigaErrorBoundary`", () => {
    expect(GuruMeditation).toBe(AmigaErrorBoundary);
  });

  it("`useAmigaGuru` triggers the boundary from a function component", async () => {
    const user = userEvent.setup();

    function Trigger() {
      const guru = useAmigaGuru();
      return (
        <button onClick={() => guru(new Error("hooked"))}>
          panic
        </button>
      );
    }

    render(
      <AmigaErrorBoundary>
        <Trigger />
      </AmigaErrorBoundary>,
    );

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /panic/i }));
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/hooked/)).toBeInTheDocument();
  });
});
