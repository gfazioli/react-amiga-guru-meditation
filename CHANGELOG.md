# Changelog

All notable changes to this project will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/). From v4 onwards, releases are managed with [Changesets](https://github.com/changesets/changesets); entries in this file after v4.0.0 are generated automatically.

## 4.0.0

Full rewrite. See [UPGRADE.md](./UPGRADE.md) for migration steps from v3.

### Breaking

- Drops React 16/17 support. Now requires `react >= 18` (peer).
- Removes the `styled-components` peer dependency. Theming uses standard CSS custom properties; the bundled stylesheet must be imported once: `import "react-amiga-guru-meditation/styles.css"`.
- Removes the `react-use` runtime dependency.
- Removes the `backgroundColor` and `color` props in favor of CSS variables (`--ragm-bg`, `--ragm-fg`, …).
- The error UI now renders **inline** by default. Pass `portal` to opt back into the full-bleed Amiga takeover (v3 always rendered through a portal at `document.body`).
- The component stack is now opt-out via `showDetails={false}` (was hidden by default in v3).

### Added

- `fallback` and `fallbackRender` props for fully custom error UIs (same contract as `react-error-boundary`).
- `onError(error, errorInfo)` callback for logging / error reporting.
- `onReset({ reason })` callback fired on reset (imperative or via `resetKeys`).
- `resetKeys` prop — when any value in the array changes, the boundary auto-resets.
- `useAmigaGuru()` hook — imperative trigger for function components.
- `GuruMeditation` exported as an alias of `AmigaErrorBoundary`.
- `role="alert"` and `aria-live="assertive"` on the fallback. `prefers-reduced-motion` is respected.
- `forwardRef`-style ref forwarding is **not** applicable (the component is a class), but the API is fully typed.
- Dual ESM + CJS build with full TypeScript declarations.
- Live theme builder, preset gallery, and a real "throw + catch + reset" demo on the docs site.

### Changed

- Toolchain: tsup (was tsc), pnpm (was yarn), ESLint flat config (was tslint), vitest + RTL (was enzyme), Vite docs site (was Docz/Gatsby).
- Build output moved from a committed `dist/` to a `tsup`-generated dual-format bundle, no longer committed.

## 3.x

See git history for changes prior to v4.
