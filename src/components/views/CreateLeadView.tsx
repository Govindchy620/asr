import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import {
  Camera,
  Info,
  ChevronDown,
  Code2,
  Pin,
  MessageSquare,
  Users,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';

export const CreateLeadView: React.FC = () => {
  const { addLead, setViewMode } = useCRM();

  // Field states - Lead Information
  const [salutation, setSalutation] = useState('-None-');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [leadOwner] = useState('Govind Choudhary');
  const [phone, setPhone] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [fax, setFax] = useState('');
  const [website, setWebsite] = useState('');
  const [leadSource, setLeadSource] = useState('-None-');
  const [leadStatus, setLeadStatus] = useState('-None-');
  const [industry, setIndustry] = useState('-None-');
  const [noOfEmployees, setNoOfEmployees] = useState('');
  const [annualRevenue, setAnnualRevenue] = useState('');
  const [rating, setRating] = useState('-None-');
  const [emailOptOut, setEmailOptOut] = useState(false);
  const [skypeId, setSkypeId] = useState('');
  const [twitter, setTwitter] = useState('');
  const [leadImage, setLeadImage] = useState<string | null>(null);

  // Address Information
  const [country, setCountry] = useState('-None-');
  const [flatHouseBuilding, setFlatHouseBuilding] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateProvince, setStateProvince] = useState('-None-');
  const [zipPostalCode, setZipPostalCode] = useState('');
  const [coordinates, setCoordinates] = useState('');

  // Description Information
  const [description, setDescription] = useState('');

  // UI helpers
  const [formView, setFormView] = useState('Standard View');
  const [showClientScriptDrawer, setShowClientScriptDrawer] = useState(false);
  const [errors, setErrors] = useState<{ lastName?: string; company?: string }>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const clearAddress = () => {
    setCountry('-None-');
    setFlatHouseBuilding('');
    setStreetAddress('');
    setCity('');
    setStateProvince('-None-');
    setZipPostalCode('');
    setCoordinates('');
  };

  const resetForm = () => {
    setSalutation('-None-');
    setFirstName('');
    setLastName('');
    setCompany('');
    setTitle('');
    setPhone('');
    setMobile('');
    setEmail('');
    setSecondaryEmail('');
    setFax('');
    setWebsite('');
    setLeadSource('-None-');
    setLeadStatus('-None-');
    setIndustry('-None-');
    setNoOfEmployees('');
    setAnnualRevenue('');
    setRating('-None-');
    setEmailOptOut(false);
    setSkypeId('');
    setTwitter('');
    setLeadImage(null);
    clearAddress();
    setDescription('');
    setErrors({});
  };

  const validate = () => {
    const errs: { lastName?: string; company?: string } = {};
    if (!lastName.trim()) errs.lastName = 'Last Name cannot be empty';
    if (!company.trim()) errs.company = 'Company cannot be empty';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (saveAndNew = false) => {
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const fullName = [salutation !== '-None-' ? salutation : '', firstName, lastName]
      .filter(Boolean)
      .join(' ')
      .trim();

    addLead({
      name: fullName || lastName,
      salutation,
      firstName,
      lastName,
      company,
      title: title || 'Lead Contact',
      email: email || `${lastName.toLowerCase().replace(/\s+/g, '')}@${company.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
      secondaryEmail,
      phone: phone || mobile || '+91 98765 43210',
      mobile,
      fax,
      website,
      leadSource: leadSource !== '-None-' ? leadSource : 'Web Direct',
      leadStatus: leadStatus !== '-None-' ? leadStatus : 'Not Contacted',
      leadScore: 65,
      leadOwner,
      annualRevenue: annualRevenue ? `₹${annualRevenue}` : '₹10,00,000',
      rating: rating !== '-None-' ? rating : undefined,
      industry: industry !== '-None-' ? industry : undefined,
      noOfEmployees,
      emailOptOut,
      skypeId,
      twitter,
      leadImage: leadImage || undefined,
      country: country !== '-None-' ? country : undefined,
      flatHouseBuilding,
      streetAddress,
      city,
      stateProvince: stateProvince !== '-None-' ? stateProvince : undefined,
      zipPostalCode,
      coordinates,
      description
    });

    setToastMessage(`Lead "${fullName || lastName}" successfully created!`);
    setTimeout(() => setToastMessage(null), 3000);

    if (saveAndNew) {
      resetForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('list');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLeadImage(reader.result as string);
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
            Create Lead
          </h1>
          <a
            href="#edit-layout"
            onClick={e => {
              e.preventDefault();
              alert('Page Layout Editor: You can drag and drop fields to customize this form layout.');
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
            <span>Please fill in all mandatory fields (Company, Last Name).</span>
          </div>
        )}

        {/* Lead Image Box */}
        <div className="flex items-center space-x-4 pb-2">
          <div className="relative group">
            <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/60 text-slate-400 overflow-hidden">
              {leadImage ? (
                <img src={leadImage} alt="Lead" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-5 h-5 text-slate-400" />
                  <span className="text-[9px] mt-1 font-medium">Lead Image</span>
                </>
              )}
            </div>
            <label className="absolute inset-0 bg-black/40 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-[10px] font-medium">
              Upload
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Lead Photo</p>
            <p className="text-[11px]">Upload a lead avatar (PNG, JPG up to 2MB)</p>
          </div>
        </div>

        {/* SECTION 1: Lead Information */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-1.5">
            <h2 className="text-sm font-bold text-blue-900 dark:text-blue-400 tracking-wide uppercase">
              Lead Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-xs">
            {/* LEFT COLUMN */}
            <div className="space-y-3.5">
              {/* Lead Owner */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Lead Owner
                </label>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    G
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {leadOwner}
                  </span>
                </div>
              </div>

              {/* First Name */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  First Name
                </label>
                <div className="flex-1 flex space-x-1.5">
                  <select
                    value={salutation}
                    onChange={e => setSalutation(e.target.value)}
                    className="w-24 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  >
                    <option value="-None-">-None-</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

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

              {/* Mobile */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Mobile
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Lead Source */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Lead Source
                </label>
                <select
                  value={leadSource}
                  onChange={e => setLeadSource(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Employee Referral">Employee Referral</option>
                  <option value="External Referral">External Referral</option>
                  <option value="Online Store">Online Store</option>
                  <option value="Partner">Partner</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Sales Mail Alias">Sales Mail Alias</option>
                  <option value="Seminar Partner">Seminar Partner</option>
                  <option value="Seminar-Internal">Seminar-Internal</option>
                  <option value="Trade Show">Trade Show</option>
                  <option value="Web Download">Web Download</option>
                  <option value="Web Research">Web Research</option>
                  <option value="Chat">Chat</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google+">Google+</option>
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
                      placeholder="e.g. 50,00,000"
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

              {/* Email Opt Out */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Email Opt Out
                </label>
                <div className="flex-1">
                  <input
                    type="checkbox"
                    checked={emailOptOut}
                    onChange={e => setEmailOptOut(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-3.5">
              {/* Company (Mandatory) */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400 flex items-center justify-end">
                  Company
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={company}
                    onChange={e => {
                      setCompany(e.target.value);
                      if (errors.company) setErrors(prev => ({ ...prev, company: undefined }));
                    }}
                    className={`w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border-l-4 border-l-red-500 border border-slate-300 dark:border-slate-700 rounded-r text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 ${
                      errors.company ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.company && (
                    <span className="text-[10px] text-red-500 absolute -bottom-4 left-0">
                      {errors.company}
                    </span>
                  )}
                </div>
              </div>

              {/* Last Name (Mandatory) */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400 flex items-center justify-end">
                  Last Name
                </label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={lastName}
                    onChange={e => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: undefined }));
                    }}
                    className={`w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border-l-4 border-l-red-500 border border-slate-300 dark:border-slate-700 rounded-r text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500 ${
                      errors.lastName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <span className="text-[10px] text-red-500 absolute -bottom-4 left-0">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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

              {/* Lead Status */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Lead Status
                </label>
                <select
                  value={leadStatus}
                  onChange={e => setLeadStatus(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                >
                  <option value="-None-">-None-</option>
                  <option value="Attempted to Contact">Attempted to Contact</option>
                  <option value="Cold">Cold</option>
                  <option value="Contact in Future">Contact in Future</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Junk Lead">Junk Lead</option>
                  <option value="Lost Lead">Lost Lead</option>
                  <option value="Not Contacted">Not Contacted</option>
                  <option value="Pre-Qualified">Pre-Qualified</option>
                  <option value="Qualified">Qualified</option>
                </select>
              </div>

              {/* No. of Employees */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  No. of Employees
                </label>
                <input
                  type="number"
                  value={noOfEmployees}
                  onChange={e => setNoOfEmployees(e.target.value)}
                  placeholder="e.g. 150"
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
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

              {/* Skype ID */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Skype ID
                </label>
                <input
                  type="text"
                  value={skypeId}
                  onChange={e => setSkypeId(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Secondary Email */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Secondary Email
                </label>
                <input
                  type="email"
                  value={secondaryEmail}
                  onChange={e => setSecondaryEmail(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
                />
              </div>

              {/* Twitter */}
              <div className="flex items-center">
                <label className="w-36 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                  Twitter
                </label>
                <div className="flex-1 flex items-center border border-slate-300 dark:border-slate-700 rounded overflow-hidden bg-white dark:bg-slate-800 focus-within:border-blue-500">
                  <span className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 border-r border-slate-300 dark:border-slate-700">
                    @
                  </span>
                  <input
                    type="text"
                    value={twitter}
                    onChange={e => setTwitter(e.target.value)}
                    placeholder="handle"
                    className="flex-1 px-2.5 py-1.5 bg-transparent text-slate-800 dark:text-slate-200 outline-none"
                  />
                </div>
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

          <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 space-y-3.5 text-xs max-w-3xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-700/60">
              <span className="font-bold text-slate-700 dark:text-slate-300">Address</span>
              <button
                type="button"
                onClick={clearAddress}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Country / Region */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                Country / Region
              </label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
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

            {/* Flat / House No./ Building / Apartment Name */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                Flat / House No./ Building / Apartment Name
              </label>
              <input
                type="text"
                value={flatHouseBuilding}
                onChange={e => setFlatHouseBuilding(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            {/* Street Address */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                Street Address
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            {/* State / Province */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                State / Province
              </label>
              <select
                value={stateProvince}
                onChange={e => setStateProvince(e.target.value)}
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
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                Zip / Postal Code
              </label>
              <input
                type="text"
                value={zipPostalCode}
                onChange={e => setZipPostalCode(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            {/* Coordinates */}
            <div className="flex items-center">
              <label className="w-48 text-right pr-4 font-medium text-slate-600 dark:text-slate-400">
                Coordinates
              </label>
              <input
                type="text"
                value={coordinates}
                onChange={e => setCoordinates(e.target.value)}
                placeholder="Latitude, Longitude (e.g. 19.0760, 72.8777)"
                className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200 outline-none focus:border-blue-500"
              />
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
              placeholder="Enter comprehensive notes, discussions, lead requirements, or background context..."
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
            <option value="Quick Create View">Quick Create View</option>
            <option value="Enterprise Layout">Enterprise Layout</option>
          </select>
          <a
            href="#create-custom-form"
            onClick={e => {
              e.preventDefault();
              alert('Custom Form Builder: Create multiple form views tailored for specific sales roles or territories.');
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
                  Client Scripts for "Create Lead" Page
                </p>
                <p className="text-[11px] leading-relaxed">
                  Execute custom JavaScript logic upon page load, field value modifications, or form submission.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Active Event Listeners:
                </label>
                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  ⚡ onChange(Company) ➔ Auto-suggest industry & website
                </div>
                <div className="p-2.5 rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  ⚡ onSave() ➔ Mandatory field validations & phone normalization
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Custom Script Editor:
                </label>
                <textarea
                  rows={8}
                  defaultValue={`// Example Zoho Client Script
ZDK.Page.getField('Company').addEventListener('onChange', function(e) {
  var comp = ZDK.Page.getField('Company').getValue();
  console.log('Lead Company updated to: ' + comp);
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
            onClick={() => alert('My Pins: Quick access to pinned leads, accounts, and deals.')}
            className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer"
          >
            <Pin className="w-3 h-3" />
            <span>My Pins</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => alert('Chats: Open Zoho Cliq / internal team chat channels.')}
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
          Zoho CRM Layout Engine v2025 • Standard Lead Form
        </div>
      </div>
    </div>
  );
};
