import { useSelector } from "react-redux"
import { TagsEditModal } from "./TagsEditModal"
import {TAGS_EDIT_MODAL} from '../../services/settings'

export const DynamicModal=()=>{
const {modal}=useSelector(state=>state.appModule)

    switch(modal.name){
        case TAGS_EDIT_MODAL:
            return <TagsEditModal {...modal.props}/>
            default : return ''
    }
} 