import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    activityType: {
      type: String,
      required: true,
      enum: ['task', 'meeting', 'call'],
      index: true,
    },
    subject: { type: String, required: [true, 'Subject is required'] },
    dueDate: { type: Date, default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    callDuration: { type: String, default: '' },
    callType: { type: String, default: 'Outbound', enum: ['Inbound', 'Outbound'] },
    status: {
      type: String,
      default: 'Not Started',
      enum: ['Not Started', 'In Progress', 'Completed', 'Deferred', 'Scheduled', 'Overdue'],
    },
    priority: {
      type: String,
      default: 'Normal',
      enum: ['High', 'Normal', 'Low'],
    },
    owner: { type: String, default: 'Govind Choudhary' },
    relatedTo: {
      module: { type: String, default: 'leads' },
      recordId: { type: String, default: '' },
      recordName: { type: String, default: '' },
    },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
