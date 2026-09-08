import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';
import Account from '../models/Account.js';
import Deal from '../models/Deal.js';
import Activity from '../models/Activity.js';
import Workqueue from '../models/Workqueue.js';
import UniversalRecord from '../models/UniversalRecord.js';
import AutomationService from '../services/automationService.js';
import { convertLead } from '../services/leadConversionService.js';

function getModelForModule(moduleName) {
  const normalized = (moduleName || '').toLowerCase().trim();
  switch (normalized) {
    case 'leads':
    case 'lead':
      return { model: Lead, type: 'lead' };
    case 'contacts':
    case 'contact':
      return { model: Contact, type: 'contact' };
    case 'accounts':
    case 'account':
      return { model: Account, type: 'account' };
    case 'deals':
    case 'deal':
      return { model: Deal, type: 'deal' };
    case 'tasks':
    case 'task':
      return { model: Activity, type: 'activity', activityType: 'task' };
    case 'meetings':
    case 'meeting':
      return { model: Activity, type: 'activity', activityType: 'meeting' };
    case 'calls':
    case 'call':
      return { model: Activity, type: 'activity', activityType: 'call' };
    case 'activities':
      return { model: Activity, type: 'activity' };
    case 'workqueue':
      return { model: Workqueue, type: 'workqueue' };
    default:
      return { model: UniversalRecord, type: 'universal', module: normalized };
  }
}

export const CrmController = {
  // List records for any module with search, filter, pagination
  async listRecords(req, res) {
    try {
      const { module } = req.params;
      const { search, page = 1, per_page = 50, limit, sort_by = 'createdAt', sort_order = 'desc' } = req.query;
      const pageSize = Number(limit || per_page) || 50;
      const currentPage = Math.max(1, Number(page) || 1);
      const skip = (currentPage - 1) * pageSize;

      const mapping = getModelForModule(module);
      let queryFilter = {};

      if (mapping.type === 'activity' && mapping.activityType) {
        queryFilter.activityType = mapping.activityType;
      } else if (mapping.type === 'universal') {
        queryFilter.module = mapping.module;
      }

      // Search support across standard text fields
      if (search) {
        const searchRegex = new RegExp(search, 'i');
        if (mapping.type === 'lead' || mapping.type === 'contact') {
          queryFilter.$or = [
            { firstName: searchRegex },
            { lastName: searchRegex },
            { company: searchRegex },
            { email: searchRegex },
            { phone: searchRegex },
            { mobile: searchRegex },
          ];
        } else if (mapping.type === 'account') {
          queryFilter.$or = [
            { accountName: searchRegex },
            { phone: searchRegex },
            { industry: searchRegex },
            { website: searchRegex },
          ];
        } else if (mapping.type === 'deal') {
          queryFilter.$or = [
            { dealName: searchRegex },
            { accountName: searchRegex },
            { stage: searchRegex },
          ];
        } else if (mapping.type === 'workqueue') {
          queryFilter.$or = [
            { title: searchRegex },
            { entityName: searchRegex },
            { actionRequired: searchRegex },
          ];
        } else {
          queryFilter.$or = [
            { name: searchRegex },
            { owner: searchRegex },
            { 'data.name': searchRegex },
            { 'data.title': searchRegex },
          ];
        }
      }

      const sortOptions = {};
      sortOptions[sort_by] = sort_order === 'asc' ? 1 : -1;

      const [records, totalCount] = await Promise.all([
        mapping.model.find(queryFilter).sort(sortOptions).skip(skip).limit(pageSize),
        mapping.model.countDocuments(queryFilter),
      ]);

      // Normalize output to maintain maximum frontend compatibility
      const transformed = records.map((doc) => {
        const obj = doc.toObject ? doc.toObject() : doc;
        if (!obj.id && obj._id) obj.id = obj._id.toString();
        // For universal records, flatten data if available
        if (mapping.type === 'universal' && obj.data) {
          return { id: obj.id, ...obj.data, owner: obj.owner, createdAt: obj.createdAt, updatedAt: obj.updatedAt };
        }
        return obj;
      });

      // Provide both raw array and metadata envelope
      return res.json({
        data: transformed,
        records: transformed,
        info: {
          count: transformed.length,
          total_count: totalCount,
          page: currentPage,
          per_page: pageSize,
          more_records: totalCount > skip + transformed.length,
        },
      });
    } catch (error) {
      console.error('Error in listRecords:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Get single record
  async getRecord(req, res) {
    try {
      const { module, id } = req.params;
      const mapping = getModelForModule(module);

      const record = await mapping.model.findById(id);
      if (!record) {
        return res.status(404).json({ error: `Record with id ${id} not found in ${module}` });
      }

      const obj = record.toObject ? record.toObject() : record;
      if (!obj.id && obj._id) obj.id = obj._id.toString();
      return res.json(obj);
    } catch (error) {
      console.error('Error in getRecord:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Create record
  async createRecord(req, res) {
    try {
      const { module } = req.params;
      const mapping = getModelForModule(module);
      const data = { ...req.body };

      if (mapping.type === 'lead') {
        data.leadOwner = AutomationService.resolveOwner(data, data.leadOwner);
        data.leadScore = AutomationService.calculateLeadScore(data);
      } else if (mapping.type === 'contact') {
        data.contactOwner = AutomationService.resolveOwner(data, data.contactOwner);
      } else if (mapping.type === 'account') {
        data.accountOwner = AutomationService.resolveOwner(data, data.accountOwner);
      } else if (mapping.type === 'activity' && mapping.activityType) {
        data.activityType = mapping.activityType;
      } else if (mapping.type === 'universal') {
        const universalDoc = new UniversalRecord({
          module: mapping.module,
          name: data.name || data.title || data.subject || `${mapping.module} item`,
          owner: data.owner || 'Govind Choudhary',
          status: data.status || 'Active',
          data,
        });
        const saved = await universalDoc.save();
        const responseObj = { id: saved._id.toString(), ...saved.data, createdAt: saved.createdAt };
        return res.status(201).json(responseObj);
      }

      const createdDoc = await mapping.model.create(data);
      const obj = createdDoc.toObject ? createdDoc.toObject() : createdDoc;
      if (!obj.id && obj._id) obj.id = obj._id.toString();
      return res.status(201).json(obj);
    } catch (error) {
      console.error('Error in createRecord:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  // Update record
  async updateRecord(req, res) {
    try {
      const { module, id } = req.params;
      const mapping = getModelForModule(module);
      const updates = req.body;

      if (mapping.type === 'deal') {
        const existing = await Deal.findById(id);
        if (existing && updates.stage && updates.stage !== existing.stage) {
          await AutomationService.handleDealStageChange(
            { ...existing.toObject(), ...updates, _id: existing._id },
            existing.stage
          );
        }
      }

      if (mapping.type === 'universal') {
        const record = await UniversalRecord.findById(id);
        if (!record) return res.status(404).json({ error: 'Record not found' });
        record.data = { ...record.data, ...updates };
        if (updates.name) record.name = updates.name;
        if (updates.status) record.status = updates.status;
        await record.save();
        return res.json({ id: record._id.toString(), ...record.data });
      }

      const updated = await mapping.model.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ error: `Record with id ${id} not found in ${module}` });
      }

      const obj = updated.toObject ? updated.toObject() : updated;
      if (!obj.id && obj._id) obj.id = obj._id.toString();
      return res.json(obj);
    } catch (error) {
      console.error('Error in updateRecord:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  // Delete record
  async deleteRecord(req, res) {
    try {
      const { module, id } = req.params;
      const mapping = getModelForModule(module);

      const deleted = await mapping.model.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: `Record with id ${id} not found in ${module}` });
      }
      return res.json({ success: true, message: `Record ${id} deleted successfully from ${module}` });
    } catch (error) {
      console.error('Error in deleteRecord:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Lead Conversion endpoint
  async convertLead(req, res) {
    try {
      const { id } = req.params;
      const { dealData, owner } = req.body;
      const result = await convertLead({ leadId: id, dealData, owner });
      return res.json(result);
    } catch (error) {
      console.error('Error in convertLead:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  // Workqueue summary
  async getWorkqueueSummary(req, res) {
    try {
      const [pendingCount, highPriorityCount, completedTodayCount, urgentTasks] = await Promise.all([
        Workqueue.countDocuments({ status: { $ne: 'Completed' } }),
        Workqueue.countDocuments({ priority: { $in: ['High', 'Critical'] }, status: { $ne: 'Completed' } }),
        Workqueue.countDocuments({
          status: 'Completed',
          updatedAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        }),
        Workqueue.find({ status: { $ne: 'Completed' } })
          .sort({ priority: -1, dueDate: 1 })
          .limit(10),
      ]);

      return res.json({
        summary: {
          pendingCount,
          highPriorityCount,
          completedTodayCount,
        },
        urgentTasks,
      });
    } catch (error) {
      console.error('Error in getWorkqueueSummary:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Bulk Delete
  async bulkDelete(req, res) {
    try {
      const { module } = req.params;
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'ids array is required' });
      }
      const mapping = getModelForModule(module);
      const result = await mapping.model.deleteMany({ _id: { $in: ids } });
      return res.json({ success: true, deletedCount: result.deletedCount, message: `Deleted ${result.deletedCount} records` });
    } catch (error) {
      console.error('Error in bulkDelete:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Get Related records (e.g. Contacts or Deals of an Account, Tasks of a Lead)
  async getRelatedRecords(req, res) {
    try {
      const { module, id, relatedModule } = req.params;
      const relNormalized = (relatedModule || '').toLowerCase().trim();

      if (relNormalized === 'contacts') {
        const contacts = await Contact.find({ accountId: id }).sort({ createdAt: -1 });
        return res.json(contacts);
      } else if (relNormalized === 'deals') {
        const deals = await Deal.find({ $or: [{ accountId: id }, { contactId: id }] }).sort({ createdAt: -1 });
        return res.json(deals);
      } else if (['tasks', 'calls', 'meetings', 'activities'].includes(relNormalized)) {
        let filter = { 'relatedTo.recordId': id };
        if (relNormalized === 'tasks') filter.activityType = 'task';
        if (relNormalized === 'calls') filter.activityType = 'call';
        if (relNormalized === 'meetings') filter.activityType = 'meeting';
        const acts = await Activity.find(filter).sort({ createdAt: -1 });
        return res.json(acts);
      }

      // Default fallback
      const relatedMapping = getModelForModule(relNormalized);
      const docs = await relatedMapping.model.find({
        $or: [{ accountId: id }, { leadId: id }, { 'relatedTo.recordId': id }],
      }).limit(50);
      return res.json(docs);
    } catch (error) {
      console.error('Error in getRelatedRecords:', error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Get Activities for any record
  async getActivities(req, res) {
    try {
      const { id } = req.params;
      const activities = await Activity.find({ 'relatedTo.recordId': id }).sort({ createdAt: -1 });
      return res.json(activities);
    } catch (error) {
      console.error('Error in getActivities:', error);
      return res.status(500).json({ error: error.message });
    }
  },
};

export default CrmController;
