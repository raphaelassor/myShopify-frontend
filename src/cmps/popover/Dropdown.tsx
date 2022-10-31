import React, { ReactElement, useState } from 'react';
import { BasePopoverProps } from './Popover';
import { Popover } from './Popover';
import { DropdownOption } from './types';

interface Props extends Omit<BasePopoverProps, 'children'> {
  items: DropdownOption[];
  onClickItem?: (value: string) => void;
  closeOnSelect?: boolean;
  selectedValue: string;
}
export const Dropdown: React.FC<Props> = ({
  items,
  onClickItem,
  closeOnSelect,
  selectedValue,
  ...popoverProps
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleClickItem = (item: DropdownOption) => {
    if (item.onClick && selectedValue !== item.value) item.onClick();
    if (closeOnSelect) setIsPopoverOpen(false);
  };
  return (
    <Popover
      anchor={popoverProps.anchor}
      onClickAnchor={() => setIsPopoverOpen(true)}
      isOpen={isPopoverOpen}
    >
      <div className="generic-dropdown default">
        {items.map((item) => (
          <div onClick={() => handleClickItem(item)}>
            {item.renderElement ? (
              item.renderElement(item.value)
            ) : (
              <div className="label">{item.label}</div>
            )}
          </div>
        ))}
      </div>
    </Popover>
  );
};
