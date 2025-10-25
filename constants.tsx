import React from 'react';
import type { SocialLink } from './types';

// SVG Icon Components
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.84c0-2.5 1.49-3.9 3.8-3.9 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10.02 10.02 0 0 0 8.44-9.9C22 6.53 17.5 2.04 12 2.04Z"></path></svg>
);

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"></path></svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);


export const PRIMARY_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/share/1BkuYZrem4/?mibextid=wwXIfr',
    icon: <FacebookIcon />,
    bgColor: 'bg-[#1877F2]',
    hoverBgColor: 'hover:bg-[#166eab]',
    textColor: 'text-white',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/migratetocanada.lk?igsh=dmZ6Y3E3NWFkbWgz',
    icon: <InstagramIcon />,
    bgColor: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
    hoverBgColor: 'hover:opacity-90',
    textColor: 'text-white',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@canadagatewayimmigration?_t=ZG-90e8ZZgyix7&_r=1',
    icon: <TikTokIcon />,
    bgColor: 'bg-black',
    hoverBgColor: 'hover:bg-gray-800',
    textColor: 'text-white',
  },
];

export const CONTACT_LINKS: SocialLink[] = [
  {
    name: 'Email',
    url: 'mailto:info@migratetocanada.com',
    icon: <EmailIcon />,
    bgColor: 'bg-white/20',
    hoverBgColor: 'hover:bg-white/30',
    textColor: 'text-white',
  },
  {
    name: 'Phone',
    url: 'tel:0766919358',
    icon: <PhoneIcon />,
    bgColor: 'bg-white/20',
    hoverBgColor: 'hover:bg-white/30',
    textColor: 'text-white',
  },
  {
    name: 'Website',
    url: 'https://migrateto-canada.com/',
    icon: <WebsiteIcon />,
    bgColor: 'bg-white/20',
    hoverBgColor: 'hover:bg-white/30',
    textColor: 'text-white',
  },
];