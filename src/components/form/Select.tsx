import React from 'react';
import { Control, useController } from 'react-hook-form';
import {
  Select as SelectCore,
  SelectProps as SelectCoreProps,
} from '../core/Select';

interface SelectProps extends Omit<SelectCoreProps, 'value' | 'onChange'> {
  control: Control<any, any>;
  name: string;
}

export function Select({ name, control, ...rest }: SelectProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = React.useCallback(
    (option: SelectCoreProps['value']) => {
      onChange(option);
    },
    [onChange],
  );

  return (
    <SelectCore
      error={error?.message}
      {...rest}
      value={value}
      onChange={handleChange}
    />
  );
}
