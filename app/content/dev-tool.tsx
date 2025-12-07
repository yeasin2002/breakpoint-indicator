"use client";

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

    updateScreenInfo();

    window.addEventListener("resize", updateScreenInfo);
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", updateScreenInfo);

    return () => {
      window.removeEventListener("resize", updateScreenInfo);
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
      <span className="text -gray-400 text-sm">{label}</span>
      <span className="text-white text-sm font-mono">{value}</span>
    </div>
  );
}

export function DevTool() {
  const screenInfo = useScreenInfo();

  // SSR fallback
  if (!screenInfo) {
    return (
      <div className="flex items-center justify-center size-12 rounded-full border-2 border-black bg-white">
        <span className="text-sm">...</span>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        className="flex items-center justify-center size-12 rounded-full border-2 border-black bg-white transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95"
        aria-label="Dev Tool - Screen Info"
      >
        <span className="text-sm font-semibold uppercase">
          {screenInfo.breakpoint}
        </span>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        className="p-4 rounded-xl border-0 shadow-xl animate-in fade-in-0 zoom-in-95"
        style={{ backgroundColor: "#0a0a0a", minWidth: "16rem" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
          <div className="size-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-white font-semibold text-sm">Screen Info</span>
        </div>

        {/* Info Items */}
        <div className="space-y-0">
          <InfoRow label="Breakpoint" value={screenInfo.breakpoint.toUpperCase()} />
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
          <InfoRow label="Touch" value={screenInfo.touchEnabled ? "Yes" : "No"} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
