import { PRODUCT_TYPE } from "../services/settings/productSettings"
import { ProductPreview } from "./ProductPreview"

export const DataPreview = (props) => {
    const { type, entity } = props
    switch (type) {
        case PRODUCT_TYPE: return <ProductPreview product={entity} {...props} />
        default: return ''
    }
}