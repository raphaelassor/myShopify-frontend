import { useForm } from "../../services/hooks/customHooks"
import { FormSingleSelect } from "../FormSingleSelect"
import { BasePopover } from "./BasePopover"

export const SingleSelectPopover = ({ elPos, form, formItem, handleChange }) => {
    const [localForm, handleLocalChange] = useForm(form)

    const handleFormChange=(ev)=>{
        handleLocalChange(ev)
        handleChange(ev)
    }

    return <BasePopover elPos={elPos}>
        <FormSingleSelect formItem={formItem} form={localForm} handleChange={handleFormChange} />
    </BasePopover>

}