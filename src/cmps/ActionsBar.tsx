import React, {
  ChangeEvent,
  MouseEventHandler,
  ReactElement,
  useState,
} from 'react';
import { Dropdown } from './popover/Dropdown';

interface Props {
  actions: {
    title: string;
    onClick?: () => void;
    renderElement?: (value: string) => ReactElement;
  }[];
  previewLimit?: number;
}
export const ActionsBar: React.FC<Props> = ({ actions, previewLimit = 3 }) => {
  return (
    <div className="flex btn-bar">
      {actions.slice(0, previewLimit).map((action, index) => (
        <button
          className={`btn-md btn-neutral ${index ? '' : 'first-in-bar'}`}
          onClick={() => action.onClick && action.onClick()}
        >
          {action.title}
        </button>
      ))}
      {actions.length > previewLimit && (
        <Dropdown
          anchor={
            <button className="btn-md btn-neutral last-in-bar">
              More actions
            </button>
          }
          items={actions.slice(previewLimit).map((item) => ({
            label: item.title,
            value: item.title,
            onClick: item.onClick,
            renderElement: item.renderElement && item.renderElement,
          }))}
          closeOnSelect
          selectedValue={''}
        />
      )}
    </div>
  );
};
