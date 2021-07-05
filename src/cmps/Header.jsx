import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {ReactComponent as DropdownIcon} from '../assets/img/icons/dropdown.svg'

class _Header extends Component {
    render() {
        return <header className="main-header">
            <nav>
            <div className="store-select flex align-center">
                <img  className="logo" src="https://cdn.shopify.com/shopifycloud/web/assets/v1/2217fb04df073033ccce8d125b0ea020.svg" />
                <span> Fressti.com</span>
                <DropdownIcon/>
            </div>
            <div className="flex align-center justify-space-between">
                <div className="flex full">
                    {/* Search Icon */}
                <input type="text"/>
                </div>
                <div className="user-nav flex align-center">
                    <div className="avatar">RA</div>
                    <span>Rapahel Assor</span>
                </div>
            </div>
            </nav>
        </header>
    }

}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)