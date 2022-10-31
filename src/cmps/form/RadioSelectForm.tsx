import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React, { ChangeEvent, ReactElement } from 'react';
import { FormCmpProps } from './types';

export const RadioSelectForm: React.FC<FormCmpProps> = ({
  name,
  value,
  onChange,
  options,
  onClearAll,
}) => (
  <div className="form-selection">
    <RadioGroup name={name} value={value} onChange={onChange}>
      {options.map((option) => {
        return (
          <FormControlLabel
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        );
      })}
    </RadioGroup>
    {onClearAll && (
      <a href="#" onClick={onClearAll}>
        Clear
      </a>
    )}
  </div>
);
