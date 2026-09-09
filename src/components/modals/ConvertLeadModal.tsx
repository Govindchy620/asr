import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { X, CheckCircle2, Building2, User, DollarSign, ArrowRight, Loader2 } from 'lucide-react';

interface ConvertLeadModalProps {
  lead: any;
  isOpen: boolean;
  onClose: () => void;
}

export const ConvertLeadModal: React.FC<ConvertLeadModalProps> = ({ lead, isOpen, onClose }) => {
  const { convertLeadAction, setActiveModule, setSelectedRecordId, setViewMode } = useCRM();

  const [createDeal, setCreateDeal] = useState(true);
  const [dealName, setDealName] = useState(`${lead.company || lead.name || 'Enterprise'} - Deal`);
  const [dealAmount, setDealAmount] = useState('250000');
  const [dealStage, setDealStage] = useState('Qualification');
  const [closingDate, setClosingDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !lead) return null;

  const leadName = lead.name || `${lead.firstName || ''} ${lead.lastName || ''}`.trim() || 'Lead';
  const accountName = lead.company || `${lead.lastName || 'Household'} Account`;

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload: any = {
        dealData: createDeal
          ? {
              createDeal: true,
              dealName,
              amount: Number(dealAmount) || 100000,
              stage: dealStage,
              closingDate,
            }
          : null,
      };

      const result = await convertLeadAction(lead.id, payload);

      onClose();
      // Navigate user to newly created Account detail page as per Zoho CRM standard flow
      if (result.account?.id) {
        setActiveModule('accounts');
        setSelectedRecordId(result.account.id);
        setViewMode('detail');
      } else if (result.contact?.id) {
        setActiveModule('contacts');
        setSelectedRecordId(result.contact.id);
        setViewMode('detail');
      } else {
        setViewMode('list');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to convert lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Convert Lead: {leadName}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Transform this qualified lead into active Account, Contact, and Deal records.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConvert} className="p-6 overflow-y-auto space-y-5 text-sm">
          {errorMsg && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-lg text-rose-700 dark:text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Contact Section */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 mt-0.5">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Create New Contact</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">Auto-Linked</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                <strong>{leadName}</strong> ({lead.email || 'No email'} • {lead.phone || lead.mobile || 'No phone'})
              </p>
            </div>
          </div>

          {/* Account Section */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 mt-0.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Create New Account</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-medium">Auto-Linked</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Account Name: <strong>{accountName}</strong>
              </p>
            </div>
          </div>

          {/* Deal Section */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={createDeal}
                  onChange={e => setCreateDeal(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Create a New Deal for this Account
                </span>
              </label>
            </div>

            {createDeal && (
              <div className="space-y-3 pt-2 pl-6">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Deal Name *</label>
                  <input
                    type="text"
                    value={dealName}
                    onChange={e => setDealName(e.target.value)}
                    required
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={dealAmount}
                      onChange={e => setDealAmount(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Closing Date</label>
                    <input
                      type="date"
                      value={closingDate}
                      onChange={e => setClosingDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Stage</label>
                  <select
                    value={dealStage}
                    onChange={e => setDealStage(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Qualification">Qualification</option>
                    <option value="Needs Analysis">Needs Analysis</option>
                    <option value="Value Proposition">Value Proposition</option>
                    <option value="Identify Decision Makers">Identify Decision Makers</option>
                    <option value="Proposal/Price Quote">Proposal/Price Quote</option>
                    <option value="Negotiation/Review">Negotiation/Review</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  Convert Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConvertLeadModal;
