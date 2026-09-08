import express from 'express';
import CrmController from '../controllers/crmController.js';
import { getDatabaseStatus } from '../db/connection.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const dbStatus = getDatabaseStatus();
  res.json({
    status: 'healthy',
    server: 'Zoho CRM Express Backend',
    port: process.env.PORT || 3000,
    timestamp: new Date().toISOString(),
    database: dbStatus,
  });
});

// Workqueue specialized endpoints
router.get('/workqueue/summary', CrmController.getWorkqueueSummary);

// Lead Conversion Pipeline
router.post('/leads/:id/convert', CrmController.convertLead);

// Specialized module operations
router.post('/:module/bulk-delete', CrmController.bulkDelete);
router.get('/:module/:id/related/:relatedModule', CrmController.getRelatedRecords);
router.get('/:module/:id/activities', CrmController.getActivities);

// Standard Zoho CRM module REST endpoints
router.get('/:module', CrmController.listRecords);
router.get('/:module/:id', CrmController.getRecord);
router.post('/:module', CrmController.createRecord);
router.put('/:module/:id', CrmController.updateRecord);
router.delete('/:module/:id', CrmController.deleteRecord);

export default router;
