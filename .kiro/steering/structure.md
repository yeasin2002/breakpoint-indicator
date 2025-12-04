# Project Structure

## Directory Organization

### `/entrypoints`

Contains all extension entry points. WXT automatically detects and processes files in this directory.

- `background.ts`: Background service worker/script
- `content.ts` or `content/`: Content scripts injected into web pages
- `popup/`: Popup UI shown when clicking the extension icon
  - `index.html`: HTML entry point
  - `main.tsx`: React app initialization
  - `App.tsx`: Main React component
  - `*.css`: Component styles

### `/assets`

Static assets like images and SVGs used in the extension UI.

### `/public`

Public assets that are copied directly to the build output.

- `/icon`: Extension icons in various sizes (16, 32, 48, 96, 128px)

### `/.wxt`

Auto-generated directory by WXT containing TypeScript definitions and build artifacts. Do not edit manually.

## Code Conventions

### Imports

- Use `@/` path alias for importing from the assets directory
- Use `/` for public directory assets (e.g., `/wxt.svg`)

### Extension APIs

- Use `browser` namespace for cross-browser extension APIs (provided by WXT)
- Use `defineBackground()` helper for background scripts

### React Components

- Functional components with hooks
- TypeScript interfaces for component props
- CSS modules or separate CSS files for styling
