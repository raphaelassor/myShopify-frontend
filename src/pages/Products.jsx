import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataFilter } from "../cmps/DataFilter";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import { PRODUCT_TYPE, statusNames } from "../services/settings";
import { DataViewAndActions } from "../cmps/DataViewAndActions";
import { productService } from "../services/productService";
import { useForm } from "../services/hooks/customHooks";
export function ProductsPage() {
    const dispatch=useDispatch()
    const {products}=useSelector(state=>state.productModule)
    const shop=useSelector(state=>state.shopModule)
    const [filterBy,handleChange]=useForm(productService.getProductsFilter())
    
    useEffect(() => {
        dispatch(loadProducts(filterBy))
    }, [])
 
    const onSetFilter=(filterBy)=>{
        dispatch(loadProducts(filterBy))
    }

    const productViewLayout=
    ['','Product','Status','Inventory','Type','Vendor']

    const filterData=[
        {
            title:'Product Vendor',
            type:'vendor',
            options:shop.vendors
        },
        {
            title:'Tagged With',
            type:'tags',
            options:shop.productTags
        },
        {
            title:'Status',
            type:'status',
            options:[statusNames.active,statusNames.archive,statusNames.draft]
        },
        {
            title:'Product Type',
            type:'type',
            options:shop.productTypes
        }

    ]

    if(!products) return ''
    return <div className="products-page">
        <div className="page-header flex justify-space-between align-center">
            <h1 className="fs20">Products</h1>
            <Link to="#" className="btn-md btn-primary">Add product</Link>
        </div>
        <div className="page-surface">
            <ul className="clean-list flex">
                <li>All</li>
                <li>Active</li>
                <li>Archive</li>
                <li>Draft</li>
            </ul>
            <DataFilter type={PRODUCT_TYPE} filter={filterBy} data={filterData} />
            <DataViewAndActions data={products} type={PRODUCT_TYPE} viewLayout={productViewLayout} cbAfterFilter={onSetFilter} />
        </div>
    </div>
}