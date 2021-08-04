import IconClose from '@material-ui/icons/Clear';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useEffect, useState } from 'react';
import { useForm } from '../services/hooks/customHooks';

export const DataFilter = ({ data }) => {
    const [filterClass, setFilterClass] = useState('')
    const [expandedIdx, setFilterOption] = useState(-1)
    const [filter, handleChange] = useForm(buildFilterFromData())

    const ExpandContract = ({ optionIdx }) => {
        return expandedIdx === optionIdx ? <ExpandLessIcon /> : <ExpandMoreIcon />
    }
    const handleClick = (idx) => {
        expandedIdx === idx ? setFilterOption(-1) : setFilterOption(idx)
    }
    function buildFilterFromData(){
        const filter = data.reduce((acc, filterOption) => {
            acc[filterOption.type] = ''
            return acc
        }, {})
        return filter
    }

    return <> <div className="data-filter flex justify-space-between">
        <input type="text" placeholder="i am a filter " />
        <div className="flex filter-preview">
            <div className="flex btn-bar">
                <button className="btn-md btn-neutral">Product Vendor</button>
                <button className="btn-md btn-neutral">Tagged With</button>
                <button className="btn-md btn-neutral">Status</button>
                <button onClick={() => setFilterClass('expand')} className="btn-md btn-neutral">More Filters</button>
            </div>
            <button className="btn-md btn-neutral"> Sort</button>
        </div>
    </div>
        <div className={`more-filters ${filterClass}`}>
            <h2 className="flex justify-space-between">More Filters <span onClick={()=>setFilterClass('')}><IconClose /></span></h2>
            <hr />
            {data.map((item, idx) => {
                return <>
                    <div onClick={() => handleClick(idx)}>
                        <h4>{item.title}</h4>
                        <span><ExpandContract optionIdx={idx} /></span>
                    </div>
                    {expandedIdx === idx && <div className="options">
                        <RadioGroup name={item.type} value={filter[item.type]} onChange={handleChange}>
                            {item.options.map(option => {
                                return <FormControlLabel value={option} control={<Radio />} label={option} />
                            })}
                        </RadioGroup>
                    </div>}
                </>
            })}
        </div>
    </>
} 