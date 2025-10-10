'use client';

import React, { useState } from 'react';
import { Button } from './button';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';
import { 
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  Folder,
  FolderOpen,
  Star,
  Clock,
  Users,
  BookOpen,
  Video,
  FileText,
  Code,
  Lightbulb,
  Target,
  Zap,
  Globe,
  Github,
  Youtube,
  Twitter,
  Link,
  Tag,
  Filter,
  Flag,
  CheckSquare,
  GitBranch
} from 'lucide-react';
import { cn } from '../../lib/utils/cn';

const resourceCategories = [
  {
    id: 'learning',
    name: 'Learning Resources',
    icon: BookOpen,
    color: 'text-blue-600',
    items: [
      { name: 'YouTube Channels', icon: Youtube, count: 25, color: 'text-red-500' },
      { name: 'Online Courses', icon: Video, count: 12, color: 'text-purple-500' },
      { name: 'Documentation', icon: FileText, count: 18, color: 'text-gray-600' },
      { name: 'Tutorials', icon: Lightbulb, count: 34, color: 'text-yellow-500' },
      { name: 'Code Examples', icon: Code, count: 45, color: 'text-green-500' },
    ]
  },
  {
    id: 'projects',
    name: 'Projects & Goals',
    icon: Target,
    color: 'text-green-600',
    items: [
      { name: 'Active Projects', icon: Zap, count: 8, color: 'text-orange-500' },
      { name: 'Completed', icon: Star, count: 15, color: 'text-yellow-500' },
      { name: 'Planning', icon: Clock, count: 6, color: 'text-blue-500' },
      { name: 'Templates', icon: Folder, count: 12, color: 'text-purple-500' },
    ]
  },
  {
    id: 'community',
    name: 'Community & Social',
    icon: Users,
    color: 'text-purple-600',
    items: [
      { name: 'GitHub Repos', icon: Github, count: 23, color: 'text-gray-800' },
      { name: 'Twitter Threads', icon: Twitter, count: 17, color: 'text-blue-400' },
      { name: 'Useful Links', icon: Link, count: 31, color: 'text-indigo-500' },
      { name: 'Communities', icon: Globe, count: 9, color: 'text-green-600' },
    ]
  }
];

const nodeCollections = [
  {
    id: 'workflow',
    name: 'Workflow Nodes',
    description: 'Basic workflow elements',
    nodes: [
      {
        type: 'milestone',
        name: 'Milestone',
        description: 'Key achievement',
        icon: Flag,
        color: 'text-blue-600',
        preview: { title: 'Project Launch', status: 'completed', progress: 100 }
      },
      {
        type: 'task',
        name: 'Task',
        description: 'Action item',
        icon: CheckSquare,
        color: 'text-green-600',
        preview: { title: 'Design Review', status: 'in-progress', priority: 'high' }
      },
      {
        type: 'decision',
        name: 'Decision',
        description: 'Choice point',
        icon: GitBranch,
        color: 'text-yellow-600',
        preview: { title: 'Tech Stack?', description: 'React vs Vue' }
      }
    ]
  },
  {
    id: 'content',
    name: 'Content & Resources',
    description: 'Learning and documentation',
    nodes: [
      {
        type: 'resource',
        name: 'Resource',
        description: 'Learning material',
        icon: BookOpen,
        color: 'text-purple-600',
        preview: { title: 'React Tutorial', type: 'youtube', difficulty: 'beginner' }
      },
      {
        type: 'content',
        name: 'Content',
        description: 'Documentation',
        icon: FileText,
        color: 'text-orange-600',
        preview: { title: 'API Guide', status: 'published', views: 1200 }
      }
    ]
  },
  {
    id: 'organization',
    name: 'Organization',
    description: 'Team and structure',
    nodes: [
      {
        type: 'tree',
        name: 'Team',
        description: 'Organization chart',
        icon: Users,
        color: 'text-indigo-600',
        preview: { title: 'Frontend Team', type: 'team', status: 'active' }
      }
    ]
  }
];

const recentItems = [
  { name: 'React Roadmap 2024', type: 'roadmap', time: '2 hours ago', color: 'bg-blue-100 text-blue-800' },
  { name: 'JavaScript Fundamentals', type: 'learning', time: '1 day ago', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Next.js Best Practices', type: 'resource', time: '3 days ago', color: 'bg-green-100 text-green-800' },
  { name: 'TypeScript Guide', type: 'tutorial', time: '1 week ago', color: 'bg-purple-100 text-purple-800' },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, addNode } = useRoadmapStore();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['learning', 'workflow']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Resources
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Learning Hub
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
            {/* Search */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                  <Filter className="w-3 h-3 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  Tags
                </Button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Categories
                  </h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {resourceCategories.map((category) => {
                    const isExpanded = expandedCategories.includes(category.id);
                    const CategoryIcon = category.icon;
                    
                    return (
                      <div key={category.id}>
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            {isExpanded ? (
                              <FolderOpen className="w-4 h-4 text-gray-400" />
                            ) : (
                              <Folder className="w-4 h-4 text-gray-400" />
                            )}
                            <CategoryIcon className={cn('w-4 h-4', category.color)} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {category.name}
                            </span>
                          </div>
                          <ChevronRight className={cn(
                            'w-3 h-3 text-gray-400 transition-transform',
                            isExpanded && 'rotate-90'
                          )} />
                        </button>

                        {isExpanded && (
                          <div className="ml-6 mt-1 space-y-1">
                            {category.items.map((item) => {
                              const ItemIcon = item.icon;
                              return (
                                <div
                                  key={item.name}
                                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer group"
                                >
                                  <ItemIcon className={cn('w-3 h-3', item.color)} />
                                  <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                                    {item.count}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Nodes Section */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Node Collections
                  </h3>
                </div>

                <div className="space-y-4">
                  {nodeCollections.map((collection) => {
                    const isExpanded = expandedCategories.includes(collection.id);
                    
                    return (
                      <div key={collection.id}>
                        <button
                          onClick={() => toggleCategory(collection.id)}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="text-left">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {collection.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {collection.description}
                            </p>
                          </div>
                          <ChevronRight className={cn(
                            'w-4 h-4 text-gray-400 transition-transform',
                            isExpanded && 'rotate-90'
                          )} />
                        </button>

                        {isExpanded && (
                          <div className="mt-2 grid grid-cols-1 gap-2">
                            {collection.nodes.map((node) => {
                              const NodeIcon = node.icon;
                              return (
                                <button
                                  key={node.type}
                                  onClick={() => handleAddNode(node.type)}
                                  className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 hover:shadow-sm group text-left"
                                  title={node.description}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                      <NodeIcon className={cn('w-4 h-4', node.color)} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                          {node.name}
                                        </span>
                                        <Plus className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                                      </div>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {node.preview.title}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Items */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Recent
                </h3>
                <div className="space-y-2">
                  {recentItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn(
                            'text-xs px-1.5 py-0.5 rounded-full font-medium',
                            item.color
                          )}>
                            {item.type}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Button className="w-full" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </div>
          </>
        )}

        {/* Collapsed state icons */}
        {!sidebarOpen && (
          <div className="flex flex-col items-center gap-4 p-4">
            {resourceCategories.map((category) => {
              const CategoryIcon = category.icon;
              return (
                <button
                  key={category.id}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title={category.name}
                >
                  <CategoryIcon className={cn('w-4 h-4', category.color)} />
                </button>
              );
            })}
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
