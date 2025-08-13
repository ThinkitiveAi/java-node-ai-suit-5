import React, { forwardRef } from 'react';
import { Alert as LSAlert, AlertDescription as LSAlertDescription } from 'lightswind/dist/components/ui/alert.js';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  children?: React.ReactNode;
}

/**
 * UI Alert wrapper providing consistent styling and accessibility.
 * Compatible with common MUI Alert patterns.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'default', className, children, ...rest },
  ref
) {
  const variantClasses = {
    default: 'border-blue-200 bg-blue-50 text-blue-800',
    destructive: 'border-red-200 bg-red-50 text-red-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  };

  return (
    <LSAlert
      ref={ref}
      className={[
        'flex items-start gap-3 p-4 rounded-xl border',
        variantClasses[variant],
        className || ''
      ].join(' ')}
      {...rest}
    >
      {children}
    </LSAlert>
  );
});

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(function AlertDescription(
  { className, children, ...rest },
  ref
) {
  return (
    <LSAlertDescription
      ref={ref}
      className={['text-sm font-medium', className || ''].join(' ')}
      {...rest}
    >
      {children}
    </LSAlertDescription>
  );
});

export default Alert; 