import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';

interface Props {
  isOpen: boolean;
  title?: string;
  text?: string;
  children: ReactElement;
  onCancel?: () => void;
  onSubmit?: () => void;
}

export const Modal: React.FC<Props> = ({
  isOpen,
  title,
  children,
  onCancel,
  onSubmit,
  text,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={'system-modal'}
    >
      {title && (
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
      )}
      {text && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      )}
      {children}
      {(onCancel || onSubmit) && (
        <DialogActions>
          <button onClick={onCancel}>Disagree</button>
          <button onClick={onSubmit} autoFocus>
            Agree
          </button>
        </DialogActions>
      )}
    </Dialog>
  );
};
