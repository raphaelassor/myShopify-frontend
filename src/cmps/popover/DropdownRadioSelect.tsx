import React from 'react';
import { BasePopoverProps, Popover } from './Popover';
import { RadioSelectForm } from '../form/RadioSelectForm';
import { FormCmpProps } from '../form/types';

interface Props extends Omit<BasePopoverProps, 'children'> {
  formProps: FormCmpProps;
}

export const DropdownRadioSelect: React.FC<Props> = ({
  anchor,
  formProps,
  ...props
}) => {
  return (
    <Popover
      anchor={anchor ?? <div>Input placeholder</div>}
      {...props.popoverProps}
    >
      <RadioSelectForm {...formProps} />
    </Popover>
  );
};
