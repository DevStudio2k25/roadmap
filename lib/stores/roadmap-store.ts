import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
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
  
  // Actions for React Flow
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<RoadmapNode['data']>) => void;
  deleteNode: (id: string) => void;
  
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
};

export const useRoadmapStore = create<RoadmapStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        
        // React Flow actions
        onNodesChange: (changes) => {
          set({
            nodes: applyNodeChanges(changes, get().nodes),
          });
        },
        
        onEdgesChange: (changes) => {
          set({
            edges: applyEdgeChanges(changes, get().edges),
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
