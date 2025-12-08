import { ScreenInfoRow } from "@/components/screen-info-row";
import type { ScreenInfo } from "@/lib/hooks/use-screen-info";

interface ScreenInfoPanelProps {
	screenInfo: ScreenInfo;
}

/**
 * Panel displaying detailed screen and viewport information
 */
export function ScreenInfoPanel({ screenInfo }: ScreenInfoPanelProps) {
	return (
		<>
			{/* Header */}
			<div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
				<div
					className="size-2 rounded-full bg-green-500 animate-pulse"
					aria-hidden="true"
				/>
				<span className="text-white font-semibold text-sm">Screen Info</span>
			</div>

			{/* Info Items */}
			<ul className="space-y-0 list-none">
				<ScreenInfoRow
					label="Breakpoint"
					value={screenInfo.breakpoint.toUpperCase()}
				/>
				<ScreenInfoRow
					label="Viewport"
					value={`${screenInfo.viewportWidth} × ${screenInfo.viewportHeight}`}
				/>
				<ScreenInfoRow
					label="Screen"
					value={`${screenInfo.screenWidth} × ${screenInfo.screenHeight}`}
				/>
				<ScreenInfoRow
					label="Pixel Ratio"
					value={`${screenInfo.pixelRatio}x`}
				/>
				<ScreenInfoRow label="Orientation" value={screenInfo.orientation} />
				<ScreenInfoRow label="Color Scheme" value={screenInfo.colorScheme} />
				<ScreenInfoRow
					label="Touch"
					value={screenInfo.touchEnabled ? "Yes" : "No"}
				/>
			</ul>
		</>
	);
}
