import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';
import Account from '../models/Account.js';
import Deal from '../models/Deal.js';
import Workqueue from '../models/Workqueue.js';
import Activity from '../models/Activity.js';

export async function seedInitialDataIfEmpty() {
  try {
    const leadCount = await Lead.countDocuments();
    if (leadCount > 0) {
      console.log(`Database already has ${leadCount} leads. Skipping seeding.`);
      return;
    }

    console.log('Seeding initial Zoho CRM enterprise records into MongoDB Atlas...');

    // 1. Accounts
    const account1 = await Account.create({
      accountName: 'Reliance Industries Global',
      accountOwner: 'Govind Choudhary',
      accountType: 'Enterprise Customer',
      industry: 'Energy & Petrochemicals',
      annualRevenue: '₹9,74,864 Cr',
      rating: 'Active',
      phone: '+91 22 3555 5000',
      website: 'https://www.ril.com',
      ownership: 'Public',
      employees: '389000',
      billingAddress: {
        flatHouseNo: 'Maker Chambers IV',
        streetAddress: '222 Nariman Point',
        city: 'Mumbai',
        stateProvince: 'Maharashtra',
        zipPostalCode: '400021',
        countryRegion: 'India',
      },
      description: 'Conglomerate company headquartered in Mumbai.',
    });

    const account2 = await Account.create({
      accountName: 'Tata Consultancy Services',
      accountOwner: 'Govind Choudhary',
      accountType: 'Technology Partner',
      industry: 'IT Services & Consulting',
      annualRevenue: '₹2,40,893 Cr',
      rating: 'Active',
      phone: '+91 22 6778 9999',
      website: 'https://www.tcs.com',
      ownership: 'Public',
      employees: '614000',
      billingAddress: {
        flatHouseNo: 'TCS House',
        streetAddress: 'Raveline Street, Fort',
        city: 'Mumbai',
        stateProvince: 'Maharashtra',
        zipPostalCode: '400001',
        countryRegion: 'India',
      },
      description: 'Multinational information technology services and consulting company.',
    });

    // 2. Contacts
    const contact1 = await Contact.create({
      contactOwner: 'Govind Choudhary',
      salutation: 'Mr.',
      firstName: 'K. R.',
      lastName: 'Venkat',
      accountId: account2._id,
      accountName: account2.accountName,
      title: 'VP - Global Infrastructure Services',
      department: 'Cloud & Cyber Security',
      email: 'kr.venkat@tcs.com',
      phone: '+91 22 6778 9911',
      mobile: '+91 98201 55667',
      leadSource: 'Enterprise Referral',
      mailingAddress: {
        city: 'Mumbai',
        stateProvince: 'Maharashtra',
        countryRegion: 'India',
        zipPostalCode: '400001',
      },
      description: 'Key decision maker for enterprise SaaS modernization.',
    });

    const contact2 = await Contact.create({
      contactOwner: 'Govind Choudhary',
      salutation: 'Ms.',
      firstName: 'Pooja',
      lastName: 'Ambani',
      accountId: account1._id,
      accountName: account1.accountName,
      title: 'Chief Strategy Officer',
      department: 'Digital Initiatives',
      email: 'pooja.a@ril.com',
      phone: '+91 22 3555 5120',
      mobile: '+91 98200 44332',
      leadSource: 'Executive Network',
      mailingAddress: {
        city: 'Mumbai',
        stateProvince: 'Maharashtra',
        countryRegion: 'India',
        zipPostalCode: '400021',
      },
      description: 'Leading strategic cloud and automation procurement.',
    });

    // 3. Leads
    await Lead.create([
      {
        leadOwner: 'Govind Choudhary',
        salutation: 'Dr.',
        firstName: 'Anand',
        lastName: 'Mahindra',
        title: 'Group Chairman & MD',
        company: 'Tech Mahindra Automotive Cloud',
        email: 'anand.m@techmahindra.com',
        phone: '+91 22 2490 1441',
        mobile: '+91 98200 11223',
        leadSource: 'Seminar Partner',
        leadStatus: 'Pre-Qualified',
        leadScore: 94,
        annualRevenue: '₹85,00,00,000',
        industry: 'Enterprise',
        address: {
          city: 'Mumbai',
          stateProvince: 'Maharashtra',
          countryRegion: 'India',
        },
        description: 'Interested in unified sales and customer engagement platform.',
      },
      {
        leadOwner: 'Govind Choudhary',
        salutation: 'Ms.',
        firstName: 'Roshni',
        lastName: 'Nadar Malhotra',
        title: 'Chairperson',
        company: 'HCL Technologies Global',
        email: 'roshni.nadar@hcl.com',
        phone: '+91 120 430 6000',
        mobile: '+91 98110 33445',
        leadSource: 'Trade Show',
        leadStatus: 'Attempted to Contact',
        leadScore: 88,
        annualRevenue: '₹1,20,00,00,000',
        industry: 'IT Services',
        address: {
          city: 'Noida',
          stateProvince: 'Uttar Pradesh',
          countryRegion: 'India',
        },
        description: 'Evaluating enterprise CRM suite for global engineering team.',
      },
      {
        leadOwner: 'Govind Choudhary',
        salutation: 'Mr.',
        firstName: 'Sridhar',
        lastName: 'Vembu',
        title: 'Founder & CEO',
        company: 'Zoho Rural Tech Innovation',
        email: 'sridhar@tenkasi-innovations.in',
        phone: '+91 4633 280000',
        mobile: '+91 94440 12345',
        leadSource: 'Direct Inbound',
        leadStatus: 'Contact in Future',
        leadScore: 98,
        annualRevenue: '₹50,00,00,000',
        industry: 'Software SaaS',
        address: {
          city: 'Tenkasi',
          stateProvince: 'Tamil Nadu',
          countryRegion: 'India',
        },
        description: 'Exploration of decentralized CRM architectures.',
      },
    ]);

    // 4. Deals
    await Deal.create([
      {
        dealOwner: 'Govind Choudhary',
        dealName: 'Reliance Enterprise Cloud Rollout',
        accountId: account1._id,
        accountName: account1.accountName,
        contactId: contact2._id,
        type: 'Existing Business',
        leadSource: 'Executive Network',
        amount: 4500000,
        stage: 'Proposal/Price Quote',
        probability: 75,
        expectedRevenue: 3375000,
        closingDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        description: 'Enterprise wide 500-seat deployment with SLA guarantees.',
      },
      {
        dealOwner: 'Govind Choudhary',
        dealName: 'TCS Cyber Defense SaaS Integration',
        accountId: account2._id,
        accountName: account2.accountName,
        contactId: contact1._id,
        type: 'New Business',
        leadSource: 'Enterprise Referral',
        amount: 2800000,
        stage: 'Negotiation/Review',
        probability: 90,
        expectedRevenue: 2520000,
        closingDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        description: 'Finalizing custom data residency clauses in the contract.',
      },
    ]);

    // 5. Workqueue items
    await Workqueue.create([
      {
        title: 'Review Reliance Enterprise MSA Agreement',
        entityType: 'Deal',
        entityId: account1._id.toString(),
        entityName: 'Reliance Industries Global',
        priority: 'Critical',
        status: 'In Progress',
        assignedTo: 'Govind Choudhary',
        actionRequired: 'Contract Review',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        notes: 'Legal counsel has approved clauses 4 and 8. Waiting on commercial sign-off.',
      },
      {
        title: 'Follow-up Call with Dr. Anand Mahindra',
        entityType: 'Lead',
        entityName: 'Tech Mahindra Automotive Cloud',
        priority: 'High',
        status: 'Pending',
        assignedTo: 'Govind Choudhary',
        actionRequired: 'Follow-up Call',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        notes: 'Schedule product demo with automotive tech leads.',
      },
      {
        title: 'Prepare Custom Quote for TCS Cyber Defense',
        entityType: 'Deal',
        entityName: 'TCS Cyber Defense SaaS Integration',
        priority: 'High',
        status: 'Pending',
        assignedTo: 'Govind Choudhary',
        actionRequired: 'Send Proposal',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        notes: 'Attach volume tiered discount schedule.',
      },
    ]);

    // 6. Activities
    await Activity.create([
      {
        activityType: 'task',
        subject: 'Send Product Architecture Whitepaper',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'In Progress',
        priority: 'High',
        owner: 'Govind Choudhary',
        relatedTo: { module: 'leads', recordName: 'Tech Mahindra Automotive Cloud' },
        description: 'Send security & compliance architecture documentation.',
      },
      {
        activityType: 'meeting',
        subject: 'Quarterly Executive Review & Pipeline Analysis',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
        status: 'Scheduled',
        priority: 'High',
        owner: 'Govind Choudhary',
        relatedTo: { module: 'accounts', recordName: 'Reliance Industries Global' },
        description: 'Review deployment milestones and expansion to retail branch.',
      },
    ]);

    console.log('✅ Initial Zoho CRM data successfully seeded into MongoDB Atlas!');
  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}
