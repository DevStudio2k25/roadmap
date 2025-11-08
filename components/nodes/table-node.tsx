'use client';

import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { 
  Table, 
  Plus, 
  Edit3, 
  Check, 
  X, 
  Settings
} from 'lucide-react';
import { cn } from '../../lib/utils/cn';
import { Button } from '../ui/button';

interface TableCell {
  id: string;
  content: string;
  isHeader?: boolean;
}

interface TableRow {
  id: string;
  cells: TableCell[];
}

interface TableNodeData {
  title: string;
  description?: string;
  rows: TableRow[];
  columns: number;
  showHeaders: boolean;
  tableStyle: 'default' | 'striped' | 'bordered' | 'minimal';
}

import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export function TableNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as TableNodeData;
  const { showHandles } = useRoadmapStore();
  const { 
    title = 'Data Table', 
    description, 
    rows = [], 
    columns = 3, 
    tableStyle = 'default'
  } = nodeData;

  const [isEditing, setIsEditing] = useState(false);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [localRows, setLocalRows] = useState<TableRow[]>(() => {
    if (rows && rows.length > 0) {
      return rows;
    }
    return createDefaultTable();
  });

  // Create default table with headers
  function createDefaultTable(): TableRow[] {
    const headerRow: TableRow = {
      id: 'header-row',
      cells: Array.from({ length: 3 }, (_, i) => ({
        id: `header-${i}`,
        content: `Column ${i + 1}`,
        isHeader: true
      }))
    };

    const dataRows: TableRow[] = Array.from({ length: 2 }, (_, rowIndex) => ({
      id: `row-${rowIndex}`,
      cells: Array.from({ length: 3 }, (_, colIndex) => ({
        id: `cell-${rowIndex}-${colIndex}`,
        content: `Cell ${rowIndex + 1}.${colIndex + 1}`,
        isHeader: false
      }))
    }));

    return [headerRow, ...dataRows];
  }

  const handleCellEdit = useCallback((cellId: string, currentContent: string) => {
    setEditingCell(cellId);
    setEditValue(currentContent);
  }, []);

  const handleCellSave = useCallback(() => {
    if (editingCell) {
      setLocalRows(prev => prev.map(row => ({
        ...row,
        cells: row.cells.map(cell => 
          cell.id === editingCell 
            ? { ...cell, content: editValue }
            : cell
        )
      })));
    }
    setEditingCell(null);
    setEditValue('');
  }, [editingCell, editValue]);

  const handleCellCancel = useCallback(() => {
    setEditingCell(null);
    setEditValue('');
  }, []);

  const handleTitleEdit = useCallback(() => {
    setIsEditingTitle(true);
    setTitleValue(title);
  }, [title]);

  const handleTitleSave = useCallback(() => {
    setIsEditingTitle(false);
    // TODO: Update node data with new title
    console.log('New title:', titleValue);
  }, [titleValue]);

  const handleTitleCancel = useCallback(() => {
    setIsEditingTitle(false);
    setTitleValue(title);
  }, [title]);

  const addRow = useCallback(() => {
    const newRowId = `row-${Date.now()}`;
    const newRow: TableRow = {
      id: newRowId,
      cells: Array.from({ length: columns }, (_, i) => ({
        id: `${newRowId}-${i}`,
        content: '',
        isHeader: false
      }))
    };
    setLocalRows(prev => [...prev, newRow]);
  }, [columns]);

  const addColumn = useCallback(() => {
    setLocalRows(prev => prev.map(row => ({
      ...row,
      cells: [...row.cells, {
        id: `${row.id}-${row.cells.length}`,
        content: row.cells[0]?.isHeader ? `Column ${row.cells.length + 1}` : '',
        isHeader: row.cells[0]?.isHeader || false
      }]
    })));
  }, []);

  const removeRow = useCallback((rowId: string) => {
    setLocalRows(prev => prev.filter(row => row.id !== rowId));
  }, []);

  const removeColumn = useCallback((columnIndex: number) => {
    setLocalRows(prev => prev.map(row => ({
      ...row,
      cells: row.cells.filter((_, index) => index !== columnIndex)
    })));
  }, []);

  const getTableStyles = () => {
    switch (tableStyle) {
      case 'striped':
        return 'table-striped';
      case 'bordered':
        return 'table-bordered';
      case 'minimal':
        return 'table-minimal';
      default:
        return 'table-default';
    }
  };

  return (
    <div
      className={cn(
        'bg-white border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[300px] max-w-[600px] overflow-hidden group',
        selected ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-200 hover:border-gray-300'
      )}
    >
      {/* Input Handles */}
      {showHandles && (
        <>
          <Handle
            type="target"
            position={Position.Top}
            id="input-1"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="target"
            position={Position.Top}
            id="input-2"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input-left"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
      
      {/* Header */}
      <div className={cn(
        "px-4 py-3 border-b border-gray-200",
        isEditing 
          ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200" 
          : "bg-gradient-to-r from-purple-50 to-blue-50"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Table className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                {isEditingTitle ? (
                  <div className="flex items-center gap-1 flex-1">
                    <input
                      type="text"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleTitleSave();
                        }
                        if (e.key === 'Escape') {
                          e.preventDefault();
                          handleTitleCancel();
                        }
                      }}
                      onBlur={handleTitleSave}
                      className="text-sm font-semibold bg-white border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 min-w-[120px]"
                      autoFocus
                      placeholder="Table name..."
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleTitleSave}
                      className="h-6 w-6 p-0"
                    >
                      <Check className="w-3 h-3 text-green-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleTitleCancel}
                      className="h-6 w-6 p-0"
                    >
                      <X className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <h3 
                    className="font-semibold text-gray-900 text-sm flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handleTitleEdit}
                    title="Click to edit table name"
                  >
                    {titleValue}
                    <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                )}
                {isEditing && !isEditingTitle && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    Editing
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-gray-600 mt-0.5">
                  {description}
                  {isEditing && <span className="text-blue-600 ml-1">• Click cells to edit</span>}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={isEditing ? "default" : "outline"}
              size="sm"
              onClick={() => {
                console.log('Edit button clicked, current state:', isEditing);
                setIsEditing(!isEditing);
              }}
              className={cn(
                "h-8 px-3 text-xs font-medium",
                isEditing 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
            >
              {isEditing ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Done
                </>
              ) : (
                <>
                  <Edit3 className="w-3 h-3 mr-1" />
                  Edit
                </>
              )}
            </Button>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                title="Table Settings"
              >
                <Settings className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className={cn(
            'w-full text-sm',
            getTableStyles()
          )}>
            <tbody>
              {localRows.map((row) => (
                <tr 
                  key={row.id}
                  className={cn(
                    'transition-colors',
                    row.cells[0]?.isHeader 
                      ? 'bg-gray-50 border-b-2 border-gray-200' 
                      : 'hover:bg-gray-50 border-b border-gray-100'
                  )}
                >
                  {row.cells.map((cell, cellIndex) => {
                    const isEditingThisCell = editingCell === cell.id;
                    const CellComponent = cell.isHeader ? 'th' : 'td';
                    
                    return (
                      <CellComponent
                        key={cell.id}
                        className={cn(
                          'px-3 py-2 text-left relative group min-w-[80px]',
                          cell.isHeader 
                            ? 'font-semibold text-gray-900 bg-gray-50' 
                            : 'text-gray-700'
                        )}
                      >
                        {isEditingThisCell ? (
                          <div className="flex items-center gap-1">
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleCellSave();
                                }
                                if (e.key === 'Enter' && e.shiftKey) {
                                  // Allow Shift+Enter for line breaks - don't prevent default
                                  // The textarea will handle the line break automatically
                                }
                                if (e.key === 'Escape') {
                                  e.preventDefault();
                                  handleCellCancel();
                                }
                                if (e.key === 'Tab') {
                                  e.preventDefault();
                                  handleCellSave();
                                }
                              }}
                              onBlur={handleCellSave}
                              className="w-full px-2 py-1 text-sm border-2 border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm resize-none min-h-[32px] max-h-[120px] overflow-y-auto"
                              autoFocus
                              placeholder="Enter text... (Shift+Enter for new line)"
                              rows={1}
                              style={{
                                height: 'auto',
                                minHeight: '32px'
                              }}
                              onInput={(e) => {
                                // Auto-resize textarea based on content
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                              }}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCellSave}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="w-3 h-3 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCellCancel}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        ) : (
                          <div 
                            className={cn(
                              "min-h-[20px] flex items-center px-1 py-1 rounded",
                              isEditing ? "cursor-pointer hover:bg-blue-50 hover:border hover:border-blue-200" : "cursor-default"
                            )}
                            onClick={() => isEditing && handleCellEdit(cell.id, cell.content)}
                            title={isEditing ? "Click to edit" : ""}
                          >
                            {cell.content || (
                              <span className="text-gray-400 italic text-xs">
                                {isEditing ? 'Click to edit' : 'Empty'}
                              </span>
                            )}
                            {isEditing && (
                              <Edit3 className="w-3 h-3 text-gray-400 ml-1 opacity-0 group-hover:opacity-100" />
                            )}
                          </div>
                        )}

                        {/* Column controls */}
                        {isEditing && cellIndex === row.cells.length - 1 && localRows[0]?.cells.length > 1 && (
                          <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeColumn(cellIndex)}
                              className="h-5 w-5 p-0 bg-red-50 border-red-200 hover:bg-red-100"
                              title="Remove Column"
                            >
                              <X className="w-3 h-3 text-red-600" />
                            </Button>
                          </div>
                        )}
                      </CellComponent>
                    );
                  })}
                  
                  {/* Row controls */}
                  {isEditing && localRows.length > 1 && (
                    <td className="px-1 py-1 w-6">
                      <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeRow(row.id)}
                          className="h-5 w-5 p-0 bg-red-50 border-red-200 hover:bg-red-100"
                          title="Remove Row"
                        >
                          <X className="w-3 h-3 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Controls - Always Visible */}
        <div className={cn(
          "mt-4 pt-3 border-t border-gray-200 -mx-4 px-4 pb-2",
          isEditing ? "bg-blue-50" : "bg-gray-50"
        )}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addRow}
                disabled={!isEditing}
                className={cn(
                  "h-7 px-3 text-xs bg-white",
                  isEditing ? "hover:bg-blue-50 border-blue-200" : "opacity-50"
                )}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Row
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={addColumn}
                disabled={!isEditing}
                className={cn(
                  "h-7 px-3 text-xs bg-white",
                  isEditing ? "hover:bg-blue-50 border-blue-200" : "opacity-50"
                )}
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Column
              </Button>
            </div>
            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
              {localRows.length} rows × {localRows[0]?.cells.length || 0} columns
            </div>
          </div>
          {isEditing ? (
            <div className="text-xs text-blue-700 text-center font-medium">
              ✏️ Edit Mode Active • Click cells to edit • Use buttons to add/remove
            </div>
          ) : (
            <div className="text-xs text-gray-500 text-center">
              Click &quot;Edit&quot; button to modify table structure and content
            </div>
          )}
        </div>
      </div>
      
      {/* Output Handles */}
      {showHandles && (
        <>
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-1"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '25%' }}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="output-2"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
            style={{ left: '75%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-right"
            className="w-3 h-3 bg-purple-500 border-2 border-white rounded-full hover:scale-125 transition-all"
          />
        </>
      )}
    </div>
  );
}