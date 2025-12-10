---
inclusion: always
---

# Project Structure

## Directory Layout

```
├── app/                    # WXT entrypoints (configured via entrypointsDir)
│   ├── background.ts       # Service worker - handles icon clicks
│   └── content.tsx         # Content script - injects DevTool UI
├── components/             # React components
│   ├── dev-tool.tsx        # Main component with toggle state
│   ├── breakpoint-badge.tsx # Animated breakpoint/close badge
│   ├── screen-info-panel.tsx # Info panel with screen details
│   └── screen-info-row.tsx # Label-value row component
├── lib/                    # Utilities and hooks
│   ├── breakpoints.ts      # Breakpoint definitions + getBreakpoint()
│   ├── hooks/
│   │   └── use-screen-info.ts # Real-time screen tracking hook
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
├── public/                 # Static assets (copied to build)
│   ├── ResponsiveKit.svg   # Source icon for auto-icons
│   ├── icon-*.png          # Generated icons (16, 32, 192, 512)
│   └── favicon.ico
├── assets/                 # Bundled assets
│   └── react.svg
├── docs/                   # Documentation
│   ├── RELEASING.md        # Version and release guide
│   └── wxt-framework.md    # WXT framework reference
├── .wxt/                   # Auto-generated (don't edit)
└── .output/                # Build output
```

## Config Files

| File | Purpose |
|------|---------|
| `wxt.config.ts` | WXT config: modules, entrypoints, manifest |
| `uno.config.ts` | UnoCSS: Wind3, Animations, Shadcn presets |
| `biome.json` | Linting/formatting: tabs, double quotes |
| `tsconfig.json` | TypeScript: extends .wxt, `@/*` alias |
| `knip.json` | Unused dependency detection |

## Code Conventions

### Imports
- `@/` alias for project root imports
- `import "virtual:uno.css"` for UnoCSS styles
- `/` prefix for public assets

### WXT APIs
- `defineBackground()` for background scripts
- `defineContentScript()` for content scripts
- `createShadowRootUi()` for isolated UI injection
- `browser.*` APIs only inside `main()` function

### React Patterns
- Functional components with TypeScript interfaces
- `cn()` utility for conditional classNames
- Semantic HTML (`<output>`, `<ul>`, `<button>`)
- UnoCSS utility classes (Tailwind-compatible)

### Content Script UI Pattern
```tsx
defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "dev-tool-ui",
      position: "inline",
      onMount: (container) => {
        const root = ReactDOM.createRoot(wrapper);
        root.render(<Component />);
        return root;
      },
      onRemove: (root) => root?.unmount(),
    });
    // Toggle via message listener
  },
});
```

### Animation Pattern
```tsx
className="animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
```
