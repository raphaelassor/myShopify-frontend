import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataFilter } from "../cmps/DataFilter";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../store/actions/productActions";
import { PRODUCT_TYPE } from "../services/settings";
import { DataViewAndActions } from "../cmps/DataViewAndActions";
export function ProductsPage() {
    const dispatch=useDispatch()
    const {products,filterBy}=useSelector(state=>state.productModule)
    
    useEffect(() => {
        dispatch(loadProducts(filterBy))
    }, [])


    const productViewLayout=
    ['','Product','Status','Inventory','Type','Vendor']

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
            <DataFilter filter={filterBy}/>
            <DataViewAndActions data={products} type={PRODUCT_TYPE} viewLayout={productViewLayout} />
        </div>
    </div>
}