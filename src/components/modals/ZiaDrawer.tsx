import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Sparkles,
  X,
  Send,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Zap,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'zia' | 'user';
  text: string;
  timestamp: string;
}

export const ZiaDrawer: React.FC = () => {
  const { isZiaOpen, setIsZiaOpen, deals, leads } = useCRM();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'zia',
      text: "Hello Rajesh! I'm Zia, your CRM AI assistant. I've analyzed your sales pipeline: you have ₹1.52 Cr closing this quarter, but 1 deal is showing stalled activity. How can I help you today?",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isZiaOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent AI response based on CRM context
    setTimeout(() => {
      let ziaReply = '';
      const lower = userMsg.text.toLowerCase();

      if (lower.includes('stalled') || lower.includes('risk')) {
        ziaReply = "Deal alert: 'Omnichannel CRM Expansion' (₹54,00,000) has been stalled in 'Needs Analysis' for 14 days without an email or call touchpoint. I recommend scheduling an executive sync with Meera Iyer today.";
      } else if (lower.includes('revenue') || lower.includes('pipeline') || lower.includes('forecast')) {
        const total = deals.reduce((acc, d) => acc + d.amount, 0);
        ziaReply = `Current active pipeline stands at ₹${total.toLocaleString('en-IN')}. Weighted probability forecast for this quarter is ₹${Math.round(total * 0.65).toLocaleString('en-IN')}.`;
      } else if (lower.includes('lead') || lower.includes('score')) {
        const topLead = [...leads].sort((a, b) => b.leadScore - a.leadScore)[0];
        ziaReply = `Highest scoring lead is ${topLead?.name} (${topLead?.company}) with a Zia Score of ${topLead?.leadScore}/100 based on website demo requests.`;
      } else {
        ziaReply = `I understand your request. Based on your current CRM activities, your deal velocity is 18% higher than team average this month. What specific record or report would you like me to pull up?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: `msg-zia-${Date.now()}`,
          sender: 'zia',
          text: ziaReply,
          timestamp: 'Just now'
        }
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white dark:bg-[#111827] border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 flex flex-col select-none animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-purple-50/60 dark:bg-purple-950/20">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-sm text-slate-900 dark:text-white">Ask Zia</span>
              <span className="text-[10px] font-semibold bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-1.5 py-0.2 rounded">
                AI Assistant
              </span>
            </div>
            <span className="text-[10px] text-slate-400">NextGen Sales Intelligence</span>
          </div>
        </div>

        <button
          onClick={() => setIsZiaOpen(false)}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap custom-scrollbar">
        <button
          onClick={() => setInputText('Which deals are currently stalled?')}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400 flex items-center gap-1"
        >
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          <span>Stalled Deals</span>
        </button>
        <button
          onClick={() => setInputText('Summarize total pipeline revenue')}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400 flex items-center gap-1"
        >
          <TrendingUp className="w-3 h-3 text-blue-500" />
          <span>Pipeline Forecast</span>
        </button>
        <button
          onClick={() => setInputText('Show top leads by Zia score')}
          className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-400 flex items-center gap-1"
        >
          <Zap className="w-3 h-3 text-emerald-500" />
          <span>Top Leads</span>
        </button>
      </div>

      {/* Message Chat Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask Zia about records, revenue, or stalled deals..."
          className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
