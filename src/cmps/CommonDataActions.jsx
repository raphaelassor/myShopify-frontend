import { useDispatch } from "react-redux"
import { ADD_TAGS_MODE, REMOVE_TAGS_MODE,TAGS_EDIT_MODAL } from "../services/settings"
import { openModal } from "../store/actions/appActions"

export const CommonDataActions = ({tags,remove,addTags,removeTags}) => {

    const dispatch=useDispatch()

    const openTagsModal = (mode) => { 
        const props = mode === REMOVE_TAGS_MODE ?
            createPropsForTagsModal(addTags, REMOVE_TAGS_MODE) :
            createPropsForTagsModal(removeTags, ADD_TAGS_MODE)
        dispatch(openModal(TAGS_EDIT_MODAL, props))
    }
    const createPropsForTagsModal = (cb, mode) => {
        const props = {
            updateTags(tagsToUpdate) {
                cb(tagsToUpdate)
            },
            mode,
            tags
        }
        return props
    }

    return <>
        <button onClick={() => openTagsModal(ADD_TAGS_MODE)} className="btn-md btn-neutral">Add Tags </button>
        <button onClick={() => openTagsModal(REMOVE_TAGS_MODE)} className="btn-md btn-neutral">Remove Tags </button>
        <button onClick={remove} className="btn-md btn-neutral">Delete</button>
    </>
}