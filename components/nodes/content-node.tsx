'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { FileText, Edit3, Eye, Archive, Pen } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface ContentNodeData {
  title: string;
  description?: string;
  content?: string;
  status?: 'draft' | 'published' | 'archived';
  views?: number;
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
      {/* Input Handles */}
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id="input-1"
            className="w-3 h-3 bg-orange-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="target"
            position={Position.Top}
            id="input-2"
            className="w-3 h-3 bg-orange-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input-left"
            className="w-3 h-3 bg-orange-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
      
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
      
      {/* Output Handles */}
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-1"
            className="w-3 h-3 bg-orange-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-2"
            className="w-3 h-3 bg-orange-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-right"
            className="w-3 h-3 bg-orange-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
    </div>
  );
}
