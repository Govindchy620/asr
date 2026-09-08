import mongoose from 'mongoose';

const WorkqueueSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    entityType: {
      type: String,
      default: 'Lead',
      enum: ['Lead', 'Contact', 'Account', 'Deal', 'Task', 'Case', 'Meeting'],
    },
    entityId: { type: String, default: '' },
    entityName: { type: String, default: '' },
    priority: {
      type: String,
      default: 'Medium',
      enum: ['Low', 'Medium', 'High', 'Critical'],
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'In Progress', 'Completed', 'Escalated'],
    },
    assignedTo: { type: String, default: 'Govind Choudhary' },
    dueDate: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
    actionRequired: { type: String, default: 'Follow-up Call' },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.Workqueue || mongoose.model('Workqueue', WorkqueueSchema);
