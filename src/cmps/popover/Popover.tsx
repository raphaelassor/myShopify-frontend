import React, { ReactElement, ReactNode } from 'react';
import MUIPopover, { PopoverProps } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { isUndefined } from 'lodash';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
    </div>
  );
}

export interface BasePopoverProps {
  children: ReactNode;
  anchor: ReactElement;
  popoverProps?: PopoverProps;
  isOpen?: boolean;
  onClickAnchor?: () => void;
}

export const Popover: React.FC<BasePopoverProps> = ({
  children,
  anchor,
  isOpen,
  onClickAnchor,
  ...popoverProps
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    if (onClickAnchor) onClickAnchor();
  };

  const shouldOpenPopover = isUndefined(isOpen)
    ? !!anchorEl
    : !!anchorEl && isOpen;

  return (
    <>
      <div onClick={handleClick}>{anchor}</div>
      {anchorEl && (
        <MUIPopover
          open={shouldOpenPopover}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          {...popoverProps}
        >
          {children}
        </MUIPopover>
      )}
    </>
  );
};
