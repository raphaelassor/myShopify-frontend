import { useDispatch } from "react-redux"
import { ADD_TAGS_MODE, REMOVE_TAGS_MODE,TAGS_EDIT_MODAL } from "../services/settings"
import { openModal } from "../store/actions/appActions"

export const CommonDataActions = ({tags,remove,addTags,removeTags}) => {

    const dispatch=useDispatch()

    const openEditTagsModal = (mode) => { 
        const props = mode === REMOVE_TAGS_MODE ?
            createPropsForTagsModal(addTags, REMOVE_TAGS_MODE) :
            createPropsForTagsModal(removeTags, ADD_TAGS_MODE)
        dispatch(openModal(TAGS_EDIT_MODAL, props))
    }
    const createPropsForTagsModal = (funcToCall, mode) => {
        const props = {
            updateTags(tagsToUpdate) {
                funcToCall(tagsToUpdate)
            },
            mode,
            tags
        }
        return props
    }

    return <>
        <button onClick={() => openEditTagsModal(ADD_TAGS_MODE)} className="btn-md btn-neutral">Add Tags </button>
        <button onClick={() => openEditTagsModal(REMOVE_TAGS_MODE)} className="btn-md btn-neutral">Remove Tags </button>
        <button onClick={remove} className="btn-md btn-neutral">Delete</button>
    </>
}