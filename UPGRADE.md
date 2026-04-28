# Upgrade Guide

## v3 → v4

v4 is a full rewrite. The component is still an Error Boundary that renders the iconic Amiga "Software Failure / Guru Meditation" screen, but the API has been aligned with the React community standard set by [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary), theming has moved to CSS variables, and `styled-components` is no longer a peer dependency.

There are breaking changes. Most call sites are short and easy to migrate.

### React version

v4 requires **React 18 or newer**.

```diff
- "react": "^16.8.6 || ^17"
+ "react": ">=18"
```

### Drop styled-components, import the stylesheet

CSS is no longer injected at runtime via `styled-components`. The package now ships a static stylesheet — import it once at the top of your app:

```ts
import "react-amiga-guru-meditation/styles.css";
```

You can drop `styled-components` from your dependencies if you were only using it for this package.

### Theming via CSS variables

The `backgroundColor` and `color` props are gone. Override CSS custom properties on any selector — even a media query, a `:has()` selector, or your existing theme provider — and every nested boundary picks them up:

```diff
- <AmigaErrorBoundary backgroundColor="#111" color="#0f0">
-   <App />
- </AmigaErrorBoundary>

+ /* in your CSS */
+ .guru-theme {
+   --ragm-bg: #111;
+   --ragm-fg: #0f0;
+ }

+ /* in JSX */
+ <div className="guru-theme">
+   <AmigaErrorBoundary>
+     <App />
+   </AmigaErrorBoundary>
+ </div>
```

The full variable reference is in the [README](./README.md#theming).

### Fallback API: `fallback`, `fallbackRender`, `onError`, `resetKeys`

v3 only let you toggle the built-in UI with `show` / `error` / `errorInfo`. v4 adds the full `react-error-boundary` contract:

```tsx
<AmigaErrorBoundary
  onError={(err, info) => report(err, info)}
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div role="alert">
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>retry</button>
    </div>
  )}
  resetKeys={[route]}
  onReset={({ reason }) => console.log("reset", reason)}
>
  <App />
</AmigaErrorBoundary>
```

- `fallback` — a static `ReactNode` to render on error.
- `fallbackRender` — a render-prop that receives `{ error, errorInfo, resetErrorBoundary }`.
- `onError(error, errorInfo)` — called once per caught error.
- `onReset({ reason })` — called when the boundary resets (`reason` is `"imperative"` or `"keys"`).
- `resetKeys` — when any value in this array changes (shallow equality), the boundary auto-resets.

### `show` and `error` are still supported

For showcase/preview use cases (storybooks, marketing pages), `show` and `error` still work and have the same semantics:

```tsx
<AmigaErrorBoundary show error={new Error("preview")}>
  <App />
</AmigaErrorBoundary>
```

### Inline by default, portal opt-in

v3 always rendered into a `<div id="amiga-guru">` mounted at `document.body`. v4 renders **inline** by default, where the boundary is mounted in the React tree.

To get the v3 behavior back (full-bleed Amiga takeover), pass `portal`:

```tsx
<AmigaErrorBoundary portal>      {/* default container id: "amiga-guru" */}
  <App />
</AmigaErrorBoundary>

<AmigaErrorBoundary portal="my-id">    {/* custom id */}
  <App />
</AmigaErrorBoundary>
```

### `useAmigaGuru()` hook

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

### Renamed alias

`GuruMeditation` is now exported as an alias of `AmigaErrorBoundary`. Both names refer to the same component.

```tsx
import { GuruMeditation } from "react-amiga-guru-meditation";
```

### Removed

- `styled-components` peer dependency.
- `react-use` runtime dependency.
- `backgroundColor` / `color` props (replaced by CSS variables).

### Build / output

`dist/` is no longer committed. The package ships ESM + CJS + `.d.ts` + a single `index.css` file.
