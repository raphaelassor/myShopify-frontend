import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DataFilter } from '../cmps/DataFilter';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../store/actions/productActions';
import { statusNames } from '../services/settings';
import { DataViewAndActions } from '../cmps/DataViewAndActions';
import { DataNav } from '../cmps/DataNav';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { PageSwapper } from '../cmps/PageSwapper';
import {
  PRODUCTS_SORT_LAYOUT,
  PRODUCT_TYPE,
} from '../services/settings/productSettings';
import { updateCriteria } from '../store/actions/appActions';

export function ProductsPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productModule);
  const { productTags, productTypes, vendors } = useSelector(
    (state) => state.shopModule
  );
  // manage more states instead of the redux crap
  const { criteria } = useSelector((state) => state.appModule);
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(loadProducts(criteria));
  }, [criteria]);

  useLayoutEffect(() => {
    onSetFilter({ skip: page * 25 });
  }, [page]);

  const onSetFilter = (filter) => {
    dispatch(updateCriteria(filter));
  };
  const onSwapPage = (diff) => {
    setPage(page + diff);
  };

  const productViewLayout = [
    '',
    'product',
    'status',
    'inventory',
    'type',
    'vendor',
  ];
  // TODO: naming is problematic
  // TODO: filter is unknown - vendors, tags and types should be sent from the backend.
  //explore the option of getting the filter options from the backend
  let filterData = [
    {
      typeTitle: 'Product Vendor',
      type: 'vendor',
      options: vendors,
    },
    {
      typeTitle: 'Tag',
      type: 'tags',
      options: productTags,
    },
    {
      typeTitle: 'Status',
      type: 'status',
      options: [statusNames.active, statusNames.archive, statusNames.draft],
    },
    {
      typeTitle: 'Product Type',
      type: 'type',
      options: productTypes,
    },
  ];

  return (
    <div className="products-page">
      <div className="page-header flex justify-space-between align-center">
        <h1 className="fs20">Products</h1>
        <Link to="#" className="btn-md btn-primary">
          Add product
        </Link>
      </div>
      <div className="page-surface">
        {/* TODO: change name of the cmp to tabs */}
        <DataNav data={filterData[2]} baseUrl="products" />
        <DataFilter
          cbAfterFilter={onSetFilter}
          filterData={filterData}
          sortData={PRODUCTS_SORT_LAYOUT}
        />
        <DataViewAndActions
          data={products}
          type={PRODUCT_TYPE}
          viewLayout={productViewLayout}
          cbAfterFilter={onSetFilter}
        />
        <PageSwapper
          page={page}
          last={products.length < 25}
          onSwap={onSwapPage}
        />
      </div>
    </div>
  );
}
