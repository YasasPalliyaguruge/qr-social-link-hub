
import React from 'react';
import type { SocialLink } from '../types';

interface SocialLinkButtonProps {
  link: SocialLink;
}

const SocialLinkButton: React.FC<SocialLinkButtonProps> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex items-center justify-center w-full p-4 rounded-lg 
        transition-all duration-300 ease-in-out transform hover:scale-105 
        font-semibold text-lg shadow-lg
        ${link.bgColor} ${link.hoverBgColor} ${link.textColor}
      `}
    >
      <span className="mr-3">{link.icon}</span>
      {link.name}
    </a>
  );
};

export default SocialLinkButton;
