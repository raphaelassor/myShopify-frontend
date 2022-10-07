import { productService } from "./productService"
import { statusNames } from "./settings"
import { utilService } from "./utilService"
import { isEmpty, isArray } from 'lodash'
import { Shop } from "./types"
import { Product } from "./models/product"

type EntityType = 'products' | 'orders' | 'customers' | 'shop'

type ResultByType<T> = T extends 'products' ? Product[] : any[]
export const storageService = {
    queryAsDB,
    getById,
    post,
    put,
    putMany,
    remove,
    removeMany
}


async function queryAsDB<T extends EntityType>(entityType: T): Promise<ResultByType<T>> {
    const entities = getEntitiesByType(entityType)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            saveToLocal(entityType, entities)
            resolve(entities)
        }, 500);
    })
}


async function getById(entityType: EntityType, entityId: string) {
    return queryAsDB(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType: 'products', newEntity: Omit<Product, 'id'>): Promise<void>;
async function post(entityType: EntityType, newEntity: any) {
    newEntity._id = _makeId()
    return queryAsDB(entityType)
        .then(entities => {
            entities.push(newEntity)
            saveToLocal(entityType, entities)
        })
}



async function put(entityType: EntityType, updatedEntity: Product) {
    return queryAsDB(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity.id)
            entities.splice(idx, 1, updatedEntity)
            saveToLocal(entityType, entities)
            return updatedEntity
        })
}

async function putMany(entityType: EntityType, entitiesToUpdate: any[]) {
    return queryAsDB(entityType)
        .then(entities => {
            if (isArray(entities)) {
                //@ts-ignore
                const updatedEntities = entities.map(entity => entitiesToUpdate[entity.id] || entity)
                saveToLocal(entityType, updatedEntities)
            }
            return entities
        })
}


async function remove(entityType: EntityType, entityId: string) {
    return queryAsDB(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            saveToLocal(entityType, entities)
        })
}

async function removeMany(entityType: EntityType, entityIds: string[]) {
    return queryAsDB(entityType)
        .then(entities => {
            entities = entities.filter(entity => {
                return !entityIds.some(entityId => entityId === entity._id)
            })
            saveToLocal(entityType, entities)
        })
}



function saveToLocal(entityType: EntityType, entities: Product[]) {
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

function getEntitiesByType(entityType: EntityType) {
    const entities = JSON.parse(localStorage.getItem(entityType) || '')
    if (isEmpty(entities)) {
        return _createEntities(entityType)
    }
    return entities
}

function _createEntities(entityType: EntityType) {
    switch (entityType) {
        case 'products': return _createDemoProducts()
        case 'shop': return _createDemoShop()
        // case 'order' : return _createDemoOrders()
        // case 'customer':return  _createDemoCustomers()
        default: return null
    }
}

function _createDemoProducts() {
    const products = []
    const getDemoProduct = (): Product => ({
        id: utilService.makeId(),
        title: 'Demo ' + utilService.getRandomInt(),
        price: +((Math.random() * 100).toFixed(2)),
        status: Math.random() < 0.3 ? 'active' : 'archive',
        type: 'lorem ' + utilService.getRandomInt(),
        vendor: 'lorem ' + utilService.getRandomInt(),
        inventory: Math.floor(Math.random() * 10000),
        tags: [{ id: '123s', title: 'Luxury' }, { id: '12sad', title: 'to edit' }],
        comparePrice: 74,
        description: 'DEMO DESCRIPTION',
        cost: 0,
        sku: 'sdsdsd',
        imgUrls: ['URL'],
        suppliers: ['amazon'],
        weight: {
            value: 39,
            unit: 'oz'
        },
        origin: 'CN'
    })
    for (let i = 0; i <= 20; i++) {
        products.push(getDemoProduct())
    }
    return products;
}

function _createDemoShop(): Shop {
    return {
        id: 'DEMO_SHOP',
        title: 'Fressti'
    }
}
