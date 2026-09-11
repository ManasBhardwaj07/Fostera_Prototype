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
      className={`bg-fostera-surface rounded-[24px] p-5 shadow-sm border border-black/[0.03] ${
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
    sm: 'text-xs px-4 py-2 rounded-xl gap-1.5',
    md: 'text-sm px-5 py-3.5 rounded-2xl gap-2',
    lg: 'text-base px-6 py-4 rounded-[20px] gap-2 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-fostera-brand text-white focus:ring-fostera-brand/30 hover:bg-fostera-brand-dark',
    focal: 'bg-fostera-focal text-white focus:ring-fostera-focal/30 hover:bg-[#0f1713]',
    secondary: 'bg-white text-fostera-text-primary border border-black/10 focus:ring-black/10 hover:bg-black/5',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100 focus:ring-rose-200 hover:bg-rose-100',
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
    UNDER: 'bg-fostera-brand-soft text-fostera-brand-dark font-medium',
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
    <div className="flex items-start justify-between pb-2 mb-4 px-2">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-fostera-text-primary">{title}</h1>
        {subtitle && <p className="text-[13px] text-fostera-text-secondary mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

// Shared Modal Container (Supports Center Dialog & Bottom Sheet)
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  position = 'center',
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  position?: 'center' | 'bottom';
}) => {
  if (!isOpen) return null;

  const positionClasses = position === 'bottom'
    ? "items-end sm:items-center" // Bottom sheet on mobile, center on desktop (if responsive classes kept)
    : "items-center";

  const containerClasses = position === 'bottom'
    ? "w-full rounded-t-[32px] sm:rounded-[32px] mt-10 max-h-[90vh]"
    : "w-[90%] max-w-[400px] rounded-[32px] max-h-[85vh]";

  return (
    <div className={`fixed inset-0 z-50 flex justify-center p-0 sm:p-4 bg-fostera-focal/40 backdrop-blur-sm animate-fade-in ${positionClasses}`}>
      <div
        className={`bg-fostera-surface shadow-2xl overflow-hidden flex flex-col ${containerClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div>
              {title && <h3 className="text-xl font-bold tracking-tight text-fostera-text-primary">{title}</h3>}
              {subtitle && <p className="text-sm text-fostera-text-secondary mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/5 text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-black/10 flex items-center justify-center transition-colors"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className={`${(title || subtitle) ? 'px-6 pb-8' : 'p-6'} overflow-y-auto`}>
          {children}
        </div>
      </div>
    </div>
  );
};
