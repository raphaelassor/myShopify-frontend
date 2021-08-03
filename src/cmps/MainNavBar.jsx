import React from 'react' 
import { NavLink} from 'react-router-dom'
import {ReactComponent as HomeIcon } from '../assets/img/icons/home.svg'
import {ReactComponent as ProductIcon } from '../assets/img/icons/products.svg'
import {ReactComponent as OrderIcon } from '../assets/img/icons/orders.svg'
import {ReactComponent as CustomerIcon } from '../assets/img/icons/customers.svg'
import {ReactComponent as CollectionIcon } from '../assets/img/icons/collections.svg'

export const MainNavBar=()=>{

    return (
    <nav className="main-nav-bar">
        <ul className="clean-list">
            <li> <NavLink exact={true} to="/" activeClassName="active"> <HomeIcon/> Home</NavLink></li>
            <li><NavLink  to="/orders" activeClassName="active"> <OrderIcon/> Orders</NavLink></li>
            <li><NavLink  to="/products" activeClassName="active"> <ProductIcon/>Products</NavLink></li>
            <li><NavLink  to="/customers" activeClassName="active"> <CustomerIcon/>Customers</NavLink></li>
            <li><NavLink  to="/collections" activeClassName="active"> <CollectionIcon/>Collections</NavLink></li>
        </ul>
    </nav>
    )
}