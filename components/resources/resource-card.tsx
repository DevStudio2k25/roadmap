'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Star, 
  Clock, 
  User, 
  Youtube, 
  BookOpen, 
  FileText, 
  Code,
  Play,
  Eye,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ResourceCardProps {
  title: string;
  description?: string;
  type: 'youtube' | 'course' | 'article' | 'book' | 'documentation' | 'tutorial';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  author?: string;
  duration?: string;
  rating?: number;
  views?: number;
  likes?: number;
  thumbnail?: string;
  tags?: string[];
  completed?: boolean;
}

export function ResourceCard({
  title,
  description,
  type,
  url,
  difficulty,
  author,
  duration,
  rating,
  views,
  likes,
  thumbnail,
  tags = [],
  completed = false
}: ResourceCardProps) {
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'youtube':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'course':
        return <Play className="w-4 h-4 text-blue-500" />;
      case 'book':
        return <BookOpen className="w-4 h-4 text-green-500" />;
      case 'tutorial':
        return <Code className="w-4 h-4 text-purple-500" />;
      case 'documentation':
        return <FileText className="w-4 h-4 text-gray-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={cn(
      'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-all duration-200',
      completed && 'ring-2 ring-green-200 bg-green-50 dark:bg-green-900/20'
    )}>
      <div className="flex items-start gap-3">
        {/* Thumbnail or Icon */}
        <div className="flex-shrink-0">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              {getTypeIcon(type)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
              {title}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 flex-shrink-0"
              onClick={() => window.open(url, '_blank')}
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>

          {description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
              {description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{author}</span>
              </div>
            )}
            
            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{duration}</span>
              </div>
            )}

            {rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}

            {views && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{views > 1000 ? `${Math.floor(views/1000)}k` : views}</span>
              </div>
            )}

            {likes && (
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{likes > 1000 ? `${Math.floor(likes/1000)}k` : likes}</span>
              </div>
            )}
          </div>

          {/* Tags and Difficulty */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span className={cn(
                'text-xs px-2 py-1 rounded-full border font-medium',
                getDifficultyColor(difficulty)
              )}>
                {difficulty}
              </span>
              
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
              
              {tags.length > 2 && (
                <span className="text-xs text-gray-400">
                  +{tags.length - 2}
                </span>
              )}
            </div>

            {completed && (
              <div className="flex items-center gap-1 text-green-600">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
