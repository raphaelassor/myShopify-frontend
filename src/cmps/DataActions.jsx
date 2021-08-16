
import { PRODUCT_TYPE } from '../services/settings';
import { ProductViewActions } from './ProductViewActions';
export const DataActions = ({ type, data }) => {

        switch (type) {
                case PRODUCT_TYPE:
                        return <ProductViewActions productsMap={data} />
                default: return ''
        }

}