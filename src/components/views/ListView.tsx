import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  ArrowUpDown,
  Trash2,
  Mail,
  UserCheck,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight
} from 'lucide-react';

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface ListViewProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowClick?: (item: T) => void;
  entityName: string;
}

export function ListView<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  entityName
}: ListViewProps<T>) {
  const { activeModule, deleteRecords } = useCRM();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(data.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a: any, b: any) => {
    if (!sortColumn) return 0;
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (aVal === bVal) return 0;
    if (aVal === undefined || aVal === null) return 1;
    if (bVal === undefined || bVal === null) return -1;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return sortDirection === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const handleDeleteSelected = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} selected record(s)?`)) {
      deleteRecords(activeModule, selectedIds);
      setSelectedIds([]);
    }
  };

  const handleExportSelected = () => {
    const selectedItems = data.filter(item => selectedIds.includes(item.id));
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(selectedItems, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${activeModule}_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#111827] relative select-none">
      {/* Bulk Action Bar (Visible when >= 1 records checked) */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between shadow-md z-10 transition-all animate-in slide-in-from-top-2">
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span>{selectedIds.length} {entityName}(s) selected</span>
            <button
              onClick={() => setSelectedIds([])}
              className="text-blue-100 hover:text-white underline cursor-pointer"
            >
              Clear Selection
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert(`Mass emails queued for ${selectedIds.length} records.`)}
              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-xs font-medium rounded transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email</span>
            </button>
            <button
              onClick={() => alert(`Reassign owner dialog for ${selectedIds.length} records.`)}
              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-xs font-medium rounded transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Assign Owner</span>
            </button>
            <button
              onClick={handleExportSelected}
              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-xs font-medium rounded transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-xs font-medium rounded transition-colors ml-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Table Header */}
          <thead className="bg-slate-50 dark:bg-slate-800/80 sticky top-0 border-b border-slate-200 dark:border-slate-800 z-5">
            <tr>
              <th className="w-10 px-3 py-3 text-center">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={e => handleSelectAll(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </th>
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className={`px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-[11px] whitespace-nowrap ${
                    col.sortable !== false ? 'cursor-pointer hover:text-slate-900 dark:hover:text-white' : ''
                  }`}
                >
                  <div className="flex items-center space-x-1.5">
                    <span>{col.header}</span>
                    {col.sortable !== false && (
                      <ArrowUpDown className="w-3 h-3 text-slate-400 inline" />
                    )}
                  </div>
                </th>
              ))}
              <th className="w-10 px-2 py-3"></th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    <span className="text-sm font-medium">No records found</span>
                    <span className="text-xs text-slate-400">Click the create button above to add your first {entityName}.</span>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map(item => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    onClick={() => onRowClick && onRowClick(item)}
                    className={`transition-colors group ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                    } cursor-pointer`}
                  >
                    <td className="w-10 px-3 py-3 text-center" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => handleSelectRow(item.id, e as any)}
                        className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    {columns.map(col => (
                      <td key={col.key} className="px-4 py-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {col.render ? col.render(item) : (item as any)[col.key] || '-'}
                      </td>
                    ))}
                    <td className="w-10 px-2 py-3 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
