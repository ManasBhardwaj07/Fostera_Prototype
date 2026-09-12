import type { ReactNode } from 'react';
import { X } from 'lucide-react';

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
      className={`bg-fostera-surface rounded-[24px] p-5 shadow-soft border border-fostera-border transition-all duration-150 ${
        onClick ? 'cursor-pointer hover:border-fostera-border/80 active:scale-[0.985]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}: {
  children: ReactNode;
  variant?: 'primary' | 'focal' | 'secondary' | 'danger' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}) => {
  const base =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-fostera-brand/40 disabled:opacity-40 disabled:pointer-events-none select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[36px] rounded-xl gap-1.5 font-semibold',
    md: 'text-sm px-5 py-3 min-h-[44px] rounded-2xl gap-2 font-semibold',
    lg: 'text-base px-6 py-3.5 min-h-[50px] rounded-2xl gap-2 font-semibold tracking-tight',
  };

  const variantStyles = {
    primary: 'bg-fostera-brand text-white hover:bg-fostera-brand-dark shadow-sm',
    focal: 'bg-fostera-focal text-white hover:bg-black shadow-sm',
    secondary:
      'bg-fostera-surface text-fostera-text-primary border border-fostera-border hover:bg-fostera-surface-soft shadow-xs',
    danger:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20',
    subtle:
      'text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-fostera-surface-soft',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

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
    UNDER: 'bg-fostera-brand-soft text-fostera-brand-dark',
    AT_LIMIT: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
    EXCEEDED: 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
    NO_LIMIT: 'bg-fostera-surface-soft text-fostera-text-secondary',
  };

  return (
    <span
      className={`inline-flex items-center text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${styles[status]} ${className}`}
    >
      {text}
    </span>
  );
};

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
    <div className="flex items-start justify-between pb-2 mb-4 px-1 pt-1">
      <div>
        <h1 className="text-[26px] sm:text-[28px] leading-tight font-bold tracking-tight text-fostera-text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] sm:text-[14px] text-fostera-text-secondary mt-0.5 font-medium">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0 ml-3">{action}</div>}
    </div>
  );
};

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

  const positionClasses =
    position === 'bottom'
      ? 'items-end sm:items-center'
      : 'items-center';

  const containerClasses =
    position === 'bottom'
      ? 'w-full max-w-[430px] rounded-t-[32px] sm:rounded-[32px] max-h-[88vh] sheet-enter'
      : 'w-[92%] max-w-[400px] rounded-[28px] max-h-[85vh] view-enter';

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center p-0 sm:p-4 bg-black/45 dark:bg-black/65 backdrop-blur-[2px] transition-opacity duration-200 ${positionClasses}`}
      onClick={onClose}
    >
      <div
        className={`bg-fostera-surface shadow-elevated border-t sm:border border-fostera-border overflow-hidden flex flex-col relative ${containerClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle pill for bottom sheet */}
        {position === 'bottom' && (
          <div className="flex justify-center pt-2.5 pb-0 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-fostera-border" />
          </div>
        )}

        {(title || subtitle) && (
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <div>
              {title && (
                <h3 className="text-xl font-bold tracking-tight text-fostera-text-primary">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs sm:text-sm text-fostera-text-secondary mt-0.5 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8 rounded-full bg-fostera-surface-soft text-fostera-text-secondary hover:text-fostera-text-primary hover:bg-fostera-surface-hover flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div
          className={`${
            title || subtitle ? 'px-6 pb-7' : 'p-6'
          } overflow-y-auto no-scrollbar`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
