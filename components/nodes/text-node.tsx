'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Type, Trash2 } from 'lucide-react';
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
  width?: number;
  height?: number;
  opacity?: number;
  shadow?: string;
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
    width = 200,
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
        backgroundColor,
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        opacity,
        minHeight: '40px'
      }}
    >
      {/* Input Handles */}
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id="top"
            className="!w-4 !h-4 !bg-gradient-to-br !from-blue-500 !to-cyan-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ top: -8 }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="left"
            className="!w-4 !h-4 !bg-gradient-to-br !from-blue-500 !to-cyan-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ left: -8 }}
          />
          <Handle
            type="target"
            position={Position.Right}
            id="right-target"
            className="!w-4 !h-4 !bg-gradient-to-br !from-blue-500 !to-cyan-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ right: -8 }}
          />
          <Handle
            type="target"
            position={Position.Bottom}
            id="bottom-target"
            className="!w-4 !h-4 !bg-gradient-to-br !from-blue-500 !to-cyan-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ bottom: -8 }}
          />
        </>
      )}

      {/* Text Content */}
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

      {/* Output Handles */}
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Top}
            id="top-source"
            className="!w-4 !h-4 !bg-gradient-to-br !from-emerald-500 !to-teal-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ top: -8 }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="bottom"
            className="!w-4 !h-4 !bg-gradient-to-br !from-emerald-500 !to-teal-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ bottom: -8 }}
          />
          <Handle
            type="source"
            position={Position.Left}
            id="left-source"
            className="!w-4 !h-4 !bg-gradient-to-br !from-emerald-500 !to-teal-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ left: -8 }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="right"
            className="!w-4 !h-4 !bg-gradient-to-br !from-emerald-500 !to-teal-600 !border-2 !border-white rounded-full shadow-lg hover:scale-125 transition-all"
            style={{ right: -8 }}
          />
        </>
      )}
    </div>
  );
}
