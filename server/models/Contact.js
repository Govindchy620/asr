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

const ContactSchema = new mongoose.Schema(
  {
    contactOwner: { type: String, default: 'Govind Choudhary' },
    salutation: { type: String, default: '' },
    firstName: { type: String, default: '' },
    lastName: { type: String, required: [true, 'Last Name is required'] },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null },
    accountName: { type: String, default: '' },
    vendorName: { type: String, default: '' },
    title: { type: String, default: '' },
    department: { type: String, default: '' },
    email: { type: String, default: '' },
    secondaryEmail: { type: String, default: '' },
    phone: { type: String, default: '' },
    homePhone: { type: String, default: '' },
    otherPhone: { type: String, default: '' },
    mobile: { type: String, default: '' },
    assistant: { type: String, default: '' },
    asstPhone: { type: String, default: '' },
    leadSource: { type: String, default: '-None-' },
    fax: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    emailOptOut: { type: Boolean, default: false },
    skypeId: { type: String, default: '' },
    twitter: { type: String, default: '' },
    reportingTo: { type: String, default: '' },
    contactImage: { type: String, default: '' },

    mailingAddress: { type: AddressSubSchema, default: () => ({}) },
    otherAddress: { type: AddressSubSchema, default: () => ({}) },

    description: { type: String, default: '' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ContactSchema.virtual('fullName').get(function () {
  return `${this.salutation ? this.salutation + ' ' : ''}${this.firstName || ''} ${this.lastName || ''}`.trim();
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
