import { DataPreview } from "./DataPreview"
import Checkbox from '@material-ui/core/Checkbox';
import { DataActions } from "../cmps/DataActions";
import { useState } from "react";
import { utilService } from "../services/utilService";
import { useSelection } from "../hooks/useSelection";
export const DataView = ({ data, type, viewLayout }) => {

    const [selectedDataMap, handleSelection, toggleSelection] = useSelection({})
    const selectedCount = Object.keys(selectedDataMap).length

    const checkIsSelected = (entity) => {
        return !!selectedDataMap[entity._id]
    }
    const toggleSelectAll = () => {
        toggleSelection(data)
    }
    const selectedModeClass = selectedCount ? 'selected-mode' : ''
    
    const Selector = () => {
        return <Checkbox className="select" checked={!!selectedCount}
         onChange={toggleSelectAll} inputProps={{ 'aria-label': 'secondary checkbox' }} />
    }
    return (<>

        <div className={`data-actions-wrapper ${selectedModeClass}`} >
            <div className="flex btn-bar">
            <button className=" btn-md btn-neutral relative">
                <Selector/>
                <span> <span className="count">{selectedCount}</span> selected</span>
            </button>
            <DataActions type={type} selectedData={selectedDataMap} />
            </div>
        </div>

        <div className="table-container">
            <table className={selectedModeClass}>
                <thead >
                    <tr>
                        <th><Selector/></th>
                        {viewLayout.map(title => <th key={utilService.makeId()}>{title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(dataEntity => {
                        return <DataPreview entity={dataEntity} type={type} key={dataEntity._id}
                            isSelected={checkIsSelected(dataEntity)} handleChange={() => handleSelection(dataEntity)} />
                    })}
                </tbody>
            </table>
        </div>
    </>
    )
}