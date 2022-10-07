
import { api } from './api'
import axios from 'axios'
import { storageService } from './asyncStorageService'
import { statusNames } from './settings'
import { utilService } from './utilService'
import { Product } from './models/product'

export const productService = {
    queryProducts,
    removeProductById,
    removeManyProductsById,
    getProductById,
    createProduct,
    updateProduct,
    patchProducts,
    getEmptyProduct,
    getProductsFilter,
}

async function queryProducts(filterBy?: Record<string, string | number | number[] | string[]>) {
    const query = utilService.buildQueryStr(filterBy)
    try {
        // return await api.get(`products`,{filterBy})
        return await storageService.queryAsDB('products')
    } catch (err) {
        throw err
    }
}

async function getProductById(productId: string) {
    try {
        // return await api.get(`product/${productId}`)
        return await storageService.getById('products', productId)
    } catch (err) {
        throw err
    }
}

async function patchProducts(products: Product[]) {
    try {
        // return await api.patch('products', patch)
        // return await axios.patch('//localhost:3030/api/products',patch)
        return await storageService.putMany('products', products)
    } catch (err) {
        throw err
    }
}
async function removeProductById(productId: string) {
    try {
        // await api.delete(`product/${productId}`)
        await storageService.remove('products', productId)
    } catch (err) {
        throw err
    }
}

async function removeManyProductsById(productIds: string[]) {
    try {
        // await api.delete(`products`, productIds)
        await storageService.removeMany(`products`, productIds)
    } catch (err) {
        throw err
    }
}



async function updateProduct(product: Product) {
    // return await api.put(`product/${product._id}`, product)
    return await storageService.put('products', product)

}
async function createProduct(product: Omit<Product, 'id'>) {
    // return await api.post('products', product)
    return await storageService.post('products', product)
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
        title: ''
    }
}


