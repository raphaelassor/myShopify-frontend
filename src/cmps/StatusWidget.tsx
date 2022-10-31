import React from 'react';
import { Status } from '../services/types/general';

interface Props {
  status: Status;
}

export const StatusWidget: React.FC<Props> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'active':
        return { txt: 'Active', class: 'active' };
      case 'archive':
        return { txt: 'Archived', class: 'archive' };
      case 'draft':
        return { txt: 'Draft', class: 'draft' };
      default:
        return { txt: 'Draft', class: 'draft' };
    }
  };
  const statusInfo = getStatusInfo();
  return (
    <div className={`status-widget ${statusInfo.class}`}>
      <span>{statusInfo.txt}</span>
    </div>
  );
};
