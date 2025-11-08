'use client';

import React from 'react';

interface SpacingIndicator {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  distance: number;
  type: 'horizontal' | 'vertical';
}

interface SpacingIndicatorsProps {
  indicators: SpacingIndicator[];
}

export function SpacingIndicators({ indicators }: SpacingIndicatorsProps) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1000 }}
    >
      {indicators.map((indicator, index) => {
        const isHorizontal = indicator.type === 'horizontal';
        const midX = (indicator.x1 + indicator.x2) / 2;
        const midY = (indicator.y1 + indicator.y2) / 2;

        return (
          <g key={index}>
            {/* Main line */}
            <line
              x1={indicator.x1}
              y1={indicator.y1}
              x2={indicator.x2}
              y2={indicator.y2}
              stroke="#ec4899"
              strokeWidth="2"
              strokeDasharray="5,5"
              opacity="0.8"
            />

            {/* Arrow at start */}
            <line
              x1={indicator.x1}
              y1={indicator.y1}
              x2={isHorizontal ? indicator.x1 : indicator.x1 - 5}
              y2={isHorizontal ? indicator.y1 - 5 : indicator.y1}
              stroke="#ec4899"
              strokeWidth="2"
              opacity="0.8"
            />
            <line
              x1={indicator.x1}
              y1={indicator.y1}
              x2={isHorizontal ? indicator.x1 : indicator.x1 + 5}
              y2={isHorizontal ? indicator.y1 + 5 : indicator.y1}
              stroke="#ec4899"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Arrow at end */}
            <line
              x1={indicator.x2}
              y1={indicator.y2}
              x2={isHorizontal ? indicator.x2 : indicator.x2 - 5}
              y2={isHorizontal ? indicator.y2 - 5 : indicator.y2}
              stroke="#ec4899"
              strokeWidth="2"
              opacity="0.8"
            />
            <line
              x1={indicator.x2}
              y1={indicator.y2}
              x2={isHorizontal ? indicator.x2 : indicator.x2 + 5}
              y2={isHorizontal ? indicator.y2 + 5 : indicator.y2}
              stroke="#ec4899"
              strokeWidth="2"
              opacity="0.8"
            />

            {/* Distance label */}
            <g>
              <rect
                x={midX - 25}
                y={midY - 12}
                width="50"
                height="24"
                fill="#ec4899"
                rx="4"
                opacity="0.9"
              />
              <text
                x={midX}
                y={midY + 5}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {Math.round(indicator.distance)}px
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
