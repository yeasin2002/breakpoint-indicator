"use client"

import { useState } from "react"

interface DevToolProps {
  version?: string
  errorCount?: number
  routeType?: "Static" | "Dynamic"
}

export function NextJsDevTool({ version = "v13.4.8", errorCount = 3, routeType = "Static" }: DevToolProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popup Panel */}
      <div
        className={`absolute bottom-full left-0 mb-3 w-56 origin-bottom transition-all duration-200 ease-out ${
          isHovered ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="rounded-xl bg-[#1a1a1a] p-4 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-medium text-sm">Next.js</span>
            <span className="text-gray-400 text-sm font-mono">{version}</span>
          </div>

          {/* Errors Row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Errors</span>
            {errorCount > 0 && (
              <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-red-500/20 text-red-500 text-xs font-medium">
                {errorCount}
              </span>
            )}
          </div>

          {/* Route Row */}
          <div className="flex items-center justify-between">
            <span className="text-white text-sm">Route</span>
            <span className="text-gray-400 text-sm">{routeType}</span>
          </div>
        </div>
      </div>

      {/* Trigger Button */}
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-black bg-white transition-all duration-200 ${
          isHovered ? "scale-110 shadow-lg" : "scale-100"
        }`}
        aria-label="Next.js Dev Tool"
      >
        <svg className="w-5 h-5" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_408_134"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="180"
            height="180"
          >
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#mask0_408_134)">
            <circle cx="90" cy="90" r="90" fill="black" />
            <path
              d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
              fill="url(#paint0_linear_408_134)"
            />
            <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_408_134)" />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_408_134"
              x1="109"
              y1="116.5"
              x2="144.5"
              y2="160.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_408_134"
              x1="121"
              y1="54"
              x2="120.799"
              y2="106.875"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="white" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
  )
}
