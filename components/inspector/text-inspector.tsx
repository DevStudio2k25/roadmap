'use client';

import React from 'react';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { 
  Type, Palette, Box, Sparkles, Link2, Plus, Trash2,
  AlignLeft, AlignCenter, AlignRight,
  AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd,
  ArrowUpLeft, ArrowUp, ArrowUpRight,
  ArrowLeft, Circle, ArrowRight,
  ArrowDownLeft, ArrowDown, ArrowDownRight
} from 'lucide-react';

const fontFamilies = [
  'Inter', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia',
  'Courier New', 'Verdana', 'Comic Sans MS', 'Impact',
  'Roboto', 'Open Sans', 'Montserrat', 'Poppins'
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

interface TextData {
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  textColor?: string;
  backgroundColor?: string;
  padding?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  textAlign?: string;
  verticalAlign?: string;
  width?: number;
  height?: number;
  opacity?: number;
  shadow?: string;
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export function TextInspector() {
  const { nodes, selectedNode, updateNode } = useRoadmapStore();
  
  const node = nodes.find(n => n.id === selectedNode);
  
  if (!node || node.type !== 'text') {
    return null;
  }

  const data = node.data as TextData;

  const handleUpdate = (field: string, value: string | number) => {
    updateNode(node.id, { [field]: value } as Record<string, unknown>);
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

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Type className="w-4 h-4" />
            Typography
          </div>

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

          {/* Advanced Text Alignment */}
          <div className="space-y-3">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
              Text Alignment
            </label>
            
            {/* Horizontal Alignment */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Horizontal</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'left', Icon: AlignLeft, label: 'Left' },
                  { value: 'center', Icon: AlignCenter, label: 'Center' },
                  { value: 'right', Icon: AlignRight, label: 'Right' }
                ].map(align => (
                  <button
                    key={align.value}
                    onClick={() => handleUpdate('textAlign', align.value)}
                    className={`px-3 py-2.5 text-xs rounded-lg border transition-all flex flex-col items-center gap-1 ${
                      (data.textAlign || 'left') === align.value
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:scale-102'
                    }`}
                    title={align.label}
                  >
                    <align.Icon className="w-4 h-4" />
                    <div className="text-xs font-medium">{align.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vertical Alignment */}
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Vertical</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'top', Icon: AlignVerticalJustifyStart, label: 'Top' },
                  { value: 'middle', Icon: AlignVerticalJustifyCenter, label: 'Middle' },
                  { value: 'bottom', Icon: AlignVerticalJustifyEnd, label: 'Bottom' }
                ].map(align => (
                  <button
                    key={align.value}
                    onClick={() => handleUpdate('verticalAlign', align.value)}
                    className={`px-3 py-2.5 text-xs rounded-lg border transition-all flex flex-col items-center gap-1 ${
                      (data.verticalAlign || 'top') === align.value
                        ? 'bg-purple-500 text-white border-purple-500 shadow-md scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:scale-102'
                    }`}
                    title={align.label}
                  >
                    <align.Icon className="w-4 h-4" />
                    <div className="text-xs font-medium">{align.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Alignment Presets */}
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Presets</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { h: 'left', v: 'top', Icon: ArrowUpLeft },
                  { h: 'center', v: 'top', Icon: ArrowUp },
                  { h: 'right', v: 'top', Icon: ArrowUpRight },
                  { h: 'left', v: 'middle', Icon: ArrowLeft },
                  { h: 'center', v: 'middle', Icon: Circle },
                  { h: 'right', v: 'middle', Icon: ArrowRight },
                  { h: 'left', v: 'bottom', Icon: ArrowDownLeft },
                  { h: 'center', v: 'bottom', Icon: ArrowDown },
                  { h: 'right', v: 'bottom', Icon: ArrowDownRight }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      updateNode(node.id, { 
                        textAlign: preset.h,
                        verticalAlign: preset.v
                      } as Record<string, unknown>);
                    }}
                    className={`p-2.5 rounded border transition-all flex items-center justify-center ${
                      (data.textAlign || 'left') === preset.h && (data.verticalAlign || 'top') === preset.v
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white border-transparent shadow-md'
                        : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={`${preset.h} ${preset.v}`}
                  >
                    <preset.Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Palette className="w-4 h-4" />
            Colors
          </div>

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

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Box className="w-4 h-4" />
            Layout
          </div>

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

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Box className="w-4 h-4" />
            Border
          </div>

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

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Sparkles className="w-4 h-4" />
            Effects
          </div>

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

          {/* Add New Handle - Improved UI */}
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
                      // Count existing handles at this position
                      const existingAtPosition = (data.customHandles || []).filter(h => h.position === pos && h.type === 'target').length;
                      
                      // Create position-based ID so ReactFlow can track handle movements
                      const newHandle = {
                        id: `${pos}-target-${existingAtPosition}`,
                        type: 'target' as const,
                        position: pos as 'top' | 'bottom' | 'left' | 'right'
                      };
                      const newHandles = [...(data.customHandles || []), newHandle];
                      
                      // Calculate required size based on handles
                      const handlesByPosition = newHandles.reduce((acc, h) => {
                        if (!acc[h.position]) acc[h.position] = 0;
                        acc[h.position]++;
                        return acc;
                      }, {} as Record<string, number>);
                      
                      const currentWidth = data.width || 200;
                      const currentHeight = data.height || 80;
                      const minHandleSpacing = 40; // Minimum 40px between handles
                      
                      // Calculate required width for top/bottom handles
                      const maxHorizontalHandles = Math.max(
                        handlesByPosition['top'] || 0,
                        handlesByPosition['bottom'] || 0
                      );
                      const requiredWidth = Math.max(currentWidth, maxHorizontalHandles * minHandleSpacing + 40);
                      
                      // Calculate required height for left/right handles
                      const maxVerticalHandles = Math.max(
                        handlesByPosition['left'] || 0,
                        handlesByPosition['right'] || 0
                      );
                      const requiredHeight = Math.max(currentHeight, maxVerticalHandles * minHandleSpacing + 40);
                      
                      updateNode(node.id, { 
                        customHandles: newHandles,
                        width: requiredWidth,
                        height: requiredHeight
                      } as Record<string, unknown>);
                      
                      // Force ReactFlow to update edges immediately
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
                      // Count existing handles at this position
                      const existingAtPosition = (data.customHandles || []).filter(h => h.position === pos && h.type === 'source').length;
                      
                      // Create position-based ID so ReactFlow can track handle movements
                      const newHandle = {
                        id: `${pos}-source-${existingAtPosition}`,
                        type: 'source' as const,
                        position: pos as 'top' | 'bottom' | 'left' | 'right'
                      };
                      const newHandles = [...(data.customHandles || []), newHandle];
                      
                      // Calculate required size based on handles
                      const handlesByPosition = newHandles.reduce((acc, h) => {
                        if (!acc[h.position]) acc[h.position] = 0;
                        acc[h.position]++;
                        return acc;
                      }, {} as Record<string, number>);
                      
                      const currentWidth = data.width || 200;
                      const currentHeight = data.height || 80;
                      const minHandleSpacing = 40; // Minimum 40px between handles
                      
                      // Calculate required width for top/bottom handles
                      const maxHorizontalHandles = Math.max(
                        handlesByPosition['top'] || 0,
                        handlesByPosition['bottom'] || 0
                      );
                      const requiredWidth = Math.max(currentWidth, maxHorizontalHandles * minHandleSpacing + 40);
                      
                      // Calculate required height for left/right handles
                      const maxVerticalHandles = Math.max(
                        handlesByPosition['left'] || 0,
                        handlesByPosition['right'] || 0
                      );
                      const requiredHeight = Math.max(currentHeight, maxVerticalHandles * minHandleSpacing + 40);
                      
                      updateNode(node.id, { 
                        customHandles: newHandles,
                        width: requiredWidth,
                        height: requiredHeight
                      } as Record<string, unknown>);
                      
                      // Force ReactFlow to update edges immediately
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
      </div>
    </div>
  );
}
