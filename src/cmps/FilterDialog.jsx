import IconClose from '@material-ui/icons/Clear';
import { useEffect, useState } from 'react';
import { Accordion } from './Accordion'

export const FilterDialog = ({ filter, isOpen, hide, resetFilter, data, handleChange, isEmpty }) => {
    const UNSET_IDX = -1;
    const [selectedItem, setAccordionItem] = useState(UNSET_IDX)

    useEffect(() => {
        if (!isOpen) setAccordionItem(UNSET_IDX)
    }, [isOpen])

    const onItemSelect = (idx) => {
        const selectedIdx = selectedItem === idx ? UNSET_IDX : idx
        setAccordionItem(selectedIdx)
    }

    const expandClass = isOpen ? 'expand' : ''
    return <>
        <div onClick={hide} className={`overlay ${expandClass}`}></div>
        <div className={`more-filters ${expandClass}`}>
            <h2 className="flex justify-space-between">More Filters <span onClick={hide}><IconClose /></span></h2>
            <hr />
            <div className="body">
                <Accordion data={data} filter={filter} onSelect={onItemSelect} 
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