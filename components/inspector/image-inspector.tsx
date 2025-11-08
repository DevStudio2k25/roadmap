'use client';

import React from 'react';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { Image, Maximize2, RotateCw, Droplet, Square } from 'lucide-react';

interface ImageData {
  imageName?: string;
  width?: number;
  height?: number;
  displayWidth?: number;
  displayHeight?: number;
  opacity?: number;
  borderRadius?: number;
  rotation?: number;
  shadow?: string;
  borderWidth?: number;
  borderColor?: string;
}

export function ImageInspector() {
  const { nodes, selectedNode, updateNode } = useRoadmapStore();
  
  const node = nodes.find((n) => n.id === selectedNode);
  
  if (!node || node.type !== 'image') {
    return null;
  }

  const data = node.data as ImageData;
  const originalWidth = data.width || 400;
  const originalHeight = data.height || 300;
  const currentWidth = data.displayWidth || originalWidth;
  const aspectRatio = originalHeight / originalWidth;

  const maxWidth = 800;
  const displayWidth = Math.min(currentWidth, maxWidth);
  const displayHeight = aspectRatio * displayWidth;
  const currentScale = (displayWidth / originalWidth) * 100;

  const handleSizeChange = (newSize: number) => {
    const newWidth = newSize;
    const newHeight = aspectRatio * newSize;
    
    updateNode(selectedNode!, {
      displayWidth: newWidth,
      displayHeight: newHeight,
    } as Record<string, unknown>);
  };

  const handleApplyToAllImages = () => {
    const scalePercentage = displayWidth / originalWidth;
    const imageNodes = nodes.filter(n => n.type === 'image' && n.id !== selectedNode);
    
    imageNodes.forEach((n) => {
      const nodeData = n.data as ImageData;
      const nodeOriginalWidth = nodeData.width || 400;
      const nodeOriginalHeight = nodeData.height || 300;
      
      const newWidth = nodeOriginalWidth * scalePercentage;
      const newHeight = nodeOriginalHeight * scalePercentage;
      
      updateNode(n.id, {
        displayWidth: newWidth,
        displayHeight: newHeight,
      } as Record<string, unknown>);
    });
  };

  const handleApplyStyleToAll = () => {
    const imageNodes = nodes.filter(n => n.type === 'image' && n.id !== selectedNode);
    
    imageNodes.forEach((n) => {
      updateNode(n.id, {
        opacity: data.opacity || 1,
        borderRadius: data.borderRadius || 0,
        rotation: data.rotation || 0,
        shadow: data.shadow || 'none',
        borderWidth: data.borderWidth || 0,
        borderColor: data.borderColor || '#000000',
      } as Record<string, unknown>);
    });
  };

  const handleOpacityChange = (opacity: number) => {
    updateNode(selectedNode!, { opacity } as Record<string, unknown>);
  };

  const handleBorderRadiusChange = (borderRadius: number) => {
    updateNode(selectedNode!, { borderRadius } as Record<string, unknown>);
  };

  const handleRotationChange = (rotation: number) => {
    updateNode(selectedNode!, { rotation } as Record<string, unknown>);
  };

  const handleShadowChange = (shadow: string) => {
    updateNode(selectedNode!, { shadow } as Record<string, unknown>);
  };

  const handleBorderWidthChange = (borderWidth: number) => {
    updateNode(selectedNode!, { borderWidth } as Record<string, unknown>);
  };

  const handleBorderColorChange = (borderColor: string) => {
    updateNode(selectedNode!, { borderColor } as Record<string, unknown>);
  };

  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Image className="w-4 h-4" aria-label="Image icon" />
          Image Properties
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {data.imageName || 'Untitled'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Maximize2 className="w-3 h-3" />
            Size
          </label>
          <input
            type="range"
            min={originalWidth * 0.1}
            max={originalWidth * 2}
            value={displayWidth}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>{Math.round(displayWidth)} × {Math.round(displayHeight)}</span>
            <span>{Math.round(currentScale)}%</span>
          </div>
        </div>

        <button
          onClick={handleApplyToAllImages}
          className="w-full px-3 py-2 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          Apply Size to All Images
        </button>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">Style</h4>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Droplet className="w-3 h-3" />
                Opacity
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={(data.opacity || 1) * 100}
                onChange={(e) => handleOpacityChange(Number(e.target.value) / 100)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {Math.round((data.opacity || 1) * 100)}%
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Square className="w-3 h-3" />
                Border Radius
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={data.borderRadius || 0}
                onChange={(e) => handleBorderRadiusChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {data.borderRadius || 0}px
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <RotateCw className="w-3 h-3" />
                Rotation
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={data.rotation || 0}
                onChange={(e) => handleRotationChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {data.rotation || 0}°
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shadow
              </label>
              <select
                value={data.shadow || 'none'}
                onChange={(e) => handleShadowChange(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Border Width
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={data.borderWidth || 0}
                onChange={(e) => handleBorderWidthChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                {data.borderWidth || 0}px
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                Border Color
              </label>
              <input
                type="color"
                value={data.borderColor || '#000000'}
                onChange={(e) => handleBorderColorChange(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleApplyStyleToAll}
            className="w-full mt-4 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Apply Style to All Images
          </button>
        </div>
      </div>
    </div>
  );
}
