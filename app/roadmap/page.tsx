'use client';

import { RoadmapCanvas } from '../../components/canvas/roadmap-canvas';
import { Sidebar } from '../../components/ui/sidebar';
import { ImageInspector } from '../../components/inspector/image-inspector';
import { TextInspector } from '../../components/inspector/text-inspector';
import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export default function RoadmapPage() {
  const { sidebarOpen, nodes, selectedNode } = useRoadmapStore();
  
  // Check selected node type
  const selectedNodeData = nodes.find((n) => n.id === selectedNode);
  const isImageSelected = selectedNodeData?.type === 'image';
  const isTextSelected = selectedNodeData?.type === 'text';
  const showInspector = isImageSelected || isTextSelected;

  return (
    <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      
      <div 
        className="flex-1 transition-all duration-300"
        style={{ 
          marginLeft: sidebarOpen ? '320px' : '64px',
          width: showInspector 
            ? (sidebarOpen ? 'calc(100% - 640px)' : 'calc(100% - 384px)')
            : (sidebarOpen ? 'calc(100% - 320px)' : 'calc(100% - 64px)')
        }}
      >
        <RoadmapCanvas />
      </div>

      {/* Inspector Panels */}
      {isImageSelected && <ImageInspector />}
      {isTextSelected && <TextInspector />}
    </div>
  );
}
