# Technology Stack

## Core Technologies

- **WXT**: Browser extension framework (v0.20.6)
- **React**: UI library (v19.1.1)
- **TypeScript**: Type-safe JavaScript (v5.9.2)
- **pnpm**: Package manager

## Build System

WXT is the build system that handles bundling, hot module reloading, and browser-specific builds.

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

### Type Checking

```bash
pnpm compile          # Run TypeScript type checking without emitting files
```

### Setup

```bash
pnpm install          # Install dependencies (runs wxt prepare automatically)
```

## Configuration

- `wxt.config.ts`: WXT configuration with React module enabled
- `tsconfig.json`: Extends WXT's generated TypeScript config with React JSX support
- TypeScript uses `react-jsx` transform for modern JSX handling
