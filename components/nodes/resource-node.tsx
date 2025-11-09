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
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
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
      

    </div>
  );
}
