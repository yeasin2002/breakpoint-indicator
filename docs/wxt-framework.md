---
inclusion: always
---

# WXT Framework Overview

WXT is a next-generation web extension framework that prioritizes developer experience while building browser extensions. It provides a modern, opinionated approach to extension development with excellent tooling and TypeScript support.

## What is WXT?

WXT simplifies web extension development by providing:

- **Best-in-class dev mode** with hot module reloading (HMR)
- **Opinionated project structure** that scales well
- **Automatic manifest generation** from your code
- **Built-in TypeScript support** with full type safety
- **Cross-browser compatibility** (Chrome, Firefox, Safari, Edge)
- **Modern build tooling** powered by Vite
- **Zero-config setup** that just works

## Core Concepts

### 1. Entrypoints (Our `app/` Directory)

In WXT, entrypoints are the entry files for your extension. Instead of manually configuring everything in `manifest.json`, you define entrypoints as files in a dedicated directory (we use `app/` instead of the default `entrypoints/`).

**Key Principles:**

- Each file/folder in the entrypoints directory becomes a part of your extension
- The filename determines the type of entrypoint (background, content, popup, etc.)
- Configuration is done **inside the entrypoint file**, not in a separate manifest
- WXT automatically generates the correct `manifest.json` from your entrypoints

**Common Entrypoint Types:**

| Type             | Filename Pattern                      | Purpose                            |
| ---------------- | ------------------------------------- | ---------------------------------- |
| Background       | `background.ts`                       | Service worker for extension logic |
| Content Script   | `content.tsx` or `{name}.content.tsx` | Scripts injected into web pages    |
| Popup            | `popup.html`                          | Extension icon popup UI            |
| Options          | `options.html`                        | Extension settings page            |
| Unlisted Pages   | `{name}.html`                         | Custom HTML pages                  |
| Unlisted Scripts | `{name}.ts`                           | Utility scripts not in manifest    |

**Example Content Script:**

```typescript
export default defineContentScript({
  matches: ["<all_urls>"],
  main(ctx) {
    // Your content script logic here
  },
});
```

### 2. Project Structure

WXT follows a strict, organized project structure:

```
📂 project-root/
   📁 .output/          # Build artifacts
   📁 .wxt/             # Generated TypeScript config
   📁 app/              # Entrypoints (custom: default is 'entrypoints/')
   📁 assets/           # CSS, images, processed assets
   📁 components/       # UI components (auto-imported)
   📁 lib/              # Utilities and shared logic
   📁 public/           # Static files (copied as-is)
   📁 style/            # Global styles
   📄 wxt.config.ts     # WXT configuration
   📄 tsconfig.json     # TypeScript configuration
```

**Key Directories:**

- **`app/`** (entrypoints): All extension entry points - background, content scripts, popup, etc.
- **`components/`**: Reusable UI components, auto-imported by default
- **`lib/`**: Utilities, hooks, and shared business logic
- **`public/`**: Static assets copied to output without processing (icons, manifest assets)
- **`assets/`**: Assets that need processing (CSS, images that get optimized)
- **`.output/`**: Generated build files for each browser

### 3. Extension APIs

WXT provides a unified `browser` API that works across all browsers:

**Key Features:**

- **Promise-based API** works in both MV2 and MV3
- **Unified interface** - no need to check for `chrome` vs `browser`
- **Full TypeScript support** via `Browser` namespace
- **Feature detection** - APIs are `undefined` if not available

**Usage:**

```typescript
// Works in Chrome, Firefox, Safari, etc.
const tabs = await browser.tabs.query({ active: true });

// TypeScript types available
type Tab = Browser.Tabs.Tab;

// Feature detection
if (browser.sidePanel) {
  // Use side panel API
}
```

**Important Limitation:**

- Never use `browser.*` APIs outside the `main` function in entrypoints
- WXT imports entrypoints in Node.js during build, where browser APIs don't exist
- Always wrap browser API calls inside the entrypoint's main function

### 4. Content Scripts

Content scripts are JavaScript files that run in the context of web pages. WXT makes them powerful and easy to work with.

**Key Features:**

**Context Management:**

- Content scripts can become "invalidated" when extension updates/reloads
- WXT provides `ctx` object to handle this gracefully
- Use `ctx.setInterval`, `ctx.setTimeout`, etc. to auto-cleanup

**CSS Handling:**

- Import CSS directly in your content script
- WXT automatically bundles and adds it to the manifest
- Set `cssInjectionMode: "ui"` for shadow DOM isolation

**UI Injection Methods:**

| Method      | Isolated Styles | Isolated Events | HMR | Use Case                             |
| ----------- | --------------- | --------------- | --- | ------------------------------------ |
| Integrated  | ❌              | ❌              | ❌  | Simple injections, page-like styling |
| Shadow Root | ✅              | ✅              | ❌  | Isolated UI, no style conflicts      |
| IFrame      | ✅              | ✅              | ✅  | Fully isolated, complex UIs          |

**Shadow Root UI Example:**

```typescript
import "./style.css";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "my-ui",
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        // Mount your UI framework here
      },
    });

    ui.mount();
  },
});
```

**Main World vs Isolated World:**

- By default, content scripts run in an "isolated world" (separate from page context)
- Use `injectScript()` to run code in the "main world" (page's context)
- Recommended over `world: "MAIN"` option for better control

## Configuration

### WXT Config (`wxt.config.ts`)

Main configuration file for your WXT project:

```typescript
export default defineConfig({
  // Custom entrypoints directory
  entrypointsDir: "app",

  // Manifest configuration
  manifest: {
    name: "My Extension",
    permissions: ["storage", "tabs"],
  },

  // Vite configuration
  vite: () => ({
    // Vite options
  }),
});
```

### Custom Directory Structure

You can customize directory locations:

```typescript
export default defineConfig({
  srcDir: "src", // Add src/ directory
  entrypointsDir: "app", // Custom entrypoints folder
  outDir: "dist", // Custom output folder
  publicDir: "static", // Custom public folder
});
```

## Development Workflow

### Commands

```bash
# Development (with HMR)
pnpm dev              # Chrome
pnpm dev:firefox      # Firefox

# Production Build
pnpm build            # Chrome
pnpm build:firefox    # Firefox

# Create Distribution
pnpm zip              # Chrome
pnpm zip:firefox      # Firefox

# Type Checking
pnpm compile          # TypeScript check
```

### Hot Module Reloading (HMR)

WXT provides excellent HMR support:

- **Popup/Options pages**: Full HMR, instant updates
- **Content scripts**: Automatic reload on changes
- **Background scripts**: Automatic reload on changes
- **IFrame UIs**: Full HMR support

## Best Practices

### 1. Entrypoint Organization

- Use descriptive names for multiple content scripts: `youtube.content.tsx`
- Keep related files together in entrypoint directories
- Use `defineContentScript()`, `defineBackground()` helpers

### 2. Code Organization

- Extract reusable logic to `lib/` directory
- Create custom hooks in `lib/hooks/`
- Keep components in `components/` for auto-import
- Use TypeScript for type safety

### 3. Content Script Development

- Always use `ctx` methods for async operations
- Set `cssInjectionMode: "ui"` for isolated styles
- Use Shadow DOM for UI that shouldn't conflict with page styles
- Handle SPA navigation manually (listen for URL changes)

### 4. Extension APIs

- Use feature detection for optional APIs
- Wrap all browser API calls in try-catch for safety
- Never use browser APIs outside entrypoint main functions
- Use TypeScript types from `Browser` namespace

### 5. Asset Management

- Put processed assets (CSS, optimized images) in `assets/`
- Put static assets (icons, manifest resources) in `public/`
- Import CSS directly in components/entrypoints
- Use `@/` path alias for imports

## Migration from Manual Setup

If migrating from a manual extension setup:

1. **Entrypoints**: Move scripts to `app/` directory with proper naming
2. **Manifest**: Remove manual manifest, use `defineContentScript()` etc.
3. **APIs**: Replace `chrome.*` with `browser.*`
4. **Build**: Replace custom build scripts with WXT commands
5. **Types**: Use WXT's generated types from `.wxt/` directory

## Resources

- **Official Docs**: https://wxt.dev/
- **Examples**: https://github.com/wxt-dev/examples
- **API Reference**: https://wxt.dev/api/
- **Discord Community**: https://discord.gg/ZFsZqGery9

## Summary

WXT transforms extension development by:

- Eliminating boilerplate and manual manifest management
- Providing modern tooling (Vite, TypeScript, HMR)
- Offering a clear, scalable project structure
- Supporting all major browsers with one codebase
- Making complex features (content script UIs) simple

Focus on building features, not build configuration. WXT handles the complexity so you can iterate faster and ship better extensions.
