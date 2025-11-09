'use client';

import React, { useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Trash2, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface MemberNodeData {
  name: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  department?: string;
  status?: 'active' | 'away' | 'offline';
  avatar?: string;
  customHandles?: Array<{
    id: string;
    type: 'source' | 'target';
    position: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

import { useRoadmapStore } from '../../lib/stores/roadmap-store';

export function MemberNode({ data, selected, id }: NodeProps) {
  const nodeData = data as unknown as MemberNodeData;
  const { showHandles, updateNode, deleteNode } = useRoadmapStore();
  const { 
    name = 'Team Member',
    role = 'Role',
    email,
    phone,
    location,
    department,
    status = 'active',
    avatar
  } = nodeData;

  const [isEditingName, setIsEditingName] = useState(false);
  const [nameText, setNameText] = useState(name);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [roleText, setRoleText] = useState(role);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailText, setEmailText] = useState(email || '');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneText, setPhoneText] = useState(phone || '');
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [locationText, setLocationText] = useState(location || '');
  const [isEditingDepartment, setIsEditingDepartment] = useState(false);
  const [departmentText, setDepartmentText] = useState(department || '');

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const handleStatusChange = (newStatus: string) => {
    updateNode(id, { status: newStatus } as Record<string, unknown>);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { color: 'bg-emerald-500', text: 'Active', textColor: 'text-emerald-700' };
      case 'away':
        return { color: 'bg-yellow-500', text: 'Away', textColor: 'text-yellow-700' };
      case 'offline':
        return { color: 'bg-gray-400', text: 'Offline', textColor: 'text-gray-600' };
      default:
        return { color: 'bg-emerald-500', text: 'Active', textColor: 'text-emerald-700' };
    }
  };

  const statusConfig = getStatusConfig(status);




  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-800 border-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 min-w-[280px] max-w-[320px] overflow-hidden group',
        selected ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
      )}
    >
      {/* Custom Handles with Dynamic Spacing */}
      {showHandles && nodeData.customHandles && (() => {
        const positionMap = {
          top: Position.Top,
          bottom: Position.Bottom,
          left: Position.Left,
          right: Position.Right
        };
        
        const handlesByPosition = nodeData.customHandles.reduce((acc, handle) => {
          if (!acc[handle.position]) acc[handle.position] = [];
          acc[handle.position].push(handle);
          return acc;
        }, {} as Record<string, typeof nodeData.customHandles>);

        return nodeData.customHandles.map((handle) => {
          const handlesAtPosition = handlesByPosition[handle.position];
          const indexAtPosition = handlesAtPosition.indexOf(handle);
          const totalAtPosition = handlesAtPosition.length;
          
          const spacing = 100 / (totalAtPosition + 1);
          const offset = spacing * (indexAtPosition + 1);
          
          const isVertical = handle.position === 'top' || handle.position === 'bottom';
          const style = isVertical ? { left: `${offset}%` } : { top: `${offset}%` };
          
          return (
            <Handle
              key={handle.id}
              type={handle.type}
              position={positionMap[handle.position]}
              id={handle.id}
              className={cn(
                'w-3 h-3 border-2 border-white rounded-full hover:scale-125 transition-all',
                handle.type === 'source' ? 'bg-emerald-500' : 'bg-blue-500'
              )}
              style={style}
              isConnectableStart={handle.type === 'source'}
              isConnectableEnd={handle.type === 'target'}
            />
          );
        });
      })()}
      
      {/* Header with Avatar */}
      <div className="px-4 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-b border-indigo-200 dark:border-indigo-700">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </div>
            {/* Status Indicator */}
            <div className={cn(
              'absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800',
              statusConfig.color
            )} />
          </div>

          {/* Name and Role */}
          <div className="flex-1 min-w-0">
            {/* Name */}
            {isEditingName ? (
              <div className="flex items-center gap-1 mb-1">
                <input
                  type="text"
                  value={nameText}
                  onChange={(e) => setNameText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateNode(id, { name: nameText } as Record<string, unknown>);
                      setIsEditingName(false);
                    }
                    if (e.key === 'Escape') {
                      setNameText(name);
                      setIsEditingName(false);
                    }
                  }}
                  onBlur={() => {
                    updateNode(id, { name: nameText } as Record<string, unknown>);
                    setIsEditingName(false);
                  }}
                  className="flex-1 px-2 py-1 text-sm font-semibold border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                  placeholder="Member name..."
                />
              </div>
            ) : (
              <h3 
                className="font-semibold text-gray-900 dark:text-white text-base leading-tight mb-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 truncate"
                onClick={() => {
                  setIsEditingName(true);
                  setNameText(name);
                }}
                title="Click to edit name"
              >
                {name}
                {selected && <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 flex-shrink-0" />}
              </h3>
            )}

            {/* Role */}
            {isEditingRole ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={roleText}
                  onChange={(e) => setRoleText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      updateNode(id, { role: roleText } as Record<string, unknown>);
                      setIsEditingRole(false);
                    }
                    if (e.key === 'Escape') {
                      setRoleText(role);
                      setIsEditingRole(false);
                    }
                  }}
                  onBlur={() => {
                    updateNode(id, { role: roleText } as Record<string, unknown>);
                    setIsEditingRole(false);
                  }}
                  className="flex-1 px-2 py-0.5 text-xs border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  autoFocus
                  placeholder="Role..."
                />
              </div>
            ) : (
              <p 
                className="text-sm text-indigo-600 dark:text-indigo-400 font-medium cursor-pointer hover:text-indigo-700 dark:hover:text-indigo-300 truncate"
                onClick={() => {
                  setIsEditingRole(true);
                  setRoleText(role);
                }}
                title="Click to edit role"
              >
                {role}
              </p>
            )}
          </div>

          {/* Delete Button */}
          {selected && (
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors flex-shrink-0"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-gray-800 space-y-3">
        {/* Department */}
        {isEditingDepartment ? (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={departmentText}
              onChange={(e) => setDepartmentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateNode(id, { department: departmentText } as Record<string, unknown>);
                  setIsEditingDepartment(false);
                }
                if (e.key === 'Escape') {
                  setDepartmentText(department || '');
                  setIsEditingDepartment(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { department: departmentText } as Record<string, unknown>);
                setIsEditingDepartment(false);
              }}
              className="flex-1 px-2 py-1 text-xs border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
              placeholder="Department..."
            />
          </div>
        ) : (
          department ? (
            <div 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => {
                setIsEditingDepartment(true);
                setDepartmentText(department);
              }}
              title="Click to edit"
            >
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{department}</span>
            </div>
          ) : selected && (
            <div 
              className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 italic cursor-pointer hover:text-indigo-500"
              onClick={() => setIsEditingDepartment(true)}
            >
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>+ Add department</span>
            </div>
          )
        )}

        {/* Email */}
        {isEditingEmail ? (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="email"
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateNode(id, { email: emailText } as Record<string, unknown>);
                  setIsEditingEmail(false);
                }
                if (e.key === 'Escape') {
                  setEmailText(email || '');
                  setIsEditingEmail(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { email: emailText } as Record<string, unknown>);
                setIsEditingEmail(false);
              }}
              className="flex-1 px-2 py-1 text-xs border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
              placeholder="email@example.com"
            />
          </div>
        ) : (
          email ? (
            <div 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => {
                setIsEditingEmail(true);
                setEmailText(email);
              }}
              title="Click to edit"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          ) : selected && (
            <div 
              className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 italic cursor-pointer hover:text-indigo-500"
              onClick={() => setIsEditingEmail(true)}
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>+ Add email</span>
            </div>
          )
        )}

        {/* Phone */}
        {isEditingPhone ? (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="tel"
              value={phoneText}
              onChange={(e) => setPhoneText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateNode(id, { phone: phoneText } as Record<string, unknown>);
                  setIsEditingPhone(false);
                }
                if (e.key === 'Escape') {
                  setPhoneText(phone || '');
                  setIsEditingPhone(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { phone: phoneText } as Record<string, unknown>);
                setIsEditingPhone(false);
              }}
              className="flex-1 px-2 py-1 text-xs border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
              placeholder="+1 234 567 8900"
            />
          </div>
        ) : (
          phone ? (
            <div 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => {
                setIsEditingPhone(true);
                setPhoneText(phone);
              }}
              title="Click to edit"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{phone}</span>
            </div>
          ) : selected && (
            <div 
              className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 italic cursor-pointer hover:text-indigo-500"
              onClick={() => setIsEditingPhone(true)}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+ Add phone</span>
            </div>
          )
        )}

        {/* Location */}
        {isEditingLocation ? (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={locationText}
              onChange={(e) => setLocationText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateNode(id, { location: locationText } as Record<string, unknown>);
                  setIsEditingLocation(false);
                }
                if (e.key === 'Escape') {
                  setLocationText(location || '');
                  setIsEditingLocation(false);
                }
              }}
              onBlur={() => {
                updateNode(id, { location: locationText } as Record<string, unknown>);
                setIsEditingLocation(false);
              }}
              className="flex-1 px-2 py-1 text-xs border border-indigo-300 dark:border-indigo-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
              placeholder="City, Country"
            />
          </div>
        ) : (
          location ? (
            <div 
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => {
                setIsEditingLocation(true);
                setLocationText(location);
              }}
              title="Click to edit"
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          ) : selected && (
            <div 
              className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 italic cursor-pointer hover:text-indigo-500"
              onClick={() => setIsEditingLocation(true)}
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>+ Add location</span>
            </div>
          )
        )}

        {/* Status Selector */}
        {selected && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleStatusChange('active')}
                className={cn(
                  'px-2 py-1.5 text-xs rounded flex items-center justify-center gap-1 transition-colors',
                  status === 'active' 
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                    : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                Active
              </button>
              <button
                onClick={() => handleStatusChange('away')}
                className={cn(
                  'px-2 py-1.5 text-xs rounded flex items-center justify-center gap-1 transition-colors',
                  status === 'away' 
                    ? 'bg-yellow-100 text-yellow-700 border border-yellow-300' 
                    : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                Away
              </button>
              <button
                onClick={() => handleStatusChange('offline')}
                className={cn(
                  'px-2 py-1.5 text-xs rounded flex items-center justify-center gap-1 transition-colors',
                  status === 'offline' 
                    ? 'bg-gray-100 text-gray-700 border border-gray-300' 
                    : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                )}
              >
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                Offline
              </button>
            </div>
          </div>
        )}

        {/* Status Badge (when not editing) */}
        {!selected && (
          <div className="pt-2">
            <span className={cn(
              'inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full',
              status === 'active' && 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
              status === 'away' && 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
              status === 'offline' && 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            )}>
              <div className={cn('w-2 h-2 rounded-full', statusConfig.color)}></div>
              {statusConfig.text}
            </span>
          </div>
        )}
      </div>
      

    </div>
  );
}
