import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { PIPELINE_STAGES } from '../../data/mockData';
import {
  TrendingUp,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowUpRight,
  Clock,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { deals, leads, tasks, setActiveModule, setViewMode, setSelectedRecordId, openCreateModal } = useCRM();

  const totalPipelineRevenue = deals.reduce((sum, d) => sum + d.amount, 0);
  const wonDeals = deals.filter(d => d.stage === 'Closed Won');
  const wonRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
  const openDeals = deals.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost');
  const activeTasks = tasks.filter(t => t.status !== 'Completed');

  const openDeal = (dealId: string) => {
    setActiveModule('deals');
    setSelectedRecordId(dealId);
    setViewMode('detail');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 dark:bg-[#0b0f17] select-none custom-scrollbar space-y-6">
      {/* Top Banner / Welcome with Zia Insights */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
                Welcome back
              </span>
              <span className="text-xs text-blue-100">CRM NextGen Edition</span>
            </div>
            <h2 className="text-2xl font-bold mt-1">Hello, Rajesh Kumar</h2>
            <p className="text-xs text-blue-100 max-w-xl mt-1">
              Your sales team is tracking ₹{totalPipelineRevenue.toLocaleString('en-IN')} across {deals.length} active opportunities. 2 deals are primed for closing this week.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => openCreateModal('deals')}
              className="px-3.5 py-2 bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>+ New Deal</span>
            </button>
            <button
              onClick={() => openCreateModal('leads')}
              className="px-3.5 py-2 bg-blue-700/80 hover:bg-blue-800 text-white text-xs font-bold rounded-xl border border-blue-400/40 transition-all flex items-center space-x-1.5"
            >
              <span>+ Create Lead</span>
            </button>
          </div>
        </div>

        {/* Decorative ambient circle */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Pipeline Value */}
        <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Pipeline Value</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            ₹{totalPipelineRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        {/* Won Revenue */}
        <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Closed Won Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            ₹{wonRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-medium">
            {wonDeals.length} deals closed won in Q1
          </div>
        </div>

        {/* Open Opportunities */}
        <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Active Deals</span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {openDeals.length}
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-2">
            Avg Cycle: 24 Days
          </div>
        </div>

        {/* Total Active Leads */}
        <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Inbound Leads</span>
            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {leads.length}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2">
            Zia Avg Score: 76 / 100
          </div>
        </div>
      </div>

      {/* Two Column Section: Pipeline Funnel & Open Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Pipeline Funnel Breakdown */}
        <div className="lg:col-span-2 bg-white dark:bg-[#151b26] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Sales Pipeline by Stages
              </h3>
              <p className="text-xs text-slate-400">Real-time revenue distribution</p>
            </div>
            <button
              onClick={() => {
                setActiveModule('deals');
                setViewMode('kanban');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center"
            >
              <span>View Kanban</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Pipeline Stage Bars */}
          <div className="space-y-3">
            {PIPELINE_STAGES.map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage.id);
              const stageSum = stageDeals.reduce((sum, d) => sum + d.amount, 0);
              const percentage = totalPipelineRevenue > 0 ? (stageSum / totalPipelineRevenue) * 100 : 0;

              return (
                <div key={stage.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {stage.label} ({stageDeals.length})
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ₹{stageSum.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${Math.max(percentage, stageDeals.length > 0 ? 5 : 0)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Immediate Agenda / Tasks */}
        <div className="bg-white dark:bg-[#151b26] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">My Open Tasks</h3>
              <p className="text-xs text-slate-400">{activeTasks.length} pending to-dos</p>
            </div>
            <button
              onClick={() => openCreateModal('tasks')}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              + Add
            </button>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-80">
            {activeTasks.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">All caught up! No tasks.</div>
            ) : (
              activeTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-lg text-xs flex flex-col gap-1"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {task.subject}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        task.priority === 'High'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between mt-1">
                    <span>{task.relatedTo}</span>
                    <span className="flex items-center text-slate-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Top Value Opportunities Table */}
      <div className="bg-white dark:bg-[#151b26] rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Top Opportunities</h3>
            <p className="text-xs text-slate-400">Highest value pipeline deals requiring focus</p>
          </div>
          <button
            onClick={() => {
              setActiveModule('deals');
              setViewMode('list');
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            View All Deals
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Deal Name</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Account</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Stage</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Probability</th>
                <th className="px-4 py-2.5 font-semibold text-slate-600 dark:text-slate-300">Expected Close</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {[...deals]
                .sort((a, b) => b.amount - a.amount)
                .slice(0, 4)
                .map(deal => (
                  <tr
                    key={deal.id}
                    onClick={() => openDeal(deal.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white">
                      {deal.name}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{deal.accountName}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                      ₹{deal.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{deal.probability}%</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{deal.expectedCloseDate}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
