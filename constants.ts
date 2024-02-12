import { IconNode } from 'lucide-react';

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
        },
        {
          type: 'text',
          id: 'lastName',
          label: 'Last Name',
        },
        {
          type: 'text',
          id: 'linkedin',
          label: 'LinkedIn',
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
        },
        {
          type: 'select',
          id: 'organization',
          label: 'Organization / Club',
          options: Object.entries(organizationsList).map(([key, value]) => ({
            label: value,
            value: key,
          })),
        },
      ],
    },
  ],
};

export const onboardingFormDictionary = {
  firstName: 'First Name',
  lastName: 'Last Name',
  linkedin: 'LinkedIn',
  university: 'University',
  organization: 'Organization / Club',
};
