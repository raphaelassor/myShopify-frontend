import { useSelector } from "react-redux"
import { TagsEditModal } from "./TagsEditModal"
import {SINGLE_SELECT_POPOVER, TAGS_EDIT_MODAL} from '../../services/settings'
import { SingleSelectPopover } from "./SingleSelectPopover"

export const DynamicDialog=()=>{
const {dialog}=useSelector(state=>state.appModule)

    switch(dialog.name){
        case TAGS_EDIT_MODAL:
            return <TagsEditModal {...dialog.props}/>
            case SINGLE_SELECT_POPOVER:
                return <SingleSelectPopover {...dialog.props}/>
            default : return ''
    }
} 