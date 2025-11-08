'use client';

import React, { useState, useRef } from 'react';
import { Button } from './button';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { 
  ChevronLeft,
  ChevronRight,
  Plus,
  BookOpen,
  FileText,
  Flag,
  CheckSquare,
  GitBranch,
  Table,
  Image,
  Upload,
  Trash2,
  Users,
  Layers,
  Info,
  Type
} from 'lucide-react';
import { cn } from '../../lib/utils/cn';



export function Sidebar() {
  const { sidebarOpen, toggleSidebar, addNode, nodes } = useRoadmapStore();
  const [activeTab, setActiveTab] = useState<'images' | 'text' | 'nodes' | 'info'>('images');
  const [importedImages, setImportedImages] = useState<Array<{ id: string; name: string; url: string; size: string; width: number; height: number }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddNode = (type: string) => {
    const timestamp = Date.now();
    const newNode = {
      id: `${type}-${timestamp}`,
      type,
      position: { x: Math.floor(Math.random() * 400) + 100, y: Math.floor(Math.random() * 400) + 100 },
      data: {
        title: `New ${type}`,
        description: `A new ${type} node`,
        createdAt: new Date(timestamp),
        updatedAt: new Date(timestamp),
      },
    };
    addNode(newNode);
  };

  const handleImageImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const newImage = {
            id: `img-${Date.now()}-${Math.random()}`,
            name: file.name,
            url: event.target?.result as string,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            width: img.width,
            height: img.height,
          };
          setImportedImages(prev => [...prev, newImage]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (id: string) => {
    setImportedImages(prev => prev.filter(img => img.id !== id));
  };

  const imageNodes = nodes.filter(n => n.type === 'image');
  const otherNodes = nodes.filter(n => n.type !== 'image');

  return (
    <>
      {/* Sidebar */}
      <div className={cn(
        'fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-50 flex flex-col',
        sidebarOpen ? 'w-80' : 'w-16'
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Roadmap
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Creator
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>

        {sidebarOpen && (
          <>
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => setActiveTab('images')}
                className={cn(
                  'flex-1 px-3 py-3 text-xs font-medium transition-colors flex items-center justify-center gap-1.5',
                  activeTab === 'images'
                    ? 'text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-900 border-b-2 border-purple-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Image className="w-3.5 h-3.5" />
                Images
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={cn(
                  'flex-1 px-3 py-3 text-xs font-medium transition-colors flex items-center justify-center gap-1.5',
                  activeTab === 'text'
                    ? 'text-cyan-600 dark:text-cyan-400 bg-white dark:bg-gray-900 border-b-2 border-cyan-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Type className="w-3.5 h-3.5" />
                Text
              </button>
              <button
                onClick={() => setActiveTab('nodes')}
                className={cn(
                  'flex-1 px-3 py-3 text-xs font-medium transition-colors flex items-center justify-center gap-1.5',
                  activeTab === 'nodes'
                    ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                Nodes
              </button>
              <button
                onClick={() => setActiveTab('info')}
                className={cn(
                  'flex-1 px-3 py-3 text-xs font-medium transition-colors flex items-center justify-center gap-1.5',
                  activeTab === 'info'
                    ? 'text-green-600 dark:text-green-400 bg-white dark:bg-gray-900 border-b-2 border-green-600'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                )}
              >
                <Info className="w-3.5 h-3.5" />
                Info
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Images Tab */}
              {activeTab === 'images' && (
                <div className="p-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageImport}
                    className="hidden"
                  />
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full gap-2"
                      size="sm"
                    >
                      <Upload className="w-4 h-4" />
                      Import Images
                    </Button>

                    {importedImages.length === 0 ? (
                      <div className="text-center py-12 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" aria-hidden="true" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          No images yet
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          Click Import to add images
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {importedImages.map((img) => {
                          const aspectRatio = img.height / img.width;
                          const displayHeight = Math.min(Math.max(aspectRatio * 140, 80), 200);
                          
                          return (
                            <div
                              key={img.id}
                              className="group relative bg-white dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-purple-400 transition-colors cursor-grab active:cursor-grabbing"
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData('imageData', JSON.stringify(img));
                                e.dataTransfer.effectAllowed = 'copy';
                              }}
                              title="Drag to canvas"
                            >
                              <img
                                src={img.url}
                                alt={img.name || 'Imported image'}
                                className="w-full object-cover pointer-events-none"
                                style={{ height: `${displayHeight}px` }}
                              />
                              <div className="p-2">
                                <p className="text-xs text-gray-600 dark:text-gray-300 truncate" title={img.name}>
                                  {img.name}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  {img.width} × {img.height}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveImage(img.id);
                                }}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove image"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Text Tab */}
              {activeTab === 'text' && (
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-cyan-200 dark:border-cyan-800">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <Type className="w-4 h-4 text-cyan-600" />
                        Text Nodes
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        Click to add customizable text to your canvas
                      </p>
                      <Button
                        onClick={() => {
                          const timestamp = Date.now();
                          const newNode = {
                            id: `text-${timestamp}`,
                            type: 'text',
                            position: { x: 250, y: 150 },
                            data: {
                              text: 'Home Page',
                              fontSize: 24,
                              fontFamily: 'Inter',
                              fontWeight: '600',
                              textColor: '#1f2937',
                              backgroundColor: '#ffffff',
                              padding: 16,
                              borderRadius: 8,
                              borderWidth: 1,
                              borderColor: '#e5e7eb',
                              textAlign: 'center',
                              width: 200,
                              opacity: 1,
                              shadow: 'md',
                              createdAt: new Date(timestamp),
                              updatedAt: new Date(timestamp),
                            },
                          };
                          addNode(newNode);
                        }}
                        className="w-full gap-2 bg-cyan-600 hover:bg-cyan-700"
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Text Node
                      </Button>
                    </div>

                    {/* Text Presets */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Quick Presets
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {/* Heading Preset */}
                        <button
                          onClick={() => {
                            const timestamp = Date.now();
                            addNode({
                              id: `text-${timestamp}`,
                              type: 'text',
                              position: { x: 250, y: 150 },
                              data: {
                                text: 'Heading',
                                fontSize: 32,
                                fontFamily: 'Inter',
                                fontWeight: '700',
                                textColor: '#111827',
                                backgroundColor: 'transparent',
                                padding: 8,
                                borderRadius: 0,
                                borderWidth: 0,
                                borderColor: '#e5e7eb',
                                textAlign: 'left',
                                width: 300,
                                opacity: 1,
                                shadow: 'none',
                              },
                            });
                          }}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-left"
                        >
                          <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">Heading</div>
                          <p className="text-xs text-gray-500">Large bold text</p>
                        </button>

                        {/* Label Preset */}
                        <button
                          onClick={() => {
                            const timestamp = Date.now();
                            addNode({
                              id: `text-${timestamp}`,
                              type: 'text',
                              position: { x: 250, y: 150 },
                              data: {
                                text: 'Label',
                                fontSize: 14,
                                fontFamily: 'Inter',
                                fontWeight: '500',
                                textColor: '#ffffff',
                                backgroundColor: '#3b82f6',
                                padding: 8,
                                borderRadius: 6,
                                borderWidth: 0,
                                borderColor: '#e5e7eb',
                                textAlign: 'center',
                                width: 120,
                                opacity: 1,
                                shadow: 'sm',
                              },
                            });
                          }}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-left"
                        >
                          <div className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded mb-1">Label</div>
                          <p className="text-xs text-gray-500">Colored badge</p>
                        </button>

                        {/* Note Preset */}
                        <button
                          onClick={() => {
                            const timestamp = Date.now();
                            addNode({
                              id: `text-${timestamp}`,
                              type: 'text',
                              position: { x: 250, y: 150 },
                              data: {
                                text: 'Note: Add your description here',
                                fontSize: 14,
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                textColor: '#6b7280',
                                backgroundColor: '#fef3c7',
                                padding: 12,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: '#fbbf24',
                                textAlign: 'left',
                                width: 250,
                                opacity: 1,
                                shadow: 'sm',
                              },
                            });
                          }}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-left"
                        >
                          <div className="text-sm text-gray-600 bg-yellow-100 border border-yellow-300 rounded p-2 mb-1">Note</div>
                          <p className="text-xs text-gray-500">Sticky note style</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Nodes Tab */}
              {activeTab === 'nodes' && (
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Workflow Section */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Workflow
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {/* Milestone Preset */}
                        <button
                          onClick={() => handleAddNode('milestone')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-blue-500">
                              <Flag className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Milestone</span>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                            <div className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">Project Launch</div>
                            <div className="flex items-center gap-2">
                              <div className="w-12 bg-blue-200 dark:bg-blue-700 rounded-full h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                              </div>
                              <span className="text-xs text-blue-600 dark:text-blue-400">60%</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Track key achievements</p>
                        </button>

                        {/* Task Preset */}
                        <button
                          onClick={() => handleAddNode('task')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-green-500">
                              <CheckSquare className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Task</span>
                          </div>
                          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg p-2">
                            <div className="text-xs font-medium text-green-900 dark:text-green-100 mb-1">Complete Design</div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              <span className="text-xs text-green-600 dark:text-green-400">High Priority</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Action items to complete</p>
                        </button>

                        {/* Decision Preset */}
                        <button
                          onClick={() => handleAddNode('decision')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-amber-500">
                              <GitBranch className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Decision</span>
                          </div>
                          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2">
                            <div className="text-xs font-medium text-amber-900 dark:text-amber-100 mb-1.5">Approve Design?</div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Yes</span>
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">No</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Choice points in flow</p>
                        </button>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Content
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {/* Resource Preset */}
                        <button
                          onClick={() => handleAddNode('resource')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-purple-500">
                              <BookOpen className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Resource</span>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-2">
                            <div className="text-xs font-medium text-purple-900 dark:text-purple-100 mb-1">React Tutorial</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Course</span>
                              <span className="text-xs text-purple-600 dark:text-purple-400">Beginner</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Learning materials</p>
                        </button>

                        {/* Content Preset */}
                        <button
                          onClick={() => handleAddNode('content')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-orange-500">
                              <FileText className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Content</span>
                          </div>
                          <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2">
                            <div className="text-xs font-medium text-orange-900 dark:text-orange-100 mb-1">Documentation</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Published</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Documentation & notes</p>
                        </button>

                        {/* Table Preset */}
                        <button
                          onClick={() => handleAddNode('table')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-indigo-500">
                              <Table className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Table</span>
                          </div>
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-2">
                            <div className="grid grid-cols-3 gap-1 mb-1">
                              <div className="h-1.5 bg-indigo-300 dark:bg-indigo-600 rounded"></div>
                              <div className="h-1.5 bg-indigo-300 dark:bg-indigo-600 rounded"></div>
                              <div className="h-1.5 bg-indigo-300 dark:bg-indigo-600 rounded"></div>
                            </div>
                            <div className="grid grid-cols-3 gap-1">
                              <div className="h-1 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
                              <div className="h-1 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
                              <div className="h-1 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Structured data tables</p>
                        </button>
                      </div>
                    </div>

                    {/* Organization Section */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                        Organization
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {/* Tree Preset */}
                        <button
                          onClick={() => handleAddNode('tree')}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 transition-all text-left group"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg bg-indigo-500">
                              <Users className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Team</span>
                          </div>
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-2">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">T</span>
                              </div>
                              <div className="text-xs font-medium text-indigo-900 dark:text-indigo-100">Team Lead</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                              <span className="text-xs text-indigo-600 dark:text-indigo-400">Active</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Organization charts</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Info Tab */}
              {activeTab === 'info' && (
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Canvas Stats
                      </h4>
                      <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex justify-between">
                          <span>Total Nodes:</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{nodes.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Image Nodes:</span>
                          <span className="font-semibold text-purple-600 dark:text-purple-400">{imageNodes.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Nodes:</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{otherNodes.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Images Library:</span>
                          <span className="font-semibold text-green-600 dark:text-green-400">{importedImages.length}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Quick Tips
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 dark:text-purple-400">•</span>
                          <span>Drag images from library to canvas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 dark:text-blue-400">•</span>
                          <span>Click nodes to add them to canvas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400">•</span>
                          <span>Select image to edit properties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-600 dark:text-orange-400">•</span>
                          <span>Use "Apply to All" for batch edits</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Collapsed state icons */}
        {!sidebarOpen && (
          <div className="flex flex-col items-center gap-4 p-4">
            <button
              onClick={() => {
                toggleSidebar();
                setActiveTab('images');
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Images"
              aria-label="Open images tab"
            >
              <Image className="w-4 h-4 text-purple-600" aria-hidden="true" />
            </button>
            <button
              onClick={() => {
                toggleSidebar();
                setActiveTab('text');
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Text"
            >
              <Type className="w-4 h-4 text-cyan-600" />
            </button>
            <button
              onClick={() => {
                toggleSidebar();
                setActiveTab('nodes');
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Nodes"
            >
              <Layers className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => {
                toggleSidebar();
                setActiveTab('info');
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Info"
            >
              <Info className="w-4 h-4 text-green-600" />
            </button>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
