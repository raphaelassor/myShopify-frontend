import { FormData, FormInputType } from "../../cmps/form/types"


export const getInitialValueByType = (type: FormInputType) => {
    if (type === 'input' || type === 'dropdwonSingleSelect') return ''
    return []
}


export const buildEmptyForm = (options: FormData): Record<string, any> => {
    return options.reduce((acc: Record<string, string | Array<string | number>>, option) => {
        acc[option.keyName] = getInitialValueByType(option.inputType);
        return acc
    }, {})
}

export const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const field = ev.target.name
    const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
    return { [field]: value }
}