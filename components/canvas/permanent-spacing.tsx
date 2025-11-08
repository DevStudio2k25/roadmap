'use client';

import React from 'react';
import { Node } from '@xyflow/react';

interface PermanentSpacingProps {
  nodes: Node[];
}

export function PermanentSpacing({ nodes }: PermanentSpacingProps) {
  const imageNodes = nodes.filter(n => n.type === 'image');
  
  if (imageNodes.length < 2) return null;

  interface Spacing {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    distance: number;
    type: 'horizontal' | 'vertical';
    node1: string;
    node2: string;
  }

  const spacings: Spacing[] = [];

  // Calculate all gaps between adjacent images
  imageNodes.forEach((node1, i) => {
    const x1 = node1.position.x;
    const y1 = node1.position.y;
    const nodeData1 = node1.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
    const w1 = nodeData1.displayWidth || nodeData1.width || 300;
    const h1 = nodeData1.displayHeight || nodeData1.height || 200;

    imageNodes.forEach((node2, j) => {
      if (i >= j) return; // Avoid duplicates

      const x2 = node2.position.x;
      const y2 = node2.position.y;
      const nodeData2 = node2.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
      const w2 = nodeData2.displayWidth || nodeData2.width || 300;
      const h2 = nodeData2.displayHeight || nodeData2.height || 200;

      // Horizontal spacing (side by side)
      const verticalOverlap = !(y1 + h1 < y2 || y2 + h2 < y1);
      
      if (verticalOverlap) {
        // Node2 is to the right of Node1
        if (x2 > x1 + w1) {
          const gap = x2 - (x1 + w1);
          if (gap > 5 && gap < 300) {
            spacings.push({
              x1: x1 + w1,
              y1: y1 + h1 / 2,
              x2: x2,
              y2: y2 + h2 / 2,
              distance: gap,
              type: 'horizontal',
              node1: node1.id,
              node2: node2.id,
            });
          }
        }
        // Node1 is to the right of Node2
        else if (x1 > x2 + w2) {
          const gap = x1 - (x2 + w2);
          if (gap > 5 && gap < 300) {
            spacings.push({
              x1: x2 + w2,
              y1: y2 + h2 / 2,
              x2: x1,
              y2: y1 + h1 / 2,
              distance: gap,
              type: 'horizontal',
              node1: node2.id,
              node2: node1.id,
            });
          }
        }
      }

      // Vertical spacing (top to bottom)
      const horizontalOverlap = !(x1 + w1 < x2 || x2 + w2 < x1);
      
      if (horizontalOverlap) {
        // Node2 is below Node1
        if (y2 > y1 + h1) {
          const gap = y2 - (y1 + h1);
          if (gap > 5 && gap < 300) {
            spacings.push({
              x1: x1 + w1 / 2,
              y1: y1 + h1,
              x2: x2 + w2 / 2,
              y2: y2,
              distance: gap,
              type: 'vertical',
              node1: node1.id,
              node2: node2.id,
            });
          }
        }
        // Node1 is below Node2
        else if (y1 > y2 + h2) {
          const gap = y1 - (y2 + h2);
          if (gap > 5 && gap < 300) {
            spacings.push({
              x1: x2 + w2 / 2,
              y1: y2 + h2,
              x2: x1 + w1 / 2,
              y2: y1,
              distance: gap,
              type: 'vertical',
              node1: node2.id,
              node2: node1.id,
            });
          }
        }
      }
    });
  });

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 500 }}>
      {spacings.map((spacing, index) => {
        const midX = (spacing.x1 + spacing.x2) / 2;
        const midY = (spacing.y1 + spacing.y2) / 2;

        return (
          <svg key={index} className="absolute inset-0" style={{ overflow: 'visible' }}>
            {/* Dashed line */}
            <line
              x1={spacing.x1}
              y1={spacing.y1}
              x2={spacing.x2}
              y2={spacing.y2}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              opacity="0.6"
            />
            
            {/* Distance label */}
            <g>
              <rect
                x={midX - 28}
                y={midY - 10}
                width="56"
                height="20"
                fill="#10b981"
                rx="3"
                opacity="0.9"
              />
              <text
                x={midX}
                y={midY + 5}
                textAnchor="middle"
                fill="white"
                fontSize="11"
                fontWeight="600"
                fontFamily="monospace"
              >
                {Math.round(spacing.distance)}px
              </text>
            </g>
          </svg>
        );
      })}
    </div>
  );
}
