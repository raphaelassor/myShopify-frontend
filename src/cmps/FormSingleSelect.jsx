import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { utilService } from '../services/utilService';

// TODO: BAD STYLING
export const FormSingleSelect = ({ formItem, form, handleChange }) => {
  if (!formItem) return <span>''</span>;
  const getTitle = (idx) => {
    const { titles, options } = formItem;
    if (titles && titles[idx]) return titles[idx];
    else return options[idx];
  };

  return (
    <div className="form-selection">
      <RadioGroup
        name={formItem?.type}
        value={form[formItem?.type] || ''}
        onChange={handleChange}
      >
        {formItem.options.map((option, idx) => {
          return (
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={getTitle(idx)}
            />
          );
        })}
        <FormControlLabel
          className={`clear ${form[formItem.type] ? 'active' : ''}`}
          value={''}
          control={<Radio />}
          label={'Clear'}
        />
      </RadioGroup>
    </div>
  );
};
