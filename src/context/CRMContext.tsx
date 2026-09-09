import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  ModuleType,
  ViewMode,
  ThemeMode,
  Lead,
  Deal,
  Contact,
  Account,
  Task,
  CallLog,
  ActivityTimelineItem,
  Campaign,
  Meeting,
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
  ReportItem,
  AnalyticsWidget,
} from '../types/crm';
import api from '../services/api';

interface CRMContextType {
  activeModule: ModuleType;
  setActiveModule: (m: ModuleType) => void;
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  selectedRecordId: string | null;
  setSelectedRecordId: (id: string | null) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (c: boolean | ((prev: boolean) => boolean)) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  isZiaOpen: boolean;
  setIsZiaOpen: (open: boolean) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  createModalModule: ModuleType;
  openCreateModal: (module?: ModuleType) => void;
  isLoading: boolean;

  // Data Store
  leads: Lead[];
  deals: Deal[];
  contacts: Contact[];
  accounts: Account[];
  tasks: Task[];
  meetings: Meeting[];
  calls: CallLog[];
  campaigns: Campaign[];
  products: Product[];
  pricebooks: PriceBook[];
  quotes: Quote[];
  salesorders: SalesOrder[];
  purchaseorders: PurchaseOrder[];
  invoices: Invoice[];
  vendors: Vendor[];
  forecasts: Forecast[];
  documents: DocumentItem[];
  visits: Visit[];
  services: ServiceItem[];
  projects: Project[];
  agents: AgentConfig[];
  reports: ReportItem[];
  analyticsWidgets: AnalyticsWidget[];
  isCreateReportModalOpen: boolean;
  setIsCreateReportModalOpen: (open: boolean) => void;
  isCreateDashboardModalOpen: boolean;
  setIsCreateDashboardModalOpen: (open: boolean) => void;
  timeline: Record<string, ActivityTimelineItem[]>;

  // Creation and update methods
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Promise<any>;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'daysInStage'>) => Promise<any>;
  addContact: (contact: Omit<Contact, 'id'>) => Promise<any>;
  addAccount: (account: Omit<Account, 'id'>) => Promise<any>;
  addTask: (task: Omit<Task, 'id'>) => Promise<any>;
  addMeeting: (meeting: Omit<Meeting, 'id'>) => Promise<any>;
  addCall: (call: Omit<CallLog, 'id'>) => Promise<any>;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<any>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<any>;
  addPriceBook: (pb: Omit<PriceBook, 'id'>) => Promise<any>;
  addQuote: (quote: Omit<Quote, 'id'>) => Promise<any>;
  addSalesOrder: (so: Omit<SalesOrder, 'id'>) => Promise<any>;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => Promise<any>;
  addInvoice: (inv: Omit<Invoice, 'id'>) => Promise<any>;
  addVendor: (vendor: Omit<Vendor, 'id'>) => Promise<any>;
  addForecast: (fc: Omit<Forecast, 'id'>) => Promise<any>;
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate'>) => Promise<any>;
  addVisit: (visit: Omit<Visit, 'id'>) => Promise<any>;
  addService: (srv: Omit<ServiceItem, 'id'>) => Promise<any>;
  addProject: (prj: Omit<Project, 'id'>) => Promise<any>;
  addAgent: (agent: Omit<AgentConfig, 'id'>) => Promise<any>;
  addReport: (report: Omit<ReportItem, 'id' | 'lastRun' | 'createdBy'>) => Promise<any>;
  addAnalyticsWidget: (widget: Omit<AnalyticsWidget, 'id'>) => Promise<any>;

  updateDealStage: (dealId: string, newStage: Deal['stage']) => Promise<void>;
  deleteRecords: (module: ModuleType, ids: string[]) => Promise<void>;
  addTimelineItem: (recordId: string, item: Omit<ActivityTimelineItem, 'id' | 'timestamp'>) => Promise<void>;
  convertLeadAction: (leadId: string, payload: any) => Promise<any>;
  refreshModuleData: (module?: ModuleType) => Promise<void>;
  fetchRecordById: (module: ModuleType, id: string) => Promise<any>;

  // Global Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ModuleType>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('crm_theme') as ThemeMode;
    return saved || 'day';
  });

  const [isZiaOpen, setIsZiaOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createModalModule, setCreateModalModule] = useState<ModuleType>('leads');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Live Database States initialized empty (no mock data)
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [calls, setCalls] = useState<CallLog[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [pricebooks, setPricebooks] = useState<PriceBook[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [salesorders, setSalesorders] = useState<SalesOrder[]>([]);
  const [purchaseorders, setPurchaseorders] = useState<PurchaseOrder[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [analyticsWidgets, setAnalyticsWidgets] = useState<AnalyticsWidget[]>([]);
  const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState<boolean>(false);
  const [isCreateDashboardModalOpen, setIsCreateDashboardModalOpen] = useState<boolean>(false);

  const [timeline, setTimeline] = useState<Record<string, ActivityTimelineItem[]>>({});

  // Sync theme
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('crm_theme', theme);
    if (theme === 'night') {
      root.classList.add('dark');
    } else if (theme === 'day') {
      root.classList.remove('dark');
    } else {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isSystemDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (t: ThemeMode) => setThemeState(t);

  const openCreateModal = (module?: ModuleType) => {
    const target =
      module ||
      (activeModule === 'home' ||
      activeModule === 'workqueue' ||
      activeModule === 'reports' ||
      activeModule === 'analytics' ||
      activeModule === 'setup'
        ? 'leads'
        : activeModule);
    setActiveModule(target);
    setViewMode('create');
    setIsCreateModalOpen(false);
  };

  // Normalization helper to guarantee fields like `id` and `name` are always present
  const normalizeRecord = (mod: string, doc: any): any => {
    const id = doc.id || doc._id?.toString() || `rec-${Date.now()}`;
    let name = doc.name;
    if (!name) {
      if (mod === 'leads' || mod === 'contacts') {
        name = `${doc.salutation ? doc.salutation + ' ' : ''}${doc.firstName || ''} ${doc.lastName || ''}`.trim() || doc.company || doc.email || 'Unnamed';
      } else if (mod === 'accounts') {
        name = doc.accountName || 'Unnamed Account';
      } else if (mod === 'deals') {
        name = doc.dealName || 'Unnamed Deal';
      } else if (mod === 'tasks' || mod === 'meetings' || mod === 'calls') {
        name = doc.subject || 'Activity';
      } else {
        name = doc.title || doc.name || `${mod} Record`;
      }
    }

    return {
      ...doc,
      id,
      name,
      createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    };
  };

  // Live fetch function from MongoDB Atlas backend
  const refreshModuleData = useCallback(async (moduleName?: ModuleType) => {
    const target = (moduleName || activeModule).toLowerCase();
    if (['home', 'workqueue', 'reports', 'analytics', 'setup'].includes(target)) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await api.fetchRecords(target, { limit: 100 });
      const rawRecords = res.data || res.records || [];
      const normalized = rawRecords.map((r: any) => normalizeRecord(target, r));

      switch (target) {
        case 'leads': setLeads(normalized); break;
        case 'deals': setDeals(normalized); break;
        case 'contacts': setContacts(normalized); break;
        case 'accounts': setAccounts(normalized); break;
        case 'tasks': setTasks(normalized); break;
        case 'meetings': setMeetings(normalized); break;
        case 'calls': setCalls(normalized); break;
        case 'campaigns': setCampaigns(normalized); break;
        case 'products': setProducts(normalized); break;
        case 'pricebooks': setPricebooks(normalized); break;
        case 'quotes': setQuotes(normalized); break;
        case 'salesorders': setSalesorders(normalized); break;
        case 'purchaseorders': setPurchaseorders(normalized); break;
        case 'invoices': setInvoices(normalized); break;
        case 'vendors': setVendors(normalized); break;
        case 'forecasts': setForecasts(normalized); break;
        case 'documents': setDocuments(normalized); break;
        case 'visits': setVisits(normalized); break;
        case 'services': setServices(normalized); break;
        case 'projects': setProjects(normalized); break;
        case 'agents': setAgents(normalized); break;
        default: break;
      }
    } catch (err) {
      console.error(`Failed to load data for ${target}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [activeModule]);

  // Initial load: Fetch core modules from MongoDB Atlas on application start
  useEffect(() => {
    const loadCoreData = async () => {
      try {
        setIsLoading(true);
        const [leadsRes, dealsRes, contactsRes, accountsRes, tasksRes] = await Promise.allSettled([
          api.fetchRecords('leads', { limit: 100 }),
          api.fetchRecords('deals', { limit: 100 }),
          api.fetchRecords('contacts', { limit: 100 }),
          api.fetchRecords('accounts', { limit: 100 }),
          api.fetchRecords('tasks', { limit: 100 }),
        ]);

        if (leadsRes.status === 'fulfilled') {
          setLeads((leadsRes.value.data || []).map(r => normalizeRecord('leads', r)));
        }
        if (dealsRes.status === 'fulfilled') {
          setDeals((dealsRes.value.data || []).map(r => normalizeRecord('deals', r)));
        }
        if (contactsRes.status === 'fulfilled') {
          setContacts((contactsRes.value.data || []).map(r => normalizeRecord('contacts', r)));
        }
        if (accountsRes.status === 'fulfilled') {
          setAccounts((accountsRes.value.data || []).map(r => normalizeRecord('accounts', r)));
        }
        if (tasksRes.status === 'fulfilled') {
          setTasks((tasksRes.value.data || []).map(r => normalizeRecord('tasks', r)));
        }
      } catch (e) {
        console.error('Error preloading core CRM data:', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoreData();
  }, []);

  // Whenever activeModule changes, fetch its fresh live dataset
  useEffect(() => {
    refreshModuleData(activeModule);
  }, [activeModule, refreshModuleData]);

  // Fetch single record by ID directly from MongoDB
  const fetchRecordById = async (module: ModuleType, id: string) => {
    try {
      const doc = await api.fetchRecord(module, id);
      return normalizeRecord(module, doc);
    } catch (e) {
      console.error(`Error fetching ${module} record ${id}:`, e);
      return null;
    }
  };

  // ----------------- CRUD Handlers Saving Live to MongoDB Atlas -----------------

  const addLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    try {
      const created = await api.createRecord('leads', leadData);
      const normalized = normalizeRecord('leads', created);
      setLeads(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding lead:', err);
      throw err;
    }
  };

  const addDeal = async (dealData: Omit<Deal, 'id' | 'createdAt' | 'daysInStage'>) => {
    try {
      const created = await api.createRecord('deals', dealData);
      const normalized = normalizeRecord('deals', created);
      setDeals(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding deal:', err);
      throw err;
    }
  };

  const addContact = async (contactData: Omit<Contact, 'id'>) => {
    try {
      const created = await api.createRecord('contacts', contactData);
      const normalized = normalizeRecord('contacts', created);
      setContacts(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding contact:', err);
      throw err;
    }
  };

  const addAccount = async (accountData: Omit<Account, 'id'>) => {
    try {
      const created = await api.createRecord('accounts', accountData);
      const normalized = normalizeRecord('accounts', created);
      setAccounts(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding account:', err);
      throw err;
    }
  };

  const addTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const created = await api.createRecord('tasks', taskData);
      const normalized = normalizeRecord('tasks', created);
      setTasks(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding task:', err);
      throw err;
    }
  };

  const addMeeting = async (meetingData: Omit<Meeting, 'id'>) => {
    try {
      const created = await api.createRecord('meetings', meetingData);
      const normalized = normalizeRecord('meetings', created);
      setMeetings(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding meeting:', err);
      throw err;
    }
  };

  const addCall = async (callData: Omit<CallLog, 'id'>) => {
    try {
      const created = await api.createRecord('calls', callData);
      const normalized = normalizeRecord('calls', created);
      setCalls(prev => [normalized, ...prev]);
      return normalized;
    } catch (err: any) {
      console.error('Error adding call:', err);
      throw err;
    }
  };

  const addCampaign = async (campData: Omit<Campaign, 'id'>) => {
    const created = await api.createRecord('campaigns', campData);
    const normalized = normalizeRecord('campaigns', created);
    setCampaigns(prev => [normalized, ...prev]);
    return normalized;
  };

  const addProduct = async (prodData: Omit<Product, 'id'>) => {
    const created = await api.createRecord('products', prodData);
    const normalized = normalizeRecord('products', created);
    setProducts(prev => [normalized, ...prev]);
    return normalized;
  };

  const addPriceBook = async (pbData: Omit<PriceBook, 'id'>) => {
    const created = await api.createRecord('pricebooks', pbData);
    const normalized = normalizeRecord('pricebooks', created);
    setPricebooks(prev => [normalized, ...prev]);
    return normalized;
  };

  const addQuote = async (quoteData: Omit<Quote, 'id'>) => {
    const created = await api.createRecord('quotes', quoteData);
    const normalized = normalizeRecord('quotes', created);
    setQuotes(prev => [normalized, ...prev]);
    return normalized;
  };

  const addSalesOrder = async (soData: Omit<SalesOrder, 'id'>) => {
    const created = await api.createRecord('salesorders', soData);
    const normalized = normalizeRecord('salesorders', created);
    setSalesorders(prev => [normalized, ...prev]);
    return normalized;
  };

  const addPurchaseOrder = async (poData: Omit<PurchaseOrder, 'id'>) => {
    const created = await api.createRecord('purchaseorders', poData);
    const normalized = normalizeRecord('purchaseorders', created);
    setPurchaseorders(prev => [normalized, ...prev]);
    return normalized;
  };

  const addInvoice = async (invData: Omit<Invoice, 'id'>) => {
    const created = await api.createRecord('invoices', invData);
    const normalized = normalizeRecord('invoices', created);
    setInvoices(prev => [normalized, ...prev]);
    return normalized;
  };

  const addVendor = async (vendorData: Omit<Vendor, 'id'>) => {
    const created = await api.createRecord('vendors', vendorData);
    const normalized = normalizeRecord('vendors', created);
    setVendors(prev => [normalized, ...prev]);
    return normalized;
  };

  const addForecast = async (fcData: Omit<Forecast, 'id'>) => {
    const created = await api.createRecord('forecasts', fcData);
    const normalized = normalizeRecord('forecasts', created);
    setForecasts(prev => [normalized, ...prev]);
    return normalized;
  };

  const addDocument = async (docData: Omit<DocumentItem, 'id' | 'uploadDate'>) => {
    const created = await api.createRecord('documents', docData);
    const normalized = normalizeRecord('documents', created);
    setDocuments(prev => [normalized, ...prev]);
    return normalized;
  };

  const addVisit = async (visitData: Omit<Visit, 'id'>) => {
    const created = await api.createRecord('visits', visitData);
    const normalized = normalizeRecord('visits', created);
    setVisits(prev => [normalized, ...prev]);
    return normalized;
  };

  const addService = async (srvData: Omit<ServiceItem, 'id'>) => {
    const created = await api.createRecord('services', srvData);
    const normalized = normalizeRecord('services', created);
    setServices(prev => [normalized, ...prev]);
    return normalized;
  };

  const addProject = async (prjData: Omit<Project, 'id'>) => {
    const created = await api.createRecord('projects', prjData);
    const normalized = normalizeRecord('projects', created);
    setProjects(prev => [normalized, ...prev]);
    return normalized;
  };

  const addAgent = async (agentData: Omit<AgentConfig, 'id'>) => {
    const created = await api.createRecord('agents', agentData);
    const normalized = normalizeRecord('agents', created);
    setAgents(prev => [normalized, ...prev]);
    return normalized;
  };

  const addReport = async (reportData: Omit<ReportItem, 'id' | 'lastRun' | 'createdBy'>) => {
    const item: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      lastRun: 'Just now',
      createdBy: 'Govind Choudhary',
    };
    setReports(prev => [item, ...prev]);
    return item;
  };

  const addAnalyticsWidget = async (widgetData: Omit<AnalyticsWidget, 'id'>) => {
    const item: AnalyticsWidget = {
      ...widgetData,
      id: `w-${Date.now()}`,
    };
    setAnalyticsWidgets(prev => [item, ...prev]);
    return item;
  };

  const updateDealStage = async (dealId: string, newStage: Deal['stage']) => {
    try {
      await api.updateRecord('deals', dealId, { stage: newStage });
      setDeals(prev =>
        prev.map(deal => {
          if (deal.id === dealId) {
            return {
              ...deal,
              stage: newStage,
            };
          }
          return deal;
        })
      );
    } catch (e) {
      console.error('Error updating deal stage in backend:', e);
    }
  };

  // Live Bulk Delete from MongoDB Atlas
  const deleteRecords = async (module: ModuleType, ids: string[]) => {
    try {
      await api.bulkDeleteRecords(module, ids);
      switch (module) {
        case 'leads': setLeads(p => p.filter(i => !ids.includes(i.id))); break;
        case 'deals': setDeals(p => p.filter(i => !ids.includes(i.id))); break;
        case 'contacts': setContacts(p => p.filter(i => !ids.includes(i.id))); break;
        case 'accounts': setAccounts(p => p.filter(i => !ids.includes(i.id))); break;
        case 'tasks': setTasks(p => p.filter(i => !ids.includes(i.id))); break;
        case 'meetings': setMeetings(p => p.filter(i => !ids.includes(i.id))); break;
        case 'calls': setCalls(p => p.filter(i => !ids.includes(i.id))); break;
        case 'campaigns': setCampaigns(p => p.filter(i => !ids.includes(i.id))); break;
        case 'products': setProducts(p => p.filter(i => !ids.includes(i.id))); break;
        case 'pricebooks': setPricebooks(p => p.filter(i => !ids.includes(i.id))); break;
        case 'quotes': setQuotes(p => p.filter(i => !ids.includes(i.id))); break;
        case 'salesorders': setSalesorders(p => p.filter(i => !ids.includes(i.id))); break;
        case 'purchaseorders': setPurchaseorders(p => p.filter(i => !ids.includes(i.id))); break;
        case 'invoices': setInvoices(p => p.filter(i => !ids.includes(i.id))); break;
        case 'vendors': setVendors(p => p.filter(i => !ids.includes(i.id))); break;
        case 'forecasts': setForecasts(p => p.filter(i => !ids.includes(i.id))); break;
        case 'documents': setDocuments(p => p.filter(i => !ids.includes(i.id))); break;
        case 'visits': setVisits(p => p.filter(i => !ids.includes(i.id))); break;
        case 'services': setServices(p => p.filter(i => !ids.includes(i.id))); break;
        case 'projects': setProjects(p => p.filter(i => !ids.includes(i.id))); break;
        case 'agents': setAgents(p => p.filter(i => !ids.includes(i.id))); break;
        default: break;
      }
    } catch (e) {
      console.error(`Error deleting records from ${module}:`, e);
      throw e;
    }
  };

  const addTimelineItem = async (recordId: string, item: Omit<ActivityTimelineItem, 'id' | 'timestamp'>) => {
    const newItem: ActivityTimelineItem = {
      ...item,
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
    };
    setTimeline(prev => ({
      ...prev,
      [recordId]: [newItem, ...(prev[recordId] || [])],
    }));

    // If it's a task/call/meeting, also persist to Activity collection
    try {
      await api.addActivity({
        activityType: item.type === 'call' ? 'call' : item.type === 'meeting' ? 'meeting' : 'task',
        subject: item.title,
        description: item.description,
        relatedTo: { recordId, module: activeModule },
      });
    } catch (e) {
      console.warn('Could not persist activity to MongoDB:', e);
    }
  };

  // Convert Lead Atomic Action
  const convertLeadAction = async (leadId: string, payload: any) => {
    try {
      setIsLoading(true);
      const result = await api.convertLead(leadId, payload);
      // Refresh Leads, Accounts, Contacts, and Deals to sync MongoDB state
      await Promise.allSettled([
        refreshModuleData('leads'),
        refreshModuleData('accounts'),
        refreshModuleData('contacts'),
        refreshModuleData('deals'),
      ]);
      return result;
    } catch (e) {
      console.error('Lead conversion failed:', e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CRMContext.Provider
      value={{
        activeModule,
        setActiveModule,
        viewMode,
        setViewMode,
        selectedRecordId,
        setSelectedRecordId,
        sidebarCollapsed,
        setSidebarCollapsed,
        theme,
        setTheme,
        isZiaOpen,
        setIsZiaOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
        createModalModule,
        openCreateModal,
        isLoading,
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
        isCreateReportModalOpen,
        setIsCreateReportModalOpen,
        isCreateDashboardModalOpen,
        setIsCreateDashboardModalOpen,
        timeline,
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
        addAgent,
        addReport,
        addAnalyticsWidget,
        updateDealStage,
        deleteRecords,
        addTimelineItem,
        convertLeadAction,
        refreshModuleData,
        fetchRecordById,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
