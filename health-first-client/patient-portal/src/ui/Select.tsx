import React, { forwardRef } from 'react';
import {
  Select as LSSelect,
  SelectTrigger as LSSelectTrigger,
  SelectValue as LSSelectValue,
  SelectContent as LSSelectContent,
  SelectItem as LSSelectItem,
  SelectGroup as LSSelectGroup,
} from 'lightswind/dist/components/ui/select.js';

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * UI Select wrapper providing a consistent API for select components.
 * Compatible with common MUI Select patterns.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  { value, onValueChange, placeholder, disabled, children, className, ...rest },
  ref
) {
  return (
    <LSSelect value={value} onValueChange={onValueChange} disabled={disabled} {...rest}>
      <LSSelectTrigger ref={ref} className={className}>
        <LSSelectValue placeholder={placeholder} />
      </LSSelectTrigger>
      <LSSelectContent>
        <LSSelectGroup>
          {children}
        </LSSelectGroup>
      </LSSelectContent>
    </LSSelect>
  );
});

export interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { value, children, disabled, ...rest },
  ref
) {
  return (
    <LSSelectItem ref={ref} value={value} disabled={disabled} {...rest}>
      {children}
    </LSSelectItem>
  );
});

export { LSSelect, LSSelectTrigger, LSSelectValue, LSSelectContent, LSSelectGroup };
export default Select; 