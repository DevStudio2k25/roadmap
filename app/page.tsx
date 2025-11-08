'use client';

import Link from 'next/link';
import { ArrowRight, Map, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Roadmap Creator
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Visual roadmap builder
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">v1.0.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Roadmap Creator
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create stunning visual roadmaps with drag & drop nodes, images, and interactive workflows
          </p>
        </div>

        {/* Single Card */}
        <div className="max-w-2xl mx-auto">
          <Link href="/roadmap" className="group block">
            <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Map className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  Start Creating
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-center">
                  Advanced node-based visual roadmap builder with learning resources, tables, images, and interactive workflows
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 max-w-md mx-auto">
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Node-based canvas with drag & drop
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Import and manage images with masonry layout
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Interactive tables & learning resources
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Multiple node types & connections
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Advanced image properties & batch editing
                  </li>
                </ul>

                {/* CTA */}
                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Open Roadmap Creator
                  </span>
                  <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full">
                  Ready
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js, React Flow, TypeScript, and modern web technologies
          </p>
        </div>
      </main>
    </div>
  );
}
