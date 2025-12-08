import { BreakpointBadge } from "@/components/breakpoint-badge";
import { ScreenInfoPanel } from "@/components/screen-info-panel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useScreenInfo } from "@/lib/hooks/use-screen-info";
import { useState } from "react";

/**
 * DevTool component - A floating responsive breakpoint indicator
 * Displays current breakpoint and detailed screen information in a popover
 */
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
        className="relative flex items-center justify-center size-12 rounded-full border-2 border-black bg-white transition-all duration-200  hover:shadow-lg active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-label={
          isOpen
            ? "Close screen information"
            : `Current breakpoint: ${screenInfo.breakpoint}. Click to view detailed screen information.`
        }
      >
        <BreakpointBadge breakpoint={screenInfo.breakpoint} isOpen={isOpen} />
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="start"
        sideOffset={12}
        className="p-4 rounded-xl border-0 shadow-xl bg-[#0a0a0a] min-w-64"
        role="dialog"
        aria-label="Screen information details"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <ScreenInfoPanel screenInfo={screenInfo} />
      </PopoverContent>
    </Popover>
  );
}
