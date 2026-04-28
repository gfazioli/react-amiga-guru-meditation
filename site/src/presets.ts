import { DEFAULT_CONFIG, type ThemeConfig } from "./hooks/useThemeConfig";

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: ThemeConfig;
}

export const PRESETS: Preset[] = [
  {
    id: "classic",
    name: "Classic Amiga",
    description: "The original red-on-black Guru Meditation as it appeared on every misbehaving Amiga.",
    config: DEFAULT_CONFIG,
  },
  {
    id: "phosphor",
    name: "Phosphor green",
    description: "Vintage VT220 terminal vibes — green on black, slow blink, monospace.",
    config: {
      ...DEFAULT_CONFIG,
      fg: "#33ff66",
      bg: "#001a06",
      blinkDuration: 1.4,
      fontFamily: "mono",
      fontSize: 16,
    },
  },
  {
    id: "amber",
    name: "Amber CRT",
    description: "70s amber monitor: warm, gentle, easy on the eyes for hours of grief.",
    config: {
      ...DEFAULT_CONFIG,
      fg: "#ffb000",
      bg: "#1a0e00",
      blinkDuration: 1.2,
      fontFamily: "mono",
      fontSize: 16,
    },
  },
  {
    id: "modern-dark",
    name: "Modern dark",
    description: "Pragmatic, no blink, sans-serif. For when retro is overkill but you still want presence.",
    config: {
      ...DEFAULT_CONFIG,
      fg: "#ef4444",
      bg: "#0a0a0a",
      borderWidth: 2,
      noBlink: true,
      fontFamily: "sans",
      fontSize: 16,
      padding: 28,
    },
  },
  {
    id: "matrix",
    name: "Matrix",
    description: "Bright neon green, thick border, monospace — rabbit-hole aesthetic.",
    config: {
      ...DEFAULT_CONFIG,
      fg: "#00ff41",
      bg: "#000000",
      borderWidth: 8,
      blinkDuration: 0.7,
      fontFamily: "mono",
      fontSize: 18,
    },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    description: "Cool cyan on deep navy, thin border. Looks intentional, not catastrophic.",
    config: {
      ...DEFAULT_CONFIG,
      fg: "#7dd3fc",
      bg: "#0c1f33",
      borderWidth: 3,
      blinkDuration: 1.6,
      fontFamily: "sans",
      fontSize: 17,
      padding: 28,
    },
  },
];
