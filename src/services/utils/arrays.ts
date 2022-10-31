
export const addOrRemoveFromArray = (array: any[], item: any, compareFunc?: (itemFromArray: any, itemToCompare: any) => boolean) => {
    const updatedArray = [...array]
    const itemIndex = updatedArray.findIndex(itemInArray => {
        if (compareFunc) return compareFunc(itemInArray, item)
        return itemInArray === item
    })
    if (itemIndex === -1) return [...updatedArray, item]
    updatedArray.splice(itemIndex)
    return updatedArray
}

