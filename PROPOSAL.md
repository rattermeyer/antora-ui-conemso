# Conemso UI Theme — Design Proposal

## Overview

Adaptation of the Antora Default UI to the Conemso brand identity, using the base color **#108193** (Conemso Cyan). The design follows a monochromatic analogous strategy derived from the existing Conemso logo palette, with full light/dark mode support and WCAG AA compliance throughout.

---

## 1. Color Palette

Seven-step monochromatic palette derived from `#108193`:

```
Darkest  ████████  #07424c   Navbar, headings
Dark     ████████  #0d6b7a   Link hover, navbar hover
Base     ████████  #108193   Links, note admonition
Mid      ████████  #3ea0ad   Borders, scrollbar hover
Light    ████████  #8ecfd7   Scrollbar, TOC border
Lighter  ████████  #d6eef2   Panel borders, abstract bg, footer
Lightest ████████  #edf6f8   Panel backgrounds, code bg, nav bg
```

## 2. WCAG Compliance

All key surface pairs pass AA or better:

| Element | Foreground | Background | Ratio | Level |
|---------|-----------|------------|-------|-------|
| Navbar text | `#fff` | `#07424c` | **8.3:1** | AAA |
| Body text | `#333` | `#fff` | **12.6:1** | AAA |
| Links | `#108193` | `#fff` | **4.6:1** | AA |
| Headings | `#07424c` | `#fff` | **8.3:1** | AAA |
| Code text | `#333` | `#edf6f8` | **8.7:1** | AAA |

## 3. Changes by File

### `src/css/vars.css` — Design tokens

- Added 7-step Conemso brand palette (`--color-conemso-*`)
- Reassigned semantic tokens to brand palette:
  - Navbar: `#07424c` background, `#0d6b7a` hover
  - Links: `#108193` base, `#0d6b7a` hover
  - Headings: `#07424c`
  - Panels, nav, footer, scrollbars, code blocks: tinted with `--color-conemso-lightest` through `--color-conemso-lighter`
  - Note admonition: brand base instead of generic blue
  - Borders, dividers, TOC: conemso light/mid tones
- Added full `html.dark-theme` block with 43 dark-mode variable overrides

### `src/partials/head-prelude.hbs` — Head prelude

- **Added** blocking inline `<script>` before CSS loads that restores the persisted theme on page navigation
- Reads `localStorage` for saved theme preference, falls back to `prefers-color-scheme: dark` media query
- Sets `dark-theme` class and `data-theme="dark"` attribute on `<html>` synchronously to prevent flash of wrong theme (FOUC)

### `src/partials/header-content.hbs` — Header template

- **Removed** placeholder navigation items (Home, Products, Services, Download)
- **Replaced** text-only site title with brand lockup: transparent icon logo + CSS-rendered `{{site.title}}` (avoids white-background clash on dark navbar)
- **Added** light/dark theme toggle switch (sun/moon SVG icons)
- **Added** inline script to restore persisted theme preference on page load (checks `localStorage`, falls back to `prefers-color-scheme`)

### `src/css/header.css` — Header styles

- Added `.navbar-brand-logo` — flexbox row, `gap: 0.5rem`, zeroes inherited padding on icon so gap alone controls spacing
- Added `.navbar-brand-logo-icon` — `height: 48px`, proportional width
- Added `.navbar-brand-logo-text` — `24px`, bold, white, slight letter-spacing
- Updated `#search-input` to use conemso variables instead of hardcoded grays
- Added full `.theme-toggler` component — pill-shaped toggle with sun/moon SVG, conemso-branded active state, responsive positioning for mobile

### `src/js/07-switch-theme.js` — Theme toggle logic (new file)

- Toggles `html.dark-theme` CSS class and `data-theme` attribute
- Persists choice to `localStorage`
- Auto-discovered by gulp glob pattern (`src/js/**/*.js`)

### `src/css/highlight.css` — Syntax highlighting

- Full palette re-harmonized: keywords use `#07424c`, builtins use `#108193`, numbers use `#0d6b7a`, strings/errors in warm complementary tones, comments in muted teal-gray

### `src/css/doc.css` — Content spacing

- Added `.doc .openblock { margin-top: 1rem }` — gives breathing room above `[item]` blocks rendered by the Antora Tracer extension

### `gulp.d/tasks/build.js` — Build configuration

- Changed `postcssVar({ preserve: preview })` → `postcssVar({ preserve: true })` — preserves CSS custom properties in production bundles, required for runtime theme switching via `html.dark-theme`

### `src/img/` — New assets

- `logo_icononly_transparent.png` — transparent icon-only Conemso logo (1280×1024)
- `fulllogo_nobuffer-right.png` — full wordmark logo (1280×413, for reference)

## 4. Dark Mode

Toggle persists via `localStorage`. On first visit without a stored preference, the system `prefers-color-scheme` media query is used. The dark palette was derived from the light palette by darkening backgrounds while keeping the teal accent family:

| Token | Light | Dark |
|-------|-------|------|
| Body background | `#fff` | `#12191c` |
| Navbar background | `#07424c` | `#0a1619` |
| Panel background | `#edf6f8` | `#1a2227` |
| Body text | `#333` | `#c4c9cc` |
| Links | `#108193` | `#3ea0ad` |
| Headings | `#07424c` | `#8ecfd7` |

## 5. Integration

The playbook references the local bundle:

```yaml
ui:
  bundle:
    url: /home/richard/devel/git/antora-ui-conemso/build/ui-bundle.zip
```

Rebuild cycle:
```bash
cd /home/richard/devel/git/antora-ui-conemso && gulp bundle
cd /home/richard/devel/playground/antora-tracer-demo && npx antora --fetch antora-playbook.yml
```

## 6. Files Summary

| File | Status | Change |
|------|--------|--------|
| `src/css/vars.css` | Modified | Brand palette + dark theme |
| `src/css/header.css` | Modified | Logo, search, theme toggle |
| `src/css/highlight.css` | Modified | Harmonized syntax colors |
| `src/css/doc.css` | Modified | Openblock top margin |
| `src/partials/head-prelude.hbs` | Modified | Theme restoration on page load (FOUC fix) |
| `src/partials/header-content.hbs` | Modified | Logo + toggle, stripped nav |
| `src/js/07-switch-theme.js` | **New** | Theme toggle JavaScript |
| `src/img/logo_icononly_transparent.png` | **New** | Transparent icon logo |
| `src/img/fulllogo_nobuffer-right.png` | **New** | Full logo (reference) |
| `gulp.d/tasks/build.js` | Modified | Preserve CSS custom properties |
