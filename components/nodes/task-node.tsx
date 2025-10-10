'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { CheckSquare, Square, Clock, User, Circle, Pause, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface TaskNodeData {
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority?: 'low' | 'medium' | 'high';
  assignee?: string;
  estimatedTime?: string;
}

export function TaskNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TaskNodeData;
  const { title, description, status = 'pending', priority = 'medium', assignee, estimatedTime } = nodeData;

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: 'border-l-red-500',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          dotColor: 'bg-red-500'
        };
      case 'medium':
        return {
          color: 'border-l-yellow-500',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          dotColor: 'bg-yellow-500'
        };
      case 'low':
        return {
          color: 'border-l-green-500',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          dotColor: 'bg-green-500'
        };
      default:
        return {
          color: 'border-l-gray-400',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          dotColor: 'bg-gray-400'
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: CheckSquare,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-100'
        };
      case 'in-progress':
        return {
          icon: Circle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'blocked':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      default:
        return {
          icon: Square,
          color: 'text-gray-400',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const priorityConfig = getPriorityConfig(priority);
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div
      className={cn(
        'bg-white border-2 border-l-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[170px] max-w-[240px] overflow-hidden',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300',
        priorityConfig.color,
        priorityConfig.bgColor
      )}
    >
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="input-1"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="input-2"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '70%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input-left"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="flex items-start gap-3">
          <div className={cn('p-1 rounded-md', statusConfig.bgColor)}>
            <StatusIcon className={cn('w-4 h-4', statusConfig.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-2">
              <div className={cn('w-2 h-2 rounded-full', priorityConfig.dotColor)} />
              <span className={cn('text-xs font-medium capitalize', priorityConfig.textColor)}>
                {priority} priority
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm">
          {assignee && (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-blue-600" />
              </div>
              <span className="truncate font-medium">{assignee}</span>
            </div>
          )}
          
          {estimatedTime && (
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{estimatedTime}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-1"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '30%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-2"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '70%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output-right"
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
