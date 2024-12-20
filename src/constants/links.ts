import { ROUTES } from '@/constants';

// Icons
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/icons';

const NAVIGATION_ITEMS = {
  MAIN: [
    { url: ROUTES.STORE, label: 'Store', title: 'Store page' },
    { url: ROUTES.ARTICLES, label: 'Articles', title: 'Articles page' },
    { url: ROUTES.ABOUT, label: 'About', title: 'About page' },
    { url: ROUTES.SERVICES, label: 'Services', title: 'Services page' },
    { url: ROUTES.CONTACT, label: 'Contact', title: 'Contact page' },
  ],
  EXPLORE: [
    { url: ROUTES.STORE, label: 'Home', title: 'Homepage' },
    { url: ROUTES.ABOUT, label: 'About Us', title: 'About us page' },
    { url: ROUTES.SERVICES, label: 'Services', title: 'Services page' },
    {
      url: '',
      label: 'Appointments',
      title: 'Appointments page',
    },
    { url: '', label: 'Blog', title: 'Blog page' },
    { url: ROUTES.CONTACT, label: 'Contact Us', title: 'Contact us page' },
  ],
  UTILITY: [
    { url: '', label: 'Start here', title: 'Start here page' },
    {
      url: '',
      label: 'Style guide',
      title: 'Style guide page',
    },
    { url: '', label: '404 not found', title: 'Not found page' },
    {
      url: '',
      label: 'Password protected',
      title: 'Password protected page',
    },
    { url: '', label: 'Licenses', title: 'Licenses page' },
    { url: '', label: 'Changelog', title: 'Changelog page' },
  ],
};

const SOCIAL_LINK_ITEMS = [
  { url: '', icon: FacebookIcon, title: 'Facebook' },
  { url: '', icon: TwitterIcon, title: 'Twitter' },
  { url: '', icon: LinkedInIcon, title: 'LinkedIn' },
  { url: '', icon: InstagramIcon, title: 'Instagram' },
];

export { NAVIGATION_ITEMS, SOCIAL_LINK_ITEMS };
