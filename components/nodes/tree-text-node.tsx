'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ChevronRight, ChevronDown, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';

interface TreeItem {
  id: string;
  text: string;
  children: TreeItem[];
  expanded: boolean;
}

interface TreeTextNodeData {
  rootText: string;
  tree: TreeItem[];
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export function TreeTextNode({ data, selected, id }: NodeProps) {
  const nodeData = data as unknown as TreeTextNodeData;
  const { deleteNode, showHandles, updateNode } = useRoadmapStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState('');

  const tree = nodeData.tree || [];
  const rootText = nodeData.rootText || 'Tree Structure';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const toggleExpand = (itemId: string, items: TreeItem[]): TreeItem[] => {
    return items.map(item => {
      if (item.id === itemId) {
        return { ...item, expanded: !item.expanded };
      }
      if (item.children.length > 0) {
        return { ...item, children: toggleExpand(itemId, item.children) };
      }
      return item;
    });
  };

  const addChild = (parentId: string | null, items: TreeItem[]): TreeItem[] => {
    if (parentId === null) {
      return [...items, {
        id: `item-${Date.now()}`,
        text: 'New Item',
        children: [],
        expanded: true
      }];
    }

    return items.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...item.children, {
            id: `item-${Date.now()}`,
            text: 'New Item',
            children: [],
            expanded: true
          }],
          expanded: true
        };
      }
      if (item.children.length > 0) {
        return { ...item, children: addChild(parentId, item.children) };
      }
      return item;
    });
  };

  const deleteItem = (itemId: string, items: TreeItem[]): TreeItem[] => {
    return items.filter(item => item.id !== itemId).map(item => ({
      ...item,
      children: deleteItem(itemId, item.children)
    }));
  };

  const updateItemText = (itemId: string, newText: string, items: TreeItem[]): TreeItem[] => {
    return items.map(item => {
      if (item.id === itemId) {
        return { ...item, text: newText };
      }
      if (item.children.length > 0) {
        return { ...item, children: updateItemText(itemId, newText, item.children) };
      }
      return item;
    });
  };

  const handleToggle = (itemId: string) => {
    const newTree = toggleExpand(itemId, tree);
    updateNode(id, { tree: newTree } as Record<string, unknown>);
  };

  const handleAddChild = (parentId: string | null) => {
    const newTree = addChild(parentId, tree);
    updateNode(id, { tree: newTree } as Record<string, unknown>);
  };

  const handleDeleteItem = (itemId: string) => {
    const newTree = deleteItem(itemId, tree);
    updateNode(id, { tree: newTree } as Record<string, unknown>);
  };

  const handleStartEdit = (itemId: string, currentText: string) => {
    setEditingId(itemId);
    setEditText(currentText);
  };

  const handleSaveEdit = (itemId: string) => {
    const newTree = updateItemText(itemId, editText, tree);
    updateNode(id, { tree: newTree } as Record<string, unknown>);
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const renderTreeItem = (item: TreeItem, level: number = 0) => {
    const hasChildren = item.children.length > 0;
    const isEditing = editingId === item.id;

    return (
      <div key={item.id} className="select-none">
        <div 
          className={cn(
            "flex items-center gap-1 py-1 px-2 rounded hover:bg-teal-50 dark:hover:bg-teal-900/20 group transition-colors",
            level > 0 && "ml-6"
          )}
          style={{ paddingLeft: `${level * 24 + 8}px` }}
        >
          {/* Expand/Collapse Icon */}
          <button
            onClick={() => handleToggle(item.id)}
            className={cn(
              "w-4 h-4 flex items-center justify-center hover:bg-teal-100 dark:hover:bg-teal-800 rounded transition-colors",
              !hasChildren && "invisible"
            )}
          >
            {hasChildren && (
              item.expanded ? 
                <ChevronDown className="w-3 h-3 text-teal-600 dark:text-teal-400" /> : 
                <ChevronRight className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            )}
          </button>

          {/* Tree Line */}
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400"></div>
          </div>

          {/* Text or Edit Input */}
          {isEditing ? (
            <div className="flex-1 flex items-center gap-1">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit(item.id);
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="flex-1 px-2 py-0.5 text-sm border border-teal-300 dark:border-teal-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                autoFocus
              />
              <button
                onClick={() => handleSaveEdit(item.id)}
                className="p-1 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
              >
                <Check className="w-3 h-3 text-green-600" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
              >
                <X className="w-3 h-3 text-red-600" />
              </button>
            </div>
          ) : (
            <>
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 font-mono">
                {item.text}
              </span>

              {/* Action Buttons */}
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                <button
                  onClick={() => handleStartEdit(item.id, item.text)}
                  className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded"
                  title="Edit"
                >
                  <Edit2 className="w-3 h-3 text-blue-600" />
                </button>
                <button
                  onClick={() => handleAddChild(item.id)}
                  className="p-1 hover:bg-teal-100 dark:hover:bg-teal-900/20 rounded"
                  title="Add Child"
                >
                  <Plus className="w-3 h-3 text-teal-600" />
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3 text-red-600" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Render Children */}
        {item.expanded && item.children.length > 0 && (
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-teal-200 dark:bg-teal-700" 
                 style={{ left: `${level * 24 + 20}px` }}></div>
            {item.children.map(child => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[320px] max-w-[500px] overflow-hidden',
        selected ? 'border-teal-400 ring-2 ring-teal-100' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
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
      <div className="px-4 py-3 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-b border-teal-200 dark:border-teal-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-1.5 rounded-lg bg-teal-500 flex-shrink-0">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
            {isEditingTitle ? (
              <div className="flex-1 flex items-center gap-1">
                <input
                  type="text"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateNode(id, { rootText: titleText } as Record<string, unknown>);
                      setIsEditingTitle(false);
                    }
                    if (e.key === 'Escape') {
                      setIsEditingTitle(false);
                      setTitleText(rootText);
                    }
                  }}
                  onBlur={() => {
                    updateNode(id, { rootText: titleText } as Record<string, unknown>);
                    setIsEditingTitle(false);
                  }}
                  className="flex-1 px-2 py-1 text-sm font-semibold border border-teal-300 dark:border-teal-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  autoFocus
                  placeholder="Enter title..."
                />
              </div>
            ) : (
              <h3 
                className="font-semibold text-gray-900 dark:text-white text-sm cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex-1 truncate"
                onClick={() => {
                  setIsEditingTitle(true);
                  setTitleText(rootText);
                }}
                title="Click to edit title"
              >
                {rootText}
              </h3>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {!isEditingTitle && selected && (
              <button
                onClick={() => {
                  setIsEditingTitle(true);
                  setTitleText(rootText);
                }}
                className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                title="Edit Title"
              >
                <Edit2 className="w-3 h-3 text-blue-600" />
              </button>
            )}
            {selected && (
              <button
                onClick={handleDelete}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
                title="Delete Node"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tree Content */}
      <div className="p-3 bg-white dark:bg-gray-800 max-h-[500px] overflow-y-auto">
        {tree.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              No items yet
            </p>
            <button
              onClick={() => handleAddChild(null)}
              className="px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors flex items-center gap-1 mx-auto"
            >
              <Plus className="w-3 h-3" />
              Add Root Item
            </button>
          </div>
        ) : (
          <div className="space-y-0.5">
            {tree.map(item => renderTreeItem(item, 0))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {tree.length > 0 && (
        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleAddChild(null)}
            className="w-full px-3 py-1.5 text-xs font-medium text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Root Item
          </button>
        </div>
      )}


    </div>
  );
}
