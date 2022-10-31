import { Filters } from "../../services/productService"
import type { Status } from '../../services/types/general'

export interface ProductPageState {
    activeFilters: Filters
    products: ProductsResponse | null;
    page: number;
    isLoadingProducts: boolean
}

export interface ProductsResponse {
    totalCount: number;
    items: Product[]
}
export interface Product {
    id: string;
    status: Status,
    title: string,
    description: string,
    type: string,
    vendor: string,
    imgUrls: [string],
    origin: string;
    suppliers: string[];
    inventory: number;
    tags: Tag[]
    categories: VariantCategory[] | null
    variantsByOptionIds: {
        [x: string]: Variant
    }
}



interface Variant {
    price: number,
    comparePrice: number,
    cost: number,
    sku: string;
    weight: {
        value: number,
        unit: string
    },
    imgUrl: string | null

}
export interface Tag {
    id: string,
    title: string
}

interface VariantCategory {
    id: string,
    name: string,
    options: VariantOption[]
}

interface VariantOption {
    id: string,
    name: string,
}

