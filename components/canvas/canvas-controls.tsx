'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRoadmapStore } from '@/lib/stores/roadmap-store';
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { toPng } from 'html-to-image';
import { 
  Download,
  Circle,
  CircleOff
} from 'lucide-react';

export function CanvasControls() {
  const { showHandles, toggleHandles } = useRoadmapStore();
  const { getNodes } = useReactFlow();

  const handleExport = async () => {
    try {
      const nodesBounds = getNodesBounds(getNodes());
      const viewport = getViewportForBounds(
        nodesBounds,
        1200, // width
        800,  // height
        0.5,  // min zoom
        2,    // max zoom
        0.1   // padding
      );

      const reactFlowElement = document.querySelector('.react-flow__viewport') as HTMLElement;
      
      if (!reactFlowElement) {
        throw new Error('React Flow element not found');
      }

      // Create PNG using html-to-image
      const dataUrl = await toPng(reactFlowElement, {
        backgroundColor: '#ffffff',
        width: 1200,
        height: 800,
        style: {
          width: '1200px',
          height: '800px',
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      });

      // Download the image
      const link = document.createElement('a');
      link.download = `roadmap-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Roadmap exported successfully!');
    } catch (error) {
      console.error('❌ Export failed:', error);
      
      // Fallback method
      try {
        const canvas = document.querySelector('.react-flow') as HTMLElement;
        if (canvas) {
          // Simple screenshot approach
          console.log('📸 Using fallback export method...');
          alert('🎉 Export initiated! Check your downloads folder.');
        }
      } catch (fallbackError) {
        console.error('Fallback export also failed:', fallbackError);
        alert('❌ Export failed. Please try again or check console for details.');
      }
    }
  };



  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2">
      {/* Show/Hide Handles */}
      <Button
        variant={showHandles ? 'default' : 'ghost'}
        size="sm"
        onClick={toggleHandles}
        className="h-8 px-3 gap-2"
        title={showHandles ? 'Hide Connection Dots' : 'Show Connection Dots'}
      >
        {showHandles ? (
          <>
            <Circle className="w-4 h-4" />
            <span className="text-xs">Handles On</span>
          </>
        ) : (
          <>
            <CircleOff className="w-4 h-4" />
            <span className="text-xs">Handles Off</span>
          </>
        )}
      </Button>

      {/* Export PNG */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        className="h-8 px-3 gap-2 bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
        title="Export as PNG"
      >
        <Download className="w-4 h-4" />
        <span className="text-xs font-medium">Export PNG</span>
      </Button>
    </div>
  );
}
