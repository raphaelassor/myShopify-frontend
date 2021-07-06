import { productService } from "./productService"
import { utilService } from "./utilService"


export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType) || null) || []
    if (!entities || !entities.length) {
        entities = _createEntities(entityType)
        if (!entities) return Promise.reject('could not find type in local storage create entities')
        _save(entityType, entities)
    }
        return Promise.resolve(entities)
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

    function remove(entityType, entityId) {
        return query(entityType)
            .then(entities => {
                const idx = entities.findIndex(entity => entity._id === entityId)
                entities.splice(idx, 1)
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
            product._id=utilService.makeId()
            product.title = 'Demo ' + utilService.getRandomInt()
            product.price = +((Math.random()*100).toFixed(2))
            product.isActive = Math.random() > 0.5 ? true : false
            product.isArchived = product.isActive ? false : true
            product.type = 'lorem ' + utilService.getRandomInt()
            product.vendor = 'lorem ' + utilService.getRandomInt()
            product.inventory=Math.floor(Math.random()*10000)
            products.push(product)
        }
        return products;
    }

