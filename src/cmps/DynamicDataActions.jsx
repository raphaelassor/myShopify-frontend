import { PRODUCT_TYPE } from '../services/settings/productSettings';
import { ProductViewActions } from './ProductViewActions';

// DynamicEntityActionsBar
export const DynamicDataActions = ({ type, data }) => {
  switch (type) {
    case PRODUCT_TYPE:
      return <ProductViewActions productsMap={data} />;
    default:
      return '';
  }
};
