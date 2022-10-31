import { AxiosResponse, } from 'axios'


export type ApiResponse<T extends any> = Promise<AxiosResponse<T>>

export interface Shop {
    id: string,
    title: string
}

export type Status = 'active' | 'archive' | 'draft'
