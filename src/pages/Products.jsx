import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataFilter } from "../cmps/DataFilter";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import { PRODUCT_TYPE, statusNames } from "../services/settings";
import { DataViewAndActions } from "../cmps/DataViewAndActions";
import { productService } from "../services/productService";
import { useForm } from "../services/hooks/customHooks";
import { DataNav } from "../cmps/DataNav";
export function ProductsPage() {
    const dispatch=useDispatch()
    const {products}=useSelector(state=>state.productModule)
    const {productTags,productTypes,vendors}=useSelector(state=>state.shopModule)
    
    useEffect(() => {
        dispatch(loadProducts())
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
            options:vendors
        },
        {
            title:'Tag',
            type:'tags',
            options:productTags
        },
        {
            title:'Status',
            type:'status',
            options:[statusNames.active,statusNames.archive,statusNames.draft]
        },
        {
            title:'Product Type',
            type:'type',
            options:productTypes
        }

    ]

    if(!products) return ''
    return <div className="products-page">
        <div className="page-header flex justify-space-between align-center">
            <h1 className="fs20">Products</h1>
            <Link to="#" className="btn-md btn-primary">Add product</Link>
        </div>
        <div className="page-surface">
            <DataNav data={filterData[2]} baseUrl="products" />
            <DataFilter cbAfterFilter={onSetFilter} data={filterData} />
            <DataViewAndActions data={products} type={PRODUCT_TYPE} viewLayout={productViewLayout} cbAfterFilter={onSetFilter} />
        </div>
    </div>
}