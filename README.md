<div align="center">

<img src="./assets/logo.svg" alt="" width="220" />

# react-amiga-guru-meditation

**A React Error Boundary styled like the Amiga Guru Meditation.**

[![npm version](https://img.shields.io/npm/v/react-amiga-guru-meditation?style=flat-square&color=ef4444)](https://www.npmjs.com/package/react-amiga-guru-meditation)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-amiga-guru-meditation?style=flat-square&label=gzip&color=ef4444)](https://bundlephobia.com/package/react-amiga-guru-meditation)
[![types](https://img.shields.io/npm/types/react-amiga-guru-meditation?style=flat-square&color=ef4444)](https://www.npmjs.com/package/react-amiga-guru-meditation)
[![downloads](https://img.shields.io/npm/dm/react-amiga-guru-meditation?style=flat-square&color=ef4444)](https://www.npmjs.com/package/react-amiga-guru-meditation)
[![license](https://img.shields.io/npm/l/react-amiga-guru-meditation?style=flat-square&color=ef4444)](./LICENSE)

[**Live playground →**](https://gfazioli.github.io/react-amiga-guru-meditation/) ・
[**v3 → v4 guide →**](https://gfazioli.github.io/react-amiga-guru-meditation/upgrade/) ・
[**Changelog**](./CHANGELOG.md)

</div>

<br/>

> A drop-in React Error Boundary with the iconic red-on-black blink of the Amiga Guru Meditation. Same contract as `react-error-boundary` (`fallback`, `fallbackRender`, `onError`, `onReset`, `resetKeys`), themeable via CSS variables, zero runtime dependencies, ~2 KB gzipped.

- 🛡️ **Real Error Boundary** — catches errors during rendering, lifecycle, and constructors.
- ♿ **Accessible** — `role="alert"`, `aria-live="assertive"`, `prefers-reduced-motion` aware.
- 🎨 **Themeable via CSS variables** — no provider, scope themes with any selector.
- 📦 **Zero runtime dependencies** — only React as a peer dependency.
- 🪶 **Tiny** — ~2 KB ESM gzipped, tree-shakeable, dual ESM + CJS.
- ⌨️ **TypeScript-first** — full type declarations included.
- 🖥️ **Inline or fullscreen** — render inline by default, opt into a portal-mounted Amiga takeover with one prop.

## Install

```bash
npm install react-amiga-guru-meditation
# or
pnpm add react-amiga-guru-meditation
# or
yarn add react-amiga-guru-meditation
```

Requires React 18 or newer.

## Usage

```tsx
import { AmigaErrorBoundary } from "react-amiga-guru-meditation";
import "react-amiga-guru-meditation/styles.css";

export function App() {
  return (
    <AmigaErrorBoundary>
      <Dashboard />
    </AmigaErrorBoundary>
  );
}
```

The stylesheet must be imported once in your app (root layout, entry file, or wherever you prefer).

### With error reporting and reset

```tsx
<AmigaErrorBoundary
  onError={(err, info) => report(err, info)}
  resetKeys={[userId]}
  onReset={() => refetch()}
>
  <Dashboard />
</AmigaErrorBoundary>
```

### Custom fallback

```tsx
<AmigaErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )}
>
  <Dashboard />
</AmigaErrorBoundary>
```

### Fullscreen Amiga takeover

```tsx
<AmigaErrorBoundary portal>
  <App />
</AmigaErrorBoundary>
```

`portal` accepts `boolean | string | HTMLElement` — a string is used as the container element id; an element is used as the portal target directly.

### `useAmigaGuru` hook

For triggering errors from function components (useful in async handlers):

```tsx
import { useAmigaGuru } from "react-amiga-guru-meditation";

function SaveButton() {
  const guru = useAmigaGuru();
  return (
    <button
      onClick={async () => {
        try {
          await save();
        } catch (e) {
          guru(e); // re-thrown during render so the nearest boundary catches it
        }
      }}
    >
      Save
    </button>
  );
}
```

### Showcase mode

For previews, storybooks, or marketing pages, force the error UI without a real error:

```tsx
<AmigaErrorBoundary show error={new Error("preview")}>
  <App />
</AmigaErrorBoundary>
```

## Theming

All visual properties are exposed as CSS custom properties. Override them on any selector to theme one boundary, a section, or the whole app:

```css
.guru-theme {
  --ragm-fg: #33ff66;
  --ragm-bg: #001a06;
  --ragm-border-width: 4px;
  --ragm-blink-duration: 1.4s;
  --ragm-font-family: "JetBrains Mono", monospace;
}
```

Or pass them inline via `style`:

```tsx
<AmigaErrorBoundary
  style={{
    "--ragm-fg": "#0f0",
    "--ragm-bg": "#001a06",
  } as React.CSSProperties}
>
  <App />
</AmigaErrorBoundary>
```

### Available CSS variables

| Variable | Default | Notes |
|---|---|---|
| `--ragm-fg` | `#ff2222` | Foreground (text + border + blink color). |
| `--ragm-bg` | `#000000` | Background. |
| `--ragm-border-width` | `6px` | |
| `--ragm-border-style` | `solid` | |
| `--ragm-blink-duration` | `1s` | Set `0s` to stop the blink (or use the `noBlink` prop). |
| `--ragm-font-family` | `"Times New Roman", Times, serif` | |
| `--ragm-font-size` | `18px` | |
| `--ragm-font-weight` | `400` | |
| `--ragm-line-height` | `1.4` | |
| `--ragm-padding` | `24px` | |
| `--ragm-z-index` | `9999` | |
| `--ragm-mono-family` | system mono stack | Used for the error code and component stack. |

## Props

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactNode` | What to render when there's no error. |
| `fallback` | `ReactNode` | Static fallback UI rendered on error. |
| `fallbackRender` | `(props) => ReactNode` | Render-prop fallback. Receives `{ error, errorInfo, resetErrorBoundary }`. Takes priority over `fallback`. |
| `onError` | `(err, info) => void` | Called once per caught error. Useful for logging / Sentry / etc. |
| `onReset` | `({ reason }) => void` | Called when the boundary resets. `reason` is `"imperative"` or `"keys"`. |
| `resetKeys` | `readonly unknown[]` | When any value changes (shallow), the boundary auto-resets. |
| `show` | `boolean` | Force the error UI to render even without a real error. |
| `error` | `Error` | A pre-built error to display when `show` is true (or to override the caught one). |
| `portal` | `boolean \| string \| HTMLElement` | Render the fallback through a portal. `true` mounts a `<div id="amiga-guru">` on body; a string is used as the container id; an element is used as the explicit target. |
| `title` | `ReactNode` | Title text. Default: *"Software Failure. Press left mouse button to continue."* |
| `formatGuru` | `(error) => ReactNode` | Override the message line. Default: `error.message`. |
| `showDetails` | `boolean` | Show the collapsible component stack. Default: `true`. |
| `noBlink` | `boolean` | Disable the blink animation. |
| `className`, `style` | — | Applied to the fallback root element. |

The exported alias `GuruMeditation` is the same component under a shorter, more retro name.

## Migrating from v3

`backgroundColor` / `color` props are gone (use CSS variables), the rendering is now inline by default (pass `portal` for the v3 takeover behavior), and a full `react-error-boundary`-style API has been added. See the [v3 → v4 guide](https://gfazioli.github.io/react-amiga-guru-meditation/upgrade/) for a step-by-step migration walkthrough.

## License

MIT — © Giovambattista Fazioli

## Sponsor

If this project saves you time (or made you laugh in production), consider [sponsoring on GitHub](https://github.com/sponsors/gfazioli) — it directly supports continued maintenance and new releases.

<p align="center">
  <a href="https://github.com/sponsors/gfazioli">
    <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor on GitHub" />
  </a>
</p>
