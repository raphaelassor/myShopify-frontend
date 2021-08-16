import { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataFilter } from "../cmps/DataFilter";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import { PRODUCT_TYPE, statusNames } from "../services/settings";
import { DataViewAndActions } from "../cmps/DataViewAndActions";
import { productService } from "../services/productService";
import { useForm } from "../services/hooks/customHooks";
import { DataNav } from "../cmps/DataNav";
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string'
import { PageSwapper } from "../cmps/PageSwapper";

export function ProductsPage() {
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.productModule)
    const { productTags, productTypes, vendors } = useSelector(state => state.shopModule)
    const [criteria, setCriteria] = useState({ limit: 25, skip: 0 })
    const [page, setPage] = useState(0)

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        dispatch(loadProducts(criteria))
    }, [criteria])

    useLayoutEffect(() => {
        console.log('page is : ', page)
        onSetFilter({ skip: page * 25 })
    }, [page])

    const onSetFilter = (filter) => {
        setCriteria(prevState => ({ ...prevState, ...filter }))
    }
    const onSwapPage = (diff) => {
        setPage(page+diff)
    }

    const productViewLayout =
        ['', 'product', 'status', 'inventory', 'type', 'vendor']

    const filterData = [
        {
            typeTitle: 'Product Vendor',
            type: 'vendor',
            options: vendors
        },
        {
            typeTitle: 'Tag',
            type: 'tags',
            options: productTags
        },
        {
            typeTitle: 'Status',
            type: 'status',
            options: [statusNames.active, statusNames.archive, statusNames.draft]
        },
        {
            typeTitle: 'Product Type',
            type: 'type',
            options: productTypes
        }

    ]
    const sort = {
        type: 'sort',
        titles: ['Cretaed (newest first)', 'Cretaed (oldest first)', 'Updated (oldest first)', 'Product title A-Z', 'Product title Z-A', 'Low inventory', 'high inventory'],
        options: ['createdAt_asc', 'createdAt_desc', 'updatedAt_asc', 'updatedAt_desc', 'title_asc', 'title_desc', 'inventory_asc', 'inventory_desc']
    }


    if (!products) return ''
    return <div className="products-page">
        <div className="page-header flex justify-space-between align-center">
            <h1 className="fs20">Products</h1>
            <Link to="#" className="btn-md btn-primary">Add product</Link>
        </div>
        <div className="page-surface">
            <DataNav data={filterData[2]} baseUrl="products" />
            <DataFilter cbAfterFilter={onSetFilter} filterData={filterData} sortData={sort} />
            <DataViewAndActions data={products} type={PRODUCT_TYPE} viewLayout={productViewLayout} cbAfterFilter={onSetFilter} />
            <PageSwapper page={products.length < 5 ? -1 : page} onSwap={onSwapPage} />
        </div>
    </div>
}