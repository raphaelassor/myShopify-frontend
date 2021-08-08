
import { useEffect, useState } from 'react';
import { useForm } from '../services/hooks/customHooks';
import { Snippet } from './Snippet';
import { FilterDialog } from './FilterDialog'
import { utilService } from '../services/utilService';
import { useDispatch } from 'react-redux';
import { openDialog } from '../store/actions/appActions';
import { SINGLE_SELECT_POPOVER } from '../services/settings';
import { useLocation } from 'react-router';
import { DataLoader } from './DataLoader';
import SearchIcon from '@material-ui/icons/Search';

export const DataFilter = ({ data, cbAfterFilter }) => {
    const dispatch = useDispatch()
    const [isDialogOpen, setDialog] = useState(false)
    const [filter, handleChange, setFilter, isFilterEmpty] = useForm(buildEmptyFilter(), cbAfterFilter)
    const location = useLocation()
    useEffect(() => {
        updateFilterToParams()
    }, [location])

    const updateFilterToParams = () => {
        if (location.search) {
            const params = new URLSearchParams(location.search)
            for (let param of params) {
                const key = param[0]
                const val = param[1]
                if (filter.hasOwnProperty(key)) {
                    if (param[1] === 'all') resetFilter(key)
                    else setFilter(prevFields => ({ ...prevFields, [key]: val }))
                }
                break
            }
        }
    }
    const resetFilter = (type = undefined) => {
        !type ? setFilter(buildEmptyFilter()) :
            setFilter(prevFields => ({ ...prevFields, [type]: '' }))
    }
    const closeDialog = () => {
        setDialog(false)
    }
    const onOpenPopover = (ev, item) => {
        const props = {
            handleChange,
            form: filter,
            item,
            elPos: ev.target.getBoundingClientRect()
        }
        dispatch(openDialog(SINGLE_SELECT_POPOVER, props))
    }

    function buildEmptyFilter() {
        const emptyFilter = data.reduce((acc, filterOption) => {
            acc[filterOption.type] = ''
            return acc
        }, {})
        return emptyFilter
    }

    return <>
    <div className="data-filter">
        <div className="flex filter-preview">
            <div className="search-container flex">
            <SearchIcon/>
            <input type="text" placeholder="Search..." name="term" value={filter.term||''} onChange={handleChange} />
            </div>
            <div className="flex btn-bar">
                {data.slice(0, 3).map(item => {
                    return <button key={utilService.makeId()} onClick={(ev) => onOpenPopover(ev, item)}
                        className="btn-md btn-neutral">{item.title}</button>
                })}
                <button onClick={() => setDialog(true)}
                    className={`btn-md btn-neutral ${!isFilterEmpty ? 'active' : ''}`}>More Filters</button>
            </div>
            <button className="btn-md btn-neutral"> Sort</button>
        </div>
        <DataLoader />
        <div className="filter-snippets">
            {!isFilterEmpty &&
                data.filter(item => !!filter[item.type])
                    .map(item => {
                        return <Snippet handleChange={() => resetFilter(item.type)} remove={true}>
                            {item.title} is {filter[item.type]}</Snippet>
                    })}
        </div>
    </div>
        <FilterDialog data={data} filter={filter} hide={closeDialog} isEmpty={isFilterEmpty}
            isOpen={isDialogOpen} resetFilter={resetFilter} handleChange={handleChange} />
    </>
} 