import React from 'react';

interface IconProps {
  className?: string;
}

export const YingbaoIcon: React.FC<IconProps> = ({ className = "h-8 w-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 8V4H8" className="stroke-slate-500" />
    <rect x="4" y="12" width="16" height="8" rx="2" className="stroke-cyan-400" />
    <path d="M8 12v-2a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2" className="stroke-slate-400" />
    <circle cx="9" cy="16" r="1" className="fill-cyan-300 stroke-cyan-300" />
    <circle cx="15" cy="16" r="1" className="fill-cyan-300 stroke-cyan-300" />
  </svg>
);
