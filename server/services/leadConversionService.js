import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';
import Account from '../models/Account.js';
import Deal from '../models/Deal.js';
import Workqueue from '../models/Workqueue.js';
import Activity from '../models/Activity.js';

/**
 * Converts a Zoho CRM Lead into an Account, Contact, and optionally a Deal.
 * Links all activities and creates follow-up workqueue items.
 */
export async function convertLead({ leadId, dealData = null, owner = 'Govind Choudhary' }) {
  const lead = await Lead.findById(leadId);
  if (!lead) {
    throw new Error(`Lead with ID ${leadId} not found`);
  }

  if (lead.isConverted) {
    throw new Error('This lead has already been converted');
  }

  // 1. Create or link Account
  const accountName = lead.company || `${lead.lastName} Household`;
  let account = await Account.findOne({ accountName: { $regex: new RegExp(`^${accountName}$`, 'i') } });

  if (!account) {
    account = await Account.create({
      accountName,
      accountOwner: owner || lead.leadOwner,
      industry: lead.industry !== '-None-' ? lead.industry : 'Other',
      phone: lead.phone || lead.mobile,
      website: lead.website,
      annualRevenue: lead.annualRevenue,
      rating: lead.rating,
      billingAddress: {
        countryRegion: lead.address?.countryRegion || '',
        flatHouseNo: lead.address?.flatHouseNo || '',
        streetAddress: lead.address?.streetAddress || '',
        city: lead.address?.city || '',
        stateProvince: lead.address?.stateProvince || '',
        zipPostalCode: lead.address?.zipPostalCode || '',
        coordinates: lead.address?.coordinates || {},
      },
      description: `Created automatically via Lead Conversion from Lead: ${lead.fullName || lead.lastName}`,
    });
  }

  // 2. Create Contact
  const contact = await Contact.create({
    contactOwner: owner || lead.leadOwner,
    salutation: lead.salutation,
    firstName: lead.firstName,
    lastName: lead.lastName,
    accountId: account._id,
    accountName: account.accountName,
    title: lead.title,
    email: lead.email,
    secondaryEmail: lead.secondaryEmail,
    phone: lead.phone,
    mobile: lead.mobile,
    fax: lead.fax,
    leadSource: lead.leadSource,
    skypeId: lead.skypeId,
    twitter: lead.twitter,
    mailingAddress: {
      countryRegion: lead.address?.countryRegion || '',
      flatHouseNo: lead.address?.flatHouseNo || '',
      streetAddress: lead.address?.streetAddress || '',
      city: lead.address?.city || '',
      stateProvince: lead.address?.stateProvince || '',
      zipPostalCode: lead.address?.zipPostalCode || '',
      coordinates: lead.address?.coordinates || {},
    },
    description: lead.description || `Converted from Lead: ${lead.fullName || lead.lastName}`,
  });

  // 3. Optional Deal creation
  let deal = null;
  if (dealData && (dealData.createDeal || dealData.dealName)) {
    deal = await Deal.create({
      dealOwner: owner || lead.leadOwner,
      dealName: dealData.dealName || `${account.accountName} - New Business`,
      accountId: account._id,
      accountName: account.accountName,
      contactId: contact._id,
      type: dealData.type || 'New Business',
      amount: Number(dealData.amount) || (Number(lead.annualRevenue?.replace(/[^0-9]/g, '')) ? Math.round(Number(lead.annualRevenue.replace(/[^0-9]/g, '')) * 0.1) : 100000),
      closingDate: dealData.closingDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      stage: dealData.stage || 'Needs Analysis',
      leadSource: lead.leadSource,
      description: `Generated during conversion of lead: ${lead.fullName || lead.lastName}`,
    });
  }

  // 4. Update Lead Record
  lead.isConverted = true;
  lead.leadStatus = 'Closed - Converted';
  lead.convertedDate = new Date();
  lead.convertedAccountId = account._id;
  lead.convertedContactId = contact._id;
  if (deal) lead.convertedDealId = deal._id;
  await lead.save();

  // 5. Transfer or Link Activities
  await Activity.updateMany(
    { 'relatedTo.module': 'leads', 'relatedTo.recordId': lead._id.toString() },
    {
      $set: {
        'relatedTo.module': 'contacts',
        'relatedTo.recordId': contact._id.toString(),
        'relatedTo.recordName': contact.fullName || contact.lastName,
      },
    }
  );

  // 6. Create Onboarding Workqueue Item
  await Workqueue.create({
    title: `Onboard Converted Account: ${account.accountName}`,
    entityType: 'Account',
    entityId: account._id.toString(),
    entityName: account.accountName,
    priority: 'High',
    status: 'Pending',
    assignedTo: owner || lead.leadOwner,
    actionRequired: 'Contract Review & Welcome Call',
    notes: `Converted from lead ${lead.fullName || lead.lastName}. Contact: ${contact.email || contact.phone}`,
  });

  return {
    success: true,
    message: 'Lead converted successfully',
    leadId: lead._id,
    account: { id: account._id, name: account.accountName },
    contact: { id: contact._id, name: contact.fullName || contact.lastName },
    deal: deal ? { id: deal._id, name: deal.dealName, amount: deal.amount } : null,
  };
}
