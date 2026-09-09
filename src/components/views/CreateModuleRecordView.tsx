import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Code2,
  Pin,
  MessageSquare,
  Users,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  Info,
  DollarSign,
  Calendar,
  Briefcase,
  CheckSquare,
  PhoneCall,
  Package,
  Megaphone,
  FileText,
  FileSpreadsheet,
  Truck,
  TrendingUp,
  FolderOpen,
  Wrench,
  FolderGit2
} from 'lucide-react';
import { ModuleType } from '../../types/crm';

export const CreateModuleRecordView: React.FC = () => {
  const {
    activeModule,
    setViewMode,
    setSelectedRecordId,
    accounts,
    contacts,
    vendors,
    deals,
    addDeal,
    addTask,
    addMeeting,
    addCall,
    addCampaign,
    addProduct,
    addPriceBook,
    addQuote,
    addSalesOrder,
    addPurchaseOrder,
    addInvoice,
    addVendor,
    addForecast,
    addDocument,
    addService,
    addProject
  } = useCRM();

  // Common field states
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('15,00,000');
  const [stage, setStage] = useState('Qualification');
  const [status, setStatus] = useState('Draft');
  const [priority, setPriority] = useState('Normal');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]);
  const [accountSelect, setAccountSelect] = useState(accounts[0]?.name || 'Fintech Nexus Labs');
  const [contactSelect, setContactSelect] = useState(contacts[0]?.name || 'Rajesh Sharma');
  const [vendorSelect, setVendorSelect] = useState(vendors[0]?.name || 'Cisco Telecom Infrastructure India');
  const [dealSelect, setDealSelect] = useState(deals[0]?.name || 'Enterprise Cloud Suite');
  const [description, setDescription] = useState('');

  // Module specific extra fields
  const [type, setType] = useState('Standard');
  const [pipeline, setPipeline] = useState('Standard Sales Pipeline');
  const [leadSource, setLeadSource] = useState('Web Direct');
  const [probability, setProbability] = useState('20');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('contact@example.com');
  const [website, setWebsite] = useState('https://example.com');
  const [duration, setDuration] = useState('30 mins');
  const [location, setLocation] = useState('Online Zoom / Zoho Meeting');
  const [quantity, setQuantity] = useState('100');
  const [tax, setTax] = useState('18');
  const [code, setCode] = useState(`PRD-${Math.floor(1000 + Math.random() * 9000)}`);
  const [period, setPeriod] = useState('Q2 2025');

  // UI state
  const [formView, setFormView] = useState('Standard View');
  const [showClientScriptDrawer, setShowClientScriptDrawer] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'deals': return 'Create Deal';
      case 'tasks': return 'Create Task';
      case 'meetings': return 'Schedule Meeting';
      case 'calls': return 'Log a Call';
      case 'campaigns': return 'Create Campaign';
      case 'products': return 'Create Product';
      case 'pricebooks': return 'Create Price Book';
      case 'quotes': return 'Create Quote';
      case 'salesorders': return 'Create Sales Order';
      case 'purchaseorders': return 'Create Purchase Order';
      case 'invoices': return 'Create Invoice';
      case 'vendors': return 'Create Vendor';
      case 'forecasts': return 'Create Forecast';
      case 'documents': return 'Upload Document';
      case 'services': return 'Create Service';
      case 'projects': return 'Create Project';
      default: return `Create ${activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}`;
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (activeModule === 'deals' && !name.trim()) errs.name = 'Deal Name cannot be empty';
    if ((activeModule === 'tasks' || activeModule === 'quotes' || activeModule === 'salesorders' || activeModule === 'purchaseorders' || activeModule === 'invoices') && !subject.trim()) {
      errs.subject = 'Subject cannot be empty';
    }
    if ((activeModule === 'meetings' || activeModule === 'calls') && !title.trim()) errs.title = 'Title / Subject cannot be empty';
    if ((activeModule === 'products' || activeModule === 'vendors' || activeModule === 'forecasts' || activeModule === 'services' || activeModule === 'projects' || activeModule === 'campaigns' || activeModule === 'pricebooks' || activeModule === 'documents') && !name.trim()) {
      errs.name = 'Name cannot be empty';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setName('');
    setSubject('');
    setTitle('');
    setDescription('');
    setErrors({});
  };

  const handleSave = async (saveAndNew = false) => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const cleanAmount = parseInt(amount.replace(/[^0-9]/g, ''), 10) || 500000;
    const cleanQty = parseInt(quantity.replace(/[^0-9]/g, ''), 10) || 1;
    let created: any = null;

    try {
      switch (activeModule) {
        case 'deals':
          created = await addDeal({
          name: name.trim(),
          accountName: accountSelect,
          contactName: contactSelect,
          amount: cleanAmount,
          stage: (stage as any) || 'Qualification',
          probability: parseInt(probability, 10) || 20,
          expectedCloseDate: date,
          dealOwner: 'Govind Choudhary',
          pipeline,
          leadSource
        });
        break;

      case 'tasks':
        addTask({
          subject: subject.trim(),
          dueDate: date,
          priority: priority === 'Highest' ? 'High' : (priority as any) || 'Normal',
          status: (status as any) || 'Not Started',
          relatedTo: accountSelect,
          relatedType: 'Account',
          assignedTo: 'Govind Choudhary'
        });
        break;

      case 'meetings':
        addMeeting({
          subject: title.trim(),
          startDateTime: `${date} 10:00 AM`,
          endDateTime: `${date} 11:00 AM`,
          location: location || 'Online Zoom / Zoho Meeting',
          relatedTo: accountSelect,
          host: 'Govind Choudhary',
          attendeesCount: 2
        });
        break;

      case 'calls':
        addCall({
          subject: title.trim() || 'Follow-up Call',
          callType: (type as any) || 'Outbound',
          callDuration: duration,
          callStartTime: `${date} 03:30 PM`,
          relatedTo: accountSelect,
          purpose: 'Discussion',
          callResult: status || 'Interested',
          caller: 'Govind Choudhary'
        });
        break;

      case 'campaigns':
        addCampaign({
          name: name.trim(),
          type: type || 'Email Campaign',
          status: status === 'Active' ? 'In Progress' : status === 'Planning' ? 'Planned' : (status as any) || 'Planned',
          startDate: date,
          endDate,
          budgetedCost: Math.round(cleanAmount * 0.2),
          actualCost: 0,
          expectedRevenue: cleanAmount,
          owner: 'Govind Choudhary'
        });
        break;

      case 'products':
        addProduct({
          name: name.trim(),
          code: code || `PRD-${Date.now().toString().slice(-4)}`,
          category: type || 'Hardware',
          unitPrice: cleanAmount,
          usageUnit: 'Units',
          qtyInStock: cleanQty,
          reorderLevel: 10,
          active: true
        });
        break;

      case 'pricebooks':
        addPriceBook({
          name: name.trim(),
          currency: 'INR',
          active: true,
          pricingTier: type || 'Standard Tier',
          description: description || 'Standard Tier Price Book',
          owner: 'Govind Choudhary'
        });
        break;

      case 'quotes':
        addQuote({
          quoteNumber: `QUO-${Date.now().toString().slice(-4)}`,
          subject: subject.trim(),
          accountName: accountSelect,
          contactName: contactSelect,
          validTill: endDate,
          totalAmount: cleanAmount,
          status: status === 'Approved' ? 'Accepted' : (status as any) || 'Draft',
          owner: 'Govind Choudhary'
        });
        break;

      case 'salesorders':
        addSalesOrder({
          soNumber: `SO-${Date.now().toString().slice(-4)}`,
          subject: subject.trim(),
          accountName: accountSelect,
          orderDate: date,
          totalAmount: cleanAmount,
          status: status === 'Active' ? 'In Progress' : (status as any) || 'Draft',
          owner: 'Govind Choudhary'
        });
        break;

      case 'purchaseorders':
        addPurchaseOrder({
          poNumber: `PO-${Date.now().toString().slice(-4)}`,
          subject: subject.trim(),
          vendorName: vendorSelect,
          orderDate: date,
          totalAmount: cleanAmount,
          status: status === 'Active' ? 'Sent' : (status as any) || 'Draft',
          owner: 'Govind Choudhary'
        });
        break;

      case 'invoices':
        addInvoice({
          invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
          subject: subject.trim(),
          accountName: accountSelect,
          invoiceDate: date,
          dueDate: endDate,
          status: (status as any) || 'Draft',
          totalAmount: cleanAmount,
          owner: 'Govind Choudhary'
        });
        break;

      case 'vendors':
        addVendor({
          name: name.trim(),
          contactName: contactSelect,
          phone: phone || '+91 22 2345 6789',
          email: email || 'vendor@supply.com',
          website: website || 'https://supplynetwork.com',
          city: 'Mumbai',
          owner: 'Govind Choudhary'
        });
        break;

      case 'forecasts':
        addForecast({
          name: name.trim(),
          period: period || 'Q2 2025',
          targetRevenue: cleanAmount,
          committedRevenue: Math.round(cleanAmount * 0.7),
          bestCaseRevenue: Math.round(cleanAmount * 1.1),
          closedRevenue: 0,
          owner: 'Govind Choudhary'
        });
        break;

      case 'documents':
        addDocument({
          name: name.trim(),
          fileType: type || 'PDF',
          fileSize: '2.4 MB',
          relatedTo: accountSelect,
          uploadedBy: 'Govind Choudhary'
        });
        break;

      case 'services':
        addService({
          name: name.trim(),
          code: `SRV-${Date.now().toString().slice(-4)}`,
          unitPrice: cleanAmount,
          taxPercent: 18,
          duration: duration || '40 hrs',
          category: type || 'Consulting'
        });
        break;

      case 'projects':
        addProject({
          name: name.trim(),
          clientName: accountSelect,
          startDate: date,
          endDate,
          budget: cleanAmount,
          status: (status as any) || 'In Progress',
          progress: 10
        });
        break;

      default:
        break;
    }

      const recordLabel = name || subject || title || 'Record';
      setToastMessage(`"${recordLabel}" successfully saved to MongoDB Atlas!`);
      setTimeout(() => setToastMessage(null), 3000);

      if (saveAndNew) {
        resetForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (created?.id) {
        setSelectedRecordId(created.id);
        setViewMode('detail');
      } else {
        setViewMode('list');
      }
    } catch (err: any) {
      alert(`Error saving record: ${err.message}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 overflow-hidden relative select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Action Bar */}
      <div className="shrink-0 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#111827] z-20">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-blue-900 dark:text-blue-400">
            {getModuleTitle()}
          </h1>
          <a
            href="#edit-layout"
            onClick={e => {
              e.preventDefault();
              alert(`Page Layout Editor: Drag and customize layout for ${activeModule}.`);
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Edit Page Layout
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 rounded transition-colors"
          >
            Save and New
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-xs transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Errors Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-lg flex items-center space-x-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Please complete the required fields: {Object.values(errors).join(', ')}</span>
          </div>
        )}

        {/* SECTION 1: Primary Information */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5">
            <h2 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              {activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-xs">
            {/* LEFT COLUMN */}
            <div className="space-y-3.5">
              {/* Owner */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Record Owner
                </label>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    G
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Govind Choudhary
                  </span>
                </div>
              </div>

              {/* Primary Name / Subject (Mandatory) */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400 flex items-center justify-end">
                  {activeModule === 'deals'
                    ? 'Deal Name'
                    : activeModule === 'tasks' || activeModule === 'quotes' || activeModule === 'salesorders' || activeModule === 'purchaseorders' || activeModule === 'invoices'
                    ? 'Subject'
                    : activeModule === 'meetings' || activeModule === 'calls'
                    ? 'Title / Purpose'
                    : `${activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} Name`}
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={activeModule === 'tasks' || activeModule === 'quotes' || activeModule === 'salesorders' || activeModule === 'purchaseorders' || activeModule === 'invoices' ? subject : activeModule === 'meetings' || activeModule === 'calls' ? title : name}
                    onChange={e => {
                      if (activeModule === 'tasks' || activeModule === 'quotes' || activeModule === 'salesorders' || activeModule === 'purchaseorders' || activeModule === 'invoices') {
                        setSubject(e.target.value);
                      } else if (activeModule === 'meetings' || activeModule === 'calls') {
                        setTitle(e.target.value);
                      } else {
                        setName(e.target.value);
                      }
                      setErrors({});
                    }}
                    placeholder={`Enter ${activeModule} title...`}
                    className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border-l-4 border-l-red-500 border border-slate-300 dark:border-slate-700 rounded-r text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Associated Account / Vendor */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  {activeModule === 'purchaseorders' || activeModule === 'products' ? 'Vendor Name' : 'Account Name'}
                </label>
                <div className="flex-1">
                  {activeModule === 'purchaseorders' || activeModule === 'products' ? (
                    <input
                      type="text"
                      value={vendorSelect}
                      onChange={e => setVendorSelect(e.target.value)}
                      list="vendors-list"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                    />
                  ) : (
                    <input
                      type="text"
                      value={accountSelect}
                      onChange={e => setAccountSelect(e.target.value)}
                      list="accounts-list"
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                    />
                  )}
                  <datalist id="accounts-list">
                    {accounts.map(a => <option key={a.id} value={a.name} />)}
                  </datalist>
                  <datalist id="vendors-list">
                    {vendors.map(v => <option key={v.id} value={v.name} />)}
                  </datalist>
                </div>
              </div>

              {/* Amount / Budget / Revenue */}
              {(activeModule === 'deals' || activeModule === 'campaigns' || activeModule === 'products' || activeModule === 'quotes' || activeModule === 'salesorders' || activeModule === 'purchaseorders' || activeModule === 'invoices' || activeModule === 'forecasts' || activeModule === 'projects' || activeModule === 'services') && (
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                    {activeModule === 'deals' ? 'Amount' : activeModule === 'projects' ? 'Budget' : activeModule === 'products' ? 'Unit Price' : activeModule === 'services' ? 'Hourly Rate' : 'Total Amount'}
                  </label>
                  <div className="flex-1 flex items-center border border-slate-300 dark:border-slate-700 rounded overflow-hidden bg-white dark:bg-slate-800 focus-within:border-blue-500">
                    <span className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold border-r border-slate-300 dark:border-slate-700">
                      Rs.
                    </span>
                    <input
                      type="text"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-transparent text-slate-800 dark:text-slate-200 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Stage / Status */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  {activeModule === 'deals' ? 'Stage' : 'Status'}
                </label>
                <select
                  value={activeModule === 'deals' ? stage : status}
                  onChange={e => activeModule === 'deals' ? setStage(e.target.value) : setStatus(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  {activeModule === 'deals' ? (
                    <>
                      <option value="Qualification">Qualification</option>
                      <option value="Needs Analysis">Needs Analysis</option>
                      <option value="Value Proposition">Value Proposition</option>
                      <option value="Proposal/Quote">Proposal/Quote</option>
                      <option value="Negotiation/Review">Negotiation/Review</option>
                      <option value="Closed Won">Closed Won</option>
                      <option value="Closed Lost">Closed Lost</option>
                    </>
                  ) : activeModule === 'tasks' ? (
                    <>
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Waiting for input">Waiting for input</option>
                    </>
                  ) : (
                    <>
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Approved">Approved</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Paid">Paid</option>
                      <option value="Completed">Completed</option>
                    </>
                  )}
                </select>
              </div>

              {/* Priority */}
              {(activeModule === 'tasks' || activeModule === 'projects' || activeModule === 'calls') && (
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  >
                    <option value="Highest">Highest</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-3.5">
              {/* Primary Date */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  {activeModule === 'deals' ? 'Closing Date' : activeModule === 'tasks' ? 'Due Date' : activeModule === 'meetings' || activeModule === 'calls' ? 'Date & Time' : 'Date'}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* End Date / Deadline */}
              {(activeModule === 'campaigns' || activeModule === 'quotes' || activeModule === 'invoices' || activeModule === 'projects') && (
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                    {activeModule === 'quotes' ? 'Valid Until' : activeModule === 'projects' ? 'Deadline' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Contact Association */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={contactSelect}
                  onChange={e => setContactSelect(e.target.value)}
                  list="contacts-list"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
                <datalist id="contacts-list">
                  {contacts.map(c => <option key={c.id} value={c.name} />)}
                </datalist>
              </div>

              {/* Deals Pipeline / Type */}
              {activeModule === 'deals' ? (
                <>
                  <div className="flex items-center">
                    <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                      Pipeline
                    </label>
                    <select
                      value={pipeline}
                      onChange={e => setPipeline(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                    >
                      <option value="Standard Sales Pipeline">Standard Sales Pipeline</option>
                      <option value="Enterprise Solution Pipeline">Enterprise Solution Pipeline</option>
                      <option value="Renewal & Upsell">Renewal & Upsell</option>
                    </select>
                  </div>
                  <div className="flex items-center">
                    <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                      Probability (%)
                    </label>
                    <input
                      type="number"
                      value={probability}
                      onChange={e => setProbability(e.target.value)}
                      min="0"
                      max="100"
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              ) : activeModule === 'products' ? (
                <>
                  <div className="flex items-center">
                    <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                      Product Code
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                      Quantity In Stock
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              ) : activeModule === 'meetings' || activeModule === 'calls' ? (
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  >
                    <option value="15 mins">15 mins</option>
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="1 hour">1 hour</option>
                    <option value="2 hours">2 hours</option>
                  </select>
                </div>
              ) : (
                <div className="flex items-center">
                  <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                    Category / Type
                  </label>
                  <input
                    type="text"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    placeholder="Standard"
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Description Information */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5">
            <h2 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              Description Information
            </h2>
          </div>

          <div className="flex items-start text-xs max-w-4xl">
            <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400 pt-1.5">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={`Enter comprehensive notes, terms, discussions or specifications for this ${activeModule}...`}
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Toolbar */}
      <div className="shrink-0 px-6 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs">
        {/* Left: Form Views Selector */}
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Create Form Views:</span>
          <select
            value={formView}
            onChange={e => setFormView(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="Standard View">Standard View</option>
            <option value="Quick Create View">Quick Create View</option>
            <option value="Enterprise Layout">Enterprise Layout</option>
          </select>
          <a
            href="#create-custom-form"
            onClick={e => {
              e.preventDefault();
              alert('Custom Form Builder: Create custom layouts tailored for specific roles.');
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Create a custom form page
          </a>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 rounded transition-colors"
          >
            Save and New
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-xs transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Floating Vertical Right Ribbon: "Client Script" */}
      <button
        type="button"
        onClick={() => setShowClientScriptDrawer(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#1b2b48] hover:bg-[#24375b] text-white text-[11px] font-bold py-3 px-1.5 rounded-l-md shadow-lg flex flex-col items-center gap-2 cursor-pointer z-30 transition-transform hover:-translate-x-1"
        style={{ writingMode: 'vertical-rl' }}
        title="Open Zoho Client Script Developer Console"
      >
        <span className="tracking-widest flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 rotate-90" />
          Client Script
        </span>
      </button>

      {/* Slide-over Drawer for Client Script */}
      {showClientScriptDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#111827] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Client Script Console
                </h3>
              </div>
              <button
                onClick={() => setShowClientScriptDrawer(false)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Client Scripts for {getModuleTitle()}
                </p>
                <p className="text-[11px] leading-relaxed">
                  Execute custom JavaScript logic upon field modifications or record submission.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Active Event Listeners:
                </label>
                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  ⚡ onSave() ➔ Mandatory field validations & audit trail
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Custom Script Editor:
                </label>
                <textarea
                  rows={8}
                  defaultValue={`// Example Zoho Client Script
ZDK.Page.addEventListener('onSave', function(e) {
  console.log('Validating ${activeModule} record...');
});`}
                  className="w-full font-mono text-[11px] p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 outline-none"
                />
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => setShowClientScriptDrawer(false)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar (Zoho standard footer) */}
      <div className="shrink-0 h-7 bg-[#1c2438] text-slate-300 px-4 flex items-center justify-between text-[11px] select-none border-t border-slate-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => alert('My Pins: Quick access to pinned records.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Pin className="w-3 h-3" />
            <span>My Pins</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => alert('Chats: Open team discussions.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Chats</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => alert('Contacts: Quick search across all synced CRM contacts.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Users className="w-3 h-3" />
            <span>Contacts</span>
          </button>
        </div>

        <div className="text-slate-400 text-[10px]">
          Zoho CRM Layout Engine v2025 • Standard Form
        </div>
      </div>
    </div>
  );
};
