import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { utilService } from '../services/utilService';
export const FormSingleSelect = ({ item, form, handleChange }) => {

    return <div className="form-selection">

        <RadioGroup name={item.type} value={form[item.type]} onChange={handleChange}>
            {item.options.map(option => {
                return <FormControlLabel value={option} control={<Radio />} label={option} />
            })}
            <FormControlLabel className={`clear ${form[item.type] ? 'active' : ''}`}
                value={''} control={<Radio />} label={'Clear'} />
        </RadioGroup>
    </div>


}