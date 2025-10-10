// Core node types for the roadmap
export interface RoadmapNode {
  id: string;
  type: 'milestone' | 'task' | 'decision' | 'resource' | 'content';
  position: { x: number; y: number };
  data: {
    title: string;
    description?: string;
    content?: string;
    progress?: number;
    status?: 'pending' | 'in-progress' | 'completed' | 'blocked';
    priority?: 'low' | 'medium' | 'high';
    tags?: string[];
    resources?: Resource[];
    createdAt: Date;
    updatedAt: Date;
  };
}

// Learning resource types
export interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'youtube' | 'course' | 'article' | 'book' | 'documentation' | 'tool';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  rating?: number;
  duration?: string;
  author?: string;
  thumbnail?: string;
  completed?: boolean;
  createdAt: Date;
}

// Content creation types
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured?: boolean;
  thumbnail?: string;
  views?: number;
  likes?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Learning path types
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  prerequisites: string[];
  modules: LearningModule[];
  resources: Resource[];
  progress?: number;
  enrolled?: boolean;
  createdAt: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'video' | 'article' | 'exercise' | 'quiz';
  duration?: string;
  resources: Resource[];
  completed?: boolean;
}

// UI and interaction types
export interface NodeTemplate {
  id: string;
  name: string;
  description: string;
  type: RoadmapNode['type'];
  defaultData: Partial<RoadmapNode['data']>;
  icon: string;
  color: string;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

// Search and filtering
export interface SearchFilters {
  query?: string;
  type?: string[];
  difficulty?: string[];
  category?: string[];
  tags?: string[];
  status?: string[];
}

// Analytics and tracking
export interface Analytics {
  views: number;
  uniqueViews: number;
  completions: number;
  averageTime: number;
  engagementRate: number;
  topResources: Resource[];
  popularTags: string[];
}
