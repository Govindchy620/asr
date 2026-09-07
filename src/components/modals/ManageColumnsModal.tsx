import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface ManageColumnsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allColumns: { key: string; header: string }[];
  visibleKeys: string[];
  onSave: (keys: string[]) => void;
}

export const ManageColumnsModal: React.FC<ManageColumnsModalProps> = ({
  isOpen,
  onClose,
  allColumns,
  visibleKeys,
  onSave
}) => {
  const [selected, setSelected] = useState<string[]>(visibleKeys);

  if (!isOpen) return null;

  const toggleKey = (key: string) => {
    if (selected.includes(key)) {
      if (selected.length <= 1) return; // keep at least 1 column
      setSelected(selected.filter(k => k !== key));
    } else {
      setSelected([...selected, key]);
    }
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Manage Columns</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-72 space-y-2">
          <div className="text-xs text-slate-400 mb-2">Select visible fields in table view:</div>
          {allColumns.map(col => {
            const isChecked = selected.includes(col.key);
            return (
              <label
                key={col.key}
                className="flex items-center space-x-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer text-xs text-slate-700 dark:text-slate-300 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleKey(col.key)}
                  className="rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="font-medium">{col.header}</span>
              </label>
            );
          })}
        </div>

        <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs"
          >
            Save Columns
          </button>
        </div>
      </div>
    </div>
  );
};
