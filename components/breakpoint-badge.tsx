import type { BreakpointKey } from "@/lib/breakpoints";

interface BreakpointBadgeProps {
  breakpoint: BreakpointKey;
  isOpen: boolean;
}

/**
 * Animated badge that displays current breakpoint or close icon
 */
export function BreakpointBadge({ breakpoint, isOpen }: BreakpointBadgeProps) {
  return (
    <>
      {/* X Icon - shown when open */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`absolute transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 rotate-90"
        }`}
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>

      {/* Breakpoint Text - shown when closed */}
      <span
        className={`text-sm font-semibold uppercase transition-all duration-300 ${
          isOpen
            ? "opacity-0 scale-50 -rotate-90"
            : "opacity-100 scale-100 rotate-0"
        }`}
        aria-hidden="true"
      >
        {breakpoint}
      </span>
    </>
  );
}
