'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch, HelpCircle } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface DecisionNodeData {
  title: string;
  description?: string;
}

export function DecisionNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as DecisionNodeData;
  const { title, description } = nodeData;

  return (
    <div
      className={cn(
        'bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[160px] max-w-[240px] overflow-hidden bg-amber-50',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-amber-200 hover:border-amber-300'
      )}
    >
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="input-main"
        className="w-3 h-3 bg-amber-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input-left"
        className="w-3 h-3 bg-amber-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      
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
      
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="no"
        className="w-3 h-3 bg-red-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '75%' }}
      />
    </div>
  );
}
