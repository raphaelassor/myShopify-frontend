import React, { useEffect, useState } from 'react';
import { useForm } from '../services/hooks/useForm';
import { Snippet } from './Snippet';
import { FilterDialog } from './FilterDialog';
import { utilService } from '../services/utilService';
import { useLocation } from 'react-router';
import { DataLoader } from './DataLoader';
import SearchIcon from '@mui/icons-material/Search';
import qs from 'qs';
import { Filters } from '../services/productService';
import { extractObjectFromAllowedFields } from '../services/utils/objects';
import { buildEmptyForm, handleInputChange } from '../services/utils/form';
import { DropdownOption } from './popover/types';
import { DropdownRadioSelect } from './popover/DropdownRadioSelect';
import { FormData } from './form/types';
import { isEmpty, isEqual } from 'lodash';
import { ChangeHandler } from '../services/types/helpers';

interface Props {
  filterOptions: FormData;
  onFilterChange: (filters: Filters) => void;
  sortOptions: DropdownOption[];
  displayLimit?: number;
  activeFilters: Filters;
}
export const DataFilter: React.FC<Props> = ({
  filterOptions,
  onFilterChange,
  sortOptions,
  displayLimit = 3,
  activeFilters,
}) => {
  const [isDialogOpen, setDialog] = useState(false);
  const [popoverId, setPopoverId] = useState('');

  const isFilterEmpty = Object.values(activeFilters).every(isEmpty);

  const resetFilter = (type = '') => {
    const valueToUpdate = !type
      ? buildEmptyForm(filterOptions)
      : { [type]: '' };
    onFilterChange(valueToUpdate);
  };

  const handleChange: ChangeHandler = (ev) =>
    onFilterChange(handleInputChange(ev));

  return (
    <>
      <div className="data-filter">
        <div className="flex filter-preview">
          {/* CREATE SEARCH CMP */}
          <div className="search-container flex">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              name="term"
              value={activeFilters.term ?? ''}
              onChange={handleChange}
            />
          </div>
          {/* TDOD: everything needs to be dynamic component based on form type, not single select */}
          <div className="flex btn-bar">
            {filterOptions.slice(0, displayLimit).map((item, index) => (
              <DropdownRadioSelect
                anchor={
                  <button
                    key={utilService.makeId()}
                    onClick={(ev) => setPopoverId(item.title)}
                    className={`btn-md btn-neutral ${
                      index ? '' : 'first-in-bar'
                    }`}
                  >
                    {item.title}
                  </button>
                }
                popoverProps={{ open: popoverId === item.title }}
                formProps={{
                  onChange: handleChange,
                  name: item.keyName,
                  options: item.options ?? [],
                  value: activeFilters[item.keyName] as string,
                  onClearAll: () => resetFilter(item.keyName),
                }}
              />
            ))}

            <button
              onClick={() => setDialog(true)}
              className="btn-md btn-neutral"
            >
              More Filters
            </button>

            <DropdownRadioSelect
              anchor={
                <button
                  onClick={(ev) => setPopoverId('sort')}
                  className="btn-md btn-neutral last-in-bar"
                >
                  Sort
                </button>
              }
              popoverProps={{ open: popoverId === 'sort' }}
              formProps={{
                onChange: handleChange,
                name: 'sort',
                options: sortOptions,
                value: '',
              }}
            />
          </div>
        </div>
        <DataLoader />
        <div className="filter-snippets">
          {filterOptions
            .filter((item) => !!activeFilters[item.keyName])
            .map((item) => {
              return (
                <Snippet onRemove={() => resetFilter(item.keyName)}>
                  {item.title} is {activeFilters[item.keyName]}
                </Snippet>
              );
            })}
        </div>
      </div>
      <FilterDialog
        filterOptions={filterOptions}
        filter={activeFilters}
        hide={() => setDialog(false)}
        isEmpty={isFilterEmpty}
        isOpen={isDialogOpen}
        resetFilter={resetFilter}
        handleChange={handleChange}
      />
    </>
  );
};
