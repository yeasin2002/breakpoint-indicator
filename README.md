# ResponsiveKit

A browser extension that shows real-time responsive breakpoint info while you browse. Built with WXT, React, and UnoCSS.

## Download now 

<!-- chrome  -->
<!-- firefox -->

## Features

- 🎯 Toggle on demand via extension icon
- 📱 Current breakpoint indicator (xs, sm, md, lg, xl, 2xl)
- 📐 Viewport size, screen resolution, pixel ratio


## Quick Start

```bash
pnpm install
pnpm dev          # Chrome
pnpm dev:firefox  # Firefox
```

Load from `.output/chrome-mv3-dev` or `.output/firefox-mv3-dev`.

## Usage

1. Click extension icon to show/hide DevTool
2. Floating button appears in bottom-right corner
3. Click button to see detailed screen info

## Commands

```bash
pnpm dev              # Dev server (Chrome)
pnpm dev:firefox      # Dev server (Firefox)
pnpm build            # Production build
pnpm zip              # Create distributable
pnpm compile          # Type check
pnpm check:fix        # Lint + format
```

## Project Structure

```
app/                  # Extension entrypoints
  background.ts       # Icon click handler
  content.tsx         # DevTool UI injection
components/           # React components
lib/                  # Utilities and hooks
  breakpoints.ts      # Breakpoint definitions
  hooks/              # Custom hooks
  utils.ts            # cn() helper
```

## Breakpoints

| Key | Width |
|-----|-------|
| xs  | < 640px |
| sm  | ≥ 640px |
| md  | ≥ 768px |
| lg  | ≥ 1024px |
| xl  | ≥ 1280px |
| 2xl | ≥ 1536px |

## Browser Support

Chrome, Firefox, Edge, and Chromium-based browsers (Manifest V3).

## Tech Stack

- [WXT](https://wxt.dev) - Extension framework
- [React](https://react.dev/)
- [UnoCSS](https://unocss.dev) - Styling
- [Biome](https://biomejs.dev) - Linting/formatting

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
