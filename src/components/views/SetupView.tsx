import React, { useState } from 'react';
import {
  Settings,
  Users,
  Shield,
  Layers,
  GitBranch,
  Mail,
  Phone,
  Database,
  CheckCircle,
  ExternalLink,
  Sliders,
  Bell
} from 'lucide-react';

export const SetupView: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');

  const setupCards = [
    {
      category: 'General Settings',
      items: [
        { title: 'Company Details', desc: 'Manage organization address, currency, time zones, fiscal year', icon: Database },
        { title: 'Users & Control', desc: 'Invite team members, assign security profiles and roles', icon: Users },
        { title: 'Security & Compliance', desc: 'Two-factor authentication, IP restrictions, GDPR audit', icon: Shield }
      ]
    },
    {
      category: 'Customization',
      items: [
        { title: 'Modules and Fields', desc: 'Create custom modules, add formula fields, picklists, layout rules', icon: Layers },
        { title: 'Pipelines & Stages', desc: 'Configure sales stages, deal probabilities, and aging alerts', icon: GitBranch },
        { title: 'Templates', desc: 'Email templates, mail merge documents, inventory PDF layouts', icon: Sliders }
      ]
    },
    {
      category: 'Channels & Integrations',
      items: [
        { title: 'Email & IMAP Sync', desc: 'Connect Outlook, Gmail, custom SMTP/IMAP servers', icon: Mail },
        { title: 'Telephony (PBX)', desc: 'Integrate Twilio, Exotel, RingCentral for click-to-call', icon: Phone },
        { title: 'Marketplace & Integrations', desc: 'Connect Slack, Google Workspace, WhatsApp Business', icon: ExternalLink }
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-[#0b0f17] select-none custom-scrollbar space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">CRM Setup & Administration</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure your organization's CRM architecture, modules, security, and automations</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Edition: Enterprise Active</span>
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {setupCards.map(section => (
          <div key={section.category} className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {section.items.map(item => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    onClick={() => alert(`Setup panel opened for: ${item.title}`)}
                    className="p-4 bg-white dark:bg-[#151b26] border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
