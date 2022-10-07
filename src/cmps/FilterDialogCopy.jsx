import IconClose from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../services/hooks/customHooks';
import { updateCriteria } from '../store/actions/appActions';
import { Accordion } from './Accordion'

export const FilterDialogCopy = ({ filter, resetFilter,filterOptions,handleChange, isEmpty }) => {
    const UNSET_IDX = -1;
    const dispatch=useDispatch()
    const [selectedItem, setAccordionItem] = useState(UNSET_IDX)
    // const {globalCriteria}=useSelector(state=>state.appModule)
    const [localFilter,handleChange]=useForm(filter,fields=>dispatch(updateCriteria(fields)))

    useEffect(() => {
        if (!isOpen) setAccordionItem(UNSET_IDX)
    }, [isOpen])

    const onItemSelect = (idx) => {
        const selectedIdx = selectedItem === idx ? UNSET_IDX : idx
        setAccordionItem(selectedIdx)
    }
    const resetFilter=()=>{

    }

    const expandClass = isOpen ? 'expand' : ''
    return <>
        <div onClick={hide} className={`overlay ${expandClass}`}></div>
        <div className={`more-filters ${expandClass}`}>
            <h2 className="flex justify-space-between">More Filters <span onClick={hide}><IconClose /></span></h2>
            <hr />
            <div className="body">
                <Accordion data={filterOptions} filter={filter} onSelect={onItemSelect} 
                handleChange={handleChange} selectedItem={selectedItem} />
            </div>
            <hr />
            <div className="flex justify-space-between footer">
                <button className='btn-md btn-neutral' onClick={(ev) => resetFilter()}
                    disabled={isEmpty}>Clear all filters</button>
                <button className="btn-md btn-primary" onClick={hide}>Done</button>
            </div>
        </div>
    </>
}