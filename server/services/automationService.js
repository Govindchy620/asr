import Workqueue from '../models/Workqueue.js';

export const AutomationService = {
  /**
   * Evaluates lead scoring based on profile completeness and company revenue
   */
  calculateLeadScore(leadData) {
    let score = 50;
    if (leadData.email) score += 10;
    if (leadData.phone || leadData.mobile) score += 15;
    if (leadData.website) score += 5;
    if (leadData.annualRevenue && leadData.annualRevenue !== '') score += 10;
    if (leadData.industry && leadData.industry !== '-None-') score += 5;
    if (leadData.company) score += 5;
    return Math.min(score, 100);
  },

  /**
   * Applies Zoho CRM Assignment Rules based on country / region
   */
  resolveOwner(recordData, defaultOwner = 'Govind Choudhary') {
    if (recordData.owner || recordData.leadOwner || recordData.contactOwner || recordData.accountOwner) {
      return recordData.owner || recordData.leadOwner || recordData.contactOwner || recordData.accountOwner;
    }
    return defaultOwner;
  },

  /**
   * Triggers automated tasks / workflows upon deal stage changes
   */
  async handleDealStageChange(deal, previousStage) {
    if (deal.stage === 'Closed Won' && previousStage !== 'Closed Won') {
      await Workqueue.create({
        title: `Generate Invoice & Kickoff: ${deal.dealName}`,
        entityType: 'Deal',
        entityId: deal._id.toString(),
        entityName: deal.dealName,
        priority: 'Critical',
        status: 'Pending',
        assignedTo: deal.dealOwner,
        actionRequired: 'Generate Tax Invoice & Welcome Kit',
        notes: `Deal closed won for ₹${deal.amount.toLocaleString('en-IN')}. Initiating onboarding.`,
      });
    }
  },
};

export default AutomationService;
