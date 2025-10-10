'use client';

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { MilestoneNode } from '../nodes/milestone-node';
import { TaskNode } from '../nodes/task-node';
import { DecisionNode } from '../nodes/decision-node';
import { ResourceNode } from '../nodes/resource-node';
import { ContentNode } from '../nodes/content-node';
import { TreeNode } from '../nodes/tree-node';
import { CanvasControls } from './canvas-controls';

const nodeTypes = {
  milestone: MilestoneNode,
  task: TaskNode,
  decision: DecisionNode,
  resource: ResourceNode,
  content: ContentNode,
  tree: TreeNode,
};

const defaultEdgeOptions = {
  animated: true,
  style: {
    stroke: '#3b82f6',
    strokeWidth: 3,
  },
  markerEnd: 'arrowclosed',
};

export function RoadmapCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNode,
    setSelectedNode,
  } = useRoadmapStore();

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const minimapStyle = {
    height: 120,
  };

  const proOptions = { hideAttribution: true };

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-gray-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        proOptions={proOptions}
        className="bg-teal-50 dark:bg-gray-800"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          className="bg-gray-50 dark:bg-gray-900"
        />
        
        <Controls 
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        />
        
        <MiniMap 
          style={minimapStyle}
          zoomable
          pannable
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        />
        
        <Panel position="top-left">
          <CanvasControls />
        </Panel>
      </ReactFlow>
    </div>
  );
}
