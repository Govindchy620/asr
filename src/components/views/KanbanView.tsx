import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { Deal } from '../../types/crm';
import { PIPELINE_STAGES } from '../../data/mockData';
import {
  Calendar,
  AlertTriangle,
  Building2,
  MoreVertical,
  Plus,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const KanbanView: React.FC = () => {
  const { deals, updateDealStage, setSelectedRecordId, setViewMode, openCreateModal } = useCRM();
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('text/plain', dealId);
    setDraggedDealId(dealId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: Deal['stage']) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain') || draggedDealId;
    if (dealId) {
      updateDealStage(dealId, stageId);
    }
    setDraggedDealId(null);
  };

  const openDealDetail = (dealId: string) => {
    setSelectedRecordId(dealId);
    setViewMode('detail');
  };

  return (
    <div className="flex-1 overflow-x-auto p-4 flex gap-4 bg-slate-100 dark:bg-[#0b0f17] select-none custom-scrollbar">
      {PIPELINE_STAGES.map(stage => {
        const stageDeals = deals.filter(d => d.stage === stage.id);
        const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);

        return (
          <div
            key={stage.id}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, stage.id as Deal['stage'])}
            className="w-80 shrink-0 flex flex-col bg-slate-50/70 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 max-h-full shadow-xs"
          >
            {/* Stage Column Header */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-1 bg-white dark:bg-[#111827] rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                    {stage.label}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {stageDeals.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span className="text-[11px] font-medium">Stage Value:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ₹{stageTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Stage Cards Container */}
            <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5 custom-scrollbar min-h-32">
              {stageDeals.length === 0 ? (
                <div className="h-28 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-center text-xs text-slate-400">
                  Drop deals here
                </div>
              ) : (
                stageDeals.map(deal => {
                  const isAging = deal.daysInStage >= 10;
                  return (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={e => handleDragStart(e, deal.id)}
                      onClick={() => openDealDetail(deal.id)}
                      className="bg-white dark:bg-[#151b26] p-3 rounded-lg border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-grab active:cursor-grabbing group relative"
                    >
                      {/* Deal Name */}
                      <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                        {deal.name}
                      </div>

                      {/* Account Name */}
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 space-x-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{deal.accountName}</span>
                      </div>

                      {/* Amount & Probability */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          ₹{deal.amount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {deal.probability}%
                        </div>
                      </div>

                      {/* Footer: Close Date & Owner Avatar */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{deal.expectedCloseDate}</span>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          {/* Stalled / Aging Warning badge */}
                          {isAging && (
                            <span
                              className="flex items-center text-[10px] text-amber-600 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded"
                              title={`Stalled deal: In this stage for ${deal.daysInStage} days`}
                            >
                              <AlertTriangle className="w-2.5 h-2.5 mr-0.5" />
                              {deal.daysInStage}d
                            </span>
                          )}

                          <div
                            className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center"
                            title={`Owner: ${deal.dealOwner}`}
                          >
                            {deal.dealOwner.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                      </div>

                      {/* Quick Move Stage Button */}
                      <div className="hidden group-hover:flex absolute right-2 top-2 items-center space-x-1">
                        {stage.id !== 'Closed Won' && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              const nextStageIndex = PIPELINE_STAGES.findIndex(s => s.id === stage.id) + 1;
                              if (nextStageIndex < PIPELINE_STAGES.length) {
                                updateDealStage(deal.id, PIPELINE_STAGES[nextStageIndex].id as Deal['stage']);
                              }
                            }}
                            className="p-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-500 hover:text-white text-slate-600 dark:text-slate-300 rounded shadow-xs text-xs"
                            title="Advance to next stage"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick add deal in stage */}
            <div className="p-2 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30 rounded-b-xl">
              <button
                onClick={() => openCreateModal('deals')}
                className="w-full py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center space-x-1 transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add Deal</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
