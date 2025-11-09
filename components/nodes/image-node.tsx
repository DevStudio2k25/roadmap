'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Image as ImageIcon, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';

interface ImageNodeData {
  imageUrl: string;
  imageName: string;
  width: number;
  height: number;
  displayWidth?: number;
  displayHeight?: number;
  opacity?: number;
  borderRadius?: number;
  rotation?: number;
  shadow?: string;
  borderWidth?: number;
  borderColor?: string;
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export function ImageNode({ data, selected, id }: NodeProps) {
  const nodeData = data as unknown as ImageNodeData;
  const { deleteNode, showHandles } = useRoadmapStore();
  const { 
    imageUrl, 
    imageName, 
    width, 
    height,
    displayWidth: customDisplayWidth,
    displayHeight: customDisplayHeight,
    opacity = 1,
    borderRadius = 0,
    rotation = 0,
    shadow = 'none',
    borderWidth = 0,
    borderColor = '#000000'
  } = nodeData;

  // Use custom display size if available, otherwise calculate from original
  const displayWidth = customDisplayWidth || Math.min(width, 400);
  const displayHeight = customDisplayHeight || ((height / width) * displayWidth);

  // Debug logs
  React.useEffect(() => {
    console.log('🖼️ Image Node Rendered:', {
      id,
      imageName,
      selected,
      hasHandles: true,
      displaySize: `${Math.round(displayWidth)}x${Math.round(displayHeight)}`
    });
  }, [id, imageName, selected, displayWidth, displayHeight]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  // Shadow classes
  const shadowClass = {
    'none': '',
    'sm': 'shadow-sm',
    'md': 'shadow-md',
    'lg': 'shadow-lg',
    'xl': 'shadow-xl'
  }[shadow] || '';

  return (
    <div
      className={cn(
        'bg-white transition-all duration-200 overflow-visible group relative',
        shadowClass,
        selected ? 'ring-2 ring-blue-400' : ''
      )}
      style={{ 
        width: displayWidth,
        transform: `rotate(${rotation}deg)`,
        opacity: opacity,
        borderRadius: `${borderRadius}px`,
        border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
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
          let handlePosition: string | number;
          
          if (handle.position === 'top' || handle.position === 'bottom') {
            // Horizontal positioning - distribute evenly across width
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

      {/* Image */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={imageName}
          className="w-full h-auto object-cover"
          style={{ 
            height: displayHeight,
          }}
          draggable={false}
        />
        
        {/* Overlay on hover */}
        {selected && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-2 py-1">
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
              title="Delete"
            >
              <Trash2 className="w-3 h-3 text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-3 h-3 text-gray-400" />
          <p className="text-xs text-gray-600 dark:text-gray-300 truncate flex-1" title={imageName}>
            {imageName}
          </p>
          <span className="text-xs text-gray-400">
            {width} × {height}
          </span>
        </div>
      </div>


    </div>
  );
}
