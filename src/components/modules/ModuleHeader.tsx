import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { ViewMode } from '../../types/crm';
import {
  List,
  Columns,
  SlidersHorizontal,
  Plus,
  Filter,
  Download,
  Upload,
  MoreHorizontal
} from 'lucide-react';

interface ModuleHeaderProps {
  title: string;
  count: number;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  filterOptions?: string[];
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
  onManageColumns?: () => void;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  count,
  searchValue = '',
  onSearchChange,
  filterOptions = ['All Records', 'Recently Created', 'My Records'],
  activeFilter = 'All Records',
  onFilterChange,
  onManageColumns
}) => {
  const { activeModule, viewMode, setViewMode, openCreateModal } = useCRM();

  const getCreateButtonLabel = () => {
    switch (activeModule) {
      case 'leads': return 'Create Lead';
      case 'deals': return 'Create Deal';
      case 'contacts': return 'Create Contact';
      case 'accounts': return 'Create Account';
      case 'tasks': return 'Create Task';
      case 'calls': return 'Log a Call';
      case 'meetings': return 'Schedule Meeting';
      default: return 'Create Record';
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none">
      {/* Left: Module Title, Count, and Filter Dropdown */}
      <div className="flex items-center space-x-3">
        <div className="flex items-baseline space-x-2">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white capitalize">{title}</h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {count}
          </span>
        </div>

        {/* View Filter Pill */}
        {filterOptions.length > 0 && onFilterChange && (
          <div className="relative inline-flex items-center">
            <select
              value={activeFilter}
              onChange={e => onFilterChange(e.target.value)}
              className="text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1 border border-slate-200 dark:border-slate-700 outline-none cursor-pointer"
            >
              {filterOptions.map(opt => (
                <option key={opt} value={opt} className="dark:bg-slate-900">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Controls: Search, View Switchers, Column Settings, Primary Action */}
      <div className="flex items-center space-x-2 flex-wrap sm:flex-nowrap">
        {/* Module Local Search */}
        {onSearchChange && (
          <div className="relative">
            <input
              type="text"
              placeholder={`Filter in ${title}...`}
              value={searchValue}
              onChange={e => onSearchChange(e.target.value)}
              className="text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 w-36 md:w-48"
            />
          </div>
        )}

        {/* View Mode Switcher (List vs Kanban for Deals) */}
        {activeModule === 'deals' && (
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Kanban Pipeline View"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Table List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Manage Columns */}
        {onManageColumns && (
          <button
            onClick={onManageColumns}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Manage Columns"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}

        {/* Primary Action Button */}
        <button
          onClick={() => setViewMode('create')}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{getCreateButtonLabel()}</span>
        </button>
      </div>
    </div>
  );
};
