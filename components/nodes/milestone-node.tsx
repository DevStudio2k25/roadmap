'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Flag, Calendar, CheckCircle, Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface MilestoneNodeData {
  title: string;
  description?: string;
  progress?: number;
  status?: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate?: string;
}

import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export function MilestoneNode({ data, selected, id }: NodeProps) {
  const nodeData = data as unknown as MilestoneNodeData;
  const { showHandles, updateNode, deleteNode } = useRoadmapStore();
  const { title, description, progress = 0, status = 'pending', dueDate } = nodeData;

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(title);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descText, setDescText] = useState(description || '');
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [dateText, setDateText] = useState(dueDate || '');

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const handleProgressChange = (newProgress: number) => {
    updateNode(id, { progress: newProgress } as Record<string, unknown>);
  };

  const handleStatusChange = (newStatus: string) => {
    updateNode(id, { status: newStatus } as Record<string, unknown>);
  };

  const statusColors = {
    pending: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' },
    blocked: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' }
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[220px] max-w-[280px] overflow-hidden group',
        selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
      )}
    >
      {/* Input Handles */}
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id="input-1"
            className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="target"
            position={Position.Top}
            id="input-2"
            className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input-left"
            className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
      
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-blue-200 dark:border-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500">
              <Flag className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Milestone</span>
          </div>
          {selected && (
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3 h-3 text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-800">
        {/* Title */}
        {isEditingTitle ? (
          <div className="mb-3">
            <input
              type="text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateNode(id, { title: titleText } as Record<string, unknown>);
                  setIsEditingTitle(false);
                }
                if (e.key === 'Escape') {
                  setTitleText(title);
                  setIsEditingTitle(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { title: titleText } as Record<string, unknown>);
                setIsEditingTitle(false);
              }}
              className="w-full px-2 py-1 text-sm font-semibold border border-blue-300 dark:border-blue-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              placeholder="Milestone title..."
            />
          </div>
        ) : (
          <h3 
            className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
            onClick={() => {
              setIsEditingTitle(true);
              setTitleText(title);
            }}
            title="Click to edit"
          >
            {title}
            {selected && <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
          </h3>
        )}
        
        {/* Description */}
        {isEditingDesc ? (
          <div className="mb-3">
            <textarea
              value={descText}
              onChange={(e) => setDescText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  updateNode(id, { description: descText } as Record<string, unknown>);
                  setIsEditingDesc(false);
                }
                if (e.key === 'Escape') {
                  setDescText(description || '');
                  setIsEditingDesc(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { description: descText } as Record<string, unknown>);
                setIsEditingDesc(false);
              }}
              className="w-full px-2 py-1 text-xs border border-blue-300 dark:border-blue-600 rounded bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              autoFocus
              placeholder="Add description..."
            />
          </div>
        ) : (
          description ? (
            <p 
              className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => {
                setIsEditingDesc(true);
                setDescText(description);
              }}
              title="Click to edit"
            >
              {description}
            </p>
          ) : selected && (
            <p 
              className="text-xs text-gray-400 dark:text-gray-500 mb-3 italic cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditingDesc(true)}
            >
              + Add description
            </p>
          )
        )}
        
        {/* Progress Bar */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-blue-900 dark:text-blue-100">Progress</span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{progress}%</span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-1.5 mb-2">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          {selected && (
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => handleProgressChange(parseInt(e.target.value))}
              className="w-full h-1 bg-blue-200 dark:bg-blue-700 rounded-lg appearance-none cursor-pointer"
            />
          )}
        </div>
        
        {/* Status Selector */}
        {selected && (
          <div className="mb-3">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Status</label>
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => handleStatusChange('pending')}
                className={cn(
                  'px-2 py-1 text-xs rounded flex items-center gap-1 transition-colors',
                  status === 'pending' ? 'bg-gray-100 text-gray-700 border border-gray-300' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <Flag className="w-3 h-3" />
                <span className="truncate">Pending</span>
              </button>
              <button
                onClick={() => handleStatusChange('in-progress')}
                className={cn(
                  'px-2 py-1 text-xs rounded flex items-center gap-1 transition-colors',
                  status === 'in-progress' ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <Clock className="w-3 h-3" />
                <span className="truncate">In Progress</span>
              </button>
              <button
                onClick={() => handleStatusChange('completed')}
                className={cn(
                  'px-2 py-1 text-xs rounded flex items-center gap-1 transition-colors',
                  status === 'completed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <CheckCircle className="w-3 h-3" />
                <span className="truncate">Completed</span>
              </button>
              <button
                onClick={() => handleStatusChange('blocked')}
                className={cn(
                  'px-2 py-1 text-xs rounded flex items-center gap-1 transition-colors',
                  status === 'blocked' ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <AlertCircle className="w-3 h-3" />
                <span className="truncate">Blocked</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Due Date */}
        {isEditingDate ? (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gray-400" />
            <input
              type="text"
              value={dateText}
              onChange={(e) => setDateText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateNode(id, { dueDate: dateText } as Record<string, unknown>);
                  setIsEditingDate(false);
                }
                if (e.key === 'Escape') {
                  setDateText(dueDate || '');
                  setIsEditingDate(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { dueDate: dateText } as Record<string, unknown>);
                setIsEditingDate(false);
              }}
              className="flex-1 px-2 py-1 text-xs border border-blue-300 dark:border-blue-600 rounded bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
              placeholder="e.g., Dec 31, 2024"
            />
          </div>
        ) : (
          dueDate ? (
            <div 
              className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => {
                setIsEditingDate(true);
                setDateText(dueDate);
              }}
              title="Click to edit"
            >
              <Calendar className="w-3 h-3" />
              <span>Due: {dueDate}</span>
            </div>
          ) : selected && (
            <div 
              className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 italic cursor-pointer hover:text-blue-500"
              onClick={() => setIsEditingDate(true)}
            >
              <Calendar className="w-3 h-3" />
              <span>+ Add due date</span>
            </div>
          )
        )}
        
        {/* Status Badge (when not editing) */}
        {!selected && status && status !== 'pending' && (
          <div className="mt-3">
            <span className={cn(
              'inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full',
              status === 'completed' && 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
              status === 'in-progress' && 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
              status === 'blocked' && 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            )}>
              {status === 'completed' && <CheckCircle className="w-3 h-3" />}
              {status === 'in-progress' && <Clock className="w-3 h-3" />}
              {status === 'blocked' && <AlertCircle className="w-3 h-3" />}
              {status.replace('-', ' ')}
            </span>
          </div>
        )}
      </div>
      
      {/* Output Handles */}
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-1"
            className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-2"
            className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-right"
            className="w-3 h-3 bg-indigo-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
    </div>
  );
}
