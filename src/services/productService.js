
import { httpService } from './httpService'

import { storageService } from './asyncStorageService'

export const productService = {
    query,
    remove,
    getById,
    save,
    getEmptyProduct,
}

async function query(filterBy = { ctg: '' }) {
    try {
        // return await httpService.get('product', filterBy)
        return await storageService.query('product')
    } catch (err) {
        throw err
    }
}

async function remove(productId) {
    try {
        // await httpService.delete(`product/${productId}`)
        await storageService.delete('product',productId)
    } catch (err) {
        throw err
    }
}

async function getById(productId) {
    try {
        // return await httpService.get(`product/${productId}`)
        return await storageService.get('product',productId)
    } catch (err) {
        throw err
    }
}

async function save(product) {
    if (product._id) {
        try {
            // return await httpService.put(`product/${product._id}`, product)
            return await storageService.put('product',product)
        } catch (err) {
            throw err
        }
    } else {
        try {
            // return await httpService.post('product', product)
            return await storageService.post('product',product)
        } catch (err) {
            throw err
        }
    }
}

function getEmptyProduct() {

    return {
        isActive: false,
        isArchived: false,
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
        inventory:null,
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

