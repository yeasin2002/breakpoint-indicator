# Contributing to Breakpoint Indicator

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- pnpm 8 or higher
- Chrome or Firefox browser

### Getting Started

1. Fork and clone the repository
```bash
git clone https://github.com/yeasin2002/breakpoint-indicator.git
cd breakpoint-indicator
```

2. Install dependencies
```bash
pnpm install
```

3. Start development server
```bash
pnpm dev              # Chrome
pnpm dev:firefox      # Firefox
```

4. Load the extension
   - Chrome: Navigate to `chrome://extensions`, enable Developer mode, click "Load unpacked", select `.output/chrome-mv3`
   - Firefox: Navigate to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", select any file in `.output/firefox-mv3`

## Project Architecture

### Directory Structure

- `app/` - Extension entry points (background, content, popup)
- `components/ui/` - Reusable UI components (shadcn/ui)
- `lib/` - Utility functions
- `style/` - Global CSS and theme variables
- `.wxt/` - Auto-generated (do not edit)

### Key Technologies

- **WXT**: Extension framework with HMR support
- **React 19**: UI library with modern hooks
- **UnoCSS**: Atomic CSS with Tailwind-compatible utilities
- **shadcn/ui**: Component library built on Radix UI
- **TypeScript**: Type safety and better DX

## Code Guidelines

### TypeScript

- Use TypeScript for all new files
- Define interfaces for component props
- Avoid `any` type - use `unknown` if needed
- Enable strict mode compliance

### React Components

- Use functional components with hooks
- Extract reusable logic into custom hooks
- Keep components focused and single-purpose
- Use proper TypeScript types for props

Example:
```tsx
interface MyComponentProps {
  title: string;
  count: number;
}

export function MyComponent({ title, count }: MyComponentProps) {
  const [state, setState] = useState(0);
  
  return <div>{title}: {count}</div>;
}
```

### Styling

- Use UnoCSS utility classes (Tailwind-compatible)
- Use `cn()` utility for conditional classes
- Define theme colors in `style/global.css`
- Avoid inline styles unless dynamic

Example:
```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "rounded-lg p-4",
  isActive && "bg-primary text-white"
)} />
```

### Content Scripts

When adding UI to content scripts:

1. Use Shadow DOM for style isolation
```tsx
const ui = await createShadowRootUi(ctx, {
  name: "my-ui",
  position: "inline",
  onMount: (container) => {
    const root = ReactDOM.createRoot(container);
    root.render(<MyComponent />);
    return root;
  },
});
```

2. Import UnoCSS styles
```tsx
import "virtual:uno.css";
```

3. Clean up on unmount
```tsx
onRemove: (root) => {
  root?.unmount();
}
```

### Extension APIs

- Use `browser` namespace (cross-browser compatible)
- Use WXT helpers: `defineBackground()`, `defineContentScript()`
- Handle errors gracefully
- Test in both Chrome and Firefox

## Testing

### Manual Testing

1. Test in both Chrome and Firefox
2. Verify HMR works during development
3. Test on different screen sizes and orientations
4. Check Shadow DOM isolation (no style conflicts)
5. Verify extension icons display correctly

### Type Checking

```bash
pnpm compile
```

Fix all TypeScript errors before submitting.

## Commit Guidelines

### Commit Message Format

```
<type>: <description>

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Build process or tooling changes

Examples:
```
feat: add dark mode toggle to popup
fix: breakpoint detection on mobile devices
docs: update installation instructions
```

### Best Practices

- Keep commits atomic and focused
- Write clear, descriptive messages
- Reference issues when applicable (`fixes #123`)
- Test before committing

## Pull Request Process

1. Create a feature branch
```bash
git checkout -b feat/my-feature
```

2. Make your changes
   - Follow code guidelines
   - Add/update documentation
   - Test thoroughly

3. Commit your changes
```bash
git add .
git commit -m "feat: add my feature"
```

4. Push to your fork
```bash
git push origin feat/my-feature
```

5. Open a Pull Request
   - Provide clear description of changes
   - Reference related issues
   - Include screenshots for UI changes
   - Ensure CI checks pass

### PR Checklist

- [ ] Code follows project style guidelines
- [ ] TypeScript compiles without errors (`pnpm compile`)
- [ ] Tested in Chrome and Firefox
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow guidelines
- [ ] No console errors or warnings

## Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components are automatically configured for UnoCSS.

## Need Help?

- Check existing issues and discussions
- Review the [WXT documentation](https://wxt.dev)
- Ask questions in issues (use `question` label)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
