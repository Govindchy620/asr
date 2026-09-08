import mongoose from 'mongoose';

const AddressSubSchema = new mongoose.Schema(
  {
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
  { _id: false }
);

const AccountSchema = new mongoose.Schema(
  {
    accountOwner: { type: String, default: 'Govind Choudhary' },
    accountName: { type: String, required: [true, 'Account Name is required'], index: true },
    accountSite: { type: String, default: '' },
    parentAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null },
    accountNumber: { type: String, default: '' },
    accountType: { type: String, default: 'Customer' },
    industry: { type: String, default: '-None-' },
    annualRevenue: { type: String, default: '' },
    rating: { type: String, default: '-None-' },
    phone: { type: String, default: '' },
    fax: { type: String, default: '' },
    website: { type: String, default: '' },
    tickerSymbol: { type: String, default: '' },
    ownership: { type: String, default: 'Private' },
    employees: { type: String, default: '' },
    sicCode: { type: String, default: '' },
    accountImage: { type: String, default: '' },

    billingAddress: { type: AddressSubSchema, default: () => ({}) },
    shippingAddress: { type: AddressSubSchema, default: () => ({}) },

    description: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);
