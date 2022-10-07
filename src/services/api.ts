import Axios, { AxiosRequestConfig, Method, AxiosError } from 'axios'
import { storageService } from './asyncStorageService'
import { ApiResponse } from './types'

const DEV_MODE = 'mock'
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


const axios = Axios.create({
    withCredentials: true
})

type Data = Record<string, any>



export const api = {
    get<T extends any>(endpoint: string, data?: Data) {
        return ajax<T>(endpoint, 'GET', data)
    },
    post(endpoint: string, data: Data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data: Data) {
        return ajax(endpoint, 'PUT', data)
    },
    patch(endpoint: string, data: Data) {
        return ajax(endpoint, 'PATCH', data)
    },
    delete(endpoint: string, data: Data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax<T extends any>(endpoint: string, method: Method = 'GET', data?: Record<string, any>): ApiResponse<T> {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res
    } catch (err) {
        const error = err as AxiosError
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(error)
        if (error.response && error.response.status === 401) {
            window.location.assign('/#/login')
        }
        throw err
    }
}