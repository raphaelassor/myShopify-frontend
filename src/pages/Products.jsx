import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductPreview } from "../cmps/ProductPreview";
import { productService } from "../services/productService";

export function ProductsPage() {
    const [products, setProducts] = useState([])
    const [filterBy, setFilter] = useState({})

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        const loadedProducts = await productService.query()
        setProducts(loadedProducts)
    }


    return <div className="products-page">
        <div className="page-header flex justify-space-between align-center">
            <h1 className="fs20">Products</h1>
            <Link className="btn-md btn-primary">Add product</Link>
        </div>
        <div className="page-surface">
            <ul className="clean-list flex">
                <li>All</li>
                <li>Active</li>
                <li>Archive</li>
                <li>Draft</li>
            </ul>
            <div className="filter flex justify-space-between">
                <input type="text" placeholder="i am a filter " />
                <div className="flex">
                    <button className="btn-md btn-neutral">Product Vendor</button>
                    <button className="btn-md btn-neutral">More Filters</button>
                    <button className="btn-md btn-neutral">Saved</button>
                    <button className="btn-md btn-neutral"> Sort</button>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>
                                {/* checkbox */}
                            </th>
                            <th></th>
                            <th>Product</th>
                            <th>Status</th>
                            <th>Inventory</th>
                            <th>Type</th>
                            <th>Vendor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => <ProductPreview product={product} key={product._id} />)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
}