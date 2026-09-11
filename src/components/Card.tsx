import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      'bg-white rounded-2xl p-5 shadow-sm border border-slate-100', 
      onClick && 'cursor-pointer hover:shadow-md transition-shadow',
      className
    )}
  >
    {children}
  </div>
);
