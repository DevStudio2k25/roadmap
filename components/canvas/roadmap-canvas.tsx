'use client';

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
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
import { TableNode } from '../nodes/table-node';
import { ImageNode } from '../nodes/image-node';
import { TextNode } from '../nodes/text-node';
import { CanvasControls } from './canvas-controls';
import { PermanentSpacing } from './permanent-spacing';

const nodeTypes = {
  milestone: MilestoneNode,
  task: TaskNode,
  decision: DecisionNode,
  resource: ResourceNode,
  content: ContentNode,
  tree: TreeNode,
  table: TableNode,
  image: ImageNode,
  text: TextNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep' as const,
  style: {
    stroke: '#8b5cf6',
    strokeWidth: 2.5,
  },
  markerEnd: {
    type: 'arrowclosed' as const,
    color: '#8b5cf6',
  },
};

// Custom edge styles based on connection type
const getEdgeStyle = (edge: Edge) => {
  // Different colors for different node types
  const sourceNode = edge.source;
  
  // Color palette
  const colors = {
    default: '#8b5cf6', // Purple
    milestone: '#3b82f6', // Blue
    task: '#10b981', // Green
    decision: '#f59e0b', // Orange
    resource: '#ec4899', // Pink
    image: '#6366f1', // Indigo
  };
  
  // Determine color based on source node type
  let strokeColor = colors.default;
  
  if (sourceNode.includes('milestone')) strokeColor = colors.milestone;
  else if (sourceNode.includes('task')) strokeColor = colors.task;
  else if (sourceNode.includes('decision')) strokeColor = colors.decision;
  else if (sourceNode.includes('resource')) strokeColor = colors.resource;
  else if (sourceNode.includes('image')) strokeColor = colors.image;
  
  return {
    ...edge,
    animated: true,
    type: 'smoothstep',
    style: {
      stroke: strokeColor,
      strokeWidth: 2.5,
      strokeLinecap: 'round' as const,
    },
    markerEnd: {
      type: 'arrowclosed' as const,
      color: strokeColor,
    } as any,
  };
};

interface SpacingIndicator {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  distance: number;
  type: string;
}

export function RoadmapCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNode,
    addNode,
  } = useRoadmapStore();

  const [spacingIndicators, setSpacingIndicators] = React.useState<SpacingIndicator[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  // Apply custom styles to edges
  const styledEdges = useMemo(() => {
    return edges.map(edge => getEdgeStyle(edge));
  }, [edges]);

  // Calculate spacing indicators when dragging
  const calculateSpacingIndicators = useCallback((draggingNodeId: string) => {
    const draggingNode = nodes.find(n => n.id === draggingNodeId);
    if (!draggingNode) return [];

    const indicators: any[] = [];
    const otherNodes = nodes.filter(n => n.id !== draggingNodeId);

    const dragX = draggingNode.position.x;
    const dragY = draggingNode.position.y;
    const dragNodeData = draggingNode.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
    const dragWidth = dragNodeData.displayWidth || dragNodeData.width || 300;
    const dragHeight = dragNodeData.displayHeight || dragNodeData.height || 200;

    otherNodes.forEach(node => {
      const nodeX = node.position.x;
      const nodeY = node.position.y;
      const nodeData = node.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
      const nodeWidth = nodeData.displayWidth || nodeData.width || 300;
      const nodeHeight = nodeData.displayHeight || nodeData.height || 200;

      // Horizontal spacing (left-right)
      const dragRight = dragX + dragWidth;
      const nodeRight = nodeX + nodeWidth;

      // If nodes are roughly aligned vertically
      if (Math.abs(dragY - nodeY) < 50) {
        // Node is to the left
        if (nodeRight < dragX) {
          const gap = dragX - nodeRight;
          if (gap > 10 && gap < 200) {
            indicators.push({
              x1: nodeRight,
              y1: nodeY + nodeHeight / 2,
              x2: dragX,
              y2: dragY + dragHeight / 2,
              distance: gap,
              type: 'horizontal',
            });
          }
        }
        // Node is to the right
        else if (nodeX > dragRight) {
          const gap = nodeX - dragRight;
          if (gap > 10 && gap < 200) {
            indicators.push({
              x1: dragRight,
              y1: dragY + dragHeight / 2,
              x2: nodeX,
              y2: nodeY + nodeHeight / 2,
              distance: gap,
              type: 'horizontal',
            });
          }
        }
      }

      // Vertical spacing (top-bottom)
      const dragBottom = dragY + dragHeight;
      const nodeBottom = nodeY + nodeHeight;

      // If nodes are roughly aligned horizontally
      if (Math.abs(dragX - nodeX) < 50) {
        // Node is above
        if (nodeBottom < dragY) {
          const gap = dragY - nodeBottom;
          if (gap > 10 && gap < 200) {
            indicators.push({
              x1: nodeX + nodeWidth / 2,
              y1: nodeBottom,
              x2: dragX + dragWidth / 2,
              y2: dragY,
              distance: gap,
              type: 'vertical',
            });
          }
        }
        // Node is below
        else if (nodeY > dragBottom) {
          const gap = nodeY - dragBottom;
          if (gap > 10 && gap < 200) {
            indicators.push({
              x1: dragX + dragWidth / 2,
              y1: dragBottom,
              x2: nodeX + nodeWidth / 2,
              y2: nodeY,
              distance: gap,
              type: 'vertical',
            });
          }
        }
      }
    });

    return indicators;
  }, [nodes]);

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onNodeDragStart = useCallback((_event: React.MouseEvent, node: Node) => {
    setIsDragging(true);
    console.log('🎯 Started dragging:', node.id);
  }, []);

  const onNodeDrag = useCallback((_event: React.MouseEvent, node: Node) => {
    const indicators = calculateSpacingIndicators(node.id);
    setSpacingIndicators(indicators);
  }, [calculateSpacingIndicators]);

  const onNodeDragStop = useCallback(() => {
    setIsDragging(false);
    setSpacingIndicators([]);
    console.log('✅ Stopped dragging');
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      
      const imageData = event.dataTransfer.getData('imageData');
      if (imageData) {
        try {
          const img = JSON.parse(imageData);
          
          // Import smart positioning
          const canvasHelpers = await import('../../lib/utils/canvas-helpers');
          const { findBestPosition } = canvasHelpers;
          
          // Find best position for new image
          const position = findBestPosition(nodes, img.width, img.height);
          
          console.log('📍 Smart Position:', position);

          // Calculate 20% of original size
          const displayWidth = img.width * 0.2;
          const displayHeight = img.height * 0.2;
          
          console.log(`📐 Original: ${img.width}x${img.height} → Display (20%): ${Math.round(displayWidth)}x${Math.round(displayHeight)}`);

          const newNode = {
            id: `image-${Date.now()}`,
            type: 'image',
            position,
            data: {
              imageUrl: img.url,
              imageName: img.name,
              width: img.width,           // Original size
              height: img.height,         // Original size
              displayWidth: displayWidth,  // 20% of original
              displayHeight: displayHeight, // 20% of original
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          };

          addNode(newNode);
        } catch (error) {
          console.error('Error parsing image data:', error);
        }
      }
    },
    [addNode, nodes]
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const minimapStyle = {
    height: 120,
  };

  const proOptions = { hideAttribution: true };

  // Toggle for spacing indicators - set to false to disable
  const showSpacingIndicators = false;

  return (
    <div 
      className="w-full h-full bg-gray-50 dark:bg-gray-900"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Permanent Spacing Display - Always Visible */}
      {showSpacingIndicators && <PermanentSpacing nodes={nodes} />}

      {/* Spacing Indicators - Only When Dragging */}
      {showSpacingIndicators && isDragging && spacingIndicators.length > 0 && (
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
          {spacingIndicators.map((indicator: SpacingIndicator, index: number) => {
            const midX = (indicator.x1 + indicator.x2) / 2;
            const midY = (indicator.y1 + indicator.y2) / 2;

            return (
              <svg key={index} className="absolute inset-0" style={{ overflow: 'visible' }}>
                {/* Main line */}
                <line
                  x1={indicator.x1}
                  y1={indicator.y1}
                  x2={indicator.x2}
                  y2={indicator.y2}
                  stroke="#ec4899"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.8"
                />
                {/* Distance label */}
                <g>
                  <rect
                    x={midX - 30}
                    y={midY - 12}
                    width="60"
                    height="24"
                    fill="#ec4899"
                    rx="4"
                    opacity="0.95"
                  />
                  <text
                    x={midX}
                    y={midY + 6}
                    textAnchor="middle"
                    fill="white"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {Math.round(indicator.distance)}px
                  </text>
                </g>
              </svg>
            );
          })}
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={styledEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        proOptions={proOptions}
        className="bg-teal-50 dark:bg-gray-800"
        connectionLineStyle={{
          stroke: '#8b5cf6',
          strokeWidth: 2.5,
          strokeLinecap: 'round' as const,
        }}
        connectionLineType={'smoothstep' as any}
        snapToGrid={true}
        snapGrid={[20, 20]}
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
