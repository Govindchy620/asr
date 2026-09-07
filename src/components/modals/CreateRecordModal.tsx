import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { X } from 'lucide-react';

export const CreateRecordModal: React.FC = () => {
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    createModalModule,
    accounts,
    vendors,
    addLead,
    addDeal,
    addContact,
    addAccount,
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
    addVisit,
    addService,
    addProject,
    addAgent
  } = useCRM();

  // Generic and specific field states
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('1000000');
  const [date, setDate] = useState('2025-04-15');
  const [status, setStatus] = useState('Draft');
  const [accountSelect, setAccountSelect] = useState(accounts[0]?.name || 'Fintech Nexus Labs');
  const [vendorSelect, setVendorSelect] = useState(vendors[0]?.name || 'Cisco Telecom Infrastructure India');
  const [description, setDescription] = useState('');
  const [extra1, setExtra1] = useState('');
  const [extra2, setExtra2] = useState('');

  if (!isCreateModalOpen) return null;

  const resetForm = () => {
    setName('');
    setLastName('');
    setFirstName('');
    setCompany('');
    setTitle('');
    setEmail('');
    setPhone('');
    setAmount('1000000');
    setDescription('');
    setExtra1('');
    setExtra2('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    switch (createModalModule) {
      case 'leads':
        if (!lastName.trim() || !company.trim()) return;
        addLead({
          name: `${firstName} ${lastName}`.trim(),
          title: title || 'Director',
          company: company,
          email: email || `${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: phone || '+91 98000 00000',
          leadSource: 'Web Form',
          leadStatus: 'Pre-Qualified',
          leadScore: 85,
          leadOwner: 'Rajesh Kumar',
          annualRevenue: amount ? `₹${Number(amount).toLocaleString('en-IN')}` : '₹10,00,000',
          notes: description
        });
        break;

      case 'contacts':
        if (!lastName.trim()) return;
        addContact({
          name: `${firstName} ${lastName}`.trim(),
          accountName: accountSelect,
          email: email || `${lastName.toLowerCase()}@company.com`,
          phone: phone || '+91 98000 00000',
          department: extra1 || 'Management',
          leadSource: 'Referral',
          owner: 'Rajesh Kumar',
          title: title || 'Executive'
        });
        break;

      case 'accounts':
        if (!name.trim()) return;
        addAccount({
          name,
          phone: phone || '+91 22 4000 0000',
          website: extra1 || `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
          industry: extra2 || 'Technology & Services',
          annualRevenue: Number(amount) || 50000000,
          owner: 'Rajesh Kumar',
          billingCity: 'Mumbai',
          billingCountry: 'India'
        });
        break;

      case 'deals':
        if (!name.trim()) return;
        addDeal({
          name,
          accountName: accountSelect,
          contactName: firstName || 'Primary Contact',
          amount: Number(amount) || 1500000,
          stage: 'Qualification',
          probability: 20,
          expectedCloseDate: date,
          dealOwner: 'Rajesh Kumar',
          pipeline: 'Standard Sales Pipeline',
          leadSource: 'Web Form'
        });
        break;

      case 'forecasts':
        if (!name.trim()) return;
        addForecast({
          name,
          period: extra1 || 'Q2 FY 2025-26',
          targetRevenue: Number(amount) || 30000000,
          committedRevenue: Math.round(Number(amount) * 0.7) || 21000000,
          bestCaseRevenue: Math.round(Number(amount) * 0.9) || 27000000,
          closedRevenue: 0,
          owner: 'Rajesh Kumar'
        });
        break;

      case 'documents':
        if (!name.trim()) return;
        addDocument({
          name: name.endsWith('.pdf') ? name : `${name}.pdf`,
          fileSize: '1.8 MB',
          fileType: 'PDF Document',
          uploadedBy: 'Rajesh Kumar',
          relatedTo: accountSelect
        });
        break;

      case 'campaigns':
        if (!name.trim()) return;
        addCampaign({
          name,
          type: extra1 || 'Email Campaign',
          status: 'Planned',
          startDate: '2025-04-01',
          endDate: '2025-04-30',
          budgetedCost: Number(amount) || 250000,
          actualCost: 0,
          expectedRevenue: (Number(amount) || 250000) * 5,
          owner: 'Rajesh Kumar'
        });
        break;

      case 'tasks':
        if (!name.trim()) return;
        addTask({
          subject: name,
          dueDate: date,
          status: 'Not Started',
          priority: (extra1 as any) || 'Normal',
          relatedTo: accountSelect,
          relatedType: 'Account',
          assignedTo: 'Rajesh Kumar'
        });
        break;

      case 'meetings':
        if (!name.trim()) return;
        addMeeting({
          subject: name,
          startDateTime: `${date} 10:00 AM`,
          endDateTime: `${date} 11:00 AM`,
          location: extra1 || 'Google Meet / Zoom Room',
          relatedTo: accountSelect,
          host: 'Rajesh Kumar',
          attendeesCount: 3
        });
        break;

      case 'calls':
        if (!name.trim()) return;
        addCall({
          subject: name,
          callType: 'Outbound',
          callDuration: extra1 || '15 mins',
          callStartTime: 'Today',
          relatedTo: accountSelect,
          purpose: 'Discovery & Proposal',
          callResult: description || 'Call connected, client interested',
          caller: 'Rajesh Kumar'
        });
        break;

      case 'products':
        if (!name.trim()) return;
        addProduct({
          name,
          code: extra1 || `PRD-${Date.now().toString().slice(-4)}`,
          category: extra2 || 'Software & Licenses',
          unitPrice: Number(amount) || 2500,
          usageUnit: 'Units',
          qtyInStock: 100,
          reorderLevel: 10,
          active: true
        });
        break;

      case 'pricebooks':
        if (!name.trim()) return;
        addPriceBook({
          name,
          currency: 'INR (₹)',
          active: true,
          pricingTier: extra1 || 'Enterprise Tier',
          description: description || 'Custom price tier configured',
          owner: 'Rajesh Kumar'
        });
        break;

      case 'quotes':
        if (!name.trim()) return;
        addQuote({
          quoteNumber: `QUO-2025-${Math.floor(Math.random() * 900) + 100}`,
          subject: name,
          accountName: accountSelect,
          contactName: firstName || 'Executive Client',
          validTill: date,
          totalAmount: Number(amount) || 1200000,
          status: 'Draft',
          owner: 'Rajesh Kumar'
        });
        break;

      case 'salesorders':
        if (!name.trim()) return;
        addSalesOrder({
          soNumber: `SO-2025-${Math.floor(Math.random() * 900) + 100}`,
          subject: name,
          accountName: accountSelect,
          orderDate: date,
          totalAmount: Number(amount) || 1800000,
          status: 'Confirmed',
          owner: 'Rajesh Kumar'
        });
        break;

      case 'purchaseorders':
        if (!name.trim()) return;
        addPurchaseOrder({
          poNumber: `PO-2025-${Math.floor(Math.random() * 900) + 100}`,
          subject: name,
          vendorName: vendorSelect,
          orderDate: date,
          totalAmount: Number(amount) || 950000,
          status: 'Draft',
          owner: 'Sneha Patel'
        });
        break;

      case 'invoices':
        if (!name.trim()) return;
        addInvoice({
          invoiceNumber: `INV-2025-${Math.floor(Math.random() * 900) + 100}`,
          subject: name,
          accountName: accountSelect,
          invoiceDate: date,
          dueDate: '2025-05-15',
          totalAmount: Number(amount) || 1500000,
          status: 'Sent',
          owner: 'Rajesh Kumar'
        });
        break;

      case 'vendors':
        if (!name.trim()) return;
        addVendor({
          name,
          contactName: firstName || 'Account Representative',
          phone: phone || '+91 80 4000 1100',
          email: email || `orders@${name.toLowerCase().replace(/\s+/g, '')}.in`,
          website: `https://${name.toLowerCase().replace(/\s+/g, '')}.in`,
          city: extra1 || 'Bengaluru',
          owner: 'Sneha Patel'
        });
        break;

      case 'visits':
        if (!name.trim()) return;
        addVisit({
          subject: name,
          relatedRecord: accountSelect,
          location: extra1 || 'Client Corporate Headquarters',
          checkInTime: `${date} 10:00 AM`,
          checkOutTime: `${date} 12:00 PM`,
          salesRep: 'Rajesh Kumar',
          notes: description || 'Field visit successfully conducted'
        });
        break;

      case 'services':
        if (!name.trim()) return;
        addService({
          name,
          code: extra1 || `SRV-${Date.now().toString().slice(-4)}`,
          unitPrice: Number(amount) || 85000,
          taxPercent: 18,
          duration: 'Monthly Retainer',
          category: 'Professional Services'
        });
        break;

      case 'projects':
        if (!name.trim()) return;
        addProject({
          name,
          clientName: accountSelect,
          startDate: date,
          endDate: '2025-06-30',
          budget: Number(amount) || 2000000,
          status: 'Planned',
          progress: 0
        });
        break;

      case 'agents':
        if (!name.trim()) return;
        addAgent({
          name,
          type: (extra1 as any) || 'Lead Scoring',
          trigger: extra2 || 'Record Created or Updated',
          action: description || 'Automated AI recommendation and workflow task creation',
          status: 'Active'
        });
        break;

      default:
        break;
    }

    resetForm();
    setIsCreateModalOpen(false);
  };

  const getModalTitle = () => {
    switch (createModalModule) {
      case 'leads': return 'Create Lead';
      case 'contacts': return 'Create Contact';
      case 'accounts': return 'Create Account';
      case 'deals': return 'Create Deal';
      case 'forecasts': return 'Create Forecast';
      case 'documents': return 'Upload Document';
      case 'campaigns': return 'Create Campaign';
      case 'tasks': return 'Create Task';
      case 'meetings': return 'Schedule Meeting';
      case 'calls': return 'Log a Call';
      case 'products': return 'New Product';
      case 'pricebooks': return 'Create Price Book';
      case 'quotes': return 'Create Quote';
      case 'salesorders': return 'Create Sales Order';
      case 'purchaseorders': return 'Create Purchase Order';
      case 'invoices': return 'Create Invoice';
      case 'vendors': return 'Create Vendor';
      case 'visits': return 'Log Field Visit';
      case 'services': return 'Create Service';
      case 'projects': return 'Create Project';
      case 'agents': return 'Configure Zia Agent';
      default: return `Create ${createModalModule}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/40">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white capitalize">
              {getModalTitle()}
            </h2>
            <p className="text-[11px] text-slate-400">Fill in the standard fields to create this CRM record</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsCreateModalOpen(false);
            }}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Form Content */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5 text-xs custom-scrollbar">
          {/* LEADS Form */}
          {createModalModule === 'leads' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="e.g. Ramesh"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="e.g. Gupta"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Reliance Retail Ventures"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Head of Procurement"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Annual Revenue
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* CONTACTS Form */}
          {createModalModule === 'contacts' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Account Name (Company)
                </label>
                <select
                  value={accountSelect}
                  onChange={e => setAccountSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {accounts.map(a => (
                    <option key={a.id} value={a.name}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Engineering Lead"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={extra1}
                    onChange={e => setExtra1(e.target.value)}
                    placeholder="e.g. Finance / Tech"
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {/* DEALS Form */}
          {createModalModule === 'deals' && (
            <>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Deal Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Enterprise Cloud Suite License"
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Account Name *
                  </label>
                  <select
                    value={accountSelect}
                    onChange={e => setAccountSelect(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Expected Close Date *
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}

          {/* Fallback for other modules */}
          {createModalModule !== 'leads' && createModalModule !== 'contacts' && createModalModule !== 'deals' && (
            <>
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Record Name / Subject *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={`Enter ${createModalModule} title...`}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              {(createModalModule === 'quotes' ||
                createModalModule === 'salesorders' ||
                createModalModule === 'invoices' ||
                createModalModule === 'tasks' ||
                createModalModule === 'meetings' ||
                createModalModule === 'projects' ||
                createModalModule === 'visits') && (
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Related Account
                  </label>
                  <select
                    value={accountSelect}
                    onChange={e => setAccountSelect(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    {accounts.map(a => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {createModalModule === 'purchaseorders' && (
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Vendor *
                  </label>
                  <select
                    value={vendorSelect}
                    onChange={e => setVendorSelect(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    {vendors.map(v => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Amount / Value (₹)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date / Deadline
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description / Terms
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Add specifications, terms, or notes..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                resetForm();
                setIsCreateModalOpen(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-lg shadow-sm shadow-blue-500/20 transition-colors"
            >
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
