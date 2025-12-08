---
inclusion: always
---

# Product Overview

This is a browser extension built with WXT and React that provides a responsive design development tool. The extension helps developers monitor viewport information and responsive breakpoints in real-time while browsing.

## Current Name

**ResponsiveKit** (v0.1.0)

See `docs/PROJECT_NAMES.md` for 50+ alternative name suggestions.

## Features

### DevTool Content Script

A floating responsive breakpoint indicator injected into all web pages that displays:

- **Current breakpoint** (xs, sm, md, lg, xl, 2xl) - Tailwind-compatible
- **Viewport dimensions** (width × height)
- **Screen resolution** (physical screen size)
- **Device pixel ratio** (for retina displays)
- **Orientation** (portrait/landscape)
- **Color scheme preference** (light/dark)
- **Touch capability detection** (touchscreen support)

### User Interaction

- **Toggle via Extension Icon**: Click the extension icon in the browser toolbar to show/hide the DevTool
- **Fixed Position**: Appears as a floating button in the bottom-right corner (z-index: 999999)
- **Animated Panel**: Click the button to open/close an info panel with smooth animations
- **Visual Feedback**: 
  - Shows current breakpoint badge when closed
  - Shows X icon when panel is open
  - Smooth transitions between states

### Background Script

Lightweight background service worker that:
- Listens for extension icon clicks (`browser.action.onClicked`)
- Sends toggle messages to active tab's content script
- Handles cases where content script isn't loaded yet

## Technical Implementation

### Architecture

- **Shadow DOM Isolation**: Content script UI uses Shadow DOM to prevent style conflicts with host pages
- **Message Passing**: Background script communicates with content script via `browser.tabs.sendMessage`
- **State Management**: React useState for toggle state, no external state library needed
- **Real-time Updates**: Screen info updates on window resize and color scheme changes (throttled to 100ms)

### Styling Approach

- **UnoCSS**: Atomic CSS with Tailwind-compatible utilities
- **tw-animate-css**: Smooth animations (`animate-in fade-in zoom-in-95 slide-in-from-bottom-2`)
- **No Popover Component**: Uses simple conditional rendering with state-based toggle
- **Dark Theme**: Info panel uses dark background (#0a0a0a) for better visibility

### Responsive Design

Uses Tailwind-compatible breakpoints:
- **xs**: < 640px
- **sm**: ≥ 640px
- **md**: ≥ 768px
- **lg**: ≥ 1024px
- **xl**: ≥ 1280px
- **2xl**: ≥ 1536px

### Performance Optimizations

- **Throttled Updates**: Resize events throttled to 100ms to prevent excessive re-renders
- **Conditional Rendering**: Info panel only rendered when open
- **Shadow DOM**: Isolated styles prevent CSS conflicts and improve performance
- **Minimal Dependencies**: Lightweight bundle size

### Accessibility

- **Semantic HTML**: Uses `<output>`, `<ul>`, `<button>` instead of divs with roles
- **ARIA Labels**: Proper labels for screen readers
- **Keyboard Support**: Button is keyboard accessible
- **Focus Management**: Visible focus ring on button

## Cross-browser Support

- **Chrome**: Primary target (Manifest V3)
- **Firefox**: Full support (Manifest V3)
- **Edge**: Works via Chrome build
- **Other Chromium browsers**: Compatible

## Development Workflow

1. **Start dev server**: `pnpm dev` (Chrome) or `pnpm dev:firefox` (Firefox)
2. **Load extension**: Extension auto-reloads on code changes
3. **Test on any website**: DevTool injects on all URLs (`<all_urls>`)
4. **Click extension icon**: Toggle DevTool visibility
5. **Inspect screen info**: Click floating button to see detailed info

## Future Enhancement Ideas

Based on the current architecture, potential features to add:

- **Customizable Position**: Let users choose corner placement
- **Keyboard Shortcut**: Toggle with keyboard shortcut
- **History Tracking**: Track breakpoint changes over time
- **Screenshot Capture**: Capture viewport at different breakpoints
- **Custom Breakpoints**: Allow users to define custom breakpoints
- **Export Data**: Export screen info as JSON/CSV
- **Performance Metrics**: Add FPS, memory usage tracking
- **Accessibility Audit**: Integrate accessibility checks
- **Color Picker**: Add color picker for design work
- **Grid Overlay**: Show grid overlay for alignment
- **Ruler Tool**: Measure distances on page
- **Design System Integration**: Connect to Figma/Sketch
- **Team Collaboration**: Share screen info with team
- **Multi-device Testing**: Simulate different devices

## Target Audience

- **Frontend Developers**: Building responsive websites
- **UI/UX Designers**: Testing designs across breakpoints
- **QA Engineers**: Testing responsive behavior
- **Web Developers**: Debugging layout issues
- **Students**: Learning responsive design

## Value Proposition

- **Always Visible**: No need to open DevTools
- **Lightweight**: Minimal performance impact
- **Non-intrusive**: Small floating button, easy to dismiss
- **Accurate**: Real-time viewport and screen data
- **Free**: Open source, no subscription
- **Privacy-focused**: No data collection, works offline
