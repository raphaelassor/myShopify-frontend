import { AxiosResponse, } from 'axios'


export type ApiResponse<T extends any> = Promise<AxiosResponse<T>>

export interface Shop {
    id: string,
    title: string
}