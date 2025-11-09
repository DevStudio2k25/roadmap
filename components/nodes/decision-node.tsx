'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface DecisionNodeData {
  title: string;
  description?: string;
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export function DecisionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as DecisionNodeData;
  const { showHandles } = useRoadmapStore();
  const { title, description } = nodeData;

  return (
    <div
      className={cn(
        'bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[160px] max-w-[240px] overflow-hidden bg-amber-50',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-amber-200 hover:border-amber-300'
      )}
    >
      {/* Custom Handles with Dynamic Spacing */}
      {showHandles && nodeData.customHandles && (() => {
        const positionMap = {
          top: Position.Top,
          bottom: Position.Bottom,
          left: Position.Left,
          right: Position.Right
        };
        
        const handlesByPosition = nodeData.customHandles.reduce((acc, handle) => {
          if (!acc[handle.position]) acc[handle.position] = [];
          acc[handle.position].push(handle);
          return acc;
        }, {} as Record<string, typeof nodeData.customHandles>);

        return nodeData.customHandles.map((handle) => {
          const handlesAtPosition = handlesByPosition[handle.position];
          const indexAtPosition = handlesAtPosition.indexOf(handle);
          const totalAtPosition = handlesAtPosition.length;
          
          const spacing = 100 / (totalAtPosition + 1);
          const offset = spacing * (indexAtPosition + 1);
          
          const isVertical = handle.position === 'top' || handle.position === 'bottom';
          const style = isVertical ? { left: `${offset}%` } : { top: `${offset}%` };
          
          return (
            <Handle
              key={handle.id}
              type={handle.type}
              position={positionMap[handle.position]}
              id={handle.id}
              className={cn(
                'w-3 h-3 border-2 border-white rounded-full hover:scale-125 transition-all',
                handle.type === 'source' ? 'bg-emerald-500' : 'bg-blue-500'
              )}
              style={style}
              isConnectableStart={handle.type === 'source'}
              isConnectableEnd={handle.type === 'target'}
            />
          );
        });
      })()}
      
      {/* Header */}
      <div className="px-4 py-2 border-b border-amber-200 bg-amber-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500">
            <HelpCircle className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Decision
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-amber-600" />
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Decision paths */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Yes</span>
          </div>
          <div className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span>No</span>
          </div>
        </div>
      </div>
      

    </div>
  );
}
