 
import Checkbox from '@mui/material/Checkbox';
import { utilService } from '../services/utilService';

export const TagsSelectionList = ({ tagsToShow, selectedTags, handleChange }) => {

    return <div className="tags-selection-list">
        {tagsToShow.length ?
            tagsToShow.map(tag => {
                return <div key={utilService.makeId()}>
                    <Checkbox checked={selectedTags.includes(tag)}
                        onChange={() => handleChange(tag)} />
                    <span>{tag}</span>
                </div>
            })
            :
            <div>No Tags Found</div>
        }
    </div>
}