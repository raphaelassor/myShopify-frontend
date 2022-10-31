import React, { useEffect, useMemo, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { DataFilter } from '../../cmps/DataFilter';
import { TabsNavigation } from '../../cmps/TabsNavigation';
import { PageSwapper } from '../../cmps/PageSwapper';
import {
  filterOptions,
  productsNav,
  productViewLayout,
  sortOptions,
} from './consts';
import { ProductsResponse, ProductPageState } from './types';
import produce from 'immer';
import { productService } from '../../services/productService';
import {
  DEFAULT_SKIP,
  getBaseRequestParams,
} from '../../services/utils/request';
import { TableWithActions } from '../../cmps/TableWithActions';
import { PRODUCT_TYPE } from '../../services/settings/productSettings';
import { ProductViewActions } from './cmps/ProductViewActions';
import { buildTableRow } from './utils';
import { noop } from 'lodash';

const initialState: ProductPageState = {
  activeFilters: {},
  products: null,
  page: 1,
  isLoadingProducts: false,
};

type SetProductsAction = { type: 'set products'; payload: ProductsResponse };
type LoaidingProductsAction = { type: 'loading products' };
type UpdateActiveFilter = {
  type: 'update active filter';
  payload: ProductPageState['activeFilters'];
};
type SwapPage = { type: 'swap page'; payload: 1 | -1 };

type ProductReducerActions =
  | SetProductsAction
  | LoaidingProductsAction
  | UpdateActiveFilter
  | SwapPage;

const reducer = (draft: ProductPageState, action: ProductReducerActions) => {
  switch (action.type) {
    case 'set products':
      draft.isLoadingProducts = false;
      draft.products = action.payload;
      return;
    case 'loading products':
      draft.isLoadingProducts = true;
      return;
    case 'update active filter':
      draft.activeFilters = { ...draft.activeFilters, ...action.payload };
    case 'swap page':
      if (
        draft.products &&
        draft.page * DEFAULT_SKIP <= draft.products.totalCount
      ) {
        draft.page = draft.page + (action.payload as number);
      }
  }
};

const productReducer = produce(reducer);

export function ProductsPage() {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    loadProducts();
  }, [state.activeFilters, state.page]);

  const loadProducts = async () => {
    dispatch({ type: 'loading products' });
    const { data } = await productService.queryProducts(
      getBaseRequestParams(state)
    );
    dispatch({ type: 'set products', payload: data });
  };

  const onSetFilter = (filter: ProductPageState['activeFilters']) => {
    dispatch({ type: 'update active filter', payload: filter });
  };

  const onSwapPage = (diff: 1 | -1) => {
    dispatch({ type: 'swap page', payload: diff });
  };

  const tableRows = useMemo(() => {
    if (!state.products) return [];
    return state.products.items.map(buildTableRow);
  }, [state.products]);

  return (
    <div className="products-page">
      <div className="page-header flex justify-space-between align-center">
        <h1 className="fs20">Products</h1>
        <Link to="#" className="btn-md btn-primary">
          Add product
        </Link>
      </div>
      <div className="page-surface">
        <TabsNavigation
          data={productsNav}
          onClickTab={(value) => onSetFilter(value)}
          value={state.activeFilters.status ?? ''}
        />
        <DataFilter
          onFilterChange={onSetFilter}
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          activeFilters={state.activeFilters}
        />
        <TableWithActions
          rows={tableRows}
          columns={productViewLayout}
          type={PRODUCT_TYPE}
          renderActionBar={(selectedIds) => (
            <ProductViewActions
              selectedProductIds={selectedIds}
              toggleProductSelection={noop}
            />
          )}
        />
        <PageSwapper
          page={state.page}
          last={state.page * DEFAULT_SKIP > (state.products?.totalCount ?? 0)}
          onSwap={onSwapPage}
        />
      </div>
    </div>
  );
}
