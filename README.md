# Breakpoint Indicator

A browser extension that displays real-time responsive breakpoint information while browsing. Built with WXT, React, UnoCSS, and shadcn/ui.

## Features

- Floating breakpoint indicator (xs, sm, md, lg, xl, 2xl)
- Real-time viewport and screen dimensions
- Device pixel ratio and orientation detection
- Color scheme preference monitoring
- Touch capability detection
- Shadow DOM isolation for zero style conflicts

## Tech Stack

- **Framework**: [WXT](https://wxt.dev) v0.20.6
- **UI**: React 19 + [shadcn/ui](https://ui.shadcn.com)
- **Styling**: [UnoCSS](https://unocss.dev) with Tailwind-compatible utilities
- **Components**: Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev              # Chrome
pnpm dev:firefox      # Firefox
```

Load the extension from `.output/chrome-mv3` or `.output/firefox-mv3`.

### Building

```bash
pnpm build            # Production build
pnpm zip              # Create distributable zip
pnpm compile          # Type check only
```

## Project Structure

```
app/
├── background.ts           # Background service worker
├── content/
│   ├── index.tsx          # Content script entry
│   └── dev-tool.tsx       # Breakpoint indicator component
└── popup/
    ├── index.html         # Popup HTML
    ├── main.tsx           # React root
    └── App.tsx            # Popup component

components/ui/              # shadcn/ui components
lib/utils.ts               # Utility functions (cn)
style/global.css           # Theme variables (OKLCH)
uno.config.ts              # UnoCSS configuration
wxt.config.ts              # WXT configuration
```

## Adding Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components are configured to use UnoCSS instead of Tailwind.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Development setup and workflow
- Code style and architecture
- Testing requirements
- Commit message format
- Pull request process

## License

MIT
