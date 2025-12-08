import { BreakpointBadge } from "@/components/breakpoint-badge";
import { ScreenInfoPanel } from "@/components/screen-info-panel";
import { useScreenInfo } from "@/lib/hooks/use-screen-info";
import { useState } from "react";

/**
 * DevTool component - A floating responsive breakpoint indicator
 * Displays current breakpoint and detailed screen information in a panel
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
		<div className="relative">
			{/* Info Panel */}
			{isOpen && (
				<div
					className="absolute bottom-14 right-0 p-4 rounded-xl shadow-xl bg-[#0a0a0a] min-w-64 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
					role="dialog"
					aria-label="Screen information details"
				>
					<ScreenInfoPanel screenInfo={screenInfo} />
				</div>
			)}

			{/* Trigger Button */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="relative flex items-center justify-center size-12 rounded-full border-2 border-black bg-white transition-all duration-200 hover:shadow-lg active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
				aria-label={
					isOpen
						? "Close screen information"
						: `Current breakpoint: ${screenInfo.breakpoint}. Click to view detailed screen information.`
				}
				aria-expanded={isOpen}
			>
				<BreakpointBadge breakpoint={screenInfo.breakpoint} isOpen={isOpen} />
			</button>
		</div>
	);
}
