import { storageService } from './asyncStorageService'
import { httpService } from './httpService'

export const shopService = {
    addTagsToEntities,
    removeTagsFromEntities,
    getShopById,

}

function addTagsToEntities(tagsToAdd, entities) {
    tagsToAdd.forEach(tag => {
        for (let id in entities) {
            const tagsInEntity = entities[id].tags
            if (!tagsInEntity.includes(tag)) tagsInEntity.push(tag)
        }
    })
}
function removeTagsFromEntities(tagsToRemove, entities) {
    tagsToRemove.forEach(tag => {
        for (let id in entities) {
            const tagsInEntity = entities[id].tags
            const idx= tagsInEntity.findIndex(tagInEntity=>tagInEntity===tag)
            if(idx!=-1) tagsInEntity.splice(idx,1)
        }
    })
}

async function getShopById(shopId) {
    try {
        // return await httpService.get(`product/${productId}`)
        return await storageService.get('shop', shopId)
    } catch (err) {
        throw err
    }
}

export function getEmptyShop() {
    return {
        domains: [],
        title: undefined,
        productTypes: [],
        vendors: [],
        suppliers: [{
            id: undefined,
            name: undefined,
        }],
        productTags: [String],
        orderTags:[String],
        customerTags:[String]
    }
}
