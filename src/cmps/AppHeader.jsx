import React from 'react'
import {ReactComponent as DropdownIcon} from '../assets/img/icons/dropdown.svg'
import {ReactComponent as SearchIcon} from '../assets/img/icons/search.svg'
import { Avatar } from './Avatar'

export const AppHeader = ()=>{
    return (
        <header className="app-header">
            <nav>
            <div className="store-select flex align-center">
                <img alt="" className="logo" src="https://cdn.shopify.com/shopifycloud/web/assets/v1/2217fb04df073033ccce8d125b0ea020.svg" />
                <span> Fressti.com</span>
                <DropdownIcon/>
            </div>
            <div className="flex align-center justify-space-between">
                <div className="flex full justify-center">
                <div className=" input-container flex full">
                    <SearchIcon/>
                <input type="text" placeholder="Search"/>
                </div>
                </div>
                <div className="user-nav flex align-center">
                    <Avatar name="Raphael Assor" />
                    <span>Rapahel Assor</span>
                </div>
            </div>
            </nav>
        </header>
        )
    }

