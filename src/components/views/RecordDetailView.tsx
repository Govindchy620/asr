import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  Share2,
  CheckCircle,
  Clock,
  Plus,
  Building2,
  User,
  DollarSign,
  Tag,
  Send,
  MessageSquare,
  FileText
} from 'lucide-react';

export const RecordDetailView: React.FC = () => {
  const {
    activeModule,
    selectedRecordId,
    setSelectedRecordId,
    setViewMode,
    leads,
    deals,
    contacts,
    accounts,
    timeline,
    addTimelineItem,
    tasks,
    deleteRecords
  } = useCRM();

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'related'>('overview');
  const [newNote, setNewNote] = useState('');

  // Find the selected record
  let record: any = null;
  let recordType = 'Record';

  if (activeModule === 'leads') {
    record = leads.find(l => l.id === selectedRecordId);
    recordType = 'Lead';
  } else if (activeModule === 'deals') {
    record = deals.find(d => d.id === selectedRecordId);
    recordType = 'Deal';
  } else if (activeModule === 'contacts') {
    record = contacts.find(c => c.id === selectedRecordId);
    recordType = 'Contact';
  } else if (activeModule === 'accounts') {
    record = accounts.find(a => a.id === selectedRecordId);
    recordType = 'Account';
  }

  // Fallback if not found
  if (!record) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500">
        <p>Record not found or has been deleted.</p>
        <button
          onClick={() => {
            setSelectedRecordId(null);
            setViewMode('list');
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
        >
          Back to List
        </button>
      </div>
    );
  }

  const recordTimeline = selectedRecordId && timeline[selectedRecordId] ? timeline[selectedRecordId] : [];
  const relatedTasks = tasks.filter(t => t.relatedTo === record.name || t.relatedTo === record.accountName || t.relatedTo === record.company);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedRecordId) return;

    addTimelineItem(selectedRecordId, {
      type: 'note',
      title: 'New Internal Note',
      description: newNote.trim(),
      user: 'Rajesh Kumar'
    });
    setNewNote('');
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this ${recordType}?`)) {
      deleteRecords(activeModule, [record.id]);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 dark:bg-[#0b0f17] select-none overflow-hidden">
      {/* Top Bar: Breadcrumb + Actions */}
      <div className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={() => {
              setSelectedRecordId(null);
              setViewMode(activeModule === 'deals' ? 'kanban' : 'list');
            }}
            className="flex items-center space-x-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="capitalize">{activeModule}</span>
          </button>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-md">
            {record.name}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {activeModule === 'leads' && (
            <button
              onClick={() => alert(`Lead "${record.name}" conversion to Deal & Contact initiated!`)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-xs flex items-center space-x-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Convert</span>
            </button>
          )}

          <button
            onClick={() => alert(`Compose email to ${record.email || 'client'}`)}
            className="px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg flex items-center space-x-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>

          <button
            onClick={() => alert(`Log a call with ${record.name}`)}
            className="px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg flex items-center space-x-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </button>

          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Two-Pane Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* LEFT PANEL: Business Card Summary + Primary Fields + Related */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {/* Card Summary Header */}
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-sm">
                  {record.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {record.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {record.company || record.accountName || record.title || 'Enterprise Account'}
                  </p>
                </div>
              </div>

              {/* Status/Stage Badge */}
              {(record.stage || record.leadStatus) && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                  {record.stage || record.leadStatus}
                </span>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
              {record.amount !== undefined && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Deal Amount</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    ₹{record.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              {record.leadScore !== undefined && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Zia Lead Score</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    {record.leadScore} / 100
                  </span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block text-[11px]">Owner</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {record.dealOwner || record.leadOwner || record.owner || 'Rajesh Kumar'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Created Date</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {record.createdAt || '2025-02-14'}
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Fields Section */}
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Record Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {record.email && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Email</span>
                  <a href={`mailto:${record.email}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {record.email}
                  </a>
                </div>
              )}
              {record.secondaryEmail && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Secondary Email</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.secondaryEmail}</span>
                </div>
              )}
              {record.phone && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone</span>
                  <a href={`tel:${record.phone}`} className="text-slate-800 dark:text-slate-200 font-medium">
                    {record.phone}
                  </a>
                </div>
              )}
              {record.mobile && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Mobile</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.mobile}</span>
                </div>
              )}
              {record.fax && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Fax</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.fax}</span>
                </div>
              )}
              {record.website && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Website</span>
                  <a href={record.website.startsWith('http') ? record.website : `https://${record.website}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    {record.website}
                  </a>
                </div>
              )}
              {record.leadSource && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Lead Source</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.leadSource}</span>
                </div>
              )}
              {record.industry && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Industry</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.industry}</span>
                </div>
              )}
              {record.noOfEmployees && (
                <div>
                  <span className="text-slate-400 block text-[11px]">No. of Employees</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.noOfEmployees}</span>
                </div>
              )}
              {record.annualRevenue && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Annual Revenue</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.annualRevenue}</span>
                </div>
              )}
              {record.rating && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Rating</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.rating}</span>
                </div>
              )}
              {record.skypeId && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Skype ID</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.skypeId}</span>
                </div>
              )}
              {record.twitter && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Twitter</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">@{record.twitter.replace(/^@/, '')}</span>
                </div>
              )}
              {record.expectedCloseDate && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Expected Close Date</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.expectedCloseDate}</span>
                </div>
              )}
              {record.pipeline && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Pipeline</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{record.pipeline}</span>
                </div>
              )}
            </div>

            {/* Address Details */}
            {(record.city || record.stateProvince || record.country || record.streetAddress || record.flatHouseBuilding) && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-400 block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                  Address Information
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  {[record.flatHouseBuilding, record.streetAddress, record.city, record.stateProvince, record.zipPostalCode, record.country].filter(Boolean).join(', ')}
                </p>
                {record.coordinates && (
                  <span className="text-[10px] text-slate-400 mt-1 block">GPS Coordinates: {record.coordinates}</span>
                )}
              </div>
            )}

            {(record.notes || record.description) && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-400 block text-[11px] mb-1 font-semibold uppercase tracking-wider">Description / Notes</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  {record.description || record.notes}
                </p>
              </div>
            )}
          </div>

          {/* Quick Note Box */}
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>Add a Quick Note</span>
            </h3>
            <form onSubmit={handleAddNote}>
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Write a note or call summary for your team..."
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 resize-none h-20"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center space-x-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Save Note</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL: Activity Timeline & Open Tasks */}
        <div className="w-full lg:w-96 bg-white dark:bg-[#111827] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden shrink-0">
          {/* Header Tab */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Activity Timeline
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              {recordTimeline.length} events
            </span>
          </div>

          {/* Timeline Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {recordTimeline.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No recent activity recorded yet.
              </div>
            ) : (
              recordTimeline.map(item => (
                <div key={item.id} className="relative pl-6 pb-2 border-l border-slate-200 dark:border-slate-800">
                  <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-[#111827]" />
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {item.description}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                    <span>{item.user}</span>
                    <span>{item.timestamp}</span>
                  </div>
                </div>
              ))
            )}

            {/* Related Tasks Widget */}
            {relatedTasks.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Open Tasks ({relatedTasks.length})
                </div>
                <div className="space-y-2">
                  {relatedTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs flex items-start justify-between"
                    >
                      <div>
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {task.subject}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Due: {task.dueDate} • Assigned: {task.assignedTo}
                        </div>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        task.priority === 'High'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
