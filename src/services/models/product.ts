export interface Product {
    id: string;
    status: 'active' | 'archive' | 'draft'
    title: string,
    description: string,// HTML string? maybe react bundling?
    type: string,
    vendor: string,
    imgUrls: [string],
    price: number,
    comparePrice: number,
    cost: number,
    sku: string;
    weight: {
        value: number,
        unit: string
    },
    origin: string;
    suppliers: string[];
    inventory: number;
    tags: Tag[]
}

interface Variant {
    price: number;
    // title: combination of all variants
    quantity: number;
    img: string;
    variants: {
        [x: string]: string
    }

}
interface Tag {
    id: string,
    title: string
}


// TODO: solve the variants issue of normaliztion - the user can choose any varaint it wants - category and value. how should this be represented in the db?
