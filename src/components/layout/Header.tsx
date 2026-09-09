import React, { useState, useEffect, useRef } from 'react';
import { useCRM } from '../../context/CRMContext';
import { ModuleType, ThemeMode } from '../../types/crm';
import {
  Search,
  Sparkles,
  Bell,
  Calendar as CalendarIcon,
  Settings,
  ShoppingBag,
  Sun,
  Moon,
  Monitor,
  Check,
  Building2,
  Users,
  Target,
  FileText,
  PanelLeft,
  X,
  Phone,
  User
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeModule,
    setActiveModule,
    setViewMode,
    setSelectedRecordId,
    sidebarCollapsed,
    setSidebarCollapsed,
    theme,
    setTheme,
    isZiaOpen,
    setIsZiaOpen,
    searchQuery,
    setSearchQuery,
    leads,
    deals,
    contacts,
    accounts,
    openCreateModal
  } = useCRM();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignalsOpen, setIsSignalsOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const quickCreateRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut Alt + S to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
      if (signalsRef.current && !signalsRef.current.contains(e.target as Node)) {
        setIsSignalsOpen(false);
      }
      if (quickCreateRef.current && !quickCreateRef.current.contains(e.target as Node)) {
        setIsQuickCreateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items based on global search
  const filteredLeads = searchQuery.trim()
    ? leads.filter(l => l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.company.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredDeals = searchQuery.trim()
    ? deals.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.accountName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredContacts = searchQuery.trim()
    ? contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSelectSearchResult = (mod: ModuleType, id: string) => {
    setActiveModule(mod);
    setSelectedRecordId(id);
    setViewMode('detail');
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="h-14 bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 md:px-4 select-none shrink-0 z-30 transition-colors duration-200">
      {/* Left: Sidebar Toggle & Zoho CRM Logo */}
      <div className="flex items-center space-x-2 md:space-x-3 overflow-hidden">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(prev => !prev)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* Brand Logo */}
        <div
          onClick={() => {
            setActiveModule('home');
            setViewMode('list');
            setSelectedRecordId(null);
          }}
          className="flex items-center space-x-2 cursor-pointer group"
          title="CRM Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            CRM
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <div className="flex items-center space-x-1">
              <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base">CRM</span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 tracking-wider uppercase font-medium">NextGen UI</span>
          </div>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md mx-3 relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3 text-slate-400 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search across all modules (Alt+S)"
            className="w-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-lg pl-9 pr-14 py-1.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all duration-200"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block absolute right-2.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
              Alt+S
            </kbd>
          )}
        </div>

        {/* Live Search Suggestions Dropdown */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div
            onMouseDown={e => e.preventDefault()}
            className="absolute top-full mt-1.5 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden max-h-96 overflow-y-auto"
          >
            <div className="p-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-400">
              <span>Search results for "{searchQuery}"</span>
              <button onClick={() => setIsSearchFocused(false)} className="hover:text-slate-600">
                Close
              </button>
            </div>

            {filteredLeads.length === 0 && filteredDeals.length === 0 && filteredContacts.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No matching records found across Leads, Deals, or Contacts.
              </div>
            ) : (
              <div className="py-1">
                {filteredDeals.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-blue-500" /> Deals ({filteredDeals.length})
                    </div>
                    {filteredDeals.map(deal => (
                      <div
                        key={deal.id}
                        onClick={() => handleSelectSearchResult('deals', deal.id)}
                        className="px-4 py-2 hover:bg-blue-50/60 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{deal.name}</div>
                          <div className="text-xs text-slate-400">{deal.accountName} • {deal.stage}</div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          ₹{deal.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredLeads.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-indigo-500" /> Leads ({filteredLeads.length})
                    </div>
                    {filteredLeads.map(lead => (
                      <div
                        key={lead.id}
                        onClick={() => handleSelectSearchResult('leads', lead.id)}
                        className="px-4 py-2 hover:bg-blue-50/60 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{lead.name}</div>
                          <div className="text-xs text-slate-400">{lead.title} at {lead.company}</div>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                          {lead.leadStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredContacts.length > 0 && (
                  <div>
                    <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-1.5">
                      <Building2 className="w-3 h-3 text-purple-500" /> Contacts ({filteredContacts.length})
                    </div>
                    {filteredContacts.map(c => (
                      <div
                        key={c.id}
                        onClick={() => handleSelectSearchResult('contacts', c.id)}
                        className="px-4 py-2 hover:bg-blue-50/60 dark:hover:bg-slate-800/80 cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{c.name}</div>
                          <div className="text-xs text-slate-400">{c.email} • {c.accountName}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side Utilities */}
      <div className="flex items-center space-x-1.5 sm:space-x-2">
        {/* Quick Create (+) Dropdown */}
        <div className="relative" ref={quickCreateRef}>
          <button
            onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
            className="hidden sm:inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs shadow-blue-500/20 transition-all duration-150"
            title="Quick Create Record"
          >
            <span className="text-sm font-bold mr-1">+</span> Quick Create
          </button>

          {isQuickCreateOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 py-1 overflow-hidden text-xs">
              <div className="px-3 py-1.5 font-semibold text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                Quick Create
              </div>
              <button
                onClick={() => {
                  setActiveModule('leads');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <Users className="w-3.5 h-3.5 text-blue-500" /> Create Lead
              </button>
              <button
                onClick={() => {
                  setActiveModule('contacts');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <User className="w-3.5 h-3.5 text-purple-500" /> Create Contact
              </button>
              <button
                onClick={() => {
                  setActiveModule('accounts');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <Building2 className="w-3.5 h-3.5 text-indigo-500" /> Create Account
              </button>
              <button
                onClick={() => {
                  setActiveModule('deals');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <Target className="w-3.5 h-3.5 text-emerald-500" /> Create Deal
              </button>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
              <button
                onClick={() => {
                  setActiveModule('tasks');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500" /> Create Task
              </button>
              <button
                onClick={() => {
                  setActiveModule('calls');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-teal-500" /> Log a Call
              </button>
              <button
                onClick={() => {
                  setActiveModule('meetings');
                  setViewMode('create');
                  setIsQuickCreateOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-rose-500" /> Schedule Meeting
              </button>
            </div>
          )}
        </div>

        {/* Ask Zia AI Assistant */}
        <button
          onClick={() => setIsZiaOpen(!isZiaOpen)}
          className={`p-2 rounded-lg relative transition-all duration-150 ${
            isZiaOpen
              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 ring-2 ring-purple-400/50'
              : 'text-slate-600 dark:text-slate-300 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-slate-800'
          }`}
          title="Ask Zia AI"
        >
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="sr-only">Ask Zia</span>
        </button>

        {/* Signals / Notifications */}
        <div className="relative" ref={signalsRef}>
          <button
            onClick={() => setIsSignalsOpen(!isSignalsOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            title="Signals & Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#111827]" />
            )}
          </button>

          {/* Signals Dropdown */}
          {isSignalsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Notifications & Signals</span>
                <button
                  onClick={() => setUnreadCount(0)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Aarav Sharma opened email</div>
                  <div className="text-[11px] text-slate-400">Proposal v2.4 viewed 3 times in Mumbai</div>
                  <div className="text-[10px] text-blue-500 mt-1">10 mins ago • High Intent</div>
                </div>
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Deal Stalled Alert</div>
                  <div className="text-[11px] text-slate-400">Omnichannel CRM Expansion has been in Needs Analysis for 14 days</div>
                  <div className="text-[10px] text-amber-500 mt-1">1 hour ago • Novi Risk Score</div>
                </div>
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Upcoming Meeting with Apex Retail</div>
                  <div className="text-[11px] text-slate-400">Scheduled for tomorrow at 11:00 AM</div>
                  <div className="text-[10px] text-emerald-500 mt-1">Tomorrow</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calendar Quick Action */}
        <button
          onClick={() => {
            setActiveModule('tasks');
            setViewMode('list');
          }}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="CRM Calendar & Agenda"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>

        {/* Marketplace */}
        <button
          onClick={() => setActiveModule('setup')}
          className="hidden sm:inline-flex p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Marketplace"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>

        {/* Setup Icon */}
        <button
          onClick={() => {
            setActiveModule('setup');
            setViewMode('list');
          }}
          className={`p-2 rounded-lg transition-colors ${
            activeModule === 'setup'
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="CRM Setup & Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-semibold text-xs flex items-center justify-center ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-blue-500 transition-all ml-1"
          >
            RK
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 p-2 text-sm">
              {/* User Bio */}
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="font-semibold text-slate-900 dark:text-white">Rajesh Kumar</div>
                <div className="text-xs text-slate-400">rajesh.kumar@enterprise-crm.in</div>
                <div className="mt-1 inline-flex items-center text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                  Administrator • Pro Edition
                </div>
              </div>

              {/* Theme Switcher Options (Day / Night / Auto) */}
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Theme Appearance
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setTheme('day')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition-all ${
                      theme === 'day'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Sun className="w-4 h-4 mb-1" />
                    Day
                  </button>
                  <button
                    onClick={() => setTheme('night')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition-all ${
                      theme === 'night'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Moon className="w-4 h-4 mb-1" />
                    Night
                  </button>
                  <button
                    onClick={() => setTheme('auto')}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs transition-all ${
                      theme === 'auto'
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Monitor className="w-4 h-4 mb-1" />
                    Auto
                  </button>
                </div>
              </div>

              {/* Menu Links */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setActiveModule('setup');
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center justify-between"
                >
                  My Settings
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded flex items-center justify-between"
                >
                  Switch Teamspace
                </button>
                <button
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded flex items-center justify-between mt-1"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
