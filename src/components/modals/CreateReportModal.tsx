import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { X, FileSpreadsheet, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const CreateReportModal: React.FC = () => {
  const { isCreateReportModalOpen, setIsCreateReportModalOpen, addReport } = useCRM();

  // Wizard Steps: 1. Basic Details & Module | 2. Report Type & Grouping | 3. Select Columns & Filters
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [reportName, setReportName] = useState('');
  const [selectedModule, setSelectedModule] = useState('Deals');
  const [reportType, setReportType] = useState<'Tabular' | 'Summary' | 'Matrix' | 'Pivot'>('Summary');
  const [groupBy, setGroupBy] = useState('Stage');
  const [dateFilter, setDateFilter] = useState('Current Quarter');
  const [sharing, setSharing] = useState('Everyone in Organization (Public)');

  const MODULE_COLUMNS: Record<string, string[]> = {
    Deals: ['Deal Name', 'Account Name', 'Amount', 'Stage', 'Probability', 'Expected Close Date', 'Deal Owner', 'Lead Source'],
    Leads: ['Lead Name', 'Company', 'Lead Status', 'Novi Score', 'Annual Revenue', 'Lead Owner', 'Created Date'],
    Contacts: ['Contact Name', 'Account Name', 'Email', 'Phone', 'Department', 'Contact Owner'],
    Accounts: ['Account Name', 'Industry', 'Annual Revenue', 'City', 'Phone', 'Account Owner'],
    Invoices: ['Invoice #', 'Account Name', 'Invoice Date', 'Due Date', 'Total Amount', 'Status'],
    Quotes: ['Quote #', 'Subject', 'Account Name', 'Total Amount', 'Valid Till', 'Status']
  };

  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'Deal Name',
    'Account Name',
    'Amount',
    'Stage',
    'Expected Close Date'
  ]);

  if (!isCreateReportModalOpen) return null;

  const handleModuleChange = (mod: string) => {
    setSelectedModule(mod);
    const cols = MODULE_COLUMNS[mod] || ['Name', 'Created Date', 'Owner'];
    setSelectedColumns(cols.slice(0, 4));
  };

  const toggleColumn = (col: string) => {
    if (selectedColumns.includes(col)) {
      if (selectedColumns.length <= 1) return;
      setSelectedColumns(selectedColumns.filter(c => c !== col));
    } else {
      setSelectedColumns([...selectedColumns, col]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName.trim()) return;

    addReport({
      name: reportName.trim(),
      module: selectedModule,
      reportType,
      columns: selectedColumns,
      rows: `${Math.floor(Math.random() * 50) + 10} records`
    });

    // Reset & close
    setReportName('');
    setStep(1);
    setIsCreateReportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Wizard Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Create New Report Wizard
              </h2>
              <p className="text-[11px] text-slate-400">Step {step} of 3 • Configure your custom analytics report</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateReportModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress Tracker */}
        <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-center select-none bg-slate-100/50 dark:bg-slate-900/20">
          <div className={`py-2.5 border-b-2 ${step === 1 ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-400'}`}>
            1. Module & Details
          </div>
          <div className={`py-2.5 border-b-2 ${step === 2 ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-400'}`}>
            2. Report Type & Format
          </div>
          <div className={`py-2.5 border-b-2 ${step === 3 ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-400'}`}>
            3. Columns & Criteria
          </div>
        </div>

        {/* Wizard Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs custom-scrollbar">
          {/* STEP 1: Basic Details & Module Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Report Name *
                </label>
                <input
                  type="text"
                  required
                  value={reportName}
                  onChange={e => setReportName(e.target.value)}
                  placeholder="e.g. Q1 Pipeline Won vs Forecast by Sales Rep"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Module Selection *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Deals', 'Leads', 'Contacts', 'Accounts', 'Invoices', 'Quotes'].map(mod => (
                    <button
                      key={mod}
                      type="button"
                      onClick={() => handleModuleChange(mod)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedModule === mod
                          ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{mod}</div>
                      <span className="text-[10px] text-slate-400 font-normal">Core dataset</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Folder & Sharing Permission
                </label>
                <select
                  value={sharing}
                  onChange={e => setSharing(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs outline-none"
                >
                  <option value="Everyone in Organization (Public)">Public - Accessible to all CRM users</option>
                  <option value="Private to Me">Private - Only accessible by me</option>
                  <option value="Management & Executive Roles">Restricted to Management & Executive Roles</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: Report Type & Grouping */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Select Report Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Tabular', desc: 'Simplest listing of records, suitable for mailing lists and data dumps.' },
                    { type: 'Summary', desc: 'Provides subtotals, record grouping, and numerical aggregates.' },
                    { type: 'Matrix', desc: 'Grid summarizing data across both row and column groupings.' },
                    { type: 'Pivot', desc: 'Cross-tabulation chart suitable for multidimensional analysis.' }
                  ].map(item => (
                    <div
                      key={item.type}
                      onClick={() => setReportType(item.type as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        reportType === item.type
                          ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs">{item.type} Report</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-normal">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Grouping Field (for {reportType})
                </label>
                <select
                  value={groupBy}
                  onChange={e => setGroupBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs outline-none"
                >
                  <option value="Stage">Group by Stage</option>
                  <option value="Owner">Group by Record Owner</option>
                  <option value="Lead Source">Group by Lead Source</option>
                  <option value="Closing Month">Group by Closing Month</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Time Period Filter
                </label>
                <select
                  value={dateFilter}
                  onChange={e => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs outline-none"
                >
                  <option value="Current Quarter">Current Quarter (Q1 FY 2025)</option>
                  <option value="This Month">This Month</option>
                  <option value="Fiscal Year 2025-26">Fiscal Year 2025-26</option>
                  <option value="All Time">All Historical Records</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: Columns Selection & Criteria */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Select Available Columns ({selectedModule})
                  </label>
                  <span className="text-[11px] text-blue-600 font-semibold">
                    {selectedColumns.length} fields selected
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 border border-slate-200 dark:border-slate-700 rounded-xl p-3 max-h-56 overflow-y-auto custom-scrollbar">
                  {(MODULE_COLUMNS[selectedModule] || []).map(col => {
                    const isChecked = selectedColumns.includes(col);
                    return (
                      <label
                        key={col}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleColumn(col)}
                          className="rounded border-slate-300 text-blue-600 cursor-pointer"
                        />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{col}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Summary of Configuration */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="font-bold text-slate-900 dark:text-white">Report Summary:</div>
                <div className="text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Name:</span> {reportName || 'Untitled Report'}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Module:</span> {selectedModule} • <span className="text-slate-400">Type:</span> {reportType}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  <span className="text-slate-400">Grouping:</span> {groupBy} • <span className="text-slate-400">Time:</span> {dateFilter}
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsCreateReportModalOpen(false)}
                className="px-3.5 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium"
              >
                Cancel
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1 && !reportName.trim()) {
                      alert('Please provide a report name.');
                      return;
                    }
                    setStep((step + 1) as any);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center space-x-1"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-sm shadow-emerald-600/20 flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save & Generate Report</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
