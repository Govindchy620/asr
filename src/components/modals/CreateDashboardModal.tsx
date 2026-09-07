import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { X, BarChart3, TrendingUp, PieChart, Filter, Award, Check } from 'lucide-react';

export const CreateDashboardModal: React.FC = () => {
  const { isCreateDashboardModalOpen, setIsCreateDashboardModalOpen, addAnalyticsWidget } = useCRM();

  const [title, setTitle] = useState('');
  const [dataSource, setDataSource] = useState('Deals');
  const [chartType, setChartType] = useState<'Bar' | 'Line' | 'Pie' | 'Funnel' | 'KPI'>('Bar');
  const [metric, setMetric] = useState('Total Deal Amount (₹)');
  const [dimension, setDimension] = useState('Stage');
  const [dateFilter, setDateFilter] = useState('This Quarter');

  if (!isCreateDashboardModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let computedVal = '₹35,00,000';
    let computedSubtitle = `Grouped by ${dimension} • ${dateFilter}`;

    if (chartType === 'KPI') {
      computedVal = metric.includes('Amount') || metric.includes('Revenue') ? '₹42,50,000' : '84.6%';
      computedSubtitle = `${metric} across ${dataSource}`;
    } else if (chartType === 'Funnel') {
      computedVal = '₹1.85 Cr Pipeline';
      computedSubtitle = 'Multi-stage conversion velocity';
    } else if (chartType === 'Pie') {
      computedVal = 'Top Segment (62%)';
      computedSubtitle = `Distribution across ${dimension}`;
    }

    addAnalyticsWidget({
      title: title.trim(),
      dataSource,
      chartType,
      metric,
      dimension,
      value: computedVal,
      subtitle: computedSubtitle,
      growth: '+12.5% vs prev period'
    });

    // Reset & close
    setTitle('');
    setIsCreateDashboardModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-purple-50/60 dark:bg-purple-950/20">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Create Analytics Dashboard / Chart
              </h2>
              <p className="text-[11px] text-slate-400">Configure visual metrics, data sources, and chart widgets</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateDashboardModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs custom-scrollbar">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Chart / Widget Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Sales Rep Win Velocity by Stage"
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Chart Visualization Type
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                { type: 'Bar', label: 'Bar Chart', icon: BarChart3 },
                { type: 'Line', label: 'Line Trend', icon: TrendingUp },
                { type: 'Pie', label: 'Pie / Donut', icon: PieChart },
                { type: 'Funnel', label: 'Funnel', icon: Filter },
                { type: 'KPI', label: 'KPI Metric', icon: Award }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setChartType(item.type as any)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      chartType === item.type
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1" />
                    <span className="text-[11px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Data Source Module
              </label>
              <select
                value={dataSource}
                onChange={e => setDataSource(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option value="Deals">Deals Pipeline</option>
                <option value="Leads">Leads & Inbound</option>
                <option value="Accounts">Accounts & B2B</option>
                <option value="Invoices">Invoices & Billing</option>
                <option value="Campaigns">Campaigns ROI</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Aggregation Metric
              </label>
              <select
                value={metric}
                onChange={e => setMetric(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option value="Total Deal Amount (₹)">Total Amount Sum (₹)</option>
                <option value="Record Count">Total Count of Records</option>
                <option value="Average Deal Value">Average Deal Value</option>
                <option value="Win Conversion Ratio (%)">Win Conversion Ratio (%)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Grouping Dimension
              </label>
              <select
                value={dimension}
                onChange={e => setDimension(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option value="Stage">Sales Pipeline Stage</option>
                <option value="Owner">Sales Rep / Owner</option>
                <option value="Industry">Client Industry</option>
                <option value="Month">Month of Closing</option>
                <option value="Lead Source">Marketing Channel Source</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Time Window Filter
              </label>
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none"
              >
                <option value="This Quarter">Current Quarter (Q1 FY 2025)</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Year-to-Date">Year-to-Date (YTD)</option>
                <option value="All Time">All Active Records</option>
              </select>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsCreateDashboardModalOpen(false)}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-lg font-bold shadow-sm shadow-purple-600/20 flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Add to Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
