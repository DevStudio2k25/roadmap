'use client';

import React from 'react';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { Image, Maximize2, RotateCw, Droplet, Square } from 'lucide-react';

export function ImageInspector() {
  const { nodes, selectedNode, updateNode } = useRoadmapStore();
  
  const node = nodes.find((n) => n.id === selectedNode);
  
  if (!node || node.type !== 'image') {
    return null;
  }

  const data = node.data as Record<string, unknown>;
  const originalWidth = (data.width as number) || 400;
  const originalHeight = (data.height as number) || 300;
  const currentWidth = (data.displayWidth as number) || originalWidth;
  const currentHeight = (data.displayHeight as number) || originalHeight;
  const aspectRatio = originalHeight / originalWidth;

  // Calculate display size (max 800px)
  const maxWidth = 800;
  const displayWidth = Math.min(currentWidth, maxWidth);
  const displayHeight = aspectRatio * displayWidth;

  // Calculate current scale percentage
  const currentScale = (displayWidth / originalWidth) * 100;

  const handleSizeChange = (newSize: number) => {
    // Maintain aspect ratio
    const newWidth = newSize;
    const newHeight = aspectRatio * newSize;
    
    updateNode(selectedNode!, {
      displayWidth: newWidth,
      displayHeight: newHeight,
    });
  };

  const handleApplyToAllImages = () => {
    // Calculate scale percentage from current image
    const scalePercentage = displayWidth / originalWidth;
    
    console.log('Apply to All - Scale:', Math.round(scalePercentage * 100) + '%');
    
    // Apply same scale percentage to all image nodes
    const imageNodes = nodes.filter(n => n.type === 'image' && n.id !== selectedNode);
    console.log('Found', imageNodes.length, 'other image nodes');
    
    imageNodes.forEach((n) => {
      const nodeData = n.data as Record<string, unknown>;
      const nodeOriginalWidth = (nodeData.width as number) || 400;
      const nodeOriginalHeight = (nodeData.height as number) || 300;
      
      // Apply same percentage scale
      const newWidth = nodeOriginalWidth * scalePercentage;
      const newHeight = nodeOriginalHeight * scalePercentage;
      
      console.log(`Updating ${n.id}: ${nodeOriginalWidth}x${nodeOriginalHeight} -> ${Math.round(newWidth)}x${Math.round(newHeight)}`);
      
      updateNode(n.id, {
        displayWidth: newWidth,
        displayHeight: newHeight,
      });
    });
    
    console.log('Apply to All completed!');
  };

  const handleApplyStyleToAll = () => {
    console.log('Apply Style to All Images');
    
    // Apply current style properties to all image nodes
    const imageNodes = nodes.filter(n => n.type === 'image' && n.id !== selectedNode);
    console.log('Found', imageNodes.length, 'other image nodes');
    
    imageNodes.forEach((n) => {
      console.log(`Applying style to ${n.id}`);
      updateNode(n.id, {
        opacity: data.opacity || 1,
        borderRadius: data.borderRadius || 0,
        rotation: data.rotation || 0,
        shadow: data.shadow || 'none',
        borderWidth: data.borderWidth || 0,
        borderColor: data.borderColor || '#000000',
      });
    });
    
    console.log('Apply Style completed!');
  };

  const handleOpacityChange = (opacity: number) => {
    updateNode(selectedNode!, { opacity });
  };

  const handleBorderRadiusChange = (borderRadius: number) => {
    updateNode(selectedNode!, { borderRadius });
  };

  const handleRotationChange = (rotation: number) => {
    updateNode(selectedNode!, { rotation });
  };

  const handleShadowChange = (shadow: string) => {
    updateNode(selectedNode!, { shadow });
  };

  const handleBorderWidthChange = (borderWidth: number) => {
    updateNode(selectedNode!, { borderWidth });
  };

  const handleBorderColorChange = (borderColor: string) => {
    updateNode(selectedNode!, { borderColor });
  };

  return (
    <div className="w-80 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Image className="w-4 h-4" />
          Image Properties
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {data.imageName}
        </p>
      </div>

      <div className="space-y-5">
        {/* Size Control */}
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
            <Maximize2 className="w-3 h-3" />
            Size (Width)
          </label>
          <input
            type="range"
            min="50"
            max="800"
            value={displayWidth}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {Math.round(displayWidth)}px × {Math.round(displayHeight)}px
            </span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              {Math.round(currentScale)}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleSizeChange(originalWidth)}
              className="flex-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset
            </button>
            <button
              onClick={handleApplyToAllImages}
              className="flex-1 px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors font-medium"
            >
              Apply to All
            </button>
          </div>
        </div>

        {/* Opacity */}
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

        {/* Border Radius */}
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

        {/* Rotation */}
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
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {data.rotation || 0}°
            </span>
            <button
              onClick={() => handleRotationChange(0)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Shadow */}
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Shadow
          </label>
          <select
            value={data.shadow || 'none'}
            onChange={(e) => handleShadowChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="none">None</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
        </div>

        {/* Border Width */}
        <div>
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
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

        {/* Border Color */}
        {(data.borderWidth || 0) > 0 && (
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Border Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.borderColor || '#000000'}
                onChange={(e) => handleBorderColorChange(e.target.value)}
                className="w-12 h-10 border border-gray-200 dark:border-gray-600 rounded cursor-pointer"
              />
              <input
                type="text"
                value={data.borderColor || '#000000'}
                onChange={(e) => handleBorderColorChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* Image Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image Information
          </h4>
          <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex justify-between">
              <span>Original Size:</span>
              <span className="font-mono">{originalWidth} × {originalHeight}</span>
            </div>
            <div className="flex justify-between">
              <span>Display Size:</span>
              <span className="font-mono">{Math.round(displayWidth)} × {Math.round(displayHeight)}</span>
            </div>
            <div className="flex justify-between">
              <span>Scale:</span>
              <span className="font-mono font-semibold text-purple-600 dark:text-purple-400">{Math.round(currentScale)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Aspect Ratio:</span>
              <span className="font-mono">{aspectRatio.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => {
                handleSizeChange(originalWidth);
                handleRotationChange(0);
                handleOpacityChange(1);
                handleBorderRadiusChange(0);
                handleBorderWidthChange(0);
                handleShadowChange('none');
              }}
              className="px-3 py-2 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={() => {
                handleBorderRadiusChange(12);
                handleShadowChange('lg');
              }}
              className="px-3 py-2 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              Card Style
            </button>
          </div>
          <button
            onClick={handleApplyStyleToAll}
            className="w-full px-3 py-2 text-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
          >
            Apply Style to All Images
          </button>
        </div>
      </div>
    </div>
  );
}
