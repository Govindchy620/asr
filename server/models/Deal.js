import mongoose from 'mongoose';

const DealSchema = new mongoose.Schema(
  {
    dealOwner: { type: String, default: 'Govind Choudhary' },
    dealName: { type: String, required: [true, 'Deal Name is required'], index: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null },
    accountName: { type: String, default: '' },
    contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', default: null },
    type: { type: String, default: 'New Business' },
    leadSource: { type: String, default: '-None-' },
    amount: { type: Number, default: 0 },
    closingDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    stage: {
      type: String,
      default: 'Qualification',
      enum: [
        'Qualification',
        'Needs Analysis',
        'Value Proposition',
        'Identify Decision Makers',
        'Perception Analysis',
        'Proposal/Price Quote',
        'Negotiation/Review',
        'Closed Won',
        'Closed Lost',
      ],
    },
    probability: { type: Number, default: 10 },
    expectedRevenue: { type: Number, default: 0 },
    campaignSource: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto calculate expected revenue based on stage probability
DealSchema.pre('save', function () {
  const stageProbabilityMap = {
    'Qualification': 10,
    'Needs Analysis': 20,
    'Value Proposition': 40,
    'Identify Decision Makers': 60,
    'Perception Analysis': 70,
    'Proposal/Price Quote': 75,
    'Negotiation/Review': 90,
    'Closed Won': 100,
    'Closed Lost': 0,
  };

  if (stageProbabilityMap[this.stage] !== undefined) {
    this.probability = stageProbabilityMap[this.stage];
  }
  this.expectedRevenue = (Number(this.amount) || 0) * (this.probability / 100);
});

export default mongoose.models.Deal || mongoose.model('Deal', DealSchema);
