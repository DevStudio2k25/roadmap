'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Flag, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface MilestoneNodeData {
  title: string;
  description?: string;
  progress?: number;
  status?: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate?: string;
}

export function MilestoneNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as MilestoneNodeData;
  const { title, description, progress = 0, status = 'pending', dueDate } = nodeData;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-emerald-500',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          textColor: 'text-emerald-700',
          icon: CheckCircle
        };
      case 'in-progress':
        return {
          color: 'bg-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          icon: Clock
        };
      case 'blocked':
        return {
          color: 'bg-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          icon: AlertCircle
        };
      default:
        return {
          color: 'bg-gray-400',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-600',
          icon: Flag
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
      <Handle
        type="target"
        position={Position.Top}
        id="input-1"
        className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '25%' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="input-2"
        className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '75%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input-left"
        className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      
      {/* Header with status */}
      <div className={cn('px-4 py-2 border-b', statusConfig.borderColor)}>
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg', statusConfig.color)}>
            <StatusIcon className="w-3 h-3 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn('text-xs font-medium capitalize', statusConfig.textColor)}>
                {status}
              </span>
              {progress > 0 && (
                <span className="text-xs text-gray-500">
                  {progress}% complete
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        {progress > 0 && (
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={cn('h-2 rounded-full transition-all duration-500', statusConfig.color)}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        
        {dueDate && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Due {dueDate}</span>
          </div>
        )}
      </div>
      
      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-1"
        className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-2"
        className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '75%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output-right"
        className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
