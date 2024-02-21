export const navlinks = [
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'Profile',
    href: '/profile',
  },
  {
    name: 'Submit',
    href: '/submit',
  },
];

export const universitiesList = {
  other: 'Other',
  queensUniversity: 'Queens University',
  westernUniversity: 'Western University',
  universityOfToronto: 'University of Toronto',
  universityofWaterloo: 'Waterloo University',
};

export const organizationsList = {
  other: 'Other',
  qmind: 'QMIND',
  westernAI: 'Western AI',
  uoftAI: 'UofT AI',
  watAI: 'WatAI',
};

// ONBOARDING FORM

export const onboardingForm = {
  name: 'Onboarding Survey',
  slug: 'onboarding-survey',
  steps: [
    {
      title: 'Primary Details',
      description: 'Please fill in your primary details',
      fields: [
        {
          type: 'text',
          id: 'firstName',
          label: 'First Name',
          required: true,
        },
        {
          type: 'text',
          id: 'lastName',
          label: 'Last Name',
          required: true,
        },
        {
          type: 'text',
          id: 'linkedIn',
          label: 'LinkedIn',
          required: false,
        },
      ],
    },
    {
      title: 'More Details',
      description: 'Please fill in your more details',
      fields: [
        {
          type: 'select',
          id: 'university',
          label: 'University',
          options: Object.entries(universitiesList).map(([key, value]) => ({
            label: value,
            value: key,
          })),
          required: true,
        },
        {
          type: 'select',
          id: 'organization',
          label: 'Organization / Club',
          options: Object.entries(organizationsList).map(([key, value]) => ({
            label: value,
            value: key,
          })),
          required: true,
        },
      ],
    },
  ],
};

export const onboardingFormDictionary = {
  firstName: 'First Name',
  lastName: 'Last Name',
  linkedIn: 'LinkedIn',
  university: 'University',
  organization: 'Organization / Club',
};

export const paperTrackList = {
  other: 'Other',
  machineLearning: 'Machine Learning',
  computerVision: 'Computer Vision',
  naturalLanguageProcessing: 'Natural Language Processing',
  robotics: 'Robotics',
};

// PAPER CREATION FORM

export const paperCreationForm = {
  name: 'Paper Creation',
  slug: 'paper-creation',
  steps: [
    {
      title: 'Paper Details',
      description: 'Please fill in your paper details',
      fields: [
        {
          type: 'text',
          id: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'textarea',
          id: 'abstract',
          label: 'Abstract',
          required: true,
        },
      ],
    },
    {
      title: 'More Details',
      description: 'Please fill in your more details',
      fields: [
        {
          type: 'select',
          id: 'track',
          label: 'Track',
          options: Object.entries(paperTrackList).map(([key, value]) => ({
            label: value,
            value: key,
          })),
          required: true,
        },
        {
          type: 'text',
          id: 'url',
          label: 'URL',
          required: false,
        },
        {
          type: 'text',
          id: 'doi',
          label: 'DOI',
          required: false,
        },
      ],
    },
    {
      title: 'File upload',
      description: 'Please upload your paper in PDF format',
      fields: [
        {
          type: 'upload',
          id: 'pdf',
          label: 'PDF',
          required: true,
        },
      ],
    },
    {
      title: 'Set a password',
      description:
        'Please set a password so your team members can join the submission',
      fields: [
        {
          type: 'text',
          id: 'password',
          label: 'Password',
          required: true,
        },
      ],
    },
  ],
};
