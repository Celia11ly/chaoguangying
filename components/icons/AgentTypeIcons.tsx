import React from 'react';

interface IconProps {
  className?: string;
}

const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ className = "h-6 w-6", children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {children}
  </svg>
);

export const CharacterAgentIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9h.01M15 9h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5" transform="rotate(15, 12, 12)"/>
  </BaseIcon>
);

export const CelebrityAgentIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </BaseIcon>
);

export const CrewAgentIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.375 1.439a3 3 0 01-5.25 0A3 3 0 013 18.257V17.25m6-12V5.25A2.25 2.25 0 006.75 3H5.25A2.25 2.25 0 003 5.25v1.5m6 0h.01M6 6h.01M6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M18 6h.01M12 6h.01M12 3h.01M15 3h.01M18 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.53 14.47a.75.75 0 00-1.06 1.06l4.5 4.5a.75.75 0 001.06 0l4.5-4.5a.75.75 0 00-1.06-1.06L9 17.94l-3.22-3.22a.75.75 0 00-1.25.53v.032z" transform="translate(0, -4)" />
  </BaseIcon>
);

export const IPAgentIcon: React.FC<IconProps> = ({ className }) => (
    <BaseIcon className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.184m-1.5.184a6.01 6.01 0 01-1.5-.184m3.75 7.383a4.5 4.5 0 01-4.496-3.75l.496-3.75m0 0a4.5 4.5 0 014.496-3.75l-.496 3.75m0 0a4.5 4.5 0 00-4.496 3.75l.496 3.75M3.75 12a6.01 6.01 0 011.5-.184m-1.5.184a6.01 6.01 0 00-1.5-.184m3.75 7.383a4.5 4.5 0 01-4.496-3.75l.496-3.75m0 0a4.5 4.5 0 014.496-3.75l-.496 3.75m0 0a4.5 4.5 0 00-4.496 3.75l.496 3.75m7.5-7.383a4.5 4.5 0 014.496 3.75l-.496 3.75m0 0a4.5 4.5 0 01-4.496 3.75l.496-3.75m0 0a4.5 4.5 0 004.496-3.75l-.496 3.75" />
    </BaseIcon>
);

export const OfficialAgentIcon: React.FC<IconProps> = ({ className }) => (
    <BaseIcon className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
    </BaseIcon>
);
  
export const UserGeneratedAgentIcon: React.FC<IconProps> = ({ className }) => (
    <BaseIcon className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </BaseIcon>
);