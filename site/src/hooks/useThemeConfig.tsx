import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type FontStyleKey = "serif" | "mono" | "sans";

export interface ThemeConfig {
  fg: string;
  bg: string;
  borderWidth: number;
  blinkDuration: number;
  fontSize: number;
  padding: number;
  fontFamily: FontStyleKey;
  noBlink: boolean;
  showDetails: boolean;
}

export const FONT_STACKS: Record<FontStyleKey, string> = {
  serif: '"Times New Roman", Times, serif',
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const DEFAULT_CONFIG: ThemeConfig = {
  fg: "#ff2222",
  bg: "#000000",
  borderWidth: 6,
  blinkDuration: 1,
  fontSize: 18,
  padding: 24,
  fontFamily: "serif",
  noBlink: false,
  showDetails: true,
};

interface ThemeConfigContextValue {
  config: ThemeConfig;
  setConfig: (next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => void;
  patch: (delta: Partial<ThemeConfig>) => void;
  reset: () => void;
  shareUrl: string;
}

const Ctx = createContext<ThemeConfigContextValue | null>(null);

const ORDER: (keyof ThemeConfig)[] = [
  "fg",
  "bg",
  "borderWidth",
  "blinkDuration",
  "fontSize",
  "padding",
  "fontFamily",
  "noBlink",
  "showDetails",
];

function encodeConfig(c: ThemeConfig): string {
  const arr = ORDER.map((k) => c[k]);
  return btoa(JSON.stringify(arr)).replace(/=+$/, "");
}

function decodeConfig(token: string): ThemeConfig | null {
  try {
    const padded = token + "=".repeat((4 - (token.length % 4)) % 4);
    const arr = JSON.parse(atob(padded)) as Array<unknown>;
    if (!Array.isArray(arr) || arr.length !== ORDER.length) return null;
    const next = { ...DEFAULT_CONFIG };
    ORDER.forEach((k, i) => {
      const val = arr[i];
      const def = DEFAULT_CONFIG[k];
      if (typeof def === typeof val) {
        (next as Record<string, unknown>)[k] = val;
      }
    });
    return next;
  } catch {
    return null;
  }
}

export function ThemeConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<ThemeConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    const param = new URLSearchParams(window.location.search).get("t");
    if (!param) return DEFAULT_CONFIG;
    return decodeConfig(param) ?? DEFAULT_CONFIG;
  });

  const setConfig = useCallback((next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => {
    setConfigState((prev) => (typeof next === "function" ? (next as (p: ThemeConfig) => ThemeConfig)(prev) : next));
  }, []);

  const patch = useCallback((delta: Partial<ThemeConfig>) => {
    setConfigState((prev) => ({ ...prev, ...delta }));
  }, []);

  const reset = useCallback(() => setConfigState(DEFAULT_CONFIG), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const isDefault = ORDER.every((k) => config[k] === DEFAULT_CONFIG[k]);
    if (isDefault) {
      url.searchParams.delete("t");
    } else {
      url.searchParams.set("t", encodeConfig(config));
    }
    window.history.replaceState(null, "", url.toString());
  }, [config]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    const isDefault = ORDER.every((k) => config[k] === DEFAULT_CONFIG[k]);
    if (isDefault) url.searchParams.delete("t");
    else url.searchParams.set("t", encodeConfig(config));
    return url.toString();
  }, [config]);

  const value = useMemo(
    () => ({ config, setConfig, patch, reset, shareUrl }),
    [config, setConfig, patch, reset, shareUrl],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useThemeConfig() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useThemeConfig must be used within ThemeConfigProvider");
  return v;
}

export function configToCSSVars(c: ThemeConfig): Record<string, string> {
  return {
    "--ragm-fg": c.fg,
    "--ragm-bg": c.bg,
    "--ragm-border-width": `${c.borderWidth}px`,
    "--ragm-blink-duration": `${c.blinkDuration}s`,
    "--ragm-font-size": `${c.fontSize}px`,
    "--ragm-padding": `${c.padding}px`,
    "--ragm-font-family": FONT_STACKS[c.fontFamily],
  };
}
