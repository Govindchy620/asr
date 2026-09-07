import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { ModuleType } from '../../types/crm';
import {
  Home,
  FileSpreadsheet,
  BarChart3,
  Bot,
  Users,
  Contact,
  Building2,
  Briefcase,
  TrendingUp,
  FolderOpen,
  Megaphone,
  CheckSquare,
  Calendar,
  PhoneCall,
  Package,
  BookOpen,
  FileText,
  ClipboardList,
  ShoppingCart,
  Receipt,
  Truck,
  Inbox,
  Share2,
  MapPin,
  Wrench,
  FolderGit2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  HelpCircle
} from 'lucide-react';

interface NavItem {
  id: ModuleType;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  category: string;
}

export const Sidebar: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    setViewMode,
    setSelectedRecordId,
    sidebarCollapsed,
    setSidebarCollapsed,
    theme,
    setTheme,
    leads,
    deals,
    tasks,
    meetings,
    quotes,
    invoices,
    campaigns,
    products,
    projects
  } = useCRM();

  const navItems: NavItem[] = [
    // 1. Overview & AI
    { id: 'home', label: 'Home', icon: Home, category: 'Overview' },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet, category: 'Overview' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'Overview' },
    { id: 'agents', label: 'Agents', icon: Bot, category: 'Overview' },

    // 2. Sales Pipeline
    { id: 'leads', label: 'Leads', icon: Users, badge: leads.length, category: 'Sales' },
    { id: 'contacts', label: 'Contacts', icon: Contact, category: 'Sales' },
    { id: 'accounts', label: 'Accounts', icon: Building2, category: 'Sales' },
    { id: 'deals', label: 'Deals', icon: Briefcase, badge: deals.length, category: 'Sales' },
    { id: 'forecasts', label: 'Forecasts', icon: TrendingUp, category: 'Sales' },
    { id: 'documents', label: 'Documents', icon: FolderOpen, category: 'Sales' },

    // 3. Marketing & Engagement
    { id: 'campaigns', label: 'Campaigns', icon: Megaphone, badge: campaigns.length, category: 'Marketing' },
    { id: 'salesinbox', label: 'SalesInbox', icon: Inbox, category: 'Marketing' },
    { id: 'social', label: 'Social', icon: Share2, category: 'Marketing' },

    // 4. Activities & Field Force
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: tasks.filter(t => t.status !== 'Completed').length, category: 'Activities' },
    { id: 'meetings', label: 'Meetings', icon: Calendar, badge: meetings.length, category: 'Activities' },
    { id: 'calls', label: 'Calls', icon: PhoneCall, category: 'Activities' },
    { id: 'visits', label: 'Visits', icon: MapPin, category: 'Activities' },

    // 5. Inventory & Commerce
    { id: 'products', label: 'Products', icon: Package, badge: products.length, category: 'Inventory' },
    { id: 'pricebooks', label: 'Price Books', icon: BookOpen, category: 'Inventory' },
    { id: 'quotes', label: 'Quotes', icon: FileText, badge: quotes.length, category: 'Inventory' },
    { id: 'salesorders', label: 'Sales Orders', icon: ClipboardList, category: 'Inventory' },
    { id: 'purchaseorders', label: 'Purchase Orders', icon: ShoppingCart, category: 'Inventory' },
    { id: 'invoices', label: 'Invoices', icon: Receipt, badge: invoices.length, category: 'Inventory' },
    { id: 'vendors', label: 'Vendors', icon: Truck, category: 'Inventory' },
    { id: 'services', label: 'Services', icon: Wrench, category: 'Inventory' },

    // 6. Projects & Operations
    { id: 'projects', label: 'Projects', icon: FolderGit2, badge: projects.length, category: 'Operations' },
    { id: 'setup', label: 'Setup', icon: Settings, category: 'Admin' }
  ];

  const handleNavClick = (modId: ModuleType) => {
    setActiveModule(modId);
    setSelectedRecordId(null);
    if (modId === 'deals') {
      setViewMode('kanban');
    } else {
      setViewMode('list');
    }
  };

  return (
    <aside
      className={`h-[calc(100vh-3.5rem)] bg-[#0f172a] text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-200 select-none shrink-0 z-20 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 custom-scrollbar">
        {navItems.map((item, index) => {
          const isActive = activeModule === item.id;
          const Icon = item.icon;
          const prevItem = index > 0 ? navItems[index - 1] : null;
          const showCategoryHeader = !sidebarCollapsed && (!prevItem || prevItem.category !== item.category);

          return (
            <React.Fragment key={item.id}>
              {showCategoryHeader && (
                <div className="px-3 pt-3.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {item.category}
                </div>
              )}
              <button
                onClick={() => handleNavClick(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-blue-600/20 text-white border-l-3 border-blue-500 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                } ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'}`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-blue-400 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />

                {!sidebarCollapsed && (
                  <span className="ml-2.5 truncate font-normal tracking-wide text-[12.5px]">{item.label}</span>
                )}

                {!sidebarCollapsed && item.badge !== undefined && (
                  <span
                    className={`ml-auto text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Floating tooltip for collapsed mode */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                    {item.label}
                    {item.badge !== undefined && ` (${item.badge})`}
                  </div>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Sidebar Footer Controls */}
      <div className="p-2 border-t border-slate-800/80 bg-[#0b1120] flex items-center justify-between text-xs text-slate-400 shrink-0">
        <button
          onClick={() => setTheme(theme === 'night' ? 'day' : 'night')}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title={`Switch to ${theme === 'night' ? 'Day' : 'Night'} Mode`}
        >
          {theme === 'night' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {!sidebarCollapsed && (
          <span className="text-[11px] text-slate-500 font-medium">26 Modules</span>
        )}

        <button
          onClick={() => setSidebarCollapsed(prev => !prev)}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-auto"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
