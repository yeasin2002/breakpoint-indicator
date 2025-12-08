---
inclusion: always
---

# Technology Stack

## Core Technologies

- **WXT**: Browser extension framework (v0.20.11)
- **React**: UI library (v19.2.1)
- **TypeScript**: Type-safe JavaScript (v5.9.3)
- **pnpm**: Package manager

## Styling & UI

- **UnoCSS**: Atomic CSS engine with Tailwind-compatible utilities (v66.5.10)
  - Uses `@unocss/preset-wind3` for Tailwind v3 compatibility
  - `unocss-preset-shadcn` for shadcn/ui component styling
  - `unocss-preset-animations` for animation utilities
- **tw-animate-css**: Animation utilities (v1.4.0)
  - Provides `animate-in`, `fade-in`, `zoom-in`, `slide-in` utilities
  - Used for smooth panel transitions
- **Utility Functions**: 
  - `clsx` (v2.1.1) - Conditional className construction
  - `tailwind-merge` (v3.4.0) - Merge Tailwind classes intelligently

## Code Quality & Tooling

- **Biome**: Fast formatter and linter (v2.3.8)
  - Replaces ESLint + Prettier
  - Configured for TypeScript/React
  - Tab indentation, double quotes
  - Auto-organize imports

## Build System

WXT is the build system that handles bundling, hot module reloading, and browser-specific builds. Configured with:
- `@wxt-dev/module-react` (v1.1.5): React integration module
- `@wxt-dev/unocss` (v1.0.1): UnoCSS integration module
- `@wxt-dev/auto-icons` (v1.1.0): Automatic icon generation
- Custom entrypoints directory: `app/`
- Empty action manifest for icon click handling

## Common Commands

### Development

```bash
pnpm dev              # Start development server (Chrome)
pnpm dev:firefox      # Start development server (Firefox)
```

### Building

```bash
pnpm build            # Build for production (Chrome)
pnpm build:firefox    # Build for production (Firefox)
pnpm zip              # Create distributable zip (Chrome)
pnpm zip:firefox      # Create distributable zip (Firefox)
```

### Code Quality

```bash
pnpm lint             # Lint code with Biome
pnpm lint:fix         # Lint and auto-fix issues
pnpm format           # Format code with Biome
pnpm format:check     # Check formatting without changes
pnpm check            # Run both lint and format
pnpm check:fix        # Run both lint and format with auto-fix
```

### Type Checking

```bash
pnpm compile          # Run TypeScript type checking without emitting files
```

### Utilities

```bash
pnpm clean            # Clean build artifacts
pnpm postinstall      # Runs automatically after install (wxt prepare)
```

## Configuration Files

- `wxt.config.ts`: WXT configuration with React, UnoCSS, and Auto Icons modules
- `biome.json`: Biome configuration for linting/formatting (targets `app/`, `components/`, `lib/`)
- `tsconfig.json`: Extends WXT's generated TypeScript config with React JSX support and `@/*` path alias
- `uno.config.ts`: UnoCSS configuration with Wind3, Animations, and Shadcn presets
- `.vscode/settings.json`: VS Code settings for Biome integration
- `.vscode/extensions.json`: Recommended VS Code extensions

## Dependencies

### Production Dependencies

- `@base-ui-components/react` (v1.0.0-rc.0): Base UI components
- `@radix-ui/react-popover` (v1.1.15): Popover primitives (not currently used)
- `@radix-ui/react-slot` (v1.2.4): Slot component for composition
- `class-variance-authority` (v0.7.1): Variant management for components
- `clsx` (v2.1.1): Conditional className utility
- `react` (v19.2.1): UI library
- `react-dom` (v19.2.1): React DOM renderer
- `tailwind-merge` (v3.4.0): Merge Tailwind classes
- `tw-animate-css` (v1.4.0): Animation utilities

### Development Dependencies

- `@biomejs/biome` (v2.3.8): Formatter and linter
- `@types/react` (v19.2.7): React type definitions
- `@types/react-dom` (v19.2.3): React DOM type definitions
- `@unocss/preset-wind3` (v66.5.10): Tailwind v3 preset for UnoCSS
- `@wxt-dev/auto-icons` (v1.1.0): Auto icon generation
- `@wxt-dev/module-react` (v1.1.5): React integration
- `@wxt-dev/unocss` (v1.0.1): UnoCSS integration
- `globals` (v16.5.0): Global type definitions
- `lucide-react` (v0.555.0): Icon library
- `typescript` (v5.9.3): TypeScript compiler
- `unocss` (v66.5.10): Atomic CSS engine
- `unocss-preset-animations` (v1.3.0): Animation preset
- `unocss-preset-shadcn` (v1.0.1): Shadcn preset
- `wxt` (v0.20.11): Browser extension framework

## Browser Compatibility

- Chrome (Manifest V3)
- Firefox (Manifest V3)
- Edge (via Chrome build)
- Other Chromium-based browsers

## Development Features

- **Hot Module Reloading (HMR)**: Instant updates during development
- **TypeScript**: Full type safety across the codebase
- **Shadow DOM**: Style isolation for content scripts
- **Auto-imports**: Components and utilities auto-imported
- **Path Aliases**: `@/` for clean imports
- **Format on Save**: Automatic code formatting with Biome
- **Auto-organize Imports**: Imports sorted automatically
