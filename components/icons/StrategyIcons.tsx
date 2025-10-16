import React from 'react';

interface IconProps {
  className?: string;
}

const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ className = "h-8 w-8", children }) => (
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

export const PaaSPlatformIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12.75h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </BaseIcon>
);

export const MaaSModelIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3.75H19.5M8.25 6.75H19.5M8.25 9.75H19.5M8.25 12.75H19.5m-11.25-9v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V3.75m-12 1.5h12m-12 3h12m-12 3h12m-12 3h12M4.5 3.75h.008v.008H4.5V3.75z" />
  </BaseIcon>
);

export const AgentFrameworkIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </BaseIcon>
);

export const AppEcosystemIcon: React.FC<IconProps> = ({ className }) => (
  <BaseIcon className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </BaseIcon>
);
