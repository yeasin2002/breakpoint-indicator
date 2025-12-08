/**
 * Tailwind-compatible breakpoint definitions
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Determines the current breakpoint based on viewport width
 */
export function getBreakpoint(width: number): BreakpointKey {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}
