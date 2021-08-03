import { useMemo } from 'react'
import { useForm } from '../../services/hooks/customHooks'
import { useSelection } from '../../services/hooks/useSelection'
import { ADD_TAGS_MODE } from '../../services/settings'
import { utilService } from '../../services/utilService'
import { TagPreview } from '../TagPreview'
import { BaseModal } from './BaseModal'

export const TagsEditModal = ({ mode, updateTags, tags }) => {
    const [form, handleChange] = useForm({ tagName: '' })
    const [selectedTags, handleSelection] = useSelection([])

    const filteredTags = useMemo(() => {
        const regex = new RegExp(form.tagName, 'i')
        return tags.filter(tag => regex.test(tag) && !selectedTags.includes(tag))
    }, [tags, form.tagName, selectedTags])

    const isAdd = mode === ADD_TAGS_MODE
    const actionType = isAdd ? 'Add' : 'Remove'

    const Header = () => {
        return <h4>{actionType} Tags</h4>
    }

    const Footer = () => {
        return <button onClick={() => updateTags(selectedTags)}
            className={`btn-md ${isAdd ? 'btn-primary' : 'btn-danger'}`} >
            {actionType}</button>
    }

    return <BaseModal Header={Header} Footer={Footer} isCentered={true} show={true}>
        <div className="tags-edit-modal">
            <div className="search-container flex column">
                {!!selectedTags.length && <div>
                    {selectedTags.map(tag => <TagPreview tag={tag} handleChange={handleSelection} remove={true} key ={utilService.makeId()}/>)}
                </div>}
                <input type="text" name="tagName" value={form.tagName} onChange={handleChange} />
            </div>
            <hr />
            <div className="tags-pool">
                <h3>EXISTING TAGS</h3>
                {filteredTags.map(tag => <TagPreview tag={tag} handleChange={handleSelection} key ={utilService.makeId()} />)}
            </div>
        </div>
    </BaseModal>



}