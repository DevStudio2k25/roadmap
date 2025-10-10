'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRoadmapStore } from '@/lib/stores/roadmap-store';
import { 
  Layers, 
  Clock, 
  FileText, 
  Settings, 
  Download, 
  Upload,
  Undo2,
  Redo2
} from 'lucide-react';

export function CanvasControls() {
  const { currentView, setCurrentView, toggleEditMode, isEditMode } = useRoadmapStore();

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export roadmap');
  };

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import roadmap');
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2">
      {/* View Toggle */}
      <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
        <Button
          variant={currentView === 'canvas' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrentView('canvas')}
          className="h-8 px-2"
        >
          <Layers className="w-4 h-4" />
        </Button>
        <Button
          variant={currentView === 'timeline' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrentView('timeline')}
          className="h-8 px-2"
        >
          <Clock className="w-4 h-4" />
        </Button>
        <Button
          variant={currentView === 'content' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setCurrentView('content')}
          className="h-8 px-2"
        >
          <FileText className="w-4 h-4" />
        </Button>
      </div>

      {/* Edit Mode Toggle */}
      <Button
        variant={isEditMode ? 'default' : 'ghost'}
        size="sm"
        onClick={toggleEditMode}
        className="h-8 px-2"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {/* History Controls */}
      <div className="flex items-center gap-1 border-r border-gray-200 dark:border-gray-700 pr-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          disabled
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          disabled
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Import/Export */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleImport}
          className="h-8 px-2"
        >
          <Upload className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          className="h-8 px-2"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
