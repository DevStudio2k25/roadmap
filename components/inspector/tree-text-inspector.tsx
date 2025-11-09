'use client';

import React from 'react';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { Network, Plus, Info, Link2, Trash2 } from 'lucide-react';

interface NodeData {
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export function TreeTextInspector() {
  const { nodes, selectedNode, updateNode } = useRoadmapStore();
  
  const node = nodes.find(n => n.id === selectedNode);
  
  if (!node || node.type !== 'treeText') {
    return null;
  }

  const data = node.data as NodeData;

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Tree Structure</h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Connection Handles Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Link2 className="w-4 h-4" />
            Connection Handles
          </div>

          {/* Current Handles List */}
          <div className="space-y-2">
            {(data.customHandles || []).map((handle, index) => (
              <div key={handle.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Type: </span>
                    <span className={handle.type === 'source' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}>
                      {handle.type === 'source' ? 'Output' : 'Input'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Position: </span>
                    <span className="text-gray-900 dark:text-white capitalize">{handle.position}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newHandles = (data.customHandles || []).filter((_, i) => i !== index);
                    updateNode(node.id, { customHandles: newHandles } as Record<string, unknown>);
                    
                    // Force ReactFlow to update edges
                    setTimeout(() => {
                      const { edges } = useRoadmapStore.getState();
                      useRoadmapStore.setState({ edges: [...edges] });
                    }, 50);
                  }}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                  title="Remove handle"
                >
                  <Trash2 className="w-3 h-3 text-red-600" />
                </button>
              </div>
            ))}
            
            {(!data.customHandles || data.customHandles.length === 0) && (
              <p className="text-xs text-gray-400 dark:text-gray-500 italic text-center py-2">
                No custom handles added yet
              </p>
            )}
          </div>

          {/* Add New Handle */}
          <div className="space-y-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Add Connection Handles</label>
            
            {/* Input Handles Section */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Input Handles</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['top', 'bottom', 'left', 'right'].map((pos) => (
                  <button
                    key={`input-${pos}`}
                    onClick={() => {
                      const existingAtPosition = (data.customHandles || []).filter(h => h.position === pos && h.type === 'target').length;
                      const newHandle = {
                        id: `${pos}-target-${existingAtPosition}`,
                        type: 'target' as const,
                        position: pos as 'top' | 'bottom' | 'left' | 'right'
                      };
                      const newHandles = [...(data.customHandles || []), newHandle];
                      updateNode(node.id, { customHandles: newHandles } as Record<string, unknown>);
                      
                      // Force ReactFlow to update edges
                      setTimeout(() => {
                        const { edges } = useRoadmapStore.getState();
                        useRoadmapStore.setState({ edges: [...edges] });
                      }, 50);
                    }}
                    className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors capitalize font-medium flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3 h-3" />
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Output Handles Section */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-3 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Output Handles</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['top', 'bottom', 'left', 'right'].map((pos) => (
                  <button
                    key={`output-${pos}`}
                    onClick={() => {
                      const existingAtPosition = (data.customHandles || []).filter(h => h.position === pos && h.type === 'source').length;
                      const newHandle = {
                        id: `${pos}-source-${existingAtPosition}`,
                        type: 'source' as const,
                        position: pos as 'top' | 'bottom' | 'left' | 'right'
                      };
                      const newHandles = [...(data.customHandles || []), newHandle];
                      updateNode(node.id, { customHandles: newHandles } as Record<string, unknown>);
                      
                      // Force ReactFlow to update edges
                      setTimeout(() => {
                        const { edges } = useRoadmapStore.getState();
                        useRoadmapStore.setState({ edges: [...edges] });
                      }, 50);
                    }}
                    className="px-3 py-2 text-xs rounded-lg bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors capitalize font-medium flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3 h-3" />
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        {/* Info Section */}
        <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-teal-900 dark:text-teal-100">
                Firebase-like Tree Structure
              </h4>
              <p className="text-xs text-teal-700 dark:text-teal-300 leading-relaxed">
                This node displays hierarchical data in a tree format, similar to Firebase Realtime Database structure.
              </p>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            How to Use
          </h4>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 dark:text-teal-400 font-bold">1</span>
              </div>
              <p>Click the title to edit the root node name</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 dark:text-teal-400 font-bold">2</span>
              </div>
              <p>Hover over items to see edit, add child, and delete buttons</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 dark:text-teal-400 font-bold">3</span>
              </div>
              <p>Click the chevron icon to expand/collapse child items</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 dark:text-teal-400 font-bold">4</span>
              </div>
              <p>Use the <Plus className="w-3 h-3 inline" /> button to add new items at any level</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Features
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span>Unlimited nesting levels</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span>Expand/collapse branches</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span>Inline editing</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span>Add/delete nodes dynamically</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-teal-500"></div>
              <span>Visual tree lines</span>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Use Cases
          </h4>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white">Database Schema</span>
              <p className="mt-1">Visualize database structure and relationships</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white">File System</span>
              <p className="mt-1">Show folder and file hierarchies</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white">Organization Chart</span>
              <p className="mt-1">Display team structure and reporting lines</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
              <span className="font-medium text-gray-900 dark:text-white">API Structure</span>
              <p className="mt-1">Document API endpoints and nested routes</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
