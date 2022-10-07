import { useLayoutEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { utilService } from '../services/utilService';

export const DataNav = ({ baseUrl, data }) => {
  const [selectedParam, setSelected] = useState('');
  const location = useLocation();
  useLayoutEffect(() => {
    const param = getParamFromQuery();
    setSelected(param);
  }, [location]);

  const getParamFromQuery = () => {
    // TODO: WTF???
    const startIdx = location.search.indexOf('=');
    if (startIdx === -1) return '';
    const queryParam = location.search.substring(startIdx + 1);
    return queryParam;
  };

  return (
    <nav className="data-nav">
      {/* TODO:  BASE URL IS SHIT  */}
      <NavLink
        exact={true}
        to={`/${baseUrl}?${data.type}=all`}
        activeClassName={selectedParam === 'all' ? 'active' : ''}
      >
        <span>All</span>{' '}
      </NavLink>
      {data.options.map((option) => {
        return (
          <NavLink
            exact={true}
            to={`/${baseUrl}?${data.type}=${option}`}
            activeClassName={selectedParam === option ? 'active' : ''}
            key={utilService.makeId()}
          >
            <span>{option}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
