import { useState } from 'react'
export const useSelection = (initialState = {}) => {
    const [selectedData, setSelected] = useState(initialState)
    const handleSelection = (entity) => {
        if (selectedData[entity._id]) delete selectedData[entity._id]
        else selectedData[entity._id] = entity
        setSelected({ ...selectedData })
    }
    const toggleSelectAll = (data) => {
        const selectedCount = Object.keys(selectedData).length
        if (selectedCount >= data.length) setSelected({})
        else {
            data.forEach(entity => {
                if (!selectedData[entity._id]) selectedData[entity._id] = entity
            })
            setSelected({ ...selectedData })
        }
    }

    return [
        selectedData,
        handleSelection,
        toggleSelectAll
    ]
}