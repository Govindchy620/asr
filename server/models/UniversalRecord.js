import mongoose from 'mongoose';

const UniversalRecordSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: [true, 'Module name is required'],
      index: true,
    },
    name: { type: String, default: '' },
    owner: { type: String, default: 'Govind Choudhary' },
    status: { type: String, default: 'Active' },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    strict: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UniversalRecordSchema.index({ module: 1, createdAt: -1 });

export default mongoose.models.UniversalRecord || mongoose.model('UniversalRecord', UniversalRecordSchema);
