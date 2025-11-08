'use client';

import React from 'react';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { Type, Palette, Box, Sparkles } from 'lucide-react';

const fontFamilies = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Comic Sans MS',
  'Impact',
  'Roboto',
  'Open Sans',
  'Montserrat',
  'Poppins'
];

const fontWeights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' }
];

const shadowOptions = [
  { value: 'none', label: 'None' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' }
];

export function TextInspector() {
  const { nodes, selectedNode, updateNode } = useRoadmapStore();
  
  const node = nodes.find(n => n.id === selectedNode);
  
  if (!node || node.type !== 'text') {
    return null;
  }

  const data = node.data as any;

  const handleUpdate = (field: string, value: any) => {
    updateNode(node.id, { [field]: value });
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Text Properties</h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Text Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Text Content
          </label>
          <textarea
            value={data.text || 'Text'}
            onChange={(e) => handleUpdate('text', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
            placeholder="Enter your text..."
          />
        </div>

        {/* Typography Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Type className="w-4 h-4" />
            Typography
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Font Family
            </label>
            <select
              value={data.fontFamily || 'Inter'}
              onChange={(e) => handleUpdate('fontFamily', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilies.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Font Size: {data.fontSize || 16}px
            </label>
            <input
              type="range"
              min="8"
              max="72"
              value={data.fontSize || 16}
              onChange={(e) => handleUpdate('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Font Weight
            </label>
            <select
              value={data.fontWeight || '400'}
              onChange={(e) => handleUpdate('fontWeight', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {fontWeights.map(weight => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>

          {/* Text Align */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
              Text Align
            </label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map(align => (
                <button
                  key={align}
                  onClick={() => handleUpdate('textAlign', align)}
                  className={`flex-1 px-3 py-2 text-xs rounded-lg border transition-colors ${
                    (data.textAlign || 'left') === align
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Colors Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Palette className="w-4 h-4" />
            Colors
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={data.textColor || '#000000'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={data.textColor || '#000000'}
                onChange={(e) => handleUpdate('textColor', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={data.backgroundColor || '#ffffff'}
                onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={data.backgroundColor || '#ffffff'}
                onChange={(e) => handleUpdate('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Box className="w-4 h-4" />
            Layout
          </div>

          {/* Width */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Width: {data.width || 200}px
            </label>
            <input
              type="range"
              min="100"
              max="800"
              value={data.width || 200}
              onChange={(e) => handleUpdate('width', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Padding */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Padding: {data.padding || 16}px
            </label>
            <input
              type="range"
              min="0"
              max="48"
              value={data.padding || 16}
              onChange={(e) => handleUpdate('padding', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Border Radius: {data.borderRadius || 8}px
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={data.borderRadius || 8}
              onChange={(e) => handleUpdate('borderRadius', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Border Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Box className="w-4 h-4" />
            Border
          </div>

          {/* Border Width */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Border Width: {data.borderWidth || 1}px
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={data.borderWidth || 1}
              onChange={(e) => handleUpdate('borderWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Border Color */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Border Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={data.borderColor || '#e5e7eb'}
                onChange={(e) => handleUpdate('borderColor', e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
              <input
                type="text"
                value={data.borderColor || '#e5e7eb'}
                onChange={(e) => handleUpdate('borderColor', e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
                placeholder="#e5e7eb"
              />
            </div>
          </div>
        </div>

        {/* Effects Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Sparkles className="w-4 h-4" />
            Effects
          </div>

          {/* Opacity */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Opacity: {Math.round((data.opacity || 1) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={data.opacity || 1}
              onChange={(e) => handleUpdate('opacity', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Shadow */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Shadow
            </label>
            <select
              value={data.shadow || 'sm'}
              onChange={(e) => handleUpdate('shadow', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {shadowOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
