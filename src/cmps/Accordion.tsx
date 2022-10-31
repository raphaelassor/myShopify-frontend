import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { ReactElement, useState } from 'react';
import { addOrRemoveFromArray } from '../services/utils/arrays';
import { FormData } from './form/types';
import { Snippet } from './Snippet';

interface Props {
  tabs: FormData;
  currentData: Record<string, any>;
  renderBody: (item: FormData[number]) => ReactElement;
}
export const Accordion: React.FC<Props> = ({
  tabs,
  currentData,
  renderBody,
}) => {
  const [openTabIndexes, setOpenTabIndexs] = useState<number[]>([]);

  return (
    <>
      {tabs.map((item, idx) => {
        const isActive = openTabIndexes.includes(idx);
        const activeClassName = isActive ? 'active' : '';
        return (
          <>
            <div
              className={`filter-type ${activeClassName}`}
              onClick={() =>
                setOpenTabIndexs(addOrRemoveFromArray(openTabIndexes, idx))
              }
            >
              <div className="flex justify-space-between align-center">
                <span>{item.title}</span>
                <span>
                  <ExpandMoreIcon />
                </span>
              </div>
              {currentData[item.keyName] && !isActive && (
                <Snippet handleChange={() => {}}>
                  {item.title} is {currentData[item.keyName]}
                </Snippet>
              )}
            </div>
            <div className={`options ${activeClassName}`}>
              {renderBody(item)}
            </div>
          </>
        );
      })}
    </>
  );
};
