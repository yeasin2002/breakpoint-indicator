import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function getBreakpoint(width: number): BreakpointKey {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "xs";
}

interface ScreenInfo {
  viewportWidth: number;
  viewportHeight: number;
  screenWidth: number;
  screenHeight: number;
  breakpoint: BreakpointKey;
  pixelRatio: number;
  orientation: "portrait" | "landscape";
  colorScheme: "light" | "dark";
  touchEnabled: boolean;
}

function useScreenInfo(): ScreenInfo | null {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null);

  useEffect(() => {
    const updateScreenInfo = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      setScreenInfo({
        viewportWidth,
        viewportHeight,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        breakpoint: getBreakpoint(viewportWidth),
        pixelRatio: window.devicePixelRatio || 1,
        orientation: viewportWidth > viewportHeight ? "landscape" : "portrait",
        colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
        touchEnabled: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      });
    };

    // Throttle resize events for better performance
    let timeoutId: number | undefined;
    const throttledUpdate = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(updateScreenInfo, 100);
    };

    // Initial update
    updateScreenInfo();

    // Listen for resize events
    window.addEventListener("resize", throttledUpdate);

    // Listen for color scheme changes
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", updateScreenInfo);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", throttledUpdate);
      colorSchemeQuery.removeEventListener("change", updateScreenInfo);
    };
  }, []);

  return screenInfo;
}

interface InfoRowProps {
  label: string;
  value: string | number;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-b-0">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white text-sm font-mono">{value}</span>
    </div>
  );
}

export function DevTool() {
  const screenInfo = useScreenInfo();
  const [isOpen, setIsOpen] = useState(false);

  // Loading state while screen info initializes
  if (!screenInfo) {
    return (
      <div
        className="flex items-center justify-center size-12 rounded-full border-2 border-black bg-white"
        role="status"
        aria-label="Loading screen information"
      >
        <span className="text-sm" aria-hidden="true">
          ...
        </span>
      </div>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="relative flex items-center justify-center size-12 rounded-full border-2 border-black bg-white transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95 cursor-pointer"
        aria-label={
          isOpen
            ? "Close screen information"
            : `Current breakpoint: ${screenInfo.breakpoint}. Click to view detailed screen information.`
        }
      >
        {/* X Icon */}
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

        {/* Breakpoint Text */}
        <span
          className={`text-sm font-semibold uppercase transition-all duration-300 ${
            isOpen
              ? "opacity-0 scale-50 -rotate-90"
              : "opacity-100 scale-100 rotate-0"
          }`}
          aria-hidden="true"
        >
          {screenInfo.breakpoint}
        </span>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        className="p-4 rounded-xl border-0 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
        style={{ backgroundColor: "#0a0a0a", minWidth: "16rem" }}
        role="dialog"
        aria-label="Screen information details"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
          <div
            className="size-2 rounded-full bg-green-500 animate-pulse"
            aria-hidden="true"
          />
          <span className="text-white font-semibold text-sm">Screen Info</span>
        </div>

        {/* Info Items */}
        <div className="space-y-0" role="list">
          <InfoRow
            label="Breakpoint"
            value={screenInfo.breakpoint.toUpperCase()}
          />
          <InfoRow
            label="Viewport"
            value={`${screenInfo.viewportWidth} × ${screenInfo.viewportHeight}`}
          />
          <InfoRow
            label="Screen"
            value={`${screenInfo.screenWidth} × ${screenInfo.screenHeight}`}
          />
          <InfoRow label="Pixel Ratio" value={`${screenInfo.pixelRatio}x`} />
          <InfoRow label="Orientation" value={screenInfo.orientation} />
          <InfoRow label="Color Scheme" value={screenInfo.colorScheme} />
          <InfoRow
            label="Touch"
            value={screenInfo.touchEnabled ? "Yes" : "No"}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
