import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { utilService } from '../services/utilService';
export const FormSingleSelect = ({ formItem, form, handleChange }) => {
    
    if(!formItem) return <span>''</span>
    const getTitle=(idx)=>{
        const {titles,options}=formItem
        if(titles&&titles[idx]) return titles[idx]
        else return options[idx]
 
    }

    return <div className="form-selection">

        <RadioGroup name={formItem?.type} value={form[formItem?.type]||''} 
        onChange={handleChange}>
            {formItem.options.map((option,idx) => {
                return <FormControlLabel value={option} control={<Radio />} label={getTitle(idx)} />
            })}
            <FormControlLabel className={`clear ${form[formItem.type] ? 'active' : ''}`}
                value={''} control={<Radio />} label={'Clear'} />
        </RadioGroup>
    </div>


}