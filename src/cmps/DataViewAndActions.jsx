import { DataPreview } from "./DataPreview"
import Checkbox from '@material-ui/core/Checkbox';
import { DataActions } from "./DataActions";
import { utilService } from "../services/utilService";
import { useSelection } from '../services/hooks/useSelection'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSelected } from "../store/actions/appActions";
import { useRef } from "react";
export const DataViewAndActions = ({ data, type, viewLayout }) => {
    const dispatch = useDispatch()
    const { systemSelectedData } = useSelector(state => state.appModule)
    const [selectedData, handleSelection, toggleSelection] = useSelection({ ...systemSelectedData })
    const selectedCount = useRef(null)

    useEffect(() => {
        dispatch(setGlobalSelected(selectedData))
        selectedCount.current = getMapItemCount(selectedData)
    }, [selectedData])

    useEffect(() => {
        if (getMapItemCount(systemSelectedData) !== selectedCount.current) {
            selectedCount.current = 0
            toggleSelection([])
        }
    }, [systemSelectedData])

    const getMapItemCount = (map) => {
        return Object.keys(map).length
    }

    const checkIsSelected = (entity) => {
        return !!selectedData[entity._id]
    }
    const toggleSelectAll = () => {
        toggleSelection(data)
    }
    const selectedModeClass = selectedCount.current ? 'selected-mode' : ''

    const ViewCheckBox = () => {
        return <Checkbox className="select" checked={!!selectedCount.current}
            onChange={toggleSelectAll} inputProps={{ 'aria-label': 'secondary checkbox' }} />
    }
    return (<div className="data-view-actions">
        <div className={`data-actions-wrapper ${selectedModeClass}`} >
            <div className="flex btn-bar">
                <button className=" btn-md btn-neutral relative">
                    <ViewCheckBox />
                    <span> <span className="count">{selectedCount.current}</span> selected</span>
                </button>
                <DataActions type={type} data={systemSelectedData} />
            </div>
        </div>

        <div className="table-container">
            <table className={selectedModeClass}>
                <thead >
                    <tr className="header">
                        <th><ViewCheckBox /></th>
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
    </div>
    )
}