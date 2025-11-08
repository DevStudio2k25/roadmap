import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';
import { RoadmapNode, Resource, Post, LearningPath } from '@/lib/types';

interface RoadmapStore {
  // React Flow state
  nodes: Node[];
  edges: Edge[];
  
  // Content state
  resources: Resource[];
  posts: Post[];
  learningPaths: LearningPath[];
  
  // UI state
  selectedNode: string | null;
  isEditMode: boolean;
  sidebarOpen: boolean;
  currentView: 'canvas' | 'timeline' | 'content';
  showHandles: boolean;
  
  // Actions for React Flow
  onNodesChange: (changes: unknown[]) => void;
  onEdgesChange: (changes: unknown[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<RoadmapNode['data']>) => void;
  deleteNode: (id: string) => void;
  initializeSampleNodes: () => void;
  
  // Actions for content
  addResource: (resource: Resource) => void;
  updateResource: (id: string, resource: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  
  addPost: (post: Post) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  
  addLearningPath: (path: LearningPath) => void;
  updateLearningPath: (id: string, path: Partial<LearningPath>) => void;
  deleteLearningPath: (id: string) => void;
  
  // UI actions
  setSelectedNode: (id: string | null) => void;
  toggleEditMode: () => void;
  toggleSidebar: () => void;
  setCurrentView: (view: 'canvas' | 'timeline' | 'content') => void;
  toggleHandles: () => void;
  
  // Utility actions
  resetStore: () => void;
}

const initialState = {
  nodes: [],
  edges: [],
  resources: [],
  posts: [],
  learningPaths: [],
  selectedNode: null,
  isEditMode: false,
  sidebarOpen: true,
  currentView: 'canvas' as const,
  showHandles: true,
};

export const useRoadmapStore = create<RoadmapStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // React Flow actions
        onNodesChange: (changes: unknown[]) => {
          set({
            nodes: applyNodeChanges(changes as NodeChange<Node>[], get().nodes),
          });
        },
        
        onEdgesChange: (changes: unknown[]) => {
          set({
            edges: applyEdgeChanges(changes as EdgeChange<Edge>[], get().edges),
          });
        },
        
        onConnect: (connection) => {
          set({
            edges: addEdge(connection, get().edges),
          });
        },
        
        addNode: (node) => {
          set({
            nodes: [...get().nodes, node],
          });
        },
        
        // Initialize with sample nodes
        initializeSampleNodes: () => {
          const sampleNodes = [
            {
              id: 'sample-table-1',
              type: 'table',
              position: { x: 200, y: 150 },
              data: {
                title: 'Learning Roadmap',
                description: 'Frontend Development Path - Click edit button to modify',
                rows: [
                  {
                    id: 'header-row',
                    cells: [
                      { id: 'h1', content: 'Technology', isHeader: true },
                      { id: 'h2', content: 'Difficulty', isHeader: true },
                      { id: 'h3', content: 'Status', isHeader: true },
                      { id: 'h4', content: 'Resources', isHeader: true }
                    ]
                  },
                  {
                    id: 'row-1',
                    cells: [
                      { id: 'r1c1', content: 'HTML & CSS', isHeader: false },
                      { id: 'r1c2', content: 'Beginner', isHeader: false },
                      { id: 'r1c3', content: '✅ Completed', isHeader: false },
                      { id: 'r1c4', content: 'MDN Docs', isHeader: false }
                    ]
                  },
                  {
                    id: 'row-2',
                    cells: [
                      { id: 'r2c1', content: 'JavaScript', isHeader: false },
                      { id: 'r2c2', content: 'Intermediate', isHeader: false },
                      { id: 'r2c3', content: '🔄 Learning', isHeader: false },
                      { id: 'r2c4', content: 'freeCodeCamp', isHeader: false }
                    ]
                  },
                  {
                    id: 'row-3',
                    cells: [
                      { id: 'r3c1', content: 'React.js', isHeader: false },
                      { id: 'r3c2', content: 'Advanced', isHeader: false },
                      { id: 'r3c3', content: '⏳ Planned', isHeader: false },
                      { id: 'r3c4', content: 'React Docs', isHeader: false }
                    ]
                  }
                ],
                columns: 4,
                showHeaders: true,
                tableStyle: 'default',
                createdAt: new Date(),
                updatedAt: new Date()
              }
            }
          ];
          
          set({ nodes: sampleNodes });
        },
        
        updateNode: (id, data) => {
          set({
            nodes: get().nodes.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, ...data } } : node
            ),
          });
        },
        
        deleteNode: (id) => {
          set({
            nodes: get().nodes.filter((node) => node.id !== id),
            edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
          });
        },
        
        // Content actions
        addResource: (resource) => {
          set({
            resources: [...get().resources, resource],
          });
        },
        
        updateResource: (id, resource) => {
          set({
            resources: get().resources.map((r) =>
              r.id === id ? { ...r, ...resource } : r
            ),
          });
        },
        
        deleteResource: (id) => {
          set({
            resources: get().resources.filter((r) => r.id !== id),
          });
        },
        
        addPost: (post) => {
          set({
            posts: [...get().posts, post],
          });
        },
        
        updatePost: (id, post) => {
          set({
            posts: get().posts.map((p) =>
              p.id === id ? { ...p, ...post } : p
            ),
          });
        },
        
        deletePost: (id) => {
          set({
            posts: get().posts.filter((p) => p.id !== id),
          });
        },
        
        addLearningPath: (path) => {
          set({
            learningPaths: [...get().learningPaths, path],
          });
        },
        
        updateLearningPath: (id, path) => {
          set({
            learningPaths: get().learningPaths.map((lp) =>
              lp.id === id ? { ...lp, ...path } : lp
            ),
          });
        },
        
        deleteLearningPath: (id) => {
          set({
            learningPaths: get().learningPaths.filter((lp) => lp.id !== id),
          });
        },
        
        // UI actions
        setSelectedNode: (id) => {
          set({ selectedNode: id });
        },
        
        toggleEditMode: () => {
          set({ isEditMode: !get().isEditMode });
        },
        
        toggleSidebar: () => {
          set({ sidebarOpen: !get().sidebarOpen });
        },
        
        setCurrentView: (view) => {
          set({ currentView: view });
        },
        
        toggleHandles: () => {
          set({ showHandles: !get().showHandles });
        },
        
        resetStore: () => {
          set(initialState);
        },
      }),
      {
        name: 'roadmap-store',
        partialize: (state) => ({
          nodes: state.nodes,
          edges: state.edges,
          resources: state.resources,
          posts: state.posts,
          learningPaths: state.learningPaths,
        }),
      }
    ),
    { name: 'roadmap-store' }
  )
);
