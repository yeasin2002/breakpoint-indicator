---
inclusion: always
---

# ResponsiveKit - Product Overview

A browser extension that provides real-time responsive breakpoint monitoring for developers. Built with WXT + React.

## What It Does

Floating DevTool injected into web pages showing:
- Current Tailwind breakpoint (xs/sm/md/lg/xl/2xl)
- Viewport dimensions (width × height)
- Screen resolution
- Device pixel ratio
- Orientation (portrait/landscape)
- Color scheme preference (light/dark)
- Touch capability

## User Interaction

1. Click extension icon → toggles DevTool visibility
2. Click floating button → opens/closes info panel
3. Badge shows current breakpoint when closed, X icon when open

## Architecture

- **Shadow DOM**: Style isolation from host pages
- **Message Passing**: Background → Content script via `browser.tabs.sendMessage`
- **State**: React useState, no external state library
- **Updates**: Throttled to 100ms on resize/color scheme changes

## Breakpoints (Tailwind-compatible)

| Key | Min Width |
|-----|-----------|
| xs  | < 640px   |
| sm  | ≥ 640px   |
| md  | ≥ 768px   |
| lg  | ≥ 1024px  |
| xl  | ≥ 1280px  |
| 2xl | ≥ 1536px  |

## Browser Support

- Chrome (Manifest V3) - Primary
- Firefox (Manifest V3)
- Edge (via Chrome build)
- Chromium-based browsers

## Target Users

Frontend developers, UI/UX designers, QA engineers testing responsive layouts.

## Key Value

- Always visible without opening DevTools
- Lightweight, minimal performance impact
- Privacy-focused: no data collection, works offline
