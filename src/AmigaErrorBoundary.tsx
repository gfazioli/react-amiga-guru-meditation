import { Component, useCallback, useEffect, useState } from "react";
import type { CSSProperties, ErrorInfo, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./AmigaErrorBoundary.module.css";

export interface AmigaFallbackRenderProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  resetErrorBoundary: () => void;
}

export type AmigaPortalTarget = boolean | string | HTMLElement;

export interface AmigaErrorBoundaryProps {
  children?: ReactNode;

  /** Render-prop fallback. Takes priority over `fallback`. */
  fallbackRender?: (props: AmigaFallbackRenderProps) => ReactNode;

  /** Static fallback ReactNode rendered when an error is caught. */
  fallback?: ReactNode;

  /** Called when an error is caught. Useful for logging or error reporting. */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;

  /** Called when the boundary is reset (imperatively or via resetKeys change). */
  onReset?: (details: { reason: "imperative" | "keys" }) => void;

  /** When any value in this array changes (shallow equality), the boundary auto-resets. */
  resetKeys?: ReadonlyArray<unknown>;

  /** Force the error UI to render even without a real error. Useful for showcase/preview. */
  show?: boolean;

  /** A pre-built error to display when `show` is true (or to override the caught one). */
  error?: Error;

  /**
   * Render the error UI through a React portal at the document level (Amiga-style takeover).
   *  - `false` (default): render inline where the boundary is mounted.
   *  - `true`: render in a portal under a div appended to `document.body`.
   *  - `string`: id of the portal container element (created if missing).
   *  - `HTMLElement`: explicit portal target.
   */
  portal?: AmigaPortalTarget;

  /** Title text. Default: "Software Failure. Press left mouse button to continue." */
  title?: ReactNode;

  /** Override the message line. Receives the caught error. Default: "Guru Meditation: {error.message}". */
  formatGuru?: (error: Error) => ReactNode;

  /** Show collapsible details with the component stack. Default: true. */
  showDetails?: boolean;

  /** Disable the blink animation. Default: false. */
  noBlink?: boolean;

  /** Extra class name applied to the root element. */
  className?: string;

  /** Inline styles applied to the root element. Useful to set CSS variables. */
  style?: CSSProperties;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

const DEFAULT_TITLE = "Software Failure. Press left mouse button to continue.";

function shallowDiff(a: ReadonlyArray<unknown> | undefined, b: ReadonlyArray<unknown> | undefined): boolean {
  if (a === b) return false;
  if (!a || !b) return true;
  if (a.length !== b.length) return true;
  for (let i = 0; i < a.length; i += 1) {
    if (!Object.is(a[i], b[i])) return true;
  }
  return false;
}

export class AmigaErrorBoundary extends Component<AmigaErrorBoundaryProps, State> {
  static displayName = "AmigaErrorBoundary";

  override state: State = { error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  override componentDidUpdate(prevProps: AmigaErrorBoundaryProps) {
    if (this.state.error !== null && shallowDiff(prevProps.resetKeys, this.props.resetKeys)) {
      this.resetWithReason("keys");
    }
  }

  resetErrorBoundary = () => {
    this.resetWithReason("imperative");
  };

  private resetWithReason(reason: "imperative" | "keys") {
    if (this.state.error === null && this.state.errorInfo === null) return;
    this.setState({ error: null, errorInfo: null });
    this.props.onReset?.({ reason });
  }

  override render() {
    const { error: caught, errorInfo } = this.state;
    const {
      show = false,
      error: forcedError,
      fallback,
      fallbackRender,
      children,
      portal,
      title,
      formatGuru,
      showDetails,
      noBlink,
      className,
      style,
    } = this.props;

    const errorToShow: Error | null =
      caught ?? (show ? (forcedError ?? new Error("Software Failure")) : null);

    if (!errorToShow) {
      return children ?? null;
    }

    let node: ReactNode;

    if (fallbackRender) {
      node = fallbackRender({
        error: errorToShow,
        errorInfo,
        resetErrorBoundary: this.resetErrorBoundary,
      });
    } else if (fallback !== undefined) {
      node = fallback;
    } else {
      node = (
        <DefaultGuru
          error={errorToShow}
          errorInfo={errorInfo}
          title={title}
          formatGuru={formatGuru}
          showDetails={showDetails ?? true}
          noBlink={noBlink ?? false}
          className={className}
          style={style}
          portaled={Boolean(portal)}
        />
      );
    }

    if (portal) {
      return <PortalWrapper target={portal}>{node}</PortalWrapper>;
    }

    return node;
  }
}

interface DefaultGuruProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  title?: ReactNode;
  formatGuru?: (error: Error) => ReactNode;
  showDetails: boolean;
  noBlink: boolean;
  className?: string;
  style?: CSSProperties;
  portaled: boolean;
}

function DefaultGuru({
  error,
  errorInfo,
  title,
  formatGuru,
  showDetails,
  noBlink,
  className,
  style,
  portaled,
}: DefaultGuruProps) {
  const message = formatGuru ? formatGuru(error) : error.message || error.toString();
  const classes = [styles.root, noBlink && !portaled ? styles.noBlink : null, className]
    .filter(Boolean)
    .join(" ");
  return (
    <div role="alert" aria-live="assertive" className={classes} style={style}>
      <p className={styles.title}>{title ?? DEFAULT_TITLE}</p>
      <p className={styles.message}>
        Guru Meditation: <span className={styles.code}>{message}</span>
      </p>
      {showDetails && errorInfo?.componentStack ? (
        <details className={styles.details}>
          <summary>Component stack</summary>
          <pre>
            <code>{errorInfo.componentStack}</code>
          </pre>
        </details>
      ) : null}
    </div>
  );
}

interface PortalWrapperProps {
  target: AmigaPortalTarget;
  children: ReactNode;
}

function PortalWrapper({ target, children }: PortalWrapperProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (target instanceof HTMLElement) {
      setContainer(target);
      return;
    }

    const id = typeof target === "string" ? target : "amiga-guru";
    let el = document.getElementById(id);
    let created = false;

    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
      created = true;
    }

    setContainer(el);

    return () => {
      if (created && el?.parentNode) {
        el.parentNode.removeChild(el);
      }
    };
  }, [target]);

  if (!container) return null;

  return createPortal(<div className={styles.portal}>{children}</div>, container);
}

/**
 * Imperatively trigger an Amiga Guru Meditation from a function component.
 * Returns a callback that re-throws the given error during render so the
 * nearest <AmigaErrorBoundary> can catch it.
 */
export function useAmigaGuru() {
  const [, setState] = useState<unknown>();
  return useCallback((error: unknown) => {
    setState(() => {
      throw error instanceof Error ? error : new Error(String(error));
    });
  }, []);
}
