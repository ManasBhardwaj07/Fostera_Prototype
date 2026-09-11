import type { ReactNode } from 'react';
import { CloseIcon } from './Icons';

// Standard Card
export const Card = ({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs ${
        onClick ? 'cursor-pointer hover:border-slate-300 transition-colors' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Standard Button (Primary Green, Navy, Secondary, Danger, Subtle)
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: {
  children: ReactNode;
  variant?: 'primary' | 'navy' | 'secondary' | 'danger' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const base = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99]';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-5 py-3 rounded-xl gap-2 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#2F855A] hover:bg-[#276749] text-white focus:ring-[#2F855A]/30 shadow-xs',
    navy: 'bg-[#0F172A] hover:bg-slate-800 text-white focus:ring-slate-900/20 shadow-xs',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 focus:ring-slate-300 shadow-xs',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 focus:ring-rose-300',
    subtle: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-300',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Status Badge (Under limit, At limit, Exceeded, No limit)
export const StatusBadge = ({
  status,
  text,
  className = '',
}: {
  status: 'UNDER' | 'AT_LIMIT' | 'EXCEEDED' | 'NO_LIMIT';
  text: string;
  className?: string;
}) => {
  const styles = {
    UNDER: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium',
    AT_LIMIT: 'bg-amber-50 text-amber-800 border-amber-200 font-medium',
    EXCEEDED: 'bg-rose-50 text-rose-700 border-rose-200 font-semibold',
    NO_LIMIT: 'bg-slate-50 text-slate-500 border-slate-200 font-normal',
  };

  return (
    <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-md border ${styles[status]} ${className}`}>
      {text}
    </span>
  );
};

// Page Header
export const PageHeader = ({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) => {
  return (
    <div className="flex items-start justify-between pb-2 mb-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Shared Modal Container
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-md',
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full ${maxWidth} bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto space-y-4">{children}</div>
      </div>
    </div>
  );
};
