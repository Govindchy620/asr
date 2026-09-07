import React, { createContext, useContext, useState, useEffect } from 'react';
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
  AnalyticsWidget
} from '../types/crm';
import {
  INITIAL_LEADS,
  INITIAL_DEALS,
  INITIAL_CONTACTS,
  INITIAL_ACCOUNTS,
  INITIAL_TASKS,
  INITIAL_MEETINGS,
  INITIAL_CALLS,
  INITIAL_CAMPAIGNS,
  INITIAL_PRODUCTS,
  INITIAL_PRICEBOOKS,
  INITIAL_QUOTES,
  INITIAL_SALES_ORDERS,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_INVOICES,
  INITIAL_VENDORS,
  INITIAL_FORECASTS,
  INITIAL_DOCUMENTS,
  INITIAL_VISITS,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_AGENTS,
  INITIAL_REPORTS,
  INITIAL_ANALYTICS_WIDGETS,
  INITIAL_TIMELINE
} from '../data/mockData';

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

  // Generic and specific creation methods
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  addDeal: (deal: Omit<Deal, 'id' | 'createdAt' | 'daysInStage'>) => void;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  addMeeting: (meeting: Omit<Meeting, 'id'>) => void;
  addCall: (call: Omit<CallLog, 'id'>) => void;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  addPriceBook: (pb: Omit<PriceBook, 'id'>) => void;
  addQuote: (quote: Omit<Quote, 'id'>) => void;
  addSalesOrder: (so: Omit<SalesOrder, 'id'>) => void;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id'>) => void;
  addInvoice: (inv: Omit<Invoice, 'id'>) => void;
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  addForecast: (fc: Omit<Forecast, 'id'>) => void;
  addDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate'>) => void;
  addVisit: (visit: Omit<Visit, 'id'>) => void;
  addService: (srv: Omit<ServiceItem, 'id'>) => void;
  addProject: (prj: Omit<Project, 'id'>) => void;
  addAgent: (agent: Omit<AgentConfig, 'id'>) => void;
  addReport: (report: Omit<ReportItem, 'id' | 'lastRun' | 'createdBy'>) => void;
  addAnalyticsWidget: (widget: Omit<AnalyticsWidget, 'id'>) => void;

  updateDealStage: (dealId: string, newStage: Deal['stage']) => void;
  deleteRecords: (module: ModuleType, ids: string[]) => void;
  addTimelineItem: (recordId: string, item: Omit<ActivityTimelineItem, 'id' | 'timestamp'>) => void;

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

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('crm_theme') as ThemeMode;
    return saved || 'day';
  });

  const [isZiaOpen, setIsZiaOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createModalModule, setCreateModalModule] = useState<ModuleType>('leads');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Local storage assisted state
  const [leads, setLeads] = useState<Lead[]>(() => {
    const s = localStorage.getItem('crm_leads');
    return s ? JSON.parse(s) : INITIAL_LEADS;
  });
  const [deals, setDeals] = useState<Deal[]>(() => {
    const s = localStorage.getItem('crm_deals');
    return s ? JSON.parse(s) : INITIAL_DEALS;
  });
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const s = localStorage.getItem('crm_contacts');
    return s ? JSON.parse(s) : INITIAL_CONTACTS;
  });
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const s = localStorage.getItem('crm_accounts');
    return s ? JSON.parse(s) : INITIAL_ACCOUNTS;
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const s = localStorage.getItem('crm_tasks');
    return s ? JSON.parse(s) : INITIAL_TASKS;
  });
  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    const s = localStorage.getItem('crm_meetings');
    return s ? JSON.parse(s) : INITIAL_MEETINGS;
  });
  const [calls, setCalls] = useState<CallLog[]>(() => {
    const s = localStorage.getItem('crm_calls');
    return s ? JSON.parse(s) : INITIAL_CALLS;
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const s = localStorage.getItem('crm_campaigns');
    return s ? JSON.parse(s) : INITIAL_CAMPAIGNS;
  });
  const [products, setProducts] = useState<Product[]>(() => {
    const s = localStorage.getItem('crm_products');
    return s ? JSON.parse(s) : INITIAL_PRODUCTS;
  });
  const [pricebooks, setPricebooks] = useState<PriceBook[]>(() => {
    const s = localStorage.getItem('crm_pricebooks');
    return s ? JSON.parse(s) : INITIAL_PRICEBOOKS;
  });
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const s = localStorage.getItem('crm_quotes');
    return s ? JSON.parse(s) : INITIAL_QUOTES;
  });
  const [salesorders, setSalesorders] = useState<SalesOrder[]>(() => {
    const s = localStorage.getItem('crm_salesorders');
    return s ? JSON.parse(s) : INITIAL_SALES_ORDERS;
  });
  const [purchaseorders, setPurchaseorders] = useState<PurchaseOrder[]>(() => {
    const s = localStorage.getItem('crm_purchaseorders');
    return s ? JSON.parse(s) : INITIAL_PURCHASE_ORDERS;
  });
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const s = localStorage.getItem('crm_invoices');
    return s ? JSON.parse(s) : INITIAL_INVOICES;
  });
  const [vendors, setVendors] = useState<Vendor[]>(() => {
    const s = localStorage.getItem('crm_vendors');
    return s ? JSON.parse(s) : INITIAL_VENDORS;
  });
  const [forecasts, setForecasts] = useState<Forecast[]>(() => {
    const s = localStorage.getItem('crm_forecasts');
    return s ? JSON.parse(s) : INITIAL_FORECASTS;
  });
  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const s = localStorage.getItem('crm_documents');
    return s ? JSON.parse(s) : INITIAL_DOCUMENTS;
  });
  const [visits, setVisits] = useState<Visit[]>(() => {
    const s = localStorage.getItem('crm_visits');
    return s ? JSON.parse(s) : INITIAL_VISITS;
  });
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const s = localStorage.getItem('crm_services');
    return s ? JSON.parse(s) : INITIAL_SERVICES;
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    const s = localStorage.getItem('crm_projects');
    return s ? JSON.parse(s) : INITIAL_PROJECTS;
  });
  const [agents, setAgents] = useState<AgentConfig[]>(() => {
    const s = localStorage.getItem('crm_agents');
    return s ? JSON.parse(s) : INITIAL_AGENTS;
  });
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const s = localStorage.getItem('crm_reports');
    return s ? JSON.parse(s) : INITIAL_REPORTS;
  });
  const [analyticsWidgets, setAnalyticsWidgets] = useState<AnalyticsWidget[]>(() => {
    const s = localStorage.getItem('crm_analytics_widgets');
    return s ? JSON.parse(s) : INITIAL_ANALYTICS_WIDGETS;
  });
  const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState<boolean>(false);
  const [isCreateDashboardModalOpen, setIsCreateDashboardModalOpen] = useState<boolean>(false);

  const [timeline, setTimeline] = useState<Record<string, ActivityTimelineItem[]>>(() => {
    const s = localStorage.getItem('crm_timeline');
    return s ? JSON.parse(s) : INITIAL_TIMELINE;
  });

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
    const target = module || (activeModule === 'home' ? 'leads' : activeModule);
    if (target === 'leads') {
      setActiveModule('leads');
      setViewMode('create');
      setIsCreateModalOpen(false);
      return;
    }
    setCreateModalModule(target);
    setIsCreateModalOpen(true);
  };

  // Add methods
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const item: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setLeads(prev => [item, ...prev]);
  };

  const addDeal = (dealData: Omit<Deal, 'id' | 'createdAt' | 'daysInStage'>) => {
    const item: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      daysInStage: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setDeals(prev => [item, ...prev]);
  };

  const addContact = (contactData: Omit<Contact, 'id'>) => {
    const item: Contact = { ...contactData, id: `c-${Date.now()}` };
    setContacts(prev => [item, ...prev]);
  };

  const addAccount = (accountData: Omit<Account, 'id'>) => {
    const item: Account = { ...accountData, id: `acc-${Date.now()}` };
    setAccounts(prev => [item, ...prev]);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const item: Task = { ...taskData, id: `task-${Date.now()}` };
    setTasks(prev => [item, ...prev]);
  };

  const addMeeting = (meetingData: Omit<Meeting, 'id'>) => {
    const item: Meeting = { ...meetingData, id: `meet-${Date.now()}` };
    setMeetings(prev => [item, ...prev]);
  };

  const addCall = (callData: Omit<CallLog, 'id'>) => {
    const item: CallLog = { ...callData, id: `call-${Date.now()}` };
    setCalls(prev => [item, ...prev]);
  };

  const addCampaign = (campData: Omit<Campaign, 'id'>) => {
    const item: Campaign = { ...campData, id: `camp-${Date.now()}` };
    setCampaigns(prev => [item, ...prev]);
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const item: Product = { ...prodData, id: `prod-${Date.now()}` };
    setProducts(prev => [item, ...prev]);
  };

  const addPriceBook = (pbData: Omit<PriceBook, 'id'>) => {
    const item: PriceBook = { ...pbData, id: `pb-${Date.now()}` };
    setPricebooks(prev => [item, ...prev]);
  };

  const addQuote = (quoteData: Omit<Quote, 'id'>) => {
    const item: Quote = { ...quoteData, id: `q-${Date.now()}` };
    setQuotes(prev => [item, ...prev]);
  };

  const addSalesOrder = (soData: Omit<SalesOrder, 'id'>) => {
    const item: SalesOrder = { ...soData, id: `so-${Date.now()}` };
    setSalesorders(prev => [item, ...prev]);
  };

  const addPurchaseOrder = (poData: Omit<PurchaseOrder, 'id'>) => {
    const item: PurchaseOrder = { ...poData, id: `po-${Date.now()}` };
    setPurchaseorders(prev => [item, ...prev]);
  };

  const addInvoice = (invData: Omit<Invoice, 'id'>) => {
    const item: Invoice = { ...invData, id: `inv-${Date.now()}` };
    setInvoices(prev => [item, ...prev]);
  };

  const addVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const item: Vendor = { ...vendorData, id: `v-${Date.now()}` };
    setVendors(prev => [item, ...prev]);
  };

  const addForecast = (fcData: Omit<Forecast, 'id'>) => {
    const item: Forecast = { ...fcData, id: `fc-${Date.now()}` };
    setForecasts(prev => [item, ...prev]);
  };

  const addDocument = (docData: Omit<DocumentItem, 'id' | 'uploadDate'>) => {
    const item: DocumentItem = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    setDocuments(prev => [item, ...prev]);
  };

  const addVisit = (visitData: Omit<Visit, 'id'>) => {
    const item: Visit = { ...visitData, id: `vis-${Date.now()}` };
    setVisits(prev => [item, ...prev]);
  };

  const addService = (srvData: Omit<ServiceItem, 'id'>) => {
    const item: ServiceItem = { ...srvData, id: `srv-${Date.now()}` };
    setServices(prev => [item, ...prev]);
  };

  const addProject = (prjData: Omit<Project, 'id'>) => {
    const item: Project = { ...prjData, id: `prj-${Date.now()}` };
    setProjects(prev => [item, ...prev]);
  };

  const addAgent = (agentData: Omit<AgentConfig, 'id'>) => {
    const item: AgentConfig = { ...agentData, id: `agt-${Date.now()}` };
    setAgents(prev => [item, ...prev]);
  };

  const addReport = (reportData: Omit<ReportItem, 'id' | 'lastRun' | 'createdBy'>) => {
    const item: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      lastRun: 'Just now',
      createdBy: 'Rajesh Kumar'
    };
    setReports(prev => [item, ...prev]);
  };

  const addAnalyticsWidget = (widgetData: Omit<AnalyticsWidget, 'id'>) => {
    const item: AnalyticsWidget = {
      ...widgetData,
      id: `w-${Date.now()}`
    };
    setAnalyticsWidgets(prev => [item, ...prev]);
  };

  const updateDealStage = (dealId: string, newStage: Deal['stage']) => {
    setDeals(prev =>
      prev.map(deal => {
        if (deal.id === dealId) {
          const map: Record<Deal['stage'], number> = {
            Qualification: 20,
            'Needs Analysis': 40,
            'Value Proposition': 50,
            'Proposal/Quote': 65,
            'Negotiation/Review': 85,
            'Closed Won': 100,
            'Closed Lost': 0
          };
          return {
            ...deal,
            stage: newStage,
            probability: map[newStage],
            daysInStage: 0
          };
        }
        return deal;
      })
    );
  };

  const deleteRecords = (module: ModuleType, ids: string[]) => {
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
  };

  const addTimelineItem = (recordId: string, item: Omit<ActivityTimelineItem, 'id' | 'timestamp'>) => {
    setTimeline(prev => ({
      ...prev,
      [recordId]: [
        {
          ...item,
          id: `time-${Date.now()}`,
          timestamp: 'Just now'
        },
        ...(prev[recordId] || [])
      ]
    }));
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
        searchQuery,
        setSearchQuery
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
