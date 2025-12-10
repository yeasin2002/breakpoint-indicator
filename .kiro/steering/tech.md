---
inclusion: always
---

# Technology Stack

## Core

| Tech | Version | Purpose |
|------|---------|---------|
| WXT | ^0.20.6 | Browser extension framework |
| React | ^19.1.1 | UI library |
| TypeScript | ^5.9.2 | Type safety |
| pnpm | 9.15.0 | Package manager |

## Styling

| Package | Purpose |
|---------|---------|
| UnoCSS (^66.5.10) | Atomic CSS engine |
| @unocss/preset-wind3 | Tailwind v3 compatibility |
| unocss-preset-shadcn | shadcn/ui styling |
| unocss-preset-animations | Animation utilities |
| tw-animate-css (^1.4.0) | `animate-in`, `fade-in`, `zoom-in`, `slide-in` |
| clsx (^2.1.1) | Conditional classNames |
| tailwind-merge (^3.4.0) | Merge Tailwind classes |

## WXT Modules

- `@wxt-dev/module-react` - React integration
- `@wxt-dev/unocss` - UnoCSS integration
- `@wxt-dev/auto-icons` - Icon generation from SVG

## Code Quality

| Tool | Purpose |
|------|---------|
| Biome (2.3.8) | Linting + formatting (replaces ESLint/Prettier) |
| Husky | Git hooks |
| lint-staged | Pre-commit linting |
| Knip | Unused dependency detection |
| Changesets | Version management |

## Commands

### Development
```bash
pnpm dev              # Chrome dev server
pnpm dev:firefox      # Firefox dev server
```

### Build
```bash
pnpm build            # Production build (Chrome)
pnpm build:firefox    # Production build (Firefox)
pnpm zip              # Create distributable zip
pnpm zip:firefox      # Firefox zip
```

### Code Quality
```bash
pnpm check            # Lint + format check
pnpm check:fix        # Auto-fix issues
pnpm compile          # TypeScript type check
pnpm knip             # Find unused deps
```

### Release
```bash
pnpm changeset:add    # Add changeset
pnpm release          # check:fix + compile + build + version
```

## Dependencies

### Production
- `@base-ui-components/react` (1.0.0-rc.0)
- `@radix-ui/react-popover` (^1.1.15)
- `@radix-ui/react-slot` (^1.2.4)
- `class-variance-authority` (^0.7.1)
- `clsx`, `tailwind-merge`, `tw-animate-css`
- `react`, `react-dom` (^19.1.1)

### Dev
- `@biomejs/biome`, `typescript`
- `@types/react`, `@types/react-dom`, `@types/node`
- `unocss`, `@unocss/preset-wind3`
- `unocss-preset-animations`, `unocss-preset-shadcn`
- `@wxt-dev/*` modules
- `lucide-react` (icons)
- `husky`, `lint-staged`, `knip`, `@changesets/cli`

## Biome Config

```json
{
  "formatter": { "indentStyle": "tab" },
  "javascript": { "formatter": { "quoteStyle": "double" } },
  "assist": { "actions": { "source": { "organizeImports": "on" } } }
}
```

Targets: `app/**`, `components/**`, `lib/**`

## Dev Features

- HMR (Hot Module Reloading)
- Shadow DOM style isolation
- `@/*` path alias
- Auto-organize imports on save
- Format on save (Biome)
