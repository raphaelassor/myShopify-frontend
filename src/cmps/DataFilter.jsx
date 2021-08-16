
import { useEffect, useState } from 'react';
import { useForm } from '../services/hooks/customHooks';
import { Snippet } from './Snippet';
import { FilterDialog } from './FilterDialog'
import { utilService } from '../services/utilService';
import { useDispatch } from 'react-redux';
import { openDialog } from '../store/actions/appActions';
import { SINGLE_SELECT_POPOVER } from '../services/settings';
import { useHistory, useLocation } from 'react-router';
import { DataLoader } from './DataLoader';
import SearchIcon from '@material-ui/icons/Search';
import queryString from 'query-string'
import { FilterSnippets } from './FilterSnippets';

export const DataFilter = ({ filterData, cbAfterFilter, sortData }) => {

    const dispatch = useDispatch()
    const [isDialogOpen, setDialog] = useState(false)
    const [filter, handleChange, setFilter, isFilterEmpty] = useForm(buildEmptyFilter(), cbAfterFilter)
    const location = useLocation()
    useEffect(() => {
        updateFilterToParams()
    }, [location])

    const updateFilterToParams = () => {
        const filterQuery = queryString.parse(location.search)
        if (filterQuery.status === 'all') filterQuery.status = ''
        setFilter(prevFields => ({ ...prevFields, ...filterQuery }))
    }

    const resetFilter = (type = undefined) => {
        !type ? setFilter(buildEmptyFilter()) :
            setFilter(prevFields => ({ ...prevFields, [type]: '' }))
    }

    const closeDialog = () => {
        setDialog(false)
    }

    const onOpenPopover = (ev, filterItem) => {
        const props = {
            handleChange,
            form: filter,
            formItem: filterItem,
            elPos: ev.target.getBoundingClientRect()
        }
        dispatch(openDialog(SINGLE_SELECT_POPOVER, props))
    }

    function buildEmptyFilter() {
        const emptyFilter = filterData.reduce((acc, filterOption) => {
            acc[filterOption.type] = ''
            return acc
        }, {})
        return emptyFilter
    }

    return <>
        <div className="data-filter">
            <div className="flex filter-preview">
                <div className="search-container flex">
                    <SearchIcon />
                    <input type="text" placeholder="Search..." name="term" value={filter.term || ''} onChange={handleChange} />
                </div>
                <div className="flex btn-bar">
                    {filterData.slice(0, 3).map(item => {
                        return <button key={utilService.makeId()} onClick={(ev) => onOpenPopover(ev, item)}
                            className="btn-md btn-neutral">{item.typeTitle}</button>
                    })}
                    <button onClick={() => setDialog(true)}
                        className="btn-md btn-neutral">More Filters</button>
                </div>
                <button onClick={(ev) => onOpenPopover(ev, sortData)} className="btn-md btn-neutral"> Sort</button>
            </div>
            <DataLoader />
            <FilterSnippets filterData={filterData} filter={filter} resetFilter={resetFilter} />
        </div>
        <FilterDialog data={filterData} filter={filter} hide={closeDialog} isEmpty={isFilterEmpty}
            isOpen={isDialogOpen} resetFilter={resetFilter} handleChange={handleChange} />
    </>
} 