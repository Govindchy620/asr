import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { ModuleHeader } from '../modules/ModuleHeader';
import { ListView, ColumnDef } from './ListView';
import { KanbanView } from './KanbanView';
import { RecordDetailView } from './RecordDetailView';
import { CreateLeadView } from './CreateLeadView';
import { DashboardView } from './DashboardView';
import { SetupView } from './SetupView';
import { ManageColumnsModal } from '../modals/ManageColumnsModal';
import {
  Lead,
  Deal,
  Contact,
  Account,
  Task,
  CallLog,
  Meeting,
  Campaign,
  Product,
  PriceBook,
  Quote,
  SalesOrder,
  PurchaseOrder,
  Invoice,
  Vendor,
  Forecast,
  DocumentItem,
  Visit,
  ServiceItem,
  Project,
  AgentConfig,
  ReportItem
} from '../../types/crm';
import {
  FileSpreadsheet,
  BarChart3,
  Bot,
  Inbox,
  Share2,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  DollarSign,
  Download,
  ArrowLeft
} from 'lucide-react';

export const MainContent: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    viewMode,
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
    forecasts,
    documents,
    visits,
    services,
    projects,
    agents,
    reports,
    analyticsWidgets,
    setIsCreateReportModalOpen,
    setIsCreateDashboardModalOpen,
    openCreateModal
  } = useCRM();

  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);
  const [isManageColumnsOpen, setIsManageColumnsOpen] = useState(false);
  const [moduleSearch, setModuleSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Records');

  // Leads Columns
  const allLeadColumns: ColumnDef<Lead>[] = [
    {
      key: 'name',
      header: 'Lead Name',
      render: l => (
        <div className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
          {l.name}
        </div>
      )
    },
    { key: 'company', header: 'Company' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'leadStatus',
      header: 'Lead Status',
      render: l => (
        <span
          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
            l.leadStatus === 'Pre-Qualified'
              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
              : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
          }`}
        >
          {l.leadStatus}
        </span>
      )
    },
    {
      key: 'leadScore',
      header: 'Zia Score',
      render: l => (
        <div className="flex items-center space-x-1 font-bold text-xs text-blue-600 dark:text-blue-400">
          <span>{l.leadScore}</span>
          <span className="text-[10px] text-slate-400 font-normal">/100</span>
        </div>
      )
    },
    { key: 'leadOwner', header: 'Owner' }
  ];

  // Deals Columns
  const allDealColumns: ColumnDef<Deal>[] = [
    {
      key: 'name',
      header: 'Deal Name',
      render: d => (
        <div className="font-semibold text-slate-900 dark:text-white hover:text-blue-600">
          {d.name}
        </div>
      )
    },
    { key: 'accountName', header: 'Account' },
    {
      key: 'amount',
      header: 'Amount',
      render: d => (
        <span className="font-bold text-slate-900 dark:text-white">
          ₹{d.amount.toLocaleString('en-IN')}
        </span>
      )
    },
    {
      key: 'stage',
      header: 'Stage',
      render: d => (
        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
          {d.stage}
        </span>
      )
    },
    { key: 'probability', header: 'Probability', render: d => `${d.probability}%` },
    { key: 'expectedCloseDate', header: 'Close Date' },
    { key: 'dealOwner', header: 'Owner' }
  ];

  // Contacts Columns
  const allContactColumns: ColumnDef<Contact>[] = [
    { key: 'name', header: 'Contact Name' },
    { key: 'accountName', header: 'Account' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'department', header: 'Department' },
    { key: 'owner', header: 'Owner' }
  ];

  // Accounts Columns
  const allAccountColumns: ColumnDef<Account>[] = [
    { key: 'name', header: 'Account Name' },
    { key: 'phone', header: 'Phone' },
    { key: 'website', header: 'Website' },
    { key: 'industry', header: 'Industry' },
    {
      key: 'annualRevenue',
      header: 'Annual Revenue',
      render: a => `₹${(a.annualRevenue / 10000000).toFixed(1)} Cr`
    },
    { key: 'billingCity', header: 'City' }
  ];

  // Forecasts Columns
  const allForecastColumns: ColumnDef<Forecast>[] = [
    { key: 'name', header: 'Forecast Name' },
    { key: 'period', header: 'Period' },
    {
      key: 'targetRevenue',
      header: 'Target Revenue',
      render: f => <span className="font-bold">₹{f.targetRevenue.toLocaleString('en-IN')}</span>
    },
    {
      key: 'committedRevenue',
      header: 'Committed',
      render: f => `₹${f.committedRevenue.toLocaleString('en-IN')}`
    },
    {
      key: 'bestCaseRevenue',
      header: 'Best Case',
      render: f => `₹${f.bestCaseRevenue.toLocaleString('en-IN')}`
    },
    { key: 'owner', header: 'Owner' }
  ];

  // Documents Columns
  const allDocumentColumns: ColumnDef<DocumentItem>[] = [
    { key: 'name', header: 'File Name' },
    { key: 'fileType', header: 'Type' },
    { key: 'fileSize', header: 'Size' },
    { key: 'relatedTo', header: 'Associated Record' },
    { key: 'uploadedBy', header: 'Uploaded By' },
    { key: 'uploadDate', header: 'Date' }
  ];

  // Campaigns Columns
  const allCampaignColumns: ColumnDef<Campaign>[] = [
    { key: 'name', header: 'Campaign Name' },
    { key: 'type', header: 'Channel' },
    {
      key: 'status',
      header: 'Status',
      render: c => (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          {c.status}
        </span>
      )
    },
    {
      key: 'budgetedCost',
      header: 'Budget',
      render: c => `₹${c.budgetedCost.toLocaleString('en-IN')}`
    },
    {
      key: 'expectedRevenue',
      header: 'Expected Revenue',
      render: c => <span className="font-bold text-emerald-600">₹{c.expectedRevenue.toLocaleString('en-IN')}</span>
    },
    { key: 'owner', header: 'Owner' }
  ];

  // Tasks Columns
  const allTaskColumns: ColumnDef<Task>[] = [
    { key: 'subject', header: 'Subject' },
    { key: 'relatedTo', header: 'Related Record' },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'priority',
      header: 'Priority',
      render: t => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            t.priority === 'High'
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {t.priority}
        </span>
      )
    },
    { key: 'status', header: 'Status' },
    { key: 'assignedTo', header: 'Assigned To' }
  ];

  // Meetings Columns
  const allMeetingColumns: ColumnDef<Meeting>[] = [
    { key: 'subject', header: 'Meeting Subject' },
    { key: 'startDateTime', header: 'Start Time' },
    { key: 'endDateTime', header: 'End Time' },
    { key: 'location', header: 'Location' },
    { key: 'relatedTo', header: 'Client / Lead' },
    { key: 'host', header: 'Host' },
    { key: 'attendeesCount', header: 'Attendees' }
  ];

  // Calls Columns
  const allCallColumns: ColumnDef<CallLog>[] = [
    { key: 'subject', header: 'Call Subject' },
    { key: 'callType', header: 'Type' },
    { key: 'callDuration', header: 'Duration' },
    { key: 'relatedTo', header: 'Related To' },
    { key: 'purpose', header: 'Purpose' },
    { key: 'caller', header: 'Caller' }
  ];

  // Products Columns
  const allProductColumns: ColumnDef<Product>[] = [
    { key: 'name', header: 'Product Name' },
    { key: 'code', header: 'Product Code' },
    { key: 'category', header: 'Category' },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      render: p => <span className="font-bold">₹{p.unitPrice.toLocaleString('en-IN')}</span>
    },
    { key: 'usageUnit', header: 'Unit' },
    {
      key: 'qtyInStock',
      header: 'In Stock',
      render: p => <span className="font-semibold text-emerald-600">{p.qtyInStock}</span>
    }
  ];

  // Price Books Columns
  const allPriceBookColumns: ColumnDef<PriceBook>[] = [
    { key: 'name', header: 'Price Book Name' },
    { key: 'pricingTier', header: 'Tier' },
    { key: 'currency', header: 'Currency' },
    { key: 'description', header: 'Description' },
    { key: 'owner', header: 'Owner' }
  ];

  // Quotes Columns
  const allQuoteColumns: ColumnDef<Quote>[] = [
    { key: 'quoteNumber', header: 'Quote #' },
    { key: 'subject', header: 'Quote Subject' },
    { key: 'accountName', header: 'Account' },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: q => <span className="font-bold">₹{q.totalAmount.toLocaleString('en-IN')}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: q => (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
          {q.status}
        </span>
      )
    },
    { key: 'validTill', header: 'Valid Till' },
    { key: 'owner', header: 'Owner' }
  ];

  // Sales Orders Columns
  const allSalesOrderColumns: ColumnDef<SalesOrder>[] = [
    { key: 'soNumber', header: 'SO #' },
    { key: 'subject', header: 'Subject' },
    { key: 'accountName', header: 'Account' },
    {
      key: 'totalAmount',
      header: 'Order Value',
      render: s => <span className="font-bold">₹{s.totalAmount.toLocaleString('en-IN')}</span>
    },
    { key: 'status', header: 'Status' },
    { key: 'orderDate', header: 'Order Date' }
  ];

  // Purchase Orders Columns
  const allPurchaseOrderColumns: ColumnDef<PurchaseOrder>[] = [
    { key: 'poNumber', header: 'PO #' },
    { key: 'subject', header: 'Order Subject' },
    { key: 'vendorName', header: 'Vendor' },
    {
      key: 'totalAmount',
      header: 'Total Amount',
      render: p => <span className="font-bold">₹{p.totalAmount.toLocaleString('en-IN')}</span>
    },
    { key: 'status', header: 'Status' },
    { key: 'orderDate', header: 'Date' }
  ];

  // Invoices Columns
  const allInvoiceColumns: ColumnDef<Invoice>[] = [
    { key: 'invoiceNumber', header: 'Invoice #' },
    { key: 'subject', header: 'Subject' },
    { key: 'accountName', header: 'Account' },
    {
      key: 'totalAmount',
      header: 'Invoice Amount',
      render: i => <span className="font-bold">₹{i.totalAmount.toLocaleString('en-IN')}</span>
    },
    {
      key: 'status',
      header: 'Status',
      render: i => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
          i.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {i.status}
        </span>
      )
    },
    { key: 'dueDate', header: 'Due Date' }
  ];

  // Vendors Columns
  const allVendorColumns: ColumnDef<Vendor>[] = [
    { key: 'name', header: 'Vendor Name' },
    { key: 'contactName', header: 'Contact Person' },
    { key: 'phone', header: 'Phone' },
    { key: 'email', header: 'Email' },
    { key: 'city', header: 'City' },
    { key: 'owner', header: 'Owner' }
  ];

  // Visits Columns
  const allVisitColumns: ColumnDef<Visit>[] = [
    { key: 'subject', header: 'Visit Subject' },
    { key: 'relatedRecord', header: 'Client' },
    { key: 'location', header: 'Location' },
    { key: 'checkInTime', header: 'Check In' },
    { key: 'checkOutTime', header: 'Check Out' },
    { key: 'salesRep', header: 'Sales Rep' }
  ];

  // Services Columns
  const allServiceColumns: ColumnDef<ServiceItem>[] = [
    { key: 'name', header: 'Service Name' },
    { key: 'code', header: 'Service Code' },
    {
      key: 'unitPrice',
      header: 'Unit Price',
      render: s => <span className="font-bold">₹{s.unitPrice.toLocaleString('en-IN')}</span>
    },
    { key: 'taxPercent', header: 'GST / Tax %', render: s => `${s.taxPercent}%` },
    { key: 'duration', header: 'Contract Term' }
  ];

  // Projects Columns
  const allProjectColumns: ColumnDef<Project>[] = [
    { key: 'name', header: 'Project Title' },
    { key: 'clientName', header: 'Client Account' },
    {
      key: 'budget',
      header: 'Budget',
      render: p => `₹${p.budget.toLocaleString('en-IN')}`
    },
    {
      key: 'progress',
      header: 'Progress',
      render: p => (
        <div className="flex items-center space-x-2 w-28">
          <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${p.progress}%` }} />
          </div>
          <span className="text-[10px] font-bold">{p.progress}%</span>
        </div>
      )
    },
    { key: 'status', header: 'Status' },
    { key: 'endDate', header: 'Target End' }
  ];

  // Agents Columns
  const allAgentColumns: ColumnDef<AgentConfig>[] = [
    { key: 'name', header: 'Agent Name' },
    { key: 'type', header: 'Specialization' },
    { key: 'trigger', header: 'Trigger Event' },
    { key: 'action', header: 'Automated Action' },
    {
      key: 'status',
      header: 'Status',
      render: a => (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
          {a.status}
        </span>
      )
    }
  ];

  // If viewing Record Detail View
  if (viewMode === 'detail' && selectedRecordId) {
    return <RecordDetailView />;
  }

  // If creating a new Lead
  if (activeModule === 'leads' && viewMode === 'create') {
    return <CreateLeadView />;
  }

  // 1. Home
  if (activeModule === 'home') return <DashboardView />;

  // 2. Setup
  if (activeModule === 'setup') return <SetupView />;

  // 3. Reports
  if (activeModule === 'reports') {
    // If a report is actively being viewed/run
    if (activeReport) {
      const exportCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
          activeReport.columns.join(",") + "\n" +
          "Sample Record 1,Demo Account,₹15,00,000,Pre-Qualified,Today\n" +
          "Sample Record 2,Enterprise Corp,₹45,00,000,Won,Yesterday\n";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${activeReport.name.replace(/\s+/g, '_')}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      };

      return (
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#111827] select-none">
          {/* Report Viewer Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/40">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveReport(null)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1 text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Reports</span>
              </button>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeReport.name}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {activeReport.reportType} Report
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    Module: {activeReport.module}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Last run: {activeReport.lastRun} • Created by {activeReport.createdBy}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={exportCSV}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={exportCSV}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center space-x-1 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Excel</span>
              </button>
            </div>
          </div>

          {/* Report Data Preview Table */}
          <div className="flex-1 overflow-auto p-4">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 sticky top-0 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="w-8 px-3 py-2.5 text-slate-400 font-normal">#</th>
                  {activeReport.columns.map(col => (
                    <th key={col} className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[1, 2, 3, 4, 5, 6].map(idx => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-2.5 text-slate-400">{idx}</td>
                    {activeReport.columns.map((col, cIdx) => (
                      <td key={col} className="px-4 py-2.5 text-slate-800 dark:text-slate-200 whitespace-nowrap">
                        {cIdx === 0 ? `Record Entry #${idx}` : cIdx === 2 ? `₹${(idx * 750000).toLocaleString('en-IN')}` : `Item Val ${idx}`}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Reports Catalog View
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-[#0b0f17] select-none">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Reports & Dashboards</h1>
              <p className="text-xs text-slate-400">Pre-built + custom reports: Tabular, Summary, Matrix, and Pivot</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateReportModalOpen(true)}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1"
          >
            <span>+ Create Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reports.map(r => (
            <div
              key={r.id}
              onClick={() => setActiveReport(r)}
              className="p-4 bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md cursor-pointer shadow-xs transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {r.name}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {r.reportType}
                </span>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Module: <span className="font-semibold text-slate-700 dark:text-slate-300">{r.module}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>{r.rows}</span>
                <span className="text-[11px]">{r.lastRun}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. Analytics
  if (activeModule === 'analytics') {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-[#0b0f17] select-none space-y-6 custom-scrollbar">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Analytics Studio</h1>
              <p className="text-xs text-slate-400">Advanced cross-module dashboards, AI insights, and conversion funnels</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateDashboardModalOpen(true)}
            className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center space-x-1"
          >
            <span>+ Create Dashboard</span>
          </button>
        </div>

        {/* Dynamic Analytics Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analyticsWidgets.map(widget => (
            <div
              key={widget.id}
              className="bg-white dark:bg-[#151b26] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {widget.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-1">
                    <span>Source: {widget.dataSource}</span>
                    <span>•</span>
                    <span>{widget.dimension}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {widget.chartType} Widget
                </span>
              </div>

              {/* Metric Value Display */}
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4">
                {widget.value}
              </div>

              {/* Visual Representation Bar according to widget type */}
              {widget.chartType === 'Bar' && (
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68.75%' }} />
                </div>
              )}

              {widget.chartType === 'Funnel' && (
                <div className="space-y-1.5 mt-3">
                  <div className="w-full bg-blue-500/90 h-2 rounded-full" style={{ width: '100%' }} />
                  <div className="w-full bg-indigo-500/90 h-2 rounded-full" style={{ width: '75%' }} />
                  <div className="w-full bg-purple-500/90 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              )}

              {widget.chartType === 'Pie' && (
                <div className="flex items-center space-x-2 mt-3">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full" style={{ width: '52%' }} />
                    <div className="bg-indigo-500 h-full" style={{ width: '28%' }} />
                    <div className="bg-purple-500 h-full" style={{ width: '20%' }} />
                  </div>
                </div>
              )}

              {/* Subtitle & Growth */}
              <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>{widget.subtitle}</span>
                {widget.growth && (
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {widget.growth}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. SalesInbox
  if (activeModule === 'salesinbox') {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#111827]">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Inbox className="w-5 h-5 text-blue-500" />
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">SalesInbox</h1>
            <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold">
              Synced with CRM
            </span>
          </div>
        </div>
        <div className="flex-1 p-6 space-y-3 overflow-y-auto">
          {[
            { sender: 'Aarav Sharma', subj: 'Re: Enterprise Cloud Proposal Revision v2.4', time: '10:45 AM', deal: 'Enterprise Cloud Suite' },
            { sender: 'Priya Narang', subj: 'Inquiry regarding hardware POS warranty & SLA', time: 'Yesterday', deal: 'Multi-Store POS Integration' },
            { sender: 'Elena Rostova', subj: 'Executed MSA Signed Copy attached', time: 'Mar 02', deal: 'Nordic EU Security Compliance' }
          ].map(e => (
            <div key={e.subj} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">{e.sender}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{e.subj}</div>
                <div className="text-[10px] text-blue-500 mt-1">Linked Deal: {e.deal}</div>
              </div>
              <span className="text-xs text-slate-400">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6. Social
  if (activeModule === 'social') {
    return (
      <div className="flex-1 p-6 bg-slate-50 dark:bg-[#0b0f17] select-none space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Share2 className="w-5 h-5 text-blue-500" />
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Social Engagement Streams</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Twitter / X Brand Mentions</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">"Excited to partner with Fintech Nexus Labs for cloud rollout!"</p>
            <span className="text-[10px] text-blue-500 mt-2 block">1 hour ago • Auto-associated to Account</span>
          </div>
          <div className="bg-white dark:bg-[#151b26] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">LinkedIn Corporate Page</h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">Apex Retail Solutions shared your latest POS modernization study.</p>
            <span className="text-[10px] text-blue-500 mt-2 block">Yesterday • High Buyer Intent Flagged</span>
          </div>
        </div>
      </div>
    );
  }

  // Deals Kanban
  if (activeModule === 'deals' && viewMode === 'kanban') {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <ModuleHeader
          title="Deals Pipeline"
          count={deals.length}
          searchValue={moduleSearch}
          onSearchChange={setModuleSearch}
          filterOptions={['All Deals', 'My Deals', 'Closing This Month']}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <KanbanView />
      </div>
    );
  }

  // Dynamic generic list rendering helper for standard table modules
  const renderModuleList = (title: string, data: any[], columns: ColumnDef<any>[], entityName: string, filterOptions?: string[]) => {
    const filtered = data.filter(item => {
      const searchStr = moduleSearch.toLowerCase();
      return (
        (item.name && item.name.toLowerCase().includes(searchStr)) ||
        (item.subject && item.subject.toLowerCase().includes(searchStr)) ||
        (item.company && item.company.toLowerCase().includes(searchStr)) ||
        (item.accountName && item.accountName.toLowerCase().includes(searchStr))
      );
    });

    return (
      <div className="flex-1 flex flex-col min-h-0">
        <ModuleHeader
          title={title}
          count={filtered.length}
          searchValue={moduleSearch}
          onSearchChange={setModuleSearch}
          filterOptions={filterOptions}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onManageColumns={() => setIsManageColumnsOpen(true)}
        />
        <ListView
          data={filtered}
          columns={columns}
          entityName={entityName}
          onRowClick={item => {
            if (activeModule === 'leads' || activeModule === 'deals' || activeModule === 'contacts' || activeModule === 'accounts') {
              setSelectedRecordId(item.id);
              setViewMode('detail');
            }
          }}
        />
        <ManageColumnsModal
          isOpen={isManageColumnsOpen}
          onClose={() => setIsManageColumnsOpen(false)}
          allColumns={columns.map(c => ({ key: c.key, header: c.header }))}
          visibleKeys={columns.map(c => c.key)}
          onSave={() => {}}
        />
      </div>
    );
  };

  switch (activeModule) {
    case 'leads': return renderModuleList('Leads', leads, allLeadColumns, 'Lead', ['All Leads', 'Pre-Qualified', 'Contacted']);
    case 'deals': return renderModuleList('Deals', deals, allDealColumns, 'Deal', ['All Deals', 'Closing Soon']);
    case 'contacts': return renderModuleList('Contacts', contacts, allContactColumns, 'Contact');
    case 'accounts': return renderModuleList('Accounts', accounts, allAccountColumns, 'Account');
    case 'forecasts': return renderModuleList('Forecasts', forecasts, allForecastColumns, 'Forecast');
    case 'documents': return renderModuleList('Documents', documents, allDocumentColumns, 'Document');
    case 'campaigns': return renderModuleList('Campaigns', campaigns, allCampaignColumns, 'Campaign');
    case 'tasks': return renderModuleList('Tasks', tasks, allTaskColumns, 'Task');
    case 'meetings': return renderModuleList('Meetings', meetings, allMeetingColumns, 'Meeting');
    case 'calls': return renderModuleList('Calls', calls, allCallColumns, 'Call');
    case 'products': return renderModuleList('Products', products, allProductColumns, 'Product');
    case 'pricebooks': return renderModuleList('Price Books', pricebooks, allPriceBookColumns, 'Price Book');
    case 'quotes': return renderModuleList('Quotes', quotes, allQuoteColumns, 'Quote');
    case 'salesorders': return renderModuleList('Sales Orders', salesorders, allSalesOrderColumns, 'Sales Order');
    case 'purchaseorders': return renderModuleList('Purchase Orders', purchaseorders, allPurchaseOrderColumns, 'Purchase Order');
    case 'invoices': return renderModuleList('Invoices', invoices, allInvoiceColumns, 'Invoice');
    case 'vendors': return renderModuleList('Vendors', vendors, allVendorColumns, 'Vendor');
    case 'visits': return renderModuleList('Visits', visits, allVisitColumns, 'Visit');
    case 'services': return renderModuleList('Services', services, allServiceColumns, 'Service');
    case 'projects': return renderModuleList('Projects', projects, allProjectColumns, 'Project');
    case 'agents': return renderModuleList('Agents (Zia AI)', agents, allAgentColumns, 'Agent');
    default: return <DashboardView />;
  }
};
