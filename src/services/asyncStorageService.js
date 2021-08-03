import { productService } from "./productService"
import { statusNames } from "./settings"
import { utilService } from "./utilService"


export const storageService = {
    query,
    get,
    post,
    put,
    putMany,
    remove,
    removeMany
}

function query(entityType) {
    let entities = JSON.parse(localStorage.getItem(entityType) || null) || []
    if (!entities || !entities.length)
        entities = _createEntities(entityType)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!entities) reject('could not find type in local storage create entities')
            _save(entityType, entities)
            resolve(entities)
        }, 500);
    })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function putMany(entityType, updatedEntities) {
    return query(entityType)
        .then(entities => {
            entities = entities.map(entity => updatedEntities[entity._id] || entity)
            _save(entityType, entities)
            return entities
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function removeMany(entityType, entityIds) {
    return query(entityType)
        .then(entities => {
            entities = entities.filter(entity => {
                return !entityIds.some(entityId => entityId === entity._id)
            })
            _save(entityType, entities)
        })
}



function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _createEntities(entityType) {
    switch (entityType) {
        case 'product': return _createDemoProducts()
        case 'shop': return _createDemoShop()
        // case 'order' : return _createDemoOrders()
        // case 'customer':return  _createDemoCustomers()
        default: return null
    }
}

function _createDemoProducts() {
    const products = []
    let product = null;
    for (let i = 0; i <= 20; i++) {
        product = productService.getEmptyProduct()
        product._id = utilService.makeId()
        product.title = 'Demo ' + utilService.getRandomInt()
        product.price = +((Math.random() * 100).toFixed(2))
        product.status = Math.random() < 0.3 ? statusNames.active : statusNames.active
        product.type = 'lorem ' + utilService.getRandomInt()
        product.vendor = 'lorem ' + utilService.getRandomInt()
        product.inventory = Math.floor(Math.random() * 10000)
        product.tags=['Luxury','to edit']
        products.push(product)
    }
    return products;
}

function _createDemoShop() {
    return [{
        _id:'DEMO_SHOP',
        domains: ['fressti.com'],
        title: 'Fressti',
        productTypes: ['Orgainze', 'Kitchen', 'Tabletop', 'Cutlery'],
        vendors: ['fressti.com', 'willimaseSonoma'],
        suppliers: [
            { id: utilService.makeId(), name: 'oberlo' },
            { id: utilService.makeId(), name: 'cjDropshipping' },
            { id: utilService.makeId(), name: 'aliBaba' },
        ],
        productTags:['on Sale', 'Luxury' , 'to edit', 'expensive', 'best Seller'],
        orderTags: ['delayed', 'requires attention','on-time','refunded'],
        customerTags: ['black-list','refund','reimburse','3rd complaint'],
    }]
}
