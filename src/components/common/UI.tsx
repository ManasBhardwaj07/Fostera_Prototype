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
      className={`bg-fostera-surface rounded-[20px] p-5 shadow-sm border border-black/[0.03] ${
        onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Standard Button
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
  variant?: 'primary' | 'focal' | 'secondary' | 'danger' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const base = 'inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-3 rounded-xl gap-2',
    lg: 'text-base px-5 py-4 rounded-2xl gap-2 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-fostera-brand text-white focus:ring-fostera-brand/30',
    focal: 'bg-fostera-focal text-white focus:ring-fostera-focal/30',
    secondary: 'bg-fostera-surface text-fostera-text-primary border border-black/5 focus:ring-black/10',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100 focus:ring-rose-200',
    subtle: 'text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-black/5 focus:ring-black/10',
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

// Status Badge
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
    UNDER: 'bg-[#E4F0E9] text-[#216044] font-medium', // using brand-soft/brand-dark
    AT_LIMIT: 'bg-amber-100 text-amber-800 font-medium',
    EXCEEDED: 'bg-rose-100 text-rose-700 font-semibold',
    NO_LIMIT: 'bg-black/5 text-fostera-text-secondary font-normal',
  };

  return (
    <span className={`inline-flex items-center text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md ${styles[status]} ${className}`}>
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
        <h1 className="text-2xl font-bold tracking-tight text-fostera-text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-fostera-text-secondary mt-1">{subtitle}</p>}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fostera-focal/40 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-[400px] bg-fostera-surface rounded-[24px] shadow-xl overflow-hidden flex flex-col max-h-[85vh]`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.03]">
          <div>
            <h3 className="text-lg font-bold text-fostera-text-primary">{title}</h3>
            {subtitle && <p className="text-sm text-fostera-text-secondary mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-black/5 flex items-center justify-center transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-5">{children}</div>
      </div>
    </div>
  );
};
