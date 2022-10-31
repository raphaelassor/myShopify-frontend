import IconClose from '@mui/icons-material/Clear';
import { noop } from 'lodash';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  handleChange?: () => void;
  onRemove?: () => void;
}
export const Snippet: React.FC<Props> = ({
  children,
  handleChange,
  onRemove,
}) => (
  <span className="snippet" onClick={handleChange ?? noop}>
    <span>{children}</span>{' '}
    {onRemove && (
      <span
        className="close"
        onClick={(ev) => {
          ev.stopPropagation();
          onRemove();
        }}
      >
        <IconClose />
      </span>
    )}
  </span>
);
