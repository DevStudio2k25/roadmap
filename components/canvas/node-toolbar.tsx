'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRoadmapStore } from '@/lib/stores/roadmap-store';
import { 
  Flag, 
  CheckSquare, 
  GitBranch, 
  BookOpen, 
  FileText,
  Users,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';

const nodeTemplates = [
  {
    type: 'milestone',
    icon: Flag,
    label: 'Milestone',
    color: 'text-blue-600',
  },
  {
    type: 'task',
    icon: CheckSquare,
    label: 'Task',
    color: 'text-green-600',
  },
  {
    type: 'decision',
    icon: GitBranch,
    label: 'Decision',
    color: 'text-yellow-600',
  },
  {
    type: 'resource',
    icon: BookOpen,
    label: 'Resource',
    color: 'text-purple-600',
  },
  {
    type: 'content',
    icon: FileText,
    label: 'Content',
    color: 'text-orange-600',
  },
  {
    type: 'tree',
    icon: Users,
    label: 'Organization',
    color: 'text-indigo-600',
  },
];

export function NodeToolbar() {
  const { selectedNode, addNode, deleteNode, nodes } = useRoadmapStore();

  const handleAddNode = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        title: `New ${type}`,
        description: `A new ${type} node`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    addNode(newNode);
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNode(selectedNode);
    }
  };

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 min-w-[200px]">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Add Nodes
      </h3>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
        {nodeTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <Button
              key={template.type}
              variant="ghost"
              size="sm"
              onClick={() => handleAddNode(template.type)}
              className="h-auto p-2 flex flex-col items-center gap-1 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Icon className={`w-4 h-4 ${template.color}`} />
              <span className="text-xs">{template.label}</span>
            </Button>
          );
        })}
      </div>

      {selectedNodeData && (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Selected Node
          </h4>
          <div className="text-xs text-gray-600 dark:text-gray-300 mb-2">
            {(selectedNodeData.data as any)?.title || 'Untitled'}
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDeleteNode}
              className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
