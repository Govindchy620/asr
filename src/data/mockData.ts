import {
  Lead,
  Deal,
  Contact,
  Account,
  Task,
  CallLog,
  ActivityTimelineItem,
  Forecast,
  DocumentItem,
  Campaign,
  Meeting,
  Product,
  PriceBook,
  Quote,
  SalesOrder,
  PurchaseOrder,
  Invoice,
  Vendor,
  Visit,
  ServiceItem,
  Project,
  AgentConfig,
  ReportItem,
  AnalyticsWidget
} from '../types/crm';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Aarav Sharma',
    title: 'VP of Technology',
    company: 'Fintech Nexus Labs',
    email: 'aarav.sharma@fintechnexus.io',
    phone: '+91 98201 44521',
    leadSource: 'Web Form',
    leadStatus: 'Pre-Qualified',
    leadScore: 92,
    leadOwner: 'Rajesh Kumar',
    createdAt: '2025-02-14',
    annualRevenue: '₹12,50,00,000',
    notes: 'Interested in enterprise cloud integration and automated pipeline workflows.',
    rating: 'Hot',
    industry: 'Financial Technology',
    city: 'Mumbai'
  },
  {
    id: 'lead-2',
    name: 'Priya Narang',
    title: 'Director of Procurement',
    company: 'Apex Retail Solutions',
    email: 'priya.n@apexretail.in',
    phone: '+91 97112 88301',
    leadSource: 'Referral',
    leadStatus: 'Contacted',
    leadScore: 78,
    leadOwner: 'Sneha Patel',
    createdAt: '2025-02-18',
    annualRevenue: '₹45,00,00,000',
    notes: 'Requested product comparison with Salesforce and pricing tiers.',
    rating: 'Warm',
    industry: 'Retail & E-commerce',
    city: 'New Delhi'
  },
  {
    id: 'lead-3',
    name: 'David Vance',
    title: 'Head of Operations',
    company: 'GlobalLogistics UK',
    email: 'd.vance@globallogistics.co.uk',
    phone: '+44 20 7946 0912',
    leadSource: 'Partner',
    leadStatus: 'Attempted to Contact',
    leadScore: 64,
    leadOwner: 'Rajesh Kumar',
    createdAt: '2025-02-22',
    annualRevenue: '£8,200,000',
    notes: 'Follow up scheduled for Thursday 4 PM GMT.',
    rating: 'Warm',
    industry: 'Supply Chain & Logistics',
    city: 'London'
  },
  {
    id: 'lead-4',
    name: 'Meera Iyer',
    title: 'Chief Marketing Officer',
    company: 'Zomato Spark Ventures',
    email: 'meera.iyer@zspark.com',
    phone: '+91 99870 12345',
    leadSource: 'Advertisement',
    leadStatus: 'Pre-Qualified',
    leadScore: 89,
    leadOwner: 'Amit Verma',
    createdAt: '2025-02-25',
    annualRevenue: '₹80,00,00,000',
    notes: 'Looking to migrate 450 sales reps from legacy spreadsheet system.',
    rating: 'Hot',
    industry: 'Consumer Tech',
    city: 'Gurugram'
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    name: 'Enterprise Cloud Suite - 300 Seats',
    accountName: 'Fintech Nexus Labs',
    contactName: 'Aarav Sharma',
    amount: 1850000,
    stage: 'Negotiation/Review',
    probability: 85,
    expectedCloseDate: '2025-03-25',
    dealOwner: 'Rajesh Kumar',
    pipeline: 'Standard Sales Pipeline',
    leadSource: 'Web Form',
    daysInStage: 4,
    createdAt: '2025-01-15'
  },
  {
    id: 'deal-2',
    name: 'Multi-Store POS Integration',
    accountName: 'Apex Retail Solutions',
    contactName: 'Priya Narang',
    amount: 3200000,
    stage: 'Proposal/Quote',
    probability: 60,
    expectedCloseDate: '2025-04-10',
    dealOwner: 'Sneha Patel',
    pipeline: 'Standard Sales Pipeline',
    leadSource: 'Referral',
    daysInStage: 9,
    createdAt: '2025-01-28'
  },
  {
    id: 'deal-3',
    name: 'Omnichannel CRM Expansion',
    accountName: 'Zomato Spark Ventures',
    contactName: 'Meera Iyer',
    amount: 5400000,
    stage: 'Needs Analysis',
    probability: 40,
    expectedCloseDate: '2025-05-15',
    dealOwner: 'Amit Verma',
    pipeline: 'Enterprise Pipeline',
    leadSource: 'Advertisement',
    daysInStage: 14,
    createdAt: '2025-02-10'
  },
  {
    id: 'deal-4',
    name: 'Nordic EU Security Compliance Setup',
    accountName: 'Nordic Cloud Systems',
    contactName: 'Elena Rostova',
    amount: 2750000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2025-02-28',
    dealOwner: 'Rajesh Kumar',
    pipeline: 'Enterprise Pipeline',
    leadSource: 'Web Form',
    daysInStage: 1,
    createdAt: '2024-12-05'
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'c-1',
    name: 'Aarav Sharma',
    accountName: 'Fintech Nexus Labs',
    email: 'aarav.sharma@fintechnexus.io',
    phone: '+91 98201 44521',
    department: 'Engineering',
    leadSource: 'Web Form',
    owner: 'Rajesh Kumar',
    title: 'VP of Technology'
  },
  {
    id: 'c-2',
    name: 'Priya Narang',
    accountName: 'Apex Retail Solutions',
    email: 'priya.n@apexretail.in',
    phone: '+91 97112 88301',
    department: 'Procurement',
    leadSource: 'Referral',
    owner: 'Sneha Patel',
    title: 'Director of Procurement'
  },
  {
    id: 'c-3',
    name: 'Meera Iyer',
    accountName: 'Zomato Spark Ventures',
    email: 'meera.iyer@zspark.com',
    phone: '+91 99870 12345',
    department: 'Marketing',
    leadSource: 'Advertisement',
    owner: 'Amit Verma',
    title: 'Chief Marketing Officer'
  }
];

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc-1',
    name: 'Fintech Nexus Labs',
    phone: '+91 22 6123 4567',
    website: 'https://fintechnexus.io',
    industry: 'Financial Technology',
    annualRevenue: 125000000,
    owner: 'Rajesh Kumar',
    billingCity: 'Mumbai',
    billingCountry: 'India'
  },
  {
    id: 'acc-2',
    name: 'Apex Retail Solutions',
    phone: '+91 11 4152 8800',
    website: 'https://apexretail.in',
    industry: 'Retail & E-commerce',
    annualRevenue: 450000000,
    owner: 'Sneha Patel',
    billingCity: 'New Delhi',
    billingCountry: 'India'
  },
  {
    id: 'acc-3',
    name: 'Zomato Spark Ventures',
    phone: '+91 124 456 7890',
    website: 'https://zspark.com',
    industry: 'Consumer Internet',
    annualRevenue: 800000000,
    owner: 'Amit Verma',
    billingCity: 'Gurugram',
    billingCountry: 'India'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    subject: 'Send Master Service Agreement (MSA) revision',
    dueDate: '2025-03-10',
    status: 'In Progress',
    priority: 'High',
    relatedTo: 'Fintech Nexus Labs',
    relatedType: 'Deal',
    assignedTo: 'Rajesh Kumar'
  },
  {
    id: 'task-2',
    subject: 'Technical architecture alignment call with CTO',
    dueDate: '2025-03-12',
    status: 'Not Started',
    priority: 'Normal',
    relatedTo: 'Apex Retail Solutions',
    relatedType: 'Deal',
    assignedTo: 'Sneha Patel'
  }
];

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: 'meet-1',
    subject: 'Q1 Sales Expansion & Security Architecture Sync',
    startDateTime: '2025-03-11 11:00 AM',
    endDateTime: '2025-03-11 12:00 PM',
    location: 'Google Meet / Zoom Room 4',
    relatedTo: 'Fintech Nexus Labs',
    host: 'Rajesh Kumar',
    attendeesCount: 5
  },
  {
    id: 'meet-2',
    subject: 'POS Hardware Deployment Roadmap Review',
    startDateTime: '2025-03-13 03:30 PM',
    endDateTime: '2025-03-13 04:30 PM',
    location: 'Client HQ - Connaught Place, New Delhi',
    relatedTo: 'Apex Retail Solutions',
    host: 'Sneha Patel',
    attendeesCount: 3
  }
];

export const INITIAL_CALLS: CallLog[] = [
  {
    id: 'call-1',
    subject: 'Demo Walkthrough & Security Review',
    callType: 'Outbound',
    callDuration: '34 mins',
    callStartTime: 'Yesterday, 3:30 PM',
    relatedTo: 'Fintech Nexus Labs',
    purpose: 'Negotiation',
    callResult: 'Client agreed to proceed with proposal stage',
    caller: 'Rajesh Kumar'
  },
  {
    id: 'call-2',
    subject: 'Inquiry response regarding custom APIs',
    callType: 'Inbound',
    callDuration: '14 mins',
    callStartTime: '2 days ago',
    relatedTo: 'Apex Retail Solutions',
    purpose: 'Discovery',
    callResult: 'Questions answered, scheduled followup call',
    caller: 'Sneha Patel'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Google Ads Search - Cloud ERP Q1 2025',
    type: 'Google Ads',
    status: 'In Progress',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    budgetedCost: 450000,
    actualCost: 312000,
    expectedRevenue: 2800000,
    owner: 'Amit Verma'
  },
  {
    id: 'camp-2',
    name: 'Fintech Leadership Summit Bangalore 2025',
    type: 'Trade Show',
    status: 'Completed',
    startDate: '2025-02-10',
    endDate: '2025-02-12',
    budgetedCost: 800000,
    actualCost: 745000,
    expectedRevenue: 6500000,
    owner: 'Rajesh Kumar'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Enterprise CRM Cloud Platform',
    code: 'PRD-CRM-ENT',
    category: 'Software License',
    unitPrice: 1800,
    usageUnit: 'Users / Month',
    qtyInStock: 9999,
    reorderLevel: 50,
    active: true
  },
  {
    id: 'prod-2',
    name: 'Omnichannel PBX Voice Gateway Server',
    code: 'PRD-VOICE-GW',
    category: 'Telephony Hardware',
    unitPrice: 145000,
    usageUnit: 'Units',
    qtyInStock: 24,
    reorderLevel: 5,
    active: true
  },
  {
    id: 'prod-3',
    name: 'Custom API Connector & Webhook Suite',
    code: 'PRD-API-EXT',
    category: 'Add-On Module',
    unitPrice: 25000,
    usageUnit: 'Instances / Year',
    qtyInStock: 500,
    reorderLevel: 20,
    active: true
  }
];

export const INITIAL_PRICEBOOKS: PriceBook[] = [
  {
    id: 'pb-1',
    name: 'Enterprise Direct Standard Pricing 2025',
    currency: 'INR (₹)',
    active: true,
    pricingTier: 'Standard Tier (1-500 seats)',
    description: 'Default master price book for all direct enterprise quotes.',
    owner: 'Rajesh Kumar'
  },
  {
    id: 'pb-2',
    name: 'Global Partner Reseller Discount Book',
    currency: 'INR (₹)',
    active: true,
    pricingTier: 'Volume Discount Tier',
    description: 'Applies 25% recurring margin discount to certified SI partners.',
    owner: 'Sneha Patel'
  }
];

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'q-1',
    quoteNumber: 'QUO-2025-0012',
    subject: 'Cloud Platform 300 Seats + PBX Deployment',
    accountName: 'Fintech Nexus Labs',
    contactName: 'Aarav Sharma',
    validTill: '2025-03-31',
    totalAmount: 1850000,
    status: 'Sent',
    owner: 'Rajesh Kumar'
  },
  {
    id: 'q-2',
    quoteNumber: 'QUO-2025-0019',
    subject: 'Retail Multi-Store POS Modernization Quote',
    accountName: 'Apex Retail Solutions',
    contactName: 'Priya Narang',
    validTill: '2025-04-15',
    totalAmount: 3200000,
    status: 'Viewed',
    owner: 'Sneha Patel'
  }
];

export const INITIAL_SALES_ORDERS: SalesOrder[] = [
  {
    id: 'so-1',
    soNumber: 'SO-2025-0008',
    subject: 'Confirmed Order for Nordic Security Compliance License',
    accountName: 'Nordic Cloud Systems',
    orderDate: '2025-02-28',
    totalAmount: 2750000,
    status: 'Delivered',
    owner: 'Rajesh Kumar'
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'po-1',
    poNumber: 'PO-2025-0004',
    subject: 'Bulk Procurement: 20x Telephony PBX Voice Servers',
    vendorName: 'Cisco Telecom Infrastructure India',
    orderDate: '2025-02-15',
    totalAmount: 2200000,
    status: 'Received',
    owner: 'Sneha Patel'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2025-0104',
    subject: 'Invoice: Enterprise Cloud Suite Implementation',
    accountName: 'Nordic Cloud Systems',
    invoiceDate: '2025-03-01',
    dueDate: '2025-03-31',
    totalAmount: 2750000,
    status: 'Paid',
    owner: 'Rajesh Kumar'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2025-0105',
    subject: 'Advance Milestone Invoice: Retail Integration',
    accountName: 'Apex Retail Solutions',
    invoiceDate: '2025-03-05',
    dueDate: '2025-04-05',
    totalAmount: 960000,
    status: 'Sent',
    owner: 'Sneha Patel'
  }
];

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v-1',
    name: 'Cisco Telecom Infrastructure India',
    contactName: 'Anand Kulkarni',
    phone: '+91 80 4422 1100',
    email: 'orders@cisco-telecom.in',
    website: 'https://cisco.com',
    city: 'Bengaluru',
    owner: 'Sneha Patel'
  },
  {
    id: 'v-2',
    name: 'Amazon Web Services India Pvt Ltd',
    contactName: 'Cloud Accounts Team',
    phone: '+91 22 7100 8800',
    email: 'billing@amazonwebservices.in',
    website: 'https://aws.amazon.com',
    city: 'Mumbai',
    owner: 'Rajesh Kumar'
  }
];

export const INITIAL_FORECASTS: Forecast[] = [
  {
    id: 'fc-1',
    name: 'Q1 FY 2025-26 Sales Revenue Forecast',
    period: 'Q1 (April - June 2025)',
    targetRevenue: 40000000,
    committedRevenue: 27500000,
    bestCaseRevenue: 38400000,
    closedRevenue: 18500000,
    owner: 'Rajesh Kumar'
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    name: 'Enterprise Cloud Suite Agreement v2.4.pdf',
    fileSize: '2.4 MB',
    fileType: 'PDF Document',
    uploadedBy: 'Rajesh Kumar',
    uploadDate: '2025-02-20',
    relatedTo: 'Fintech Nexus Labs'
  },
  {
    id: 'doc-2',
    name: 'Master Pricing Architecture Schedule 2025.xlsx',
    fileSize: '1.1 MB',
    fileType: 'Excel Spreadsheet',
    uploadedBy: 'Sneha Patel',
    uploadDate: '2025-02-28',
    relatedTo: 'Apex Retail Solutions'
  }
];

export const INITIAL_VISITS: Visit[] = [
  {
    id: 'vis-1',
    subject: 'Executive In-Person Demonstration & Architecture Review',
    relatedRecord: 'Fintech Nexus Labs',
    location: 'Bandra Kurla Complex (BKC), Mumbai',
    checkInTime: '2025-03-02 10:30 AM',
    checkOutTime: '2025-03-02 01:15 PM',
    salesRep: 'Rajesh Kumar',
    notes: 'Met with Aarav and 4 lead system architects. Client enthusiastic about API capabilities.'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    name: 'Dedicated Enterprise Implementation & Migration',
    code: 'SRV-ONB-EXP',
    unitPrice: 350000,
    taxPercent: 18,
    duration: '40 Hours Dedicated',
    category: 'Professional Services'
  },
  {
    id: 'srv-2',
    name: '24/7 Priority SLA Mission-Critical Support',
    code: 'SRV-SLA-PLAT',
    unitPrice: 120000,
    taxPercent: 18,
    duration: '1 Year Contract',
    category: 'Maintenance & SLA'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-1',
    name: 'Fintech Cloud Core Rollout & Security Hardening',
    clientName: 'Fintech Nexus Labs',
    startDate: '2025-03-01',
    endDate: '2025-05-30',
    budget: 2500000,
    status: 'In Progress',
    progress: 35
  },
  {
    id: 'prj-2',
    name: 'Omnichannel POS Sync API Integration',
    clientName: 'Apex Retail Solutions',
    startDate: '2025-03-15',
    endDate: '2025-06-15',
    budget: 1800000,
    status: 'Planned',
    progress: 10
  }
];

export const INITIAL_AGENTS: AgentConfig[] = [
  {
    id: 'agt-1',
    name: 'Novi Predictive Lead Scorer',
    type: 'Lead Scoring',
    trigger: 'New Inbound Lead Created',
    action: 'Analyze firmographics, compute intent score 0-100, flag >80 as Hot',
    status: 'Active'
  },
  {
    id: 'agt-2',
    name: 'Deal Stalling Velocity Monitor',
    type: 'Churn Risk',
    trigger: 'Deal stage unchanged > 10 days',
    action: 'Alert deal owner & schedule Zia executive outreach prompt',
    status: 'Active'
  },
  {
    id: 'agt-3',
    name: 'Auto-Meeting Followup & Task Logger',
    type: 'Email Assistant',
    trigger: 'Calendar Event Completed',
    action: 'Draft follow-up email with meeting recap and create next-step tasks',
    status: 'Active'
  }
];

export const INITIAL_TIMELINE: Record<string, ActivityTimelineItem[]> = {
  'deal-1': [
    {
      id: 'time-1',
      type: 'stage_change',
      title: 'Stage updated to Negotiation/Review',
      description: 'Probability bumped to 85%. Contract legal clearance initiated.',
      timestamp: '2 hours ago',
      user: 'Rajesh Kumar'
    },
    {
      id: 'time-2',
      type: 'email',
      title: 'Sent email: Commercial Proposal v2.4 (Discounted)',
      description: 'Attached quote PDF with 15% enterprise volume tier.',
      timestamp: 'Yesterday at 5:14 PM',
      user: 'Rajesh Kumar'
    }
  ]
};

export const PIPELINE_STAGES = [
  { id: 'Qualification', label: 'Qualification', color: 'bg-blue-500' },
  { id: 'Needs Analysis', label: 'Needs Analysis', color: 'bg-indigo-500' },
  { id: 'Value Proposition', label: 'Value Proposition', color: 'bg-purple-500' },
  { id: 'Proposal/Quote', label: 'Proposal/Quote', color: 'bg-amber-500' },
  { id: 'Negotiation/Review', label: 'Negotiation/Review', color: 'bg-orange-500' },
  { id: 'Closed Won', label: 'Closed Won', color: 'bg-emerald-500' },
  { id: 'Closed Lost', label: 'Closed Lost', color: 'bg-rose-500' }
] as const;

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep-1',
    name: 'Pipeline Velocity by Month',
    module: 'Deals',
    reportType: 'Summary',
    columns: ['Deal Name', 'Stage', 'Amount', 'Expected Close Date', 'Deal Owner'],
    rows: '48 records',
    lastRun: 'Today, 2:15 PM',
    createdBy: 'Rajesh Kumar'
  },
  {
    id: 'rep-2',
    name: 'Lead Conversion Ratio by Source',
    module: 'Leads',
    reportType: 'Matrix',
    columns: ['Lead Name', 'Company', 'Lead Source', 'Lead Status', 'Novi Score'],
    rows: '112 records',
    lastRun: 'Yesterday',
    createdBy: 'Sneha Patel'
  },
  {
    id: 'rep-3',
    name: 'Sales Rep Quota Performance',
    module: 'Deals',
    reportType: 'Summary',
    columns: ['Rep Name', 'Closed Deals', 'Won Revenue', 'Target Goal'],
    rows: '18 reps',
    lastRun: 'Feb 28, 2025',
    createdBy: 'Rajesh Kumar'
  },
  {
    id: 'rep-4',
    name: 'Stalled Deals Analysis (>10 Days)',
    module: 'Deals',
    reportType: 'Tabular',
    columns: ['Deal Name', 'Account Name', 'Days In Stage', 'Amount', 'Owner'],
    rows: '6 records',
    lastRun: 'Today, 11:00 AM',
    createdBy: 'Zia Intelligence'
  },
  {
    id: 'rep-5',
    name: 'Average Deal Size by Industry',
    module: 'Accounts',
    reportType: 'Pivot',
    columns: ['Industry', 'Accounts Count', 'Total Pipeline', 'Avg Deal Size'],
    rows: '24 accounts',
    lastRun: 'Mar 01, 2025',
    createdBy: 'Amit Verma'
  },
  {
    id: 'rep-6',
    name: 'Call Outcomes & Activity Summary',
    module: 'Calls',
    reportType: 'Tabular',
    columns: ['Subject', 'Call Type', 'Duration', 'Purpose', 'Result', 'Caller'],
    rows: '89 calls',
    lastRun: 'Today, 9:30 AM',
    createdBy: 'Sneha Patel'
  }
];

export const INITIAL_ANALYTICS_WIDGETS: AnalyticsWidget[] = [
  {
    id: 'w-1',
    title: 'Deal Won vs Target (Q1)',
    dataSource: 'Deals',
    chartType: 'Bar',
    metric: 'Closed Won Revenue',
    dimension: 'Quarter',
    value: '₹27,50,000 / ₹40,00,000',
    subtitle: '68.75% achieved with 23 days remaining',
    growth: '+14.2% vs target'
  },
  {
    id: 'w-2',
    title: 'Lead Qualification Velocity',
    dataSource: 'Leads',
    chartType: 'KPI',
    metric: 'Average Cycle Time',
    dimension: 'Lead Status',
    value: '4.2 Days',
    subtitle: 'Average turnaround time from Web Form to Pre-Qualified stage',
    growth: '18% faster'
  },
  {
    id: 'w-3',
    title: 'Sales Pipeline by Stage Conversion',
    dataSource: 'Deals',
    chartType: 'Funnel',
    metric: 'Conversion Rate',
    dimension: 'Stages',
    value: '₹1.52 Cr Pipeline',
    subtitle: '7 Stages active • Top conversion in Negotiation'
  },
  {
    id: 'w-4',
    title: 'Top Inbound Revenue Channels',
    dataSource: 'Campaigns',
    chartType: 'Pie',
    metric: 'Sourced Deal Value',
    dimension: 'Lead Source',
    value: 'Web & Referrals (74%)',
    subtitle: 'High intent enterprise inbound campaigns'
  }
];


