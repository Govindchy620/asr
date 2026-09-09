import React, { useState, useEffect } from 'react';
import { useCRM } from '../../context/CRMContext';
import { ConvertLeadModal } from '../modals/ConvertLeadModal';
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
  FileText,
  Briefcase,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

export const RecordDetailView: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    selectedRecordId,
    setSelectedRecordId,
    setViewMode,
    leads,
    deals,
    contacts,
    accounts,
    tasks,
    meetings,
    calls,
    campaigns,
    products,
    pricebooks,
    quotes,
    salesorders,
    purchaseorders,
    invoices,
    vendors,
    timeline,
    addTimelineItem,
    deleteRecords,
    fetchRecordById
  } = useCRM();

  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'related'>('overview');
  const [newNote, setNewNote] = useState('');
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [liveRecord, setLiveRecord] = useState<any>(null);

  // Find the selected record in memory or fetch live from backend
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
  } else {
    const listMap: Record<string, any[]> = {
      tasks, meetings, calls, campaigns, products, pricebooks, quotes, salesorders, purchaseorders, invoices, vendors
    };
    const list = listMap[activeModule] || [];
    record = list.find((item: any) => item.id === selectedRecordId);
    recordType = activeModule.charAt(0).toUpperCase() + activeModule.slice(1, -1);
  }

  // Fallback to liveRecord fetched from backend if not yet in state
  const currentRecord = record || liveRecord;

  useEffect(() => {
    if (!record && selectedRecordId) {
      fetchRecordById(activeModule, selectedRecordId).then(res => {
        if (res) setLiveRecord(res);
      });
    }
  }, [record, selectedRecordId, activeModule, fetchRecordById]);

  // Fallback if not found
  if (!currentRecord) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500">
        <AlertCircle className="w-12 h-12 text-slate-400 mb-3" />
        <p className="font-medium text-sm">Record not found or loading from MongoDB...</p>
        <button
          onClick={() => {
            setSelectedRecordId(null);
            setViewMode('list');
          }}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs"
        >
          Back to List
        </button>
      </div>
    );
  }

  const recordTimeline = selectedRecordId && timeline[selectedRecordId] ? timeline[selectedRecordId] : [];
  
  // Related entities lookup
  const relatedContacts = activeModule === 'accounts'
    ? contacts.filter(c => c.accountId === currentRecord.id || c.accountName?.toLowerCase() === currentRecord.name?.toLowerCase())
    : [];
    
  const relatedDeals = activeModule === 'accounts'
    ? deals.filter(d => d.accountId === currentRecord.id || d.accountName?.toLowerCase() === currentRecord.name?.toLowerCase())
    : activeModule === 'contacts'
    ? deals.filter(d => d.contactId === currentRecord.id || d.contactName?.toLowerCase() === currentRecord.name?.toLowerCase())
    : [];

  const relatedTasks = tasks.filter(t => 
    t.relatedTo === currentRecord.name || 
    t.relatedTo === currentRecord.accountName || 
    t.relatedTo === currentRecord.company
  );

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedRecordId) return;

    await addTimelineItem(selectedRecordId, {
      type: 'note',
      title: 'Internal Note',
      description: newNote.trim(),
      user: 'Govind Choudhary'
    });
    setNewNote('');
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete this ${recordType}? This will permanently remove it from MongoDB Atlas.`)) {
      try {
        await deleteRecords(activeModule, [currentRecord.id]);
        setSelectedRecordId(null);
        setViewMode('list');
      } catch (err: any) {
        alert(`Error deleting record: ${err.message}`);
      }
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
            {currentRecord.name}
          </span>
          {currentRecord.isConverted && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Converted
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {activeModule === 'leads' && !currentRecord.isConverted && (
            <button
              onClick={() => setIsConvertModalOpen(true)}
              className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm shadow-emerald-500/20 flex items-center space-x-1.5 transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Convert Lead</span>
            </button>
          )}

          <a
            href={`mailto:${currentRecord.email || ''}`}
            className="px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg flex items-center space-x-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <a
            href={`tel:${currentRecord.phone || currentRecord.mobile || ''}`}
            className="px-2.5 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg flex items-center space-x-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
            title="Delete Record from Database"
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
                  {currentRecord.name ? currentRecord.name.charAt(0) : 'R'}
                </div>
                <div>
                  <h1 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    {currentRecord.name}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                    {currentRecord.title && <span>{currentRecord.title}</span>}
                    {currentRecord.company && <span>• {currentRecord.company}</span>}
                    {currentRecord.accountName && <span>• {currentRecord.accountName}</span>}
                  </p>
                </div>
              </div>

              {currentRecord.leadScore !== undefined && (
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Novi Score</div>
                  <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    {currentRecord.leadScore}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact Chips */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
              {currentRecord.email && (
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <a href={`mailto:${currentRecord.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                    {currentRecord.email}
                  </a>
                </div>
              )}
              {(currentRecord.phone || currentRecord.mobile) && (
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{currentRecord.phone || currentRecord.mobile}</span>
                </div>
              )}
              {currentRecord.leadOwner && (
                <div className="flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Owner: {currentRecord.leadOwner}</span>
                </div>
              )}
              {currentRecord.accountOwner && (
                <div className="flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Owner: {currentRecord.accountOwner}</span>
                </div>
              )}
              {currentRecord.dealOwner && (
                <div className="flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>Owner: {currentRecord.dealOwner}</span>
                </div>
              )}
            </div>
          </div>

          {/* Primary Details Grid */}
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {recordType} Information (MongoDB Atlas)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-4 text-xs">
              {currentRecord.leadStatus && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Lead Status</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{currentRecord.leadStatus}</span>
                </div>
              )}
              {currentRecord.leadSource && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Lead Source</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{currentRecord.leadSource}</span>
                </div>
              )}
              {currentRecord.industry && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Industry</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{currentRecord.industry}</span>
                </div>
              )}
              {currentRecord.annualRevenue && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Annual Revenue</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{currentRecord.annualRevenue}</span>
                </div>
              )}
              {currentRecord.stage && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Deal Stage</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentRecord.stage}</span>
                </div>
              )}
              {currentRecord.amount !== undefined && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Amount</span>
                  <span className="text-slate-900 dark:text-white font-bold text-sm">
                    ₹{Number(currentRecord.amount).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
              {currentRecord.website && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Website</span>
                  <a href={currentRecord.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                    {currentRecord.website}
                  </a>
                </div>
              )}
              {currentRecord.createdAt && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Created Date</span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">{currentRecord.createdAt}</span>
                </div>
              )}
            </div>

            {/* Address Information */}
            {(currentRecord.address?.city || currentRecord.city || currentRecord.billingAddress?.city) && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-400 block text-[11px] mb-1 font-semibold uppercase tracking-wider">
                  Address Location
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  {[
                    currentRecord.address?.flatHouseNo || currentRecord.billingAddress?.flatHouseNo,
                    currentRecord.address?.streetAddress || currentRecord.billingAddress?.streetAddress,
                    currentRecord.address?.city || currentRecord.city || currentRecord.billingAddress?.city,
                    currentRecord.address?.stateProvince || currentRecord.stateProvince || currentRecord.billingAddress?.stateProvince,
                    currentRecord.address?.zipPostalCode || currentRecord.zipPostalCode || currentRecord.billingAddress?.zipPostalCode,
                    currentRecord.address?.countryRegion || currentRecord.country || currentRecord.billingAddress?.countryRegion
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            )}

            {currentRecord.description && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-400 block text-[11px] mb-1 font-semibold uppercase tracking-wider">Description</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  {currentRecord.description}
                </p>
              </div>
            )}
          </div>

          {/* RELATED LISTS SECTION */}
          {activeModule === 'accounts' && (
            <div className="space-y-4">
              {/* Related Contacts */}
              <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-blue-500" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Contacts ({relatedContacts.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveModule('contacts');
                      setViewMode('create');
                    }}
                    className="px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> New Contact
                  </button>
                </div>
                {relatedContacts.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No contacts linked to this account yet.</p>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {relatedContacts.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setActiveModule('contacts');
                          setSelectedRecordId(c.id);
                        }}
                        className="py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer rounded px-2"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{c.name}</div>
                          <div className="text-[11px] text-slate-400">{c.email} • {c.phone}</div>
                        </div>
                        <span className="text-xs text-blue-600 font-medium">View &rarr;</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Related Deals */}
              <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Deals ({relatedDeals.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setActiveModule('deals');
                      setViewMode('create');
                    }}
                    className="px-2 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> New Deal
                  </button>
                </div>
                {relatedDeals.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No deals active for this account.</p>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {relatedDeals.map(d => (
                      <div
                        key={d.id}
                        onClick={() => {
                          setActiveModule('deals');
                          setSelectedRecordId(d.id);
                        }}
                        className="py-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer rounded px-2"
                      >
                        <div>
                          <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{d.name}</div>
                          <div className="text-[11px] text-slate-400">Stage: {d.stage}</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          ₹{Number(d.amount).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quick Note Box */}
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
              <span>Add a Quick Note (Persisted to Database)</span>
            </h3>
            <form onSubmit={handleAddNote}>
              <textarea
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                placeholder="Write an internal note or update for your sales team..."
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-blue-500 resize-none h-20"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center space-x-1 transition-all"
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
                          Due: {task.dueDate} • Assigned: {task.assignedTo || 'Govind Choudhary'}
                        </div>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        task.priority === 'High'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                      }`}>
                        {task.priority || 'Normal'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Lead Modal */}
      {isConvertModalOpen && (
        <ConvertLeadModal
          lead={currentRecord}
          isOpen={isConvertModalOpen}
          onClose={() => setIsConvertModalOpen(false)}
        />
      )}
    </div>
  );
};
