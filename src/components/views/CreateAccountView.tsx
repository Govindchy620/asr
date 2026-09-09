import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Camera,
  Info,
  Code2,
  Pin,
  MessageSquare,
  Users,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  Copy
} from 'lucide-react';

export const CreateAccountView: React.FC = () => {
  const { addAccount, setViewMode, setSelectedRecordId, accounts } = useCRM();

  // Account Information states
  const [accountName, setAccountName] = useState('');
  const [accountSite, setAccountSite] = useState('');
  const [parentAccount, setParentAccount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('-None-');
  const [industry, setIndustry] = useState('-None-');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [rating, setRating] = useState('-None-');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [website, setWebsite] = useState('');
  const [tickerSymbol, setTickerSymbol] = useState('');
  const [ownership, setOwnership] = useState('-None-');
  const [employees, setEmployees] = useState('');
  const [sicCode, setSicCode] = useState('');
  const [accountImage, setAccountImage] = useState<string | null>(null);
  const accountOwner = 'Govind Choudhary';

  // Billing Address states
  const [billingCountry, setBillingCountry] = useState('-None-');
  const [billingFlatHouseBuilding, setBillingFlatHouseBuilding] = useState('');
  const [billingStreetAddress, setBillingStreetAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingStateProvince, setBillingStateProvince] = useState('-None-');
  const [billingZipPostalCode, setBillingZipPostalCode] = useState('');
  const [billingLatitude, setBillingLatitude] = useState('');
  const [billingLongitude, setBillingLongitude] = useState('');

  // Shipping Address states
  const [shippingCountry, setShippingCountry] = useState('-None-');
  const [shippingFlatHouseBuilding, setShippingFlatHouseBuilding] = useState('');
  const [shippingStreetAddress, setShippingStreetAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingStateProvince, setShippingStateProvince] = useState('-None-');
  const [shippingZipPostalCode, setShippingZipPostalCode] = useState('');
  const [shippingLatitude, setShippingLatitude] = useState('');
  const [shippingLongitude, setShippingLongitude] = useState('');

  // Description
  const [description, setDescription] = useState('');

  // UI helpers
  const [formView, setFormView] = useState('Standard View');
  const [showClientScriptDrawer, setShowClientScriptDrawer] = useState(false);
  const [errors, setErrors] = useState<{ accountName?: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const clearBillingAddress = () => {
    setBillingCountry('-None-');
    setBillingFlatHouseBuilding('');
    setBillingStreetAddress('');
    setBillingCity('');
    setBillingStateProvince('-None-');
    setBillingZipPostalCode('');
    setBillingLatitude('');
    setBillingLongitude('');
  };

  const clearShippingAddress = () => {
    setShippingCountry('-None-');
    setShippingFlatHouseBuilding('');
    setShippingStreetAddress('');
    setShippingCity('');
    setShippingStateProvince('-None-');
    setShippingZipPostalCode('');
    setShippingLatitude('');
    setShippingLongitude('');
  };

  const copyBillingToShipping = () => {
    setShippingCountry(billingCountry);
    setShippingFlatHouseBuilding(billingFlatHouseBuilding);
    setShippingStreetAddress(billingStreetAddress);
    setShippingCity(billingCity);
    setShippingStateProvince(billingStateProvince);
    setShippingZipPostalCode(billingZipPostalCode);
    setShippingLatitude(billingLatitude);
    setShippingLongitude(billingLongitude);
  };

  const resetForm = () => {
    setAccountName('');
    setAccountSite('');
    setParentAccount('');
    setAccountNumber('');
    setAccountType('-None-');
    setIndustry('-None-');
    setAnnualRevenue('');
    setRating('-None-');
    setPhone('');
    setFax('');
    setWebsite('');
    setTickerSymbol('');
    setOwnership('-None-');
    setEmployees('');
    setSicCode('');
    setAccountImage(null);
    clearBillingAddress();
    clearShippingAddress();
    setDescription('');
    setErrors({});
  };

  const validate = () => {
    const errs: { accountName?: string } = {};
    if (!accountName.trim()) errs.accountName = 'Account Name cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (saveAndNew = false) => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      const created = await addAccount({
        name: accountName,
        accountSite: accountSite || undefined,
        parentAccount: parentAccount || undefined,
        accountNumber: accountNumber || undefined,
        accountType: accountType !== '-None-' ? accountType : undefined,
        phone: phone || '+91 22 2345 6789',
        fax: fax || undefined,
        website: website || `${accountName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        tickerSymbol: tickerSymbol || undefined,
        ownership: ownership !== '-None-' ? ownership : undefined,
        industry: industry !== '-None-' ? industry : 'Technology',
        employees: employees || undefined,
        annualRevenue: annualRevenue ? parseInt(annualRevenue.replace(/[^0-9]/g, ''), 10) || 50000000 : 50000000,
        sicCode: sicCode || undefined,
        rating: rating !== '-None-' ? rating : undefined,
        owner: accountOwner,
        accountImage: accountImage || undefined,
        billingCountry: billingCountry !== '-None-' ? billingCountry : 'India',
        billingFlatHouseBuilding: billingFlatHouseBuilding || undefined,
        billingStreetAddress: billingStreetAddress || undefined,
        billingCity: billingCity || 'Mumbai',
        billingStateProvince: billingStateProvince !== '-None-' ? billingStateProvince : undefined,
        billingZipPostalCode: billingZipPostalCode || undefined,
        billingLatitude: billingLatitude || undefined,
        billingLongitude: billingLongitude || undefined,
        shippingCountry: shippingCountry !== '-None-' ? shippingCountry : undefined,
        shippingFlatHouseBuilding: shippingFlatHouseBuilding || undefined,
        shippingStreetAddress: shippingStreetAddress || undefined,
        shippingCity: shippingCity || undefined,
        shippingStateProvince: shippingStateProvince !== '-None-' ? shippingStateProvince : undefined,
        shippingZipPostalCode: shippingZipPostalCode || undefined,
        shippingLatitude: shippingLatitude || undefined,
        shippingLongitude: shippingLongitude || undefined,
        description: description || undefined
      });

      setToastMessage(`Account "${accountName}" successfully saved to MongoDB Atlas!`);
      setTimeout(() => setToastMessage(null), 3000);

      if (saveAndNew) {
        resetForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (created?.id) {
        setSelectedRecordId(created.id);
        setViewMode('detail');
      } else {
        setViewMode('list');
      }
    } catch (err: any) {
      alert(`Error saving account: ${err.message}`);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccountImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 overflow-hidden relative select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header / Action Bar */}
      <div className="shrink-0 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#111827] z-20">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-blue-900 dark:text-blue-400">
            Create Account
          </h1>
          <a
            href="#edit-layout"
            onClick={e => {
              e.preventDefault();
              alert('Page Layout Editor: Customize fields and sections for Accounts.');
            }}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Edit Page Layout
          </a>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 rounded transition-colors"
          >
            Save and New
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-xs transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Errors Banner */}
        {Object.keys(errors).length > 0 && (
          <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-lg flex items-center space-x-2 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Please fill in the mandatory field (Account Name).</span>
          </div>
        )}

        {/* Account Image Box */}
        <div className="flex items-center space-x-4 pb-2">
          <div className="relative group">
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/60 text-slate-400 overflow-hidden">
              {accountImage ? (
                <img src={accountImage} alt="Account" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-5 h-5 text-slate-400" />
                  <span className="text-[9px] mt-1 font-medium">Account Image</span>
                </>
              )}
            </div>
            <label className="absolute inset-0 bg-black/40 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-[10px] font-medium">
              Upload
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Account Logo</p>
            <p className="text-[11px]">Upload company logo or icon (PNG, JPG up to 2MB)</p>
          </div>
        </div>

        {/* SECTION 1: Account Information */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5">
            <h2 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              Account Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-xs">
            {/* LEFT COLUMN */}
            <div className="space-y-3.5">
              {/* Account Owner */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Account Owner
                </label>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    G
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {accountOwner}
                  </span>
                </div>
              </div>

              {/* Account Name (Mandatory) */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400 flex items-center justify-end">
                  Account Name
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={accountName}
                    onChange={e => {
                      setAccountName(e.target.value);
                      if (errors.accountName) setErrors(prev => ({ ...prev, accountName: undefined }));
                    }}
                    className={`w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border-l-4 border-l-red-500 border border-slate-300 dark:border-slate-700 rounded-r text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 ${
                      errors.accountName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.accountName && (
                    <span className="text-[10px] text-red-500 absolute -bottom-4 left-0">
                      {errors.accountName}
                    </span>
                  )}
                </div>
              </div>

              {/* Account Site */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Account Site
                </label>
                <input
                  type="text"
                  value={accountSite}
                  onChange={e => setAccountSite(e.target.value)}
                  placeholder="e.g. Headquarters / Branch 1"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Parent Account */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Parent Account
                </label>
                <input
                  type="text"
                  value={parentAccount}
                  onChange={e => setParentAccount(e.target.value)}
                  placeholder="Select Parent Company"
                  list="parent-account-suggestions"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
                <datalist id="parent-account-suggestions">
                  {accounts.map(a => (
                    <option key={a.id} value={a.name} />
                  ))}
                </datalist>
              </div>

              {/* Account Number */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={e => setAccountNumber(e.target.value)}
                  placeholder="e.g. ACC-2025-001"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Account Type */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Account Type
                </label>
                <select
                  value={accountType}
                  onChange={e => setAccountType(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Competitor">Competitor</option>
                  <option value="Customer">Customer</option>
                  <option value="Integrator">Integrator</option>
                  <option value="Investor">Investor</option>
                  <option value="Partner">Partner</option>
                  <option value="Press">Press</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Reseller">Reseller</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Industry */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="ASP">ASP (Application Service Provider)</option>
                  <option value="Data/Telecom OEM">Data/Telecom OEM</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="ERP">ERP</option>
                  <option value="Government/Military">Government/Military</option>
                  <option value="Large Enterprise">Large Enterprise</option>
                  <option value="Management ISV">Management ISV</option>
                  <option value="MSP">MSP (Management Service Provider)</option>
                  <option value="Network Storage">Network Storage</option>
                  <option value="Non-Profit">Non-Profit</option>
                  <option value="Optical Networking">Optical Networking</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Small/Medium Enterprise">Small/Medium Enterprise</option>
                  <option value="Storage Equipment">Storage Equipment</option>
                  <option value="Storage Service Provider">Storage Service Provider</option>
                  <option value="Systems Integrator">Systems Integrator</option>
                  <option value="Wireless">Wireless</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>

              {/* Annual Revenue */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Annual Revenue
                </label>
                <div className="flex-1 flex items-center relative">
                  <div className="flex items-center w-full border border-slate-300 dark:border-slate-700 rounded overflow-hidden bg-white dark:bg-slate-800 focus-within:border-blue-500">
                    <span className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold border-r border-slate-300 dark:border-slate-700">
                      Rs.
                    </span>
                    <input
                      type="text"
                      value={annualRevenue}
                      onChange={e => setAnnualRevenue(e.target.value)}
                      placeholder="e.g. 5,00,00,000"
                      className="flex-1 px-2.5 py-1.5 bg-transparent text-slate-800 dark:text-slate-200 outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    title="Estimated annual gross revenue generated by company."
                    className="ml-2 text-slate-400 hover:text-slate-600"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Acquired">Acquired</option>
                  <option value="Active">Active</option>
                  <option value="Market Failed">Market Failed</option>
                  <option value="Project Cancelled">Project Cancelled</option>
                  <option value="Shut Down">Shut Down</option>
                </select>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-3.5">
              {/* Phone */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Fax */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Fax
                </label>
                <input
                  type="text"
                  value={fax}
                  onChange={e => setFax(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Website */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Website
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Ticker Symbol */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Ticker Symbol
                </label>
                <input
                  type="text"
                  value={tickerSymbol}
                  onChange={e => setTickerSymbol(e.target.value)}
                  placeholder="e.g. NSE: TCS / NASDAQ: MSFT"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Ownership */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Ownership
                </label>
                <select
                  value={ownership}
                  onChange={e => setOwnership(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Other">Other</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="Subsidiary">Subsidiary</option>
                </select>
              </div>

              {/* Employees */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Employees
                </label>
                <input
                  type="number"
                  value={employees}
                  onChange={e => setEmployees(e.target.value)}
                  placeholder="e.g. 250"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* SIC Code */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  SIC Code
                </label>
                <input
                  type="text"
                  value={sicCode}
                  onChange={e => setSicCode(e.target.value)}
                  placeholder="Standard Industrial Classification"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Address Information */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5 flex items-center justify-between">
            <h2 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              Address Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Billing Address Card */}
            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <span className="font-bold text-slate-700 dark:text-slate-300">Billing Address</span>
                <button
                  type="button"
                  onClick={clearBillingAddress}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Country / Region */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Country / Region
                </label>
                <select
                  value={billingCountry}
                  onChange={e => setBillingCountry(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>

              {/* Flat / House No./ Building */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Flat / House No.
                </label>
                <input
                  type="text"
                  value={billingFlatHouseBuilding}
                  onChange={e => setBillingFlatHouseBuilding(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Street Address */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Street Address
                </label>
                <input
                  type="text"
                  value={billingStreetAddress}
                  onChange={e => setBillingStreetAddress(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* City */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  City
                </label>
                <input
                  type="text"
                  value={billingCity}
                  onChange={e => setBillingCity(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* State / Province */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  State / Province
                </label>
                <select
                  value={billingStateProvince}
                  onChange={e => setBillingStateProvince(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Haryana">Haryana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              {/* Zip / Postal Code */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Zip / Postal Code
                </label>
                <input
                  type="text"
                  value={billingZipPostalCode}
                  onChange={e => setBillingZipPostalCode(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Coordinates */}
              <div className="flex items-center space-x-2">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Coordinates
                </label>
                <input
                  type="text"
                  value={billingLatitude}
                  onChange={e => setBillingLatitude(e.target.value)}
                  placeholder="Latitude"
                  className="flex-1 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={billingLongitude}
                  onChange={e => setBillingLongitude(e.target.value)}
                  placeholder="Longitude"
                  className="flex-1 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Shipping Address</span>
                  <button
                    type="button"
                    onClick={copyBillingToShipping}
                    className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                    title="Copy Billing Address into Shipping Address"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy Billing</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={clearShippingAddress}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Country / Region */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Country / Region
                </label>
                <select
                  value={shippingCountry}
                  onChange={e => setShippingCountry(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>

              {/* Flat / House No./ Building */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Flat / House No.
                </label>
                <input
                  type="text"
                  value={shippingFlatHouseBuilding}
                  onChange={e => setShippingFlatHouseBuilding(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Street Address */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Street Address
                </label>
                <input
                  type="text"
                  value={shippingStreetAddress}
                  onChange={e => setShippingStreetAddress(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* City */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  City
                </label>
                <input
                  type="text"
                  value={shippingCity}
                  onChange={e => setShippingCity(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* State / Province */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  State / Province
                </label>
                <select
                  value={shippingStateProvince}
                  onChange={e => setShippingStateProvince(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Haryana">Haryana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>

              {/* Zip / Postal Code */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Zip / Postal Code
                </label>
                <input
                  type="text"
                  value={shippingZipPostalCode}
                  onChange={e => setShippingZipPostalCode(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Coordinates */}
              <div className="flex items-center space-x-2">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Coordinates
                </label>
                <input
                  type="text"
                  value={shippingLatitude}
                  onChange={e => setShippingLatitude(e.target.value)}
                  placeholder="Latitude"
                  className="flex-1 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={shippingLongitude}
                  onChange={e => setShippingLongitude(e.target.value)}
                  placeholder="Longitude"
                  className="flex-1 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Description Information */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5">
            <h2 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              Description Information
            </h2>
          </div>

          <div className="flex items-start text-xs max-w-4xl">
            <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400 pt-1.5">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter comprehensive notes, corporate structure, business requirements..."
              className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer Toolbar */}
      <div className="shrink-0 px-6 py-2.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs">
        {/* Left: Form Views Selector */}
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Create Form Views:</span>
          <select
            value={formView}
            onChange={e => setFormView(e.target.value)}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-medium text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="Standard View">Standard View</option>
            <option value="Enterprise Layout">Enterprise Layout</option>
            <option value="Partner View">Partner View</option>
          </select>
          <a
            href="#create-custom-form"
            onClick={e => {
              e.preventDefault();
              alert('Custom Form Builder: Create multiple form views tailored for specific accounts.');
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Create a custom form page
          </a>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 rounded transition-colors"
          >
            Save and New
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-xs transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Floating Vertical Right Ribbon: "Client Script" */}
      <button
        type="button"
        onClick={() => setShowClientScriptDrawer(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#1b2b48] hover:bg-[#24375b] text-white text-[11px] font-bold py-3 px-1.5 rounded-l-md shadow-lg flex flex-col items-center gap-2 cursor-pointer z-30 transition-transform hover:-translate-x-1"
        style={{ writingMode: 'vertical-rl' }}
        title="Open Zoho Client Script Developer Console"
      >
        <span className="tracking-widest flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 rotate-90" />
          Client Script
        </span>
      </button>

      {/* Slide-over Drawer for Client Script */}
      {showClientScriptDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#111827] h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Client Script Console
                </h3>
              </div>
              <button
                onClick={() => setShowClientScriptDrawer(false)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-y-auto text-xs">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg text-blue-700 dark:text-blue-300 space-y-1">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Client Scripts for "Create Account" Page
                </p>
                <p className="text-[11px] leading-relaxed">
                  Execute custom JavaScript logic upon account details modification or registration.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Active Event Listeners:
                </label>
                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  ⚡ onChange(Website) ➔ Extract domain & fetch corporate info
                </div>
                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  ⚡ onSave() ➔ Verify GSTIN/PAN and validate Account Number
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Custom Script Editor:
                </label>
                <textarea
                  rows={8}
                  defaultValue={`// Example Zoho Client Script
ZDK.Page.getField('Account_Name').addEventListener('onChange', function(e) {
  var acc = ZDK.Page.getField('Account_Name').getValue();
  console.log('Account Name entered: ' + acc);
});`}
                  className="w-full font-mono text-[11px] p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-900 text-emerald-400 outline-none"
                />
              </div>
            </div>

            <div className="p-3 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2 bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => setShowClientScriptDrawer(false)}
                className="px-3 py-1.5 bg-blue-600 text-white rounded font-medium text-xs hover:bg-blue-700"
              >
                Close Console
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Status Bar (Zoho standard footer) */}
      <div className="shrink-0 h-7 bg-[#1c2438] text-slate-300 px-4 flex items-center justify-between text-[11px] select-none border-t border-slate-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => alert('My Pins: Quick access to pinned accounts.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Pin className="w-3 h-3" />
            <span>My Pins</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => alert('Chats: Open team discussions.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Chats</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => alert('Contacts: Quick search across all synced CRM contacts.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Users className="w-3 h-3" />
            <span>Contacts</span>
          </button>
        </div>

        <div className="text-slate-400 text-[10px]">
          Zoho CRM Layout Engine v2025 • Standard Account Form
        </div>
      </div>
    </div>
  );
};
