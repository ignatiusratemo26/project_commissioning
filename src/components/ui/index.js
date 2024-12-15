import React from 'react';
import { MenuItem, FormControl, InputLabel, Select as MuiSelect, Checkbox as MuiCheckbox, Badge as MuiBadge } from '@mui/material';

export function Select({ defaultValue, children, ...props }) {
  return (
    <FormControl variant="outlined" {...props}>
      <InputLabel>{props.label}</InputLabel>
      <MuiSelect defaultValue={defaultValue} label={props.label}>
        {children}
      </MuiSelect>
    </FormControl>
  );
}

export function SelectTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SelectValue({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SelectContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export function SelectItem({ value, children, ...props }) {
  return (
    <MenuItem value={value} {...props}>
      {children}
    </MenuItem>
  );
}

export function Checkbox(props) {
  return <MuiCheckbox {...props} />;
}

export function Badge({ variant, className, children, ...props }) {
  return (
    <MuiBadge className={`${className} ${variant}`} {...props}>
      {children}
    </MuiBadge>
  );
}