'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';

interface TextNodeData {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textColor?: string;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  width?: number;
  height?: number;
  opacity?: number;
  shadow?: string;
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export function TextNode({ data, selected, id }: NodeProps) {
  const nodeData = data as unknown as TextNodeData;
  const { deleteNode, showHandles } = useRoadmapStore();
  const { 
    text = 'Text',
    fontSize = 16,
    fontFamily = 'Inter',
    fontWeight = '400',
    textColor = '#000000',
    backgroundColor = '#ffffff',
    padding = 16,
    borderRadius = 8,
    borderWidth = 1,
    borderColor = '#e5e7eb',
    textAlign = 'left',
    verticalAlign = 'top',
    width = 200,
    height,
    opacity = 1,
    shadow = 'sm'
  } = nodeData;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const shadowClass = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl'
  }[shadow] || 'shadow-sm';

  return (
    <div
      className={cn(
        'transition-all duration-200 overflow-visible group relative',
        shadowClass,
        selected ? 'ring-2 ring-blue-400' : ''
      )}
      style={{ 
        width: `${width}px`,
        height: height ? `${height}px` : 'auto',
        backgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        opacity,
        minHeight: '40px'
      }}
    >
      {/* Custom Handles with Dynamic Spacing - Fixed positioning */}
      {showHandles && nodeData.customHandles && (() => {
        const positionMap = {
          top: Position.Top,
          bottom: Position.Bottom,
          left: Position.Left,
          right: Position.Right
        };
        
        // Group handles by position
        const handlesByPosition = nodeData.customHandles.reduce((acc, handle) => {
          if (!acc[handle.position]) acc[handle.position] = [];
          acc[handle.position].push(handle);
          return acc;
        }, {} as Record<string, typeof nodeData.customHandles>);

        return nodeData.customHandles.map((handle) => {
          const handlesAtPosition = handlesByPosition[handle.position];
          const indexAtPosition = handlesAtPosition.indexOf(handle);
          const totalAtPosition = handlesAtPosition.length;
          
          // Calculate position based on number of handles
          // Use percentage for even distribution
          let handlePosition: string | number;
          
          if (handle.position === 'top' || handle.position === 'bottom') {
            // Horizontal positioning - distribute evenly across width
            if (totalAtPosition === 1) {
              handlePosition = '50%';
            } else {
              // Evenly space handles: 1/(n+1), 2/(n+1), 3/(n+1), etc.
              const fraction = (indexAtPosition + 1) / (totalAtPosition + 1);
              handlePosition = `${fraction * 100}%`;
            }
            
            return (
              <Handle
                key={handle.id}
                type={handle.type}
                position={positionMap[handle.position]}
                id={handle.id}
                className={cn(
                  '!w-4 !h-4 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all',
                  handle.type === 'source' 
                    ? '!bg-[#10b981]' 
                    : '!bg-[#3b82f6]'
                )}
                style={{
                  left: handlePosition,
                  [handle.position]: '-8px',
                }}
              />
            );
          } else {
            // Vertical positioning - distribute evenly across height
            if (totalAtPosition === 1) {
              handlePosition = '50%';
            } else {
              const fraction = (indexAtPosition + 1) / (totalAtPosition + 1);
              handlePosition = `${fraction * 100}%`;
            }
            
            return (
              <Handle
                key={handle.id}
                type={handle.type}
                position={positionMap[handle.position]}
                id={handle.id}
                className={cn(
                  '!w-4 !h-4 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all',
                  handle.type === 'source' 
                    ? '!bg-[#10b981]' 
                    : '!bg-[#3b82f6]'
                )}
                style={{
                  top: handlePosition,
                  [handle.position]: '-8px',
                }}
              />
            );
          }
        });
      })()}

      {/* Text Content with Vertical Alignment */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: verticalAlign === 'top' ? 'flex-start' : verticalAlign === 'middle' ? 'center' : 'flex-end',
          height: '100%',
          width: '100%'
        }}
      >
        <div
          style={{
            fontSize: `${fontSize}px`,
            fontFamily,
            fontWeight,
            color: textColor,
            textAlign,
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap'
          }}
        >
          {text}
        </div>
      </div>

      {/* Delete Button */}
      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
          title="Delete"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}


    </div>
  );
}
