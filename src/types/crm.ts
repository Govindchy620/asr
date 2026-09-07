export type ModuleType =
  | 'home'
  | 'reports'
  | 'analytics'
  | 'agents'
  | 'leads'
  | 'contacts'
  | 'accounts'
  | 'deals'
  | 'forecasts'
  | 'documents'
  | 'campaigns'
  | 'tasks'
  | 'meetings'
  | 'calls'
  | 'products'
  | 'pricebooks'
  | 'quotes'
  | 'salesorders'
  | 'purchaseorders'
  | 'invoices'
  | 'vendors'
  | 'salesinbox'
  | 'social'
  | 'visits'
  | 'services'
  | 'projects'
  | 'setup';

export type ViewMode = 'list' | 'kanban' | 'split' | 'detail' | 'create';

export type ThemeMode = 'day' | 'night' | 'auto';

export interface Lead {
  id: string;
  name: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  title: string;
  company: string;
  email: string;
  secondaryEmail?: string;
  phone: string;
  mobile?: string;
  fax?: string;
  website?: string;
  leadSource: string;
  leadStatus: string;
  leadScore: number;
  leadOwner: string;
  createdAt: string;
  annualRevenue?: string;
  notes?: string;
  rating?: string;
  industry?: string;
  noOfEmployees?: string;
  emailOptOut?: boolean;
  skypeId?: string;
  twitter?: string;
  leadImage?: string;
  // Address Information
  country?: string;
  flatHouseBuilding?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  zipPostalCode?: string;
  coordinates?: string;
  description?: string;
}

export interface Contact {
  id: string;
  name: string;
  accountName: string;
  email: string;
  phone: string;
  department: string;
  leadSource: string;
  owner: string;
  title: string;
}

export interface Account {
  id: string;
  name: string;
  phone: string;
  website: string;
  industry: string;
  annualRevenue: number;
  owner: string;
  billingCity: string;
  billingCountry: string;
}

export interface Deal {
  id: string;
  name: string;
  accountName: string;
  contactName: string;
  amount: number;
  stage: 'Qualification' | 'Needs Analysis' | 'Value Proposition' | 'Proposal/Quote' | 'Negotiation/Review' | 'Closed Won' | 'Closed Lost';
  probability: number;
  expectedCloseDate: string;
  dealOwner: string;
  pipeline: string;
  leadSource: string;
  daysInStage: number;
  createdAt: string;
}

export interface Forecast {
  id: string;
  name: string;
  period: string;
  targetRevenue: number;
  committedRevenue: number;
  bestCaseRevenue: number;
  closedRevenue: number;
  owner: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadDate: string;
  relatedTo: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
  startDate: string;
  endDate: string;
  budgetedCost: number;
  actualCost: number;
  expectedRevenue: number;
  owner: string;
}

export interface Task {
  id: string;
  subject: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Deferred';
  priority: 'High' | 'Normal' | 'Low';
  relatedTo: string;
  relatedType: string;
  assignedTo: string;
}

export interface Meeting {
  id: string;
  subject: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  relatedTo: string;
  host: string;
  attendeesCount: number;
}

export interface CallLog {
  id: string;
  subject: string;
  callType: 'Outbound' | 'Inbound' | 'Missed';
  callDuration: string;
  callStartTime: string;
  relatedTo: string;
  purpose: string;
  callResult: string;
  caller: string;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  unitPrice: number;
  usageUnit: string;
  qtyInStock: number;
  reorderLevel: number;
  active: boolean;
}

export interface PriceBook {
  id: string;
  name: string;
  currency: string;
  active: boolean;
  pricingTier: string;
  description: string;
  owner: string;
}

export interface Quote {
  id: string;
  quoteNumber: string;
  subject: string;
  accountName: string;
  contactName: string;
  validTill: string;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected';
  owner: string;
}

export interface SalesOrder {
  id: string;
  soNumber: string;
  subject: string;
  accountName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Draft' | 'Confirmed' | 'In Progress' | 'Delivered' | 'Cancelled';
  owner: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  subject: string;
  vendorName: string;
  orderDate: string;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Received' | 'Cancelled';
  owner: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  subject: string;
  accountName: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
  owner: string;
}

export interface Vendor {
  id: string;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  website: string;
  city: string;
  owner: string;
}

export interface Visit {
  id: string;
  subject: string;
  relatedRecord: string;
  location: string;
  checkInTime: string;
  checkOutTime: string;
  salesRep: string;
  notes: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  taxPercent: number;
  duration: string;
  category: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'Planned' | 'In Progress' | 'Completed';
  progress: number;
}

export interface AgentConfig {
  id: string;
  name: string;
  type: 'Data Entry' | 'Lead Scoring' | 'Email Assistant' | 'Churn Risk';
  trigger: string;
  action: string;
  status: 'Active' | 'Paused';
}

export interface ReportItem {
  id: string;
  name: string;
  module: string;
  reportType: 'Tabular' | 'Summary' | 'Matrix' | 'Pivot';
  columns: string[];
  rows: string;
  lastRun: string;
  createdBy: string;
}

export interface AnalyticsWidget {
  id: string;
  title: string;
  dataSource: string;
  chartType: 'Bar' | 'Line' | 'Pie' | 'Funnel' | 'KPI';
  metric: string;
  dimension: string;
  value: string;
  subtitle: string;
  growth?: string;
}

export interface ActivityTimelineItem {
  id: string;
  type: 'email' | 'call' | 'task' | 'meeting' | 'note' | 'stage_change';
  title: string;
  description: string;
  timestamp: string;
  user: string;
}


