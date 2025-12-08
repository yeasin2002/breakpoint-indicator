---
inclusion: always
---

# Project Structure

## Directory Organization

### `/app` (Custom Entrypoints Directory)

Contains all extension entry points. WXT automatically detects and processes files in this directory (configured via `entrypointsDir: "app"` in wxt.config.ts).

- `background.ts`: Background service worker that listens for extension icon clicks and sends toggle messages to content scripts
- `content.tsx`: Main content script that injects the DevTool UI into web pages using Shadow DOM

### `/components`

Reusable React components for the DevTool UI.

- `dev-tool.tsx`: Main DevTool component with toggle state and animated panel
- `breakpoint-badge.tsx`: Animated badge showing current breakpoint or close icon
- `screen-info-panel.tsx`: Panel displaying detailed screen information
- `screen-info-row.tsx`: Individual row component for displaying label-value pairs

### `/lib`

Utility functions and shared logic.

- `breakpoints.ts`: Tailwind-compatible breakpoint definitions and helper functions
- `hooks/use-screen-info.ts`: Custom React hook for tracking screen/viewport information in real-time
- `utils.ts`: Contains `cn()` helper for merging className strings using `clsx` and `tailwind-merge`

### `/assets`

Static assets like images and SVGs used in the extension UI.

- `react.svg`: React logo

### `/public`

Public assets that are copied directly to the build output without processing.

- `/icon`: Extension icons in various sizes (16, 32, 48, 96, 128px)
- `wxt.svg`: WXT logo

### `/docs`

Project documentation.

- `PROJECT_NAMES.md`: List of 50+ potential project names with recommendations

### `/.wxt`

Auto-generated directory by WXT containing TypeScript definitions and build artifacts. Do not edit manually.

### `/.vscode`

VS Code workspace configuration.

- `settings.json`: Editor settings configured for Biome formatter/linter
- `extensions.json`: Recommended extensions (Biome)

### `/.github`

GitHub-specific files.

- `ISSUE_TEMPLATE/`: Issue templates for bug reports, feature requests, and improvements

### `/.output`

Build output directory containing compiled extension files for different browsers.

## Configuration Files

### Code Quality & Formatting

- `biome.json`: Biome configuration for linting and formatting
  - Targets: `components/**/*.{ts,tsx}`, `lib/**/*.{ts,tsx}`, `app/**/*.{ts,tsx}`
  - Tab indentation, double quotes
  - Auto-organize imports on save

### Build & Bundling

- `wxt.config.ts`: WXT framework configuration
  - Modules: React, UnoCSS, Auto Icons
  - Custom entrypoints directory: `app/`
  - Empty action manifest (enables icon click handler)

- `uno.config.ts`: UnoCSS configuration with presets for Wind3, Animations, and Shadcn

### TypeScript

- `tsconfig.json`: TypeScript configuration extending WXT's generated config
  - React JSX support with `react-jsx` transform
  - `@/*` path alias pointing to project root

### Package Management

- `package.json`: Project dependencies and scripts
- `pnpm-workspace.yaml`: pnpm workspace configuration
- `pnpm-lock.yaml`: Locked dependency versions

## Code Conventions

### Imports

- Use `@/` path alias for importing from project root (components, lib, assets)
- Use `/` for public directory assets (e.g., `/wxt.svg`)
- Import UnoCSS styles with `import "virtual:uno.css"`

### Extension APIs

- Use `browser` namespace for cross-browser extension APIs (provided by WXT)
- Use `defineBackground()` helper for background scripts
- Use `defineContentScript()` helper for content scripts
- Use `createShadowRootUi()` for isolated UI injection in content scripts
- Never use `browser.*` APIs outside the `main` function in entrypoints

### React Components

- Functional components with hooks
- TypeScript interfaces for component props
- UnoCSS utility classes for styling (Tailwind-compatible syntax)
- Use `cn()` utility from `@/lib/utils` for conditional className merging
- Semantic HTML elements (`<output>`, `<ul>`, `<button>`) over divs with roles

### Content Script UI Pattern

Content scripts use Shadow DOM for style isolation:
1. Define content script with `defineContentScript()`
2. Set `cssInjectionMode: "ui"` for Shadow DOM isolation
3. Create Shadow Root UI with `createShadowRootUi()`
4. Mount React components using `ReactDOM.createRoot()`
5. Apply fixed positioning for overlay elements
6. Listen for messages from background script for toggle functionality

### Animation Pattern

- Use `tw-animate-css` utilities for smooth animations
- Example: `animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200`
- Conditional rendering with state-based toggle (no Popover component)

### Code Quality

- Use Biome for linting and formatting (replaces ESLint + Prettier)
- Run `pnpm check:fix` to auto-fix issues
- Format on save enabled in VS Code
- Auto-organize imports on save
