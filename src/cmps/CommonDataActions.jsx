import { useDispatch } from "react-redux"
import { ADD_TAGS_MODE, REMOVE_TAGS_MODE,TAGS_EDIT_MODAL } from "../services/settings"
import { closeDialog, openDialog } from "../store/actions/appActions"

export const CommonDataActions = ({tags,remove,entitiesMap,update}) => {

    const dispatch=useDispatch()
    const addTags = (tagsToAdd) => {
        //VERIFY ALL TAGS EXIST IN SHOPS. IF NOT - ADD AND PATCH SHOP
        // shopService.addTagsToEntities(tagsToAdd, products)
        // dispatchUpdate()
        // dispatch(closeDialog())
        patchTags(tagsToAdd,'add')
    }

    const removeTags = (tagsToRemove) => {
        patchTags(tagsToRemove,'remove')
    }

    const patchTags=(tags,action)=>{
        const patch={
            ids:Object.keys(entitiesMap),
            field:'tags',
            val:tags,
            action
        }
        update(patch)
        dispatch(closeDialog())
    }

    const openTagsModal = (mode) => { 
        const props = mode === REMOVE_TAGS_MODE ?
            createProps(REMOVE_TAGS_MODE,removeTags) :
            createProps(ADD_TAGS_MODE,addTags)
        dispatch(openDialog(TAGS_EDIT_MODAL, props))
    }

    const createProps = (mode, cb) => {
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