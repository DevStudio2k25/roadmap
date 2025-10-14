'use client';

import { RoadmapCanvas } from '../components/canvas/roadmap-canvas';
import { Sidebar } from '../components/ui/sidebar';
import { useRoadmapStore } from '../lib/stores/roadmap-store';
import { Button } from '../components/ui/button';

export default function Home() {
  const { sidebarOpen, nodes, initializeSampleNodes } = useRoadmapStore();

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      
      <div 
        className="flex flex-col transition-all duration-300"
        style={{ 
          marginLeft: sidebarOpen ? '320px' : '64px',
          width: sidebarOpen ? 'calc(100% - 320px)' : 'calc(100% - 64px)'
        }}
      >
        <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Roadmap Creator
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Advanced Node-Based Visual Roadmap Builder with Learning Resources
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Ready to create!</span>
              </div>
              {nodes.length === 0 && (
                <Button 
                  onClick={initializeSampleNodes}
                  variant="outline"
                  size="sm"
                >
                  Load Sample Table
                </Button>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">v1.0.0</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 relative">
          <RoadmapCanvas />
        </main>
      </div>
    </div>
  );
}
