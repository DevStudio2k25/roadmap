'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Users, User, Building2, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface TreeNodeData {
  title: string;
  subtitle?: string;
  type: 'organization' | 'department' | 'team' | 'person' | 'project';
  avatar?: string;
  status?: 'active' | 'inactive' | 'pending';
  children?: number;
  expanded?: boolean;
  level?: number;
}

export function TreeNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TreeNodeData;
  const { 
    title, 
    subtitle, 
    type, 
    avatar, 
    status = 'active', 
    children = 0, 
    expanded = false,
    level = 0
  } = nodeData;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'organization':
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case 'department':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'team':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'person':
        return <User className="w-4 h-4 text-gray-600" />;
      case 'project':
        return <FileText className="w-4 h-4 text-orange-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-green-400 bg-green-50 dark:bg-green-900/20';
      case 'inactive':
        return 'border-gray-400 bg-gray-50 dark:bg-gray-900/20';
      case 'pending':
        return 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default:
        return 'border-gray-400 bg-white dark:bg-gray-800';
    }
  };

  const nodeWidth = Math.max(200, title.length * 8 + 80);
  const indentLevel = level * 20;

  return (
    <div
      className={cn(
        'bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[180px] max-w-[260px] overflow-hidden bg-indigo-50',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-indigo-200 hover:border-indigo-300'
      )}
      style={{ marginLeft: `${indentLevel}px` }}
    >
      {/* Input Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="input-1"
        className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '25%' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="input-2"
        className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '75%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="input-left"
        className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
      
      {/* Header */}
      <div className="px-4 py-2 border-b border-indigo-200 bg-indigo-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500">
            {getTypeIcon(type)}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            {type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <div className="flex items-center gap-3 mb-2">
          {/* Avatar or Icon */}
          <div className="flex-shrink-0">
            {avatar ? (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                {getTypeIcon(type)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {title}
              </h3>
              {children > 0 && (
                <div className="flex items-center gap-1">
                  {expanded ? (
                    <ChevronDown className="w-3 h-3 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  )}
                  <span className="text-xs text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full font-medium">
                    {children}
                  </span>
                </div>
              )}
            </div>
            
            {subtitle && (
              <p className="text-sm text-gray-600 truncate mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-2 h-2 rounded-full',
            status === 'active' ? 'bg-emerald-500' :
            status === 'inactive' ? 'bg-gray-400' :
            'bg-yellow-500'
          )} />
          <span className={cn(
            'text-xs font-medium capitalize',
            status === 'active' ? 'text-emerald-700' :
            status === 'inactive' ? 'text-gray-500' :
            'text-yellow-700'
          )}>
            {status}
          </span>
        </div>
      </div>
      
      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-1"
        className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="output-2"
        className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
        style={{ left: '75%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output-right"
        className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}
