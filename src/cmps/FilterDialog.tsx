import React from 'react';
import IconClose from '@mui/icons-material/Clear';
import { Accordion } from './Accordion';
import { FormData } from './form/types';
import { ChangeHandler } from '../services/types/helpers';
import { RadioSelectForm } from './form/RadioSelectForm';

// TODO:  FilterPanel
// TODO: resetFilterField and resetAllFilters props.
// TODO: change hide to close

interface Props {
  filter: Record<string, any>;
  isOpen: boolean;
  hide: () => void;
  resetFilter: (keyName?: string) => void;
  filterOptions: FormData;
  handleChange: ChangeHandler;
  isEmpty: boolean;
}
export const FilterDialog: React.FC<Props> = ({
  filter,
  isOpen,
  hide,
  resetFilter,
  filterOptions,
  handleChange,
  isEmpty,
}) => {
  const expandClass = isOpen ? 'expand' : '';
  return (
    <>
      <div onClick={hide} className={`overlay ${expandClass}`}></div>
      <div className={`more-filters ${expandClass}`}>
        <h2 className="flex justify-space-between">
          More Filters
          <span onClick={hide}>
            <IconClose />
          </span>
        </h2>
        <hr />
        <div className="body">
          <Accordion
            tabs={filterOptions}
            currentData={filter}
            renderBody={(item) => (
              //TODO: NEEDS TO MOVE TO DYNAMIC COMPONENT BASED ON THE TYPE - NOT EVERYTHING WILL BE OR SHOULD BE RADIO
              <RadioSelectForm
                name={item.keyName}
                value={filter[item.keyName]}
                options={item.options ?? []}
                onClearAll={() => resetFilter(item.keyName)}
                onChange={handleChange}
              />
            )}
          />
        </div>
        <hr />
        <div className="flex justify-space-between footer">
          <button
            className="btn-md btn-neutral"
            onClick={(ev) => resetFilter()}
            disabled={isEmpty}
          >
            Clear all filters
          </button>
          <button className="btn-md btn-primary" onClick={hide}>
            Done
          </button>
        </div>
      </div>
    </>
  );
};
