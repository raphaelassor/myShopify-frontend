import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { utilService } from '../services/utilService';
import { FormSingleSelect } from './FormSingleSelect';

import { Snippet } from './Snippet';
export const Accordion = ({ data, onSelect, selectedItem, handleChange, filter }) => {
    return <>
        {data.map((item, idx) => {
            const activeClass = idx === selectedItem ? 'active' : ''
            return <>
                <div className={`filter-type ${activeClass}`} onClick={() => onSelect(idx)} >
                    <div className="flex justify-space-between align-center">
                        <span>{item.title}</span>
                        <span><ExpandMoreIcon /></span>
                    </div>
                    {filter[item.type] && !activeClass &&
                        <Snippet handleChange={() => { }}>
                            {item.title} is {filter[item.type]}
                        </Snippet>}
                </div>
                <div className={`options ${activeClass}`}>
                    <FormSingleSelect handleChange={handleChange} form={filter} item={item} />
                </div>
                </>
            
})}
    </>
}