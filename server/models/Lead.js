import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    leadOwner: { type: String, default: 'Govind Choudhary' },
    salutation: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, required: [true, 'Last Name is required'] },
    title: { type: String, default: '' },
    company: { type: String, required: [true, 'Company is required'] },
    phone: { type: String, default: '' },
    mobile: { type: String, default: '' },
    leadSource: { type: String, default: '-None-' },
    industry: { type: String, default: '-None-' },
    annualRevenue: { type: String, default: '' },
    emailOptOut: { type: Boolean, default: false },
    email: { type: String, default: '' },
    secondaryEmail: { type: String, default: '' },
    fax: { type: String, default: '' },
    website: { type: String, default: '' },
    leadStatus: { type: String, default: 'Pre-Qualified' },
    noOfEmployees: { type: String, default: '' },
    rating: { type: String, default: '-None-' },
    skypeId: { type: String, default: '' },
    twitter: { type: String, default: '' },
    leadImage: { type: String, default: '' },
    
    address: {
      countryRegion: { type: String, default: '' },
      flatHouseNo: { type: String, default: '' },
      streetAddress: { type: String, default: '' },
      city: { type: String, default: '' },
      stateProvince: { type: String, default: '' },
      zipPostalCode: { type: String, default: '' },
      coordinates: {
        latitude: { type: Number, default: null },
        longitude: { type: Number, default: null },
      },
    },

    description: { type: String, default: '' },
    leadScore: { type: Number, default: 85 },

    // Conversion tracking
    isConverted: { type: Boolean, default: false },
    convertedDate: { type: Date, default: null },
    convertedAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null },
    convertedContactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', default: null },
    convertedDealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Deal', default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

LeadSchema.virtual('fullName').get(function () {
  return `${this.salutation ? this.salutation + ' ' : ''}${this.firstName || ''} ${this.lastName || ''}`.trim();
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
