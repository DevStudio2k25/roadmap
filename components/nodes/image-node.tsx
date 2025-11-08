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
      {/* Input Handles - Top */}
      {showHandles && (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className="!w-5 !h-5 !bg-gradient-to-br !from-indigo-500 !to-purple-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ top: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🟣 Top Input Handle Hover')}
        />
      )}
      
      {/* Input Handles - Left */}
      {showHandles && (
        <Handle
          type="target"
          position={Position.Left}
          id="left"
          className="!w-5 !h-5 !bg-gradient-to-br !from-indigo-500 !to-purple-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ left: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🟣 Left Input Handle Hover')}
        />
      )}
      
      {/* Input Handles - Right */}
      {showHandles && (
        <Handle
          type="target"
          position={Position.Right}
          id="right-target"
          className="!w-5 !h-5 !bg-gradient-to-br !from-indigo-500 !to-purple-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ right: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🟣 Right Input Handle Hover')}
        />
      )}
      
      {/* Input Handles - Bottom */}
      {showHandles && (
        <Handle
          type="target"
          position={Position.Bottom}
          id="bottom-target"
          className="!w-5 !h-5 !bg-gradient-to-br !from-indigo-500 !to-purple-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ bottom: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🟣 Bottom Input Handle Hover')}
        />
      )}

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

      {/* Output Handles - Top */}
      {showHandles && (
        <Handle
          type="source"
          position={Position.Top}
          id="top-source"
          className="!w-5 !h-5 !bg-gradient-to-br !from-pink-500 !to-rose-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ top: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🩷 Top Output Handle Hover')}
        />
      )}
      
      {/* Output Handles - Bottom */}
      {showHandles && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          className="!w-5 !h-5 !bg-gradient-to-br !from-pink-500 !to-rose-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ bottom: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🩷 Bottom Output Handle Hover')}
        />
      )}
      
      {/* Output Handles - Left */}
      {showHandles && (
        <Handle
          type="source"
          position={Position.Left}
          id="left-source"
          className="!w-5 !h-5 !bg-gradient-to-br !from-pink-500 !to-rose-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ left: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🩷 Left Output Handle Hover')}
        />
      )}
      
      {/* Output Handles - Right */}
      {showHandles && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className="!w-5 !h-5 !bg-gradient-to-br !from-pink-500 !to-rose-600 !border-3 !border-white rounded-full shadow-xl hover:scale-125 transition-all duration-200 cursor-pointer"
          style={{ right: -10, zIndex: 10 }}
          onMouseEnter={() => console.log('🩷 Right Output Handle Hover')}
        />
      )}
    </div>
  );
}
