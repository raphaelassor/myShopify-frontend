import React, { ReactElement, ReactNode, useState } from 'react';
import { DataPreview } from './DataPreview';
import Checkbox from '@mui/material/Checkbox';
import { utilService } from '../services/utilService';
import { useSelection } from '../services/hooks/useSelection';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { Product } from '../pages/Products/types';
import { RootState } from '../store/store';
import { addOrRemoveFromArray } from '../services/utils/arrays';

export interface Row {
  [x: string]: ReactNode;
  id: string;
}

export interface Column {
  id: Omit<keyof Row, 'id'> & string;
  title: string;
}

interface Props {
  rows: Row[];
  type: string;
  columns: Column[];
  renderActionBar?: (selectedIds: string[]) => ReactElement;
}
export const TableWithActions: React.FC<Props> = ({
  rows,
  type,
  columns,
  renderActionBar,
}) => {
  // const dispatch = useDispatch();
  // const { systemSelectedData } = useSelector((state:RootState) => state.appModule);
  // const [selectedData, handleSelection, toggleSelection] = useSelection({
  //   ...systemSelectedData,
  // });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedCount = useRef(null);

  // useEffect(() => {
  // dispatch(setGlobalSelected(selectedData));
  // selectedCount.current = getMapItemCount(selectedData);
  // }, [selectedData]);

  // useEffect(() => {
  //   if (getMapItemCount(systemSelectedData) !== selectedCount.current) {
  //     selectedCount.current = 0;
  //     toggleSelection([]);
  //   }
  // }, [systemSelectedData]);

  // const getMapItemCount = (map) => {
  //   return Object.keys(map).length;
  // };

  // const checkIsSelected = (entity) => {
  //   return !!selectedData[entity.id];
  // };
  // const toggleSelectAll = () => {
  //   toggleSelection(data);
  // };

  const selectedModeClass = selectedIds.length ? 'selected-mode' : '';

  const ViewCheckBox = () => {
    return (
      <Checkbox
        className="select"
        checked={!!selectedIds.length}
        onChange={(ev, checked) =>
          setSelectedIds(checked ? rows.map(({ id }) => id) : [])
        }
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    );
  };
  return (
    <div className="data-view-actions">
      <div className={`data-actions-wrapper ${selectedModeClass}`}>
        <div className="flex btn-bar">
          <button className=" btn-md btn-neutral relative">
            <ViewCheckBox />
            <span>
              {' '}
              <span className="count">{selectedIds.length}</span> selected
            </span>
          </button>
        </div>
      </div>
      {renderActionBar && renderActionBar(selectedIds)}

      <div className="table-container">
        <table className={selectedModeClass}>
          <thead>
            <tr className="header">
              <th>
                <ViewCheckBox />
              </th>
              {columns.map(({ title }) => (
                <th key={utilService.makeId()}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="product-preview">
                <td>
                  {' '}
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onChange={() =>
                      setSelectedIds(addOrRemoveFromArray(selectedIds, row.id))
                    }
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </td>
                {columns.map((column) => (
                  <>
                    <td>{row[column.id]}</td>
                  </>
                ))}
              </tr>
            ))}
            {/* TODO:  make sure it is not loading and fix the styling  */}
            {!rows.length && (
              <tr>
                <td>No data to display...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
