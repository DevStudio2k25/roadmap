# 🗺️ Roadmap Creator

> **Advanced Node-Based Visual Roadmap Builder** - Create stunning, interactive roadmaps with drag-and-drop nodes, inspired by n8n and modern workflow automation tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## ✨ Features

### 🎨 **Advanced Canvas Interface**
- **Infinite Canvas** - Zoom, pan, and navigate seamlessly across large roadmaps
- **Drag & Drop Nodes** - Intuitive node creation and positioning
- **Smart Connections** - Auto-connecting nodes with bezier curves and animations
- **Multi-Select & Bulk Operations** - Select multiple nodes for batch editing
- **Grid Snapping** - Precise alignment with optional grid overlay

### 🔧 **Node System**
- **Custom Node Types** - Milestones, tasks, decisions, and custom components
- **Rich Content Support** - Text, images, dates, progress indicators, and links
- **Node Templates** - Pre-built templates for common roadmap elements
- **Conditional Logic** - Dynamic node behavior based on dependencies
- **Real-time Collaboration** - Multi-user editing with live cursors

### 🎯 **Roadmap Features**
- **Timeline Views** - Switch between canvas and traditional timeline layouts
- **Progress Tracking** - Visual progress indicators and completion status
- **Dependency Management** - Define and visualize task dependencies
- **Milestone Markers** - Highlight key achievements and deadlines
- **Resource Allocation** - Assign team members and resources to tasks

### 🚀 **Advanced Capabilities**
- **Export Options** - PNG, SVG, PDF, and JSON formats
- **Import/Export** - Share roadmaps and templates
- **Version Control** - Track changes and maintain roadmap history
- **API Integration** - Connect with project management tools
- **Custom Themes** - Dark/light mode with customizable color schemes

### 📚 **Content Creation & Learning Hub**
- **Learning Resource Sheets** - Create curated lists of top YouTube channels, courses, and tutorials
- **Language Learning Paths** - Structured roadmaps for programming languages and technologies
- **Custom Post Creation** - Rich text editor for creating detailed guides and documentation
- **Resource Categories** - Organize content by difficulty, topic, and learning path
- **Community Contributions** - Allow users to submit and vote on learning resources
- **Progress Tracking** - Mark completed resources and track learning journey

### ✍️ **Advanced Text & Content Features**
- **Rich Text Editor** - Full-featured editor with markdown support, code highlighting, and media embedding
- **Template Library** - Pre-built templates for different types of content (tutorials, resource lists, project guides)
- **Content Collaboration** - Real-time collaborative editing for team-created content
- **SEO Optimization** - Built-in SEO tools for content discoverability
- **Content Analytics** - Track views, engagement, and learning completion rates

## 🛠️ Tech Stack

### **Core Framework**
- **[Next.js 15.5.4](https://nextjs.org)** - React framework with App Router
- **[React 19.1.0](https://react.dev)** - UI library with latest features
- **[TypeScript](https://typescriptlang.org)** - Type-safe development

### **UI & Styling**
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Geist Font](https://vercel.com/font)** - Modern typography
- **[Framer Motion](https://framer.com/motion)** - Smooth animations and transitions
- **[Lucide Icons](https://lucide.dev)** - Beautiful, customizable icons

### **Node Editor Engine**
- **[React Flow](https://reactflow.dev)** - Primary node-based UI library (31.8K+ stars)
  - Drag & drop functionality
  - Custom node components
  - Connection handling
  - Zoom & pan controls
  - Minimap & controls

### **State Management**
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[React Query](https://tanstack.com/query)** - Server state management

### **Content & Text Editing**
- **[Tiptap](https://tiptap.dev)** - Modern rich text editor for React
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown rendering
- **[Prism.js](https://prismjs.com)** - Syntax highlighting for code blocks
- **[React DnD](https://react-dnd.github.io/react-dnd)** - Drag and drop for content organization

### **Additional Libraries**
- **[React Hook Form](https://react-hook-form.com)** - Form handling
- **[Zod](https://zod.dev)** - Schema validation
- **[date-fns](https://date-fns.org)** - Date manipulation
- **[React Hot Toast](https://react-hot-toast.com)** - Notifications
- **[Fuse.js](https://fusejs.io)** - Fuzzy search for content discovery
- **[React Virtual](https://github.com/TanStack/virtual)** - Virtualization for large lists

## 🎨 Design Inspiration

This project draws inspiration from industry-leading tools:

- **[n8n](https://n8n.io)** - Workflow automation platform
- **[Figma](https://figma.com)** - Collaborative design tool
- **[Miro](https://miro.com)** - Visual collaboration platform
- **[Linear](https://linear.app)** - Modern project management
- **[Notion](https://notion.so)** - All-in-one workspace
- **[Obsidian](https://obsidian.md)** - Knowledge management and note-taking
- **[Roam Research](https://roamresearch.com)** - Networked thought and learning
- **[Airtable](https://airtable.com)** - Database and content organization

## 📁 Project Structure

```
roadmap_creator/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard routes
│   │   ├── roadmaps/           # Roadmap management
│   │   ├── content/            # Content creation & editing
│   │   ├── resources/          # Learning resource sheets
│   │   ├── posts/              # Custom post creation
│   │   └── templates/          # Template library
│   ├── api/                    # API routes
│   │   ├── roadmaps/          # Roadmap CRUD operations
│   │   ├── content/           # Content management
│   │   ├── resources/         # Resource management
│   │   └── search/            # Search functionality
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # Reusable components
│   ├── ui/                     # Base UI components
│   ├── canvas/                 # Canvas-related components
│   ├── nodes/                  # Custom node types
│   ├── roadmap/                # Roadmap-specific components
│   ├── editor/                 # Rich text editor components
│   ├── content/                # Content creation components
│   └── resources/              # Resource management components
├── lib/                        # Utilities and configurations
│   ├── stores/                 # Zustand stores
│   ├── types/                  # TypeScript definitions
│   ├── utils/                  # Helper functions
│   ├── content/                # Content processing utilities
│   └── search/                 # Search and filtering logic
├── public/                     # Static assets
│   ├── templates/              # Content templates
│   └── icons/                  # Custom icons and assets
└── styles/                     # Additional stylesheets
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** 
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd roadmap_creator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm run start
```

## 🎯 Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up React Flow integration
- [ ] Create basic node types (milestone, task, decision)
- [ ] Implement drag & drop functionality
- [ ] Add canvas controls (zoom, pan, minimap)
- [ ] Set up Tiptap rich text editor
- [ ] Create basic content creation UI

### Phase 2: Core Features (Weeks 3-4)
- [ ] Custom node editor with rich content
- [ ] Connection system with validation
- [ ] Node templates and library
- [ ] Basic export functionality (PNG, JSON)
- [ ] Learning resource sheet creation
- [ ] YouTube channel and course curation system

### Phase 3: Content & Learning Hub (Weeks 5-6)
- [ ] Advanced rich text editor with markdown support
- [ ] Content template system (tutorials, guides, resource lists)
- [ ] Search and filtering for resources
- [ ] Progress tracking for learning paths
- [ ] Community contribution system
- [ ] Content categorization and tagging

### Phase 4: Advanced Features (Weeks 7-8)
- [ ] Timeline view integration
- [ ] Real-time collaboration for content editing
- [ ] Dependency management for learning paths
- [ ] Content analytics and engagement tracking
- [ ] SEO optimization for posts and resources

### Phase 5: Polish & Deploy (Weeks 9-10)
- [ ] Advanced animations and transitions
- [ ] Custom themes and styling
- [ ] Performance optimizations
- [ ] Content moderation and quality control
- [ ] Deployment and CI/CD

## 🎨 UI/UX Features

### **Modern Design System**
- Clean, minimal interface inspired by Linear and Notion
- Consistent spacing and typography using Tailwind CSS
- Smooth animations and micro-interactions
- Responsive design for all screen sizes

### **Accessibility**
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode
- Focus management

### **User Experience**
- Contextual menus and shortcuts
- Undo/redo functionality
- Auto-save capabilities
- Intuitive onboarding flow

### **Content Creation Interface**
- **Rich Text Editor** - WYSIWYG editor with markdown shortcuts
- **Media Integration** - Drag & drop images, videos, and embeds
- **Code Highlighting** - Syntax highlighting for 100+ programming languages
- **Template Gallery** - Pre-built templates for different content types
- **Live Preview** - Real-time preview of formatted content

## 📝 Content Creation Examples

### **Learning Resource Sheets**
Create comprehensive learning guides like:

```markdown
# 🎯 Top YouTube Channels for JavaScript Learning

## Beginner Level
- **Traversy Media** - Practical tutorials and crash courses
- **freeCodeCamp** - Complete courses and projects
- **The Net Ninja** - Step-by-step tutorials

## Intermediate Level
- **Fireship** - Quick, modern web development concepts
- **Web Dev Simplified** - Clean explanations of complex topics
- **Academind** - In-depth courses and best practices

## Advanced Level
- **Fun Fun Function** - Functional programming and advanced concepts
- **JavaScript Mastery** - Full-stack projects and modern frameworks
```

### **Custom Learning Paths**
Build structured roadmaps with:
- **Prerequisites** - What you need to know before starting
- **Core Concepts** - Essential topics to master
- **Projects** - Hands-on practice and portfolio building
- **Resources** - Curated links to tutorials, documentation, and tools
- **Assessment** - Self-check quizzes and project milestones

### **Post Creation Features**
- **Rich formatting** with headers, lists, code blocks, and tables
- **Interactive elements** like progress bars and checklists
- **Embedded content** from YouTube, CodePen, GitHub, and more
- **Collaborative editing** with real-time comments and suggestions
- **Version history** to track changes and revert if needed

## 📚 Resources & References

### **React Flow Ecosystem**
- [React Flow Documentation](https://reactflow.dev/learn)
- [React Flow Examples](https://reactflow.dev/examples)
- [React Flow Pro](https://reactflow.dev/pro) - Advanced features

### **Design Inspiration**
- [Dribbble - Workflow Builder](https://dribbble.com/tags/workflow-builder)
- [Awesome Node-Based UIs](https://github.com/xyflow/awesome-node-based-uis)

### **Similar Tools**
- [n8n](https://n8n.io) - Workflow automation
- [Retool](https://retool.com) - Internal tool builder
- [Zapier](https://zapier.com) - Automation platform

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev) team for the amazing node editor library
- [Vercel](https://vercel.com) for Next.js and deployment platform
- Design inspiration from n8n, Figma, and Linear teams

---

**Built with ❤️ using Next.js, React Flow, and modern web technologies**
