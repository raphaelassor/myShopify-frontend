// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormSingleSelect } from './FormSingleSelect';

import { Snippet } from './Snippet';
export const Accordion = ({
  data,
  onSelect,
  selectedItem,
  handleChange,
  filter,
}) => {
  return (
    <>
      {data.map((item, idx) => {
        const activeClass = idx === selectedItem ? 'active' : '';
        return (
          <>
            <div
              className={`filter-type ${activeClass}`}
              onClick={() => onSelect(idx)}
            >
              <div className="flex justify-space-between align-center">
                <span>{item.typeTitle}</span>
                {/* <span><ExpandMoreIcon /></span> */}
              </div>
              {filter[item.type] && !activeClass && (
                <Snippet handleChange={() => {}}>
                  {item.typeTitle} is {filter[item.type]}
                </Snippet>
              )}
            </div>
            <div className={`options ${activeClass}`}>
              <FormSingleSelect
                handleChange={handleChange}
                form={filter}
                formItem={item}
              />
            </div>
          </>
        );
      })}
    </>
  );
};
