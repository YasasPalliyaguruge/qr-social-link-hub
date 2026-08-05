import React from 'react';
import type { SocialLink } from '../types';

interface SocialLinkButtonProps {
  link: SocialLink;
}

const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({ link }) => (
  <a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      flex w-full transform items-center justify-center rounded-lg p-4
      text-lg font-semibold shadow-lg transition-all duration-300 ease-in-out
      hover:scale-105 focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
      motion-reduce:transform-none
      ${link.bgColor} ${link.hoverBgColor} ${link.textColor}
    `}
    aria-label={`Open ${link.name} in a new tab`}
  >
    <span className="mr-3" aria-hidden="true">
      {link.icon}
    </span>
    {link.name}
  </a>
);

export default SocialLinkButton;
