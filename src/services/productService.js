
import { httpService } from './httpService'

import { storageService } from './asyncStorageService'
import { statusNames } from './settings'
import { utilService } from './utilService'

export const productService = {
    queryProducts,
    removeProductById,
    removeManyProductsById,
    getProductById,
    saveProduct,
    patchProducts,
    getEmptyProduct,
    getProductsFilter,
}

async function saveProduct(product) {
    try {
        return await product._id ? _updateProduct(product) : _createProduct(product)
    } catch (e) {
        throw (e)
    }
}

async function queryProducts(filterBy) {
    const query=utilService.buildQueryStr(filterBy)
    console.log(query)
    try {
        // return await httpService.get('products${query}')
        return await storageService.query('product')
    } catch (err) {
        throw err
    }
}
async function getProductById(productId) {
    try {
        // return await httpService.get(`product/${productId}`)
        return await storageService.get('product', productId)
    } catch (err) {
        throw err
    }
}

async function patchProducts(patch) {
    
    try {
        // return await httpService.patch('products', patch)
        // return await storageService.putMany('product', products)
    } catch (err) {
        throw err
    }
}
async function removeProductById(productId) {
    try {
        // await httpService.delete(`product/${productId}`)
        await storageService.remove('product', productId)
    } catch (err) {
        throw err
    }
}

async function removeManyProductsById(productIds) {
    try {
        // await httpService.delete(`product`,productIds)
        await storageService.removeMany(`product`, productIds)
    } catch (err) {
        throw err
    }
}



async function _updateProduct(product) {
    // return await httpService.put(`product/${product._id}`, product)
    return await storageService.put('product', product)

}
async function _createProduct(product) {
    // return await httpService.post('product', product)
    return await storageService.post('product', product)
}



function getEmptyProduct() {
    return {
        status: statusNames.active,
        title: '',
        description: '',
        type: '',
        vendor: '',
        tagMap: {},
        imgUrls: [],
        price: null,
        comparePrice: null,
        cost: null,
        sku: '',
        inventory: null,
        supplier: {
            name: '',
            _id: ''
        },
        weight: {
            value: null,
            unit: ''
        },
        origin: ''
    }
}
function getProductsFilter() {
    return {
        vendor: '',
        tag: '',
        status: '',
        type: '',
        collection: '',
        title:''
    }
}


