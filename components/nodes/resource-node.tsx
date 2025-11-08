'use client';

import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BookOpen, ExternalLink, Youtube, FileText, GraduationCap, Globe } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface ResourceNodeData {
  title: string;
  description?: string;
  type?: 'youtube' | 'course' | 'article' | 'book' | 'documentation';
  url?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export function ResourceNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as ResourceNodeData;
  const { showHandles } = useRoadmapStore();
  const { title, description, type = 'article', url, difficulty } = nodeData;

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'youtube':
        return {
          icon: Youtube,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Video'
        };
      case 'course':
        return {
          icon: GraduationCap,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          label: 'Course'
        };
      case 'book':
        return {
          icon: BookOpen,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Book'
        };
      case 'documentation':
        return {
          icon: FileText,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          label: 'Docs'
        };
      default:
        return {
          icon: Globe,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          label: 'Article'
        };
    }
  };

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return {
          color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
          dotColor: 'bg-emerald-500'
        };
      case 'intermediate':
        return {
          color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          dotColor: 'bg-yellow-500'
        };
      case 'advanced':
        return {
          color: 'bg-red-100 text-red-700 border-red-200',
          dotColor: 'bg-red-500'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-600 border-gray-200',
          dotColor: 'bg-gray-400'
        };
    }
  };

  const typeConfig = getTypeConfig(type);
  const difficultyConfig = getDifficultyConfig(difficulty || 'beginner');
  const TypeIcon = typeConfig.icon;

  return (
    <div
      className={cn(
        'bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[180px] max-w-[260px] overflow-hidden',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300',
        typeConfig.bgColor
      )}
    >
      {/* Input Handles */}
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id="input-1"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="target"
            position={Position.Top}
            id="input-2"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input-left"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
      
      {/* Header */}
      <div className={cn('px-4 py-2 border-b', typeConfig.borderColor)}>
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-lg bg-white shadow-sm')}>
            <TypeIcon className={cn('w-3 h-3', typeConfig.color)} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={cn('text-xs font-semibold uppercase tracking-wide', typeConfig.color)}>
                {typeConfig.label}
              </span>
              {url && (
                <ExternalLink className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer" />
              )}
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
        
        {difficulty && (
          <div className="flex items-center gap-2">
            <div className={cn('w-2 h-2 rounded-full', difficultyConfig.dotColor)} />
            <span className={cn(
              'inline-block px-2 py-1 text-xs font-medium rounded-full border capitalize',
              difficultyConfig.color
            )}>
              {difficulty}
            </span>
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
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-2"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-right"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
    </div>
  );
}
