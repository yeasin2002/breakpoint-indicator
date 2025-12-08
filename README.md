# ResponsiveKit

A lightweight browser extension that provides real-time responsive breakpoint information while browsing. Built with WXT, React, and UnoCSS.

## Features

- 🎯 **Toggle on Demand** - Click extension icon to show/hide the DevTool
- 📱 **Breakpoint Indicator** - Shows current breakpoint (xs, sm, md, lg, xl, 2xl)
- 📐 **Real-time Metrics** - Viewport dimensions, screen resolution, pixel ratio
- 🎨 **Color Scheme Detection** - Monitors light/dark mode preference
- 🖱️ **Touch Detection** - Identifies touchscreen capability
- 🔒 **Zero Conflicts** - Shadow DOM isolation prevents style interference
- ⚡ **Smooth Animations** - Polished transitions with tw-animate-css
- ♿ **Accessible** - Semantic HTML and ARIA labels

## Tech Stack

- **Framework**: [WXT](https://wxt.dev) v0.20.11 (Browser extension framework)
- **UI**: React 19.2.1
- **Styling**: [UnoCSS](https://unocss.dev) v66.5.10 with Tailwind-compatible utilities
- **Animations**: tw-animate-css v1.4.0
- **Code Quality**: Biome v2.3.8 (formatter + linter)
- **Package Manager**: pnpm

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
# Chrome (default)
pnpm dev

# Firefox
pnpm dev:firefox
```

Load the extension from `.output/chrome-mv3-dev` or `.output/firefox-mv3-dev`.

### Building

```bash
# Production build
pnpm build              # Chrome
pnpm build:firefox      # Firefox

# Create distributable zip
pnpm zip                # Chrome
pnpm zip:firefox        # Firefox

# Type checking
pnpm compile

# Code quality
pnpm check              # Lint + format check
pnpm check:fix          # Auto-fix issues
```

## How It Works

1. **Click Extension Icon** - Toggle the DevTool visibility
2. **Floating Button** - Appears in bottom-right corner showing current breakpoint
3. **Click Button** - Opens detailed info panel with smooth animation
4. **Real-time Updates** - Automatically updates on resize and color scheme changes

## Project Structure

```
app/
├── background.ts       # Listens for icon clicks, sends toggle messages
└── content.tsx         # Injects DevTool UI with Shadow DOM

components/
├── dev-tool.tsx        # Main component with toggle state
├── breakpoint-badge.tsx # Animated badge (breakpoint or X icon)
├── screen-info-panel.tsx # Info panel with metrics
└── screen-info-row.tsx  # Individual metric row

lib/
├── breakpoints.ts      # Tailwind-compatible breakpoint definitions
├── hooks/
│   └── use-screen-info.ts # Real-time screen tracking hook
└── utils.ts            # cn() utility for className merging

docs/
└── PROJECT_NAMES.md    # 50+ alternative name suggestions

.kiro/steering/         # Kiro AI assistant documentation
├── product.md          # Product overview and features
├── structure.md        # Project structure and conventions
├── tech.md             # Technology stack details
└── wxt-framework.md    # WXT framework guide
```

## Configuration Files

- `wxt.config.ts` - WXT configuration (React, UnoCSS, Auto Icons)
- `biome.json` - Biome linter/formatter config
- `uno.config.ts` - UnoCSS presets (Wind3, Animations, Shadcn)
- `tsconfig.json` - TypeScript config with `@/*` path alias
- `.vscode/` - VS Code settings for Biome integration

## Breakpoints

Uses Tailwind-compatible breakpoints:

| Breakpoint | Min Width |
|------------|-----------|
| xs         | < 640px   |
| sm         | ≥ 640px   |
| md         | ≥ 768px   |
| lg         | ≥ 1024px  |
| xl         | ≥ 1280px  |
| 2xl        | ≥ 1536px  |

## Browser Support

- ✅ Chrome (Manifest V3)
- ✅ Firefox (Manifest V3)
- ✅ Edge (via Chrome build)
- ✅ Other Chromium browsers

## Development Workflow

1. Run `pnpm dev` to start development server
2. Load extension in browser (auto-reloads on changes)
3. Visit any website
4. Click extension icon to toggle DevTool
5. Click floating button to see detailed metrics

## Code Quality

This project uses **Biome** for fast linting and formatting:

```bash
pnpm lint           # Check for issues
pnpm lint:fix       # Auto-fix issues
pnpm format         # Format code
pnpm check:fix      # Lint + format + auto-fix
```

Biome is configured to:
- Use tab indentation and double quotes
- Auto-organize imports on save
- Target `app/`, `components/`, and `lib/` directories

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Development setup and workflow
- Code style and architecture
- Testing requirements
- Commit message format
- Pull request process

## Future Ideas

See `.kiro/steering/product.md` for a comprehensive list of potential features including:
- Customizable position
- Keyboard shortcuts
- Screenshot capture
- Custom breakpoints
- Performance metrics
- Accessibility audits
- And more...

## License

MIT - See [LICENSE](LICENSE) for details

## Acknowledgments

- Built with [WXT](https://wxt.dev) - Next-gen web extension framework
- Styled with [UnoCSS](https://unocss.dev) - Instant on-demand atomic CSS
- Animated with [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css)
- Formatted with [Biome](https://biomejs.dev) - Fast formatter and linter
