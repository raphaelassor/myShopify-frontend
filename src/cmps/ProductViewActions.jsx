import { useDispatch, useSelector } from 'react-redux';
import {
  loadProducts,
  removeManyProducts,
  patchProducts,
} from '../store/actions/productActions';
import { statusNames } from '../services/settings';
import { closeDialog } from '../store/actions/appActions';
import { shopService } from '../services/shopService';
import { CommonDataActions } from './CommonDataActions';

export const ProductViewActions = ({ productsMap }) => {
  const dispatch = useDispatch();
  const { criteria } = useSelector((state) => state.appModule);
  const { productTags } = useSelector((state) => state.shopModule);

  const removeProducts = async () => {
    const productIds = Object.keys(productsMap);
    dispatch(removeManyProducts(productIds, cbLoadProductsWithFilter));
  };
  // TODO: BAD
  const editStatus = async (statusName) => {
    const patch = {
      ids: Object.keys(productsMap),
      field: 'status',
      value: statusName,
    };
    dispatchUpdate(patch);
    dispatch(closeDialog());
  };

  const cbLoadProductsWithFilter = () => {
    return loadProducts(criteria);
  };
  const dispatchUpdate = (patch) => {
    dispatch(patchProducts(patch, cbLoadProductsWithFilter));
  };

  return (
    <>
      <CommonDataActions
        remove={removeProducts}
        tagsToShow={productTags}
        update={dispatchUpdate}
        entitiesMap={productsMap}
      />
      <button
        onClick={() => editStatus(statusNames.archive)}
        className="btn-md btn-neutral"
      >
        Archive
      </button>
      <button
        onClick={() => editStatus(statusNames.active)}
        className="btn-md btn-neutral"
      >
        Set Active
      </button>
      <button
        onClick={() => editStatus(statusNames.draft)}
        className="btn-md btn-neutral"
      >
        Set Draft
      </button>
    </>
  );
};
