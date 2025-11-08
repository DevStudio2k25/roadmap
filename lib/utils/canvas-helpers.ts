import { Node } from '@xyflow/react';

// Smart positioning - finds best position for new node
export function findBestPosition(existingNodes: Node[], newNodeWidth = 300, newNodeHeight = 200) {
  if (existingNodes.length === 0) {
    return { x: 100, y: 100 };
  }

  const GAP = 50; // Gap between nodes
  const GRID_SIZE = 20; // Snap to grid

  // Get all existing positions
  const positions = existingNodes.map(node => {
    const nodeData = node.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
    return {
      x: node.position.x,
      y: node.position.y,
      width: nodeData.displayWidth || nodeData.width || 300,
      height: nodeData.displayHeight || nodeData.height || 200,
    };
  });

  // Try to place to the right of the last node
  const lastNode = positions[positions.length - 1];
  let newX = lastNode.x + lastNode.width + GAP;
  let newY = lastNode.y;

  // Check if position is occupied
  const isOccupied = (x: number, y: number) => {
    return positions.some(pos => {
      return !(
        x + newNodeWidth < pos.x ||
        x > pos.x + pos.width ||
        y + newNodeHeight < pos.y ||
        y > pos.y + pos.height
      );
    });
  };

  // If occupied, try below
  if (isOccupied(newX, newY)) {
    newX = lastNode.x;
    newY = lastNode.y + lastNode.height + GAP;
  }

  // If still occupied, find first available spot
  if (isOccupied(newX, newY)) {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const testX = 100 + col * (newNodeWidth + GAP);
        const testY = 100 + row * (newNodeHeight + GAP);
        if (!isOccupied(testX, testY)) {
          newX = testX;
          newY = testY;
          break;
        }
      }
      if (!isOccupied(newX, newY)) break;
    }
  }

  // Snap to grid
  newX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
  newY = Math.round(newY / GRID_SIZE) * GRID_SIZE;

  return { x: newX, y: newY };
}

// Calculate snap lines for alignment
export function calculateSnapLines(
  draggingNode: Node,
  otherNodes: Node[],
  threshold = 10
) {
  const snapLines: {
    vertical: number[];
    horizontal: number[];
    snappedX?: number;
    snappedY?: number;
  } = {
    vertical: [],
    horizontal: [],
  };

  const dragX = draggingNode.position.x;
  const dragY = draggingNode.position.y;
  const dragNodeData = draggingNode.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
  const dragWidth = dragNodeData.displayWidth || dragNodeData.width || 300;
  const dragHeight = dragNodeData.displayHeight || dragNodeData.height || 200;
  const dragCenterX = dragX + dragWidth / 2;
  const dragCenterY = dragY + dragHeight / 2;
  const dragRight = dragX + dragWidth;
  const dragBottom = dragY + dragHeight;

  let snappedX: number | undefined;
  let snappedY: number | undefined;

  otherNodes.forEach(node => {
    if (node.id === draggingNode.id) return;

    const nodeX = node.position.x;
    const nodeY = node.position.y;
    const nodeData = node.data as { displayWidth?: number; width?: number; displayHeight?: number; height?: number };
    const nodeWidth = nodeData.displayWidth || nodeData.width || 300;
    const nodeHeight = nodeData.displayHeight || nodeData.height || 200;
    const nodeCenterX = nodeX + nodeWidth / 2;
    const nodeCenterY = nodeY + nodeHeight / 2;
    const nodeRight = nodeX + nodeWidth;
    const nodeBottom = nodeY + nodeHeight;

    // Vertical alignment (X-axis)
    // Left edges
    if (Math.abs(dragX - nodeX) < threshold) {
      snapLines.vertical.push(nodeX);
      snappedX = nodeX;
    }
    // Right edges
    if (Math.abs(dragRight - nodeRight) < threshold) {
      snapLines.vertical.push(nodeRight);
      snappedX = nodeRight - dragWidth;
    }
    // Centers
    if (Math.abs(dragCenterX - nodeCenterX) < threshold) {
      snapLines.vertical.push(nodeCenterX);
      snappedX = nodeCenterX - dragWidth / 2;
    }

    // Horizontal alignment (Y-axis)
    // Top edges
    if (Math.abs(dragY - nodeY) < threshold) {
      snapLines.horizontal.push(nodeY);
      snappedY = nodeY;
    }
    // Bottom edges
    if (Math.abs(dragBottom - nodeBottom) < threshold) {
      snapLines.horizontal.push(nodeBottom);
      snappedY = nodeBottom - dragHeight;
    }
    // Centers
    if (Math.abs(dragCenterY - nodeCenterY) < threshold) {
      snapLines.horizontal.push(nodeCenterY);
      snappedY = nodeCenterY - dragHeight / 2;
    }
  });

  snapLines.snappedX = snappedX;
  snapLines.snappedY = snappedY;

  return snapLines;
}

// Snap to grid
export function snapToGrid(position: { x: number; y: number }, gridSize = 20) {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize,
  };
}
