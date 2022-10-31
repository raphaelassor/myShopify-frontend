import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { utilService } from '../services/utilService';
import qs from 'qs';
import { isEmpty } from 'lodash';

type navOption = {
  path?: string;
  value: string | null;
  title: string;
};

export type EntityNavData = {
  options: navOption[];
  type: string;
};

type ParamOptions = Props['data']['options'][number]['value'];

interface Props {
  data: EntityNavData;
  defaultTabValue?: ParamOptions;
  onClickTab?: (value: Record<string, any>) => void;
  value: string | undefined;
}

export const TabsNavigation: React.FC<Props> = ({
  data,
  defaultTabValue,
  onClickTab,
  value,
}) => {
  return (
    <nav className="data-nav">
      {data.options.map((option) => (
        <NavLink
          to={option.path ?? '#'}
          className={value === option.value ? 'active-state' : ''}
          key={utilService.makeId()}
          onClick={
            onClickTab
              ? () => onClickTab({ [data.type]: option.value })
              : undefined
          }
        >
          <span>{option.title}</span>
        </NavLink>
      ))}
    </nav>
  );
};
