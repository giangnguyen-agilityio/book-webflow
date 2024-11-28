import { ROUTES } from '@/constants';

// Icons
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/icons';

const NAVIGATION_ITEMS = [
  { url: ROUTES.STORE, label: 'Store', title: 'Store page' },
  { url: ROUTES.ARTICLES, label: 'Articles', title: 'Articles page' },
  { url: ROUTES.ABOUT, label: 'About', title: 'About page' },
  { url: ROUTES.SERVICES, label: 'Services', title: 'Services page' },
  { url: ROUTES.CONTACT, label: 'Contact', title: 'Contact page' },
];

const SOCIAL_LINK_ITEMS = [
  { url: '', icon: FacebookIcon, title: 'Facebook' },
  { url: '', icon: TwitterIcon, title: 'Twitter' },
  { url: '', icon: LinkedInIcon, title: 'LinkedIn' },
  { url: '', icon: InstagramIcon, title: 'Instagram' },
];

export { NAVIGATION_ITEMS, SOCIAL_LINK_ITEMS };
