'use client';

import React from 'react';

interface SnapLinesProps {
  vertical: number[];
  horizontal: number[];
}

export function SnapLines({ vertical, horizontal }: SnapLinesProps) {
  return (
    <>
      {/* Vertical snap lines */}
      {vertical.map((x, index) => (
        <div
          key={`v-${index}`}
          className="absolute top-0 bottom-0 w-px bg-purple-500 pointer-events-none z-50"
          style={{
            left: x,
            boxShadow: '0 0 4px rgba(139, 92, 246, 0.5)',
          }}
        />
      ))}

      {/* Horizontal snap lines */}
      {horizontal.map((y, index) => (
        <div
          key={`h-${index}`}
          className="absolute left-0 right-0 h-px bg-purple-500 pointer-events-none z-50"
          style={{
            top: y,
            boxShadow: '0 0 4px rgba(139, 92, 246, 0.5)',
          }}
        />
      ))}
    </>
  );
}
