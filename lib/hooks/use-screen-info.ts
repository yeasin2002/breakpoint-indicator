import { getBreakpoint, type BreakpointKey } from "@/lib/breakpoints";
import { useEffect, useState } from "react";

export interface ScreenInfo {
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

const THROTTLE_DELAY = 100; // ms

/**
 * Hook to track screen and viewport information in real-time
 * Updates on window resize and color scheme changes
 */
export function useScreenInfo(): ScreenInfo | null {
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
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		const throttledUpdate = () => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(updateScreenInfo, THROTTLE_DELAY);
		};

		// Initial update
		updateScreenInfo();

		// Listen for resize events
		window.addEventListener("resize", throttledUpdate);

		// Listen for color scheme changes
		const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
		colorSchemeQuery.addEventListener("change", updateScreenInfo);

		return () => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}
			window.removeEventListener("resize", throttledUpdate);
			colorSchemeQuery.removeEventListener("change", updateScreenInfo);
		};
	}, []);

	return screenInfo;
}
