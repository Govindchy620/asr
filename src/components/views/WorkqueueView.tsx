import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  CheckSquare,
  Calendar,
  Phone,
  GitBranch,
  User,
  Users,
  Contact as ContactIcon,
  Briefcase,
  Megaphone,
  RotateCw,
  Filter,
  SlidersHorizontal,
  Settings,
  Plus,
  ChevronDown,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface WorkqueueTask {
  id: string;
  subject: string;
  dueDate: string;
  isOverdue: boolean;
  status: 'Not Started' | 'In Progress' | 'Completed';
  priority: 'Highest' | 'High' | 'Normal' | 'Low';
  relatedTo: string;
  contactName: string;
}

const INITIAL_WORKQUEUE_TASKS: WorkqueueTask[] = [
  {
    id: 'wq-1',
    subject: 'Register for upcoming CRM Webinars',
    dueDate: 'Yesterday',
    isOverdue: true,
    status: 'Not Started',
    priority: 'Low',
    relatedTo: 'King (Sample)',
    contactName: 'Kris Marrier (Sample)'
  },
  {
    id: 'wq-2',
    subject: 'Competitor Comparison Document',
    dueDate: 'Late by 3 days',
    isOverdue: true,
    status: 'Not Started',
    priority: 'Highest',
    relatedTo: 'Feltz Printing Service',
    contactName: 'Capla Paprocki (Sample)'
  },
  {
    id: 'wq-3',
    subject: 'Get Apporval from Manager',
    dueDate: 'Late by 2 days',
    isOverdue: true,
    status: 'Not Started',
    priority: 'Low',
    relatedTo: 'Chapman',
    contactName: 'Simon Morasca (Sample)'
  },
  {
    id: 'wq-4',
    subject: 'Get Approval from Manager',
    dueDate: 'Today',
    isOverdue: false,
    status: 'In Progress',
    priority: 'Normal',
    relatedTo: 'Commercial Press',
    contactName: 'Leota Dilliard (Sample)'
  },
  {
    id: 'wq-5',
    subject: 'Get Apporval from Manager',
    dueDate: 'Today',
    isOverdue: false,
    status: 'In Progress',
    priority: 'High',
    relatedTo: 'King (Sample)',
    contactName: 'Kris Marrier (Sample)'
  },
  {
    id: 'wq-6',
    subject: 'Customize CRM to your needs',
    dueDate: 'Today',
    isOverdue: false,
    status: 'In Progress',
    priority: 'Normal',
    relatedTo: 'Benton',
    contactName: 'John Butt (Sample)'
  }
];

export const WorkqueueView: React.FC = () => {
  const { leads, contacts, deals, calls, meetings } = useCRM();

  // Selected workqueue tab/category
  const [selectedCategory, setSelectedCategory] = useState<'tasks' | 'meetings' | 'calls' | 'blueprint' | 'my-leads' | 'leads-3h' | 'my-contacts' | 'contacts-3h' | 'my-deals' | 'deals-month' | 'campaigns'>('tasks');
  
  // Filter period dropdown (Today & Overdue, etc.)
  const [activityPeriod, setActivityPeriod] = useState('Today & Overdue');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Table items & selection
  const [tasksList, setTasksList] = useState<WorkqueueTask[]>(INITIAL_WORKQUEUE_TASKS);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Checkbox toggle
  const toggleSelectAll = () => {
    if (selectedTaskIds.length === tasksList.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(tasksList.map(t => t.id));
    }
  };

  const toggleSelectTask = (id: string) => {
    setSelectedTaskIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const markSelectedCompleted = () => {
    setTasksList(prev =>
      prev.map(t => (selectedTaskIds.includes(t.id) ? { ...t, status: 'Completed' as const } : t))
    );
    setSelectedTaskIds([]);
  };

  // Filter tasks based on subjectFilter
  const filteredTasks = tasksList.filter(t => {
    if (subjectFilter === 'All') return true;
    if (subjectFilter === 'Overdue') return t.isOverdue;
    if (subjectFilter === 'Today') return !t.isOverdue;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#f8fafc] dark:bg-[#0b0f17] text-slate-800 dark:text-slate-100 select-none overflow-hidden relative">
      {/* Main Two-Pane Container */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* LEFT SUB-SIDEBAR (Categories & Queues) */}
        <aside className="w-64 sm:w-72 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          {/* Section 1: My Open Activity */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              My Open Activity
            </h3>

            {/* Dropdown Filter */}
            <div className="relative mb-3">
              <select
                value={activityPeriod}
                onChange={e => setActivityPeriod(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-slate-800 dark:text-slate-200 outline-none cursor-pointer focus:border-blue-500 appearance-none pr-8"
              >
                <option value="Today & Overdue">Today & Overdue</option>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Week">This Week</option>
                <option value="Overdue">Overdue</option>
                <option value="All Open">All Open</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Activity Items */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory('tasks')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'tasks'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Tasks</span>
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  {tasksList.filter(t => t.status !== 'Completed').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('meetings')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'meetings'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Meetings</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {meetings.length > 0 ? 0 : 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('calls')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'calls'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Calls</span>
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  1
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: My Jobs */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              My Jobs
            </h3>
            <button
              type="button"
              onClick={() => setSelectedCategory('blueprint')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === 'blueprint'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <GitBranch className="w-4 h-4 text-slate-500" />
                <span>Blueprint</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">0</span>
            </button>
          </div>

          {/* Section 3: My Workqueue */}
          <div className="p-4 flex-1">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                My Workqueue
              </h3>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => alert('Workqueue Settings: Configure auto-assignment rules and priorities.')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Workqueue Settings"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Add Queue: Create a new custom queue view for records.')}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Add Custom Queue"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Group: Leads */}
            <div className="space-y-1 mb-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2.5">
                Leads
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('my-leads')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'my-leads'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px]">
                    👤
                  </div>
                  <span>My Leads</span>
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  {leads.length > 0 ? 10 : 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('leads-3h')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'leads-3h'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-[10px]">
                    👤
                  </div>
                  <span className="truncate max-w-[140px]" title="Leads assigned in last 3 hours">
                    Leads assigned in last 3 hours
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">0</span>
              </button>
            </div>

            {/* Group: Contacts */}
            <div className="space-y-1 mb-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2.5">
                Contacts
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('my-contacts')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'my-contacts'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <ContactIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>My Contacts</span>
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  {contacts.length > 0 ? 10 : 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('contacts-3h')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'contacts-3h'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <ContactIcon className="w-4 h-4 text-purple-400" />
                  <span className="truncate max-w-[140px]" title="Contacts assigned in last 3 hours">
                    Contacts assigned in last 3 ho...
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">0</span>
              </button>
            </div>

            {/* Group: Deals */}
            <div className="space-y-1 mb-3">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2.5">
                Deals
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('my-deals')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'my-deals'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Briefcase className="w-4 h-4 text-rose-500" />
                  <span>My Deals</span>
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  {deals.length > 0 ? 10 : 0}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('deals-month')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'deals-month'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Briefcase className="w-4 h-4 text-rose-400" />
                  <span>Deals Closing This Month</span>
                </div>
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  {deals.length > 0 ? 10 : 0}
                </span>
              </button>
            </div>

            {/* Group: Campaigns */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-2.5">
                Campaigns
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory('campaigns')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === 'campaigns'
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Megaphone className="w-4 h-4 text-amber-500" />
                  <span>My Active Campaigns</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">0</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT DATA TABLE AREA */}
        <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0e131f] overflow-hidden">
          {/* Table Header Bar */}
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#111827] shrink-0">
            <div className="flex items-center space-x-2.5">
              <h2 className="text-base font-bold text-slate-900 dark:text-white capitalize flex items-center gap-1.5">
                {selectedCategory === 'tasks' && 'Tasks'}
                {selectedCategory === 'meetings' && 'Meetings'}
                {selectedCategory === 'calls' && 'Calls'}
                {selectedCategory === 'blueprint' && 'Blueprint Jobs'}
                {selectedCategory === 'my-leads' && 'My Leads'}
                {selectedCategory === 'leads-3h' && 'Leads assigned in last 3 hours'}
                {selectedCategory === 'my-contacts' && 'My Contacts'}
                {selectedCategory === 'contacts-3h' && 'Contacts assigned in last 3 hours'}
                {selectedCategory === 'my-deals' && 'My Deals'}
                {selectedCategory === 'deals-month' && 'Deals Closing This Month'}
                {selectedCategory === 'campaigns' && 'My Active Campaigns'}
              </h2>
              <button
                type="button"
                onClick={handleRefresh}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                title="Refresh Table"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              {/* Batch Actions when tasks are selected */}
              {selectedTaskIds.length > 0 && selectedCategory === 'tasks' && (
                <div className="flex items-center space-x-2 mr-2 animate-in fade-in">
                  <span className="text-xs font-semibold text-blue-600">
                    {selectedTaskIds.length} selected
                  </span>
                  <button
                    type="button"
                    onClick={markSelectedCompleted}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded shadow-xs"
                  >
                    Mark as Completed
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  const opts = ['All', 'Overdue', 'Today'];
                  const nextIdx = (opts.indexOf(subjectFilter) + 1) % opts.length;
                  setSubjectFilter(opts[nextIdx]);
                }}
                className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded flex items-center space-x-1.5 transition-colors"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filter: {subjectFilter}</span>
              </button>

              <button
                type="button"
                onClick={() => alert('Manage Columns: Select columns to display in this Workqueue view.')}
                className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded transition-colors"
                title="Customize Columns"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="flex-1 overflow-auto custom-scrollbar">
            {selectedCategory === 'tasks' ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 sticky top-0 border-b border-slate-200 dark:border-slate-800 z-10 text-slate-600 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="w-10 px-3.5 py-2.5">
                      <input
                        type="checkbox"
                        checked={selectedTaskIds.length === filteredTasks.length && filteredTasks.length > 0}
                        onChange={toggleSelectAll}
                        className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                      />
                    </th>
                    <th className="px-3.5 py-2.5">
                      <div className="inline-flex items-center space-x-1 cursor-pointer">
                        <span>Subject</span>
                        <span className="text-slate-400 font-normal">All ▾</span>
                      </div>
                    </th>
                    <th className="px-3.5 py-2.5">Due Date</th>
                    <th className="px-3.5 py-2.5">Status</th>
                    <th className="px-3.5 py-2.5">Priority</th>
                    <th className="px-3.5 py-2.5">Related To</th>
                    <th className="px-3.5 py-2.5">Contact Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredTasks.map(task => {
                    const isSelected = selectedTaskIds.includes(task.id);
                    return (
                      <tr
                        key={task.id}
                        className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                          isSelected ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        <td className="px-3.5 py-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectTask(task.id)}
                            className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                          />
                        </td>
                        <td className="px-3.5 py-2.5 font-medium text-slate-900 dark:text-slate-100">
                          <span
                            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                            onClick={() => toggleSelectTask(task.id)}
                          >
                            {task.subject}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span
                            className={
                              task.isOverdue
                                ? 'text-rose-600 dark:text-rose-400 font-medium'
                                : 'text-slate-700 dark:text-slate-300'
                            }
                          >
                            {task.dueDate}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                              task.status === 'Completed'
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                                : task.status === 'In Progress'
                                ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 whitespace-nowrap">
                          <span
                            className={`font-medium ${
                              task.priority === 'Highest'
                                ? 'text-rose-600 dark:text-rose-400'
                                : task.priority === 'High'
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300">
                          {task.relatedTo}
                        </td>
                        <td className="px-3.5 py-2.5 text-slate-700 dark:text-slate-300">
                          {task.contactName}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : selectedCategory === 'calls' ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 sticky top-0 border-b border-slate-200 dark:border-slate-800 z-10 text-slate-600 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5">Call Subject</th>
                    <th className="px-3.5 py-2.5">Contact / Lead</th>
                    <th className="px-3.5 py-2.5">Call Type</th>
                    <th className="px-3.5 py-2.5">Scheduled Time</th>
                    <th className="px-3.5 py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="px-3.5 py-2.5 font-medium text-slate-900 dark:text-white">
                      Demo follow-up call with Capla Paprocki
                    </td>
                    <td className="px-3.5 py-2.5">Capla Paprocki (Sample)</td>
                    <td className="px-3.5 py-2.5">Outbound</td>
                    <td className="px-3.5 py-2.5 font-medium text-emerald-600">Today, 3:30 PM</td>
                    <td className="px-3.5 py-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800">
                        Scheduled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : selectedCategory === 'my-leads' ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 sticky top-0 border-b border-slate-200 dark:border-slate-800 z-10 text-slate-600 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5">Lead Name</th>
                    <th className="px-3.5 py-2.5">Company</th>
                    <th className="px-3.5 py-2.5">Email</th>
                    <th className="px-3.5 py-2.5">Phone</th>
                    <th className="px-3.5 py-2.5">Lead Status</th>
                    <th className="px-3.5 py-2.5">Novi Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {leads.slice(0, 10).map(l => (
                    <tr key={l.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">
                        {l.name}
                      </td>
                      <td className="px-3.5 py-2.5">{l.company}</td>
                      <td className="px-3.5 py-2.5 text-blue-600 dark:text-blue-400">{l.email}</td>
                      <td className="px-3.5 py-2.5">{l.phone}</td>
                      <td className="px-3.5 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {l.leadStatus}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 font-bold text-emerald-600">
                        {l.leadScore}/100
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : selectedCategory === 'my-deals' || selectedCategory === 'deals-month' ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 sticky top-0 border-b border-slate-200 dark:border-slate-800 z-10 text-slate-600 dark:text-slate-300 font-semibold">
                  <tr>
                    <th className="px-3.5 py-2.5">Deal Name</th>
                    <th className="px-3.5 py-2.5">Account</th>
                    <th className="px-3.5 py-2.5">Amount</th>
                    <th className="px-3.5 py-2.5">Stage</th>
                    <th className="px-3.5 py-2.5">Close Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {deals.slice(0, 10).map(d => (
                    <tr key={d.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">
                        {d.name}
                      </td>
                      <td className="px-3.5 py-2.5">{d.accountName}</td>
                      <td className="px-3.5 py-2.5 font-bold">₹{d.amount.toLocaleString('en-IN')}</td>
                      <td className="px-3.5 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          {d.stage}
                        </span>
                      </td>
                      <td className="px-3.5 py-2.5 text-slate-600 dark:text-slate-400">
                        {d.expectedCloseDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-slate-400 text-xs">
                <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                <p className="font-semibold text-slate-600 dark:text-slate-300">
                  No records found for the selected view
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Activities assigned to your queue will show up here automatically.
                </p>
              </div>
            )}
          </div>

          {/* Footer Bar: Record Count & Pagination */}
          <div className="shrink-0 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">
              Total Records{' '}
              <strong className="text-slate-900 dark:text-slate-100">
                {selectedCategory === 'tasks'
                  ? filteredTasks.length
                  : selectedCategory === 'calls'
                  ? 1
                  : selectedCategory === 'my-leads' || selectedCategory === 'my-deals' || selectedCategory === 'deals-month'
                  ? 10
                  : 0}
              </strong>
            </span>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-40"
                disabled
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="font-medium">
                1 to{' '}
                {selectedCategory === 'tasks'
                  ? filteredTasks.length
                  : selectedCategory === 'calls'
                  ? 1
                  : selectedCategory === 'my-leads' || selectedCategory === 'my-deals' || selectedCategory === 'deals-month'
                  ? 10
                  : 0}
              </span>
              <button
                type="button"
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-40"
                disabled
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Orange Help Tab (as seen in the top right of the screenshot) */}
      <div className="fixed top-16 right-0 z-20">
        <button
          type="button"
          onClick={() => alert('Zoho Workqueue Help: Manage high-priority queues, overdue tasks, and incoming leads in real time.')}
          className="w-7 h-7 bg-amber-500 hover:bg-amber-600 text-white rounded-l-md shadow-md flex items-center justify-center font-bold text-xs cursor-pointer transition-colors"
          title="Workqueue Help & Documentation"
        >
          ?
        </button>
      </div>
    </div>
  );
};
