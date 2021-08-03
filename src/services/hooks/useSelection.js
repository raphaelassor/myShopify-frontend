import { useState } from 'react'
export const useSelection = (initialState = []) => {
    const [selectedData, setSelected] = useState(initialState)

    const isStateArr = Array.isArray(initialState) ? true : false
    if (!isStateArr && !typeof initialState === 'object') {
        throw Error('Type invalid for selection hook.Oject or array only')
    }
    const handleSelection = (entity) => {
        if (!isStateArr) handleSelectionObj(entity)
        else handleSelectionArr(entity)
    }
    const toggleSelectAll = (data) => {
        if (!isStateArr) handleToggleAllObj(data)
        else (handleToggleAllArr(data))

    }
    const handleSelectionObj = (entity) => {
        if (selectedData[entity._id]) delete selectedData[entity._id]
        else selectedData[entity._id] = entity
        setSelected({ ...selectedData })
    }
    const handleSelectionArr = (entity) => {
        if (typeof entity === 'string' || typeof entity === 'number' || typeof entity === 'boolean') {
            const idx = selectedData.findIndex(data => data === entity)
            if (idx === -1) selectedData.push(entity)
            else selectedData.splice(idx, 1)
            setSelected([...selectedData])
        }
    }
    const handleToggleAllArr = (data) => {
        if (selectedData.length === data.length) setSelected([])
        else {
            data.forEach(entity => {
                if (!selectedData.includes(entity)) selectedData.push(entity)
            })
            setSelected([...selectedData])
        }
    }
    const handleToggleAllObj = (data) => {
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