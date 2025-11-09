'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Eye, Archive, Pen } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface ContentNodeData {
  title: string;
  description?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
  views?: number;
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export function ContentNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ContentNodeData;
  const { showHandles } = useRoadmapStore();
  const { title, description, content, status = 'draft', views = 0 } = nodeData;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'published':
        return {
          color: 'bg-emerald-500',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-700',
          icon: Eye
        };
      case 'archived':
        return {
          color: 'bg-gray-500',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-600',
          icon: Archive
        };
      default:
        return {
          color: 'bg-orange-500',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          icon: Pen
        };
    }
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={cn(
        'bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[180px] max-w-[260px] overflow-hidden',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300',
        statusConfig.bgColor
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
      <div className={cn('px-4 py-2 border-b', statusConfig.borderColor)}>
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg', statusConfig.color)}>
            <StatusIcon className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={cn('text-xs font-semibold uppercase tracking-wide', statusConfig.textColor)}>
                Content
              </span>
              <div className="flex items-center gap-2">
                <span className={cn('text-xs font-medium capitalize', statusConfig.textColor)}>
                  {status}
                </span>
                {views > 0 && (
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs">{views}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        {content && (
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border">
            <div className="line-clamp-2">
              {content.length > 120 ? `${content.substring(0, 120)}...` : content}
            </div>
          </div>
        )}
      </div>
      

    </div>
  );
}
