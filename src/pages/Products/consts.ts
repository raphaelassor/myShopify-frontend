import { EntityNavData } from "../../cmps/TabsNavigation";
import { FormData } from "../../cmps/form/types";
import { DropdownOption } from "../../cmps/popover/types";
import type { Column } from '../../cmps/TableWithActions'
export const filterOptions: FormData = [
    {
        title: 'Product Vendor',
        keyName: 'vendor',
        inputType: 'dropdwonSingleSelect',
        options: [],
    },
    {
        title: 'Tag',
        keyName: 'tags',
        inputType: 'dropdwonSingleSelect',
        options: [],
    },
    {
        title: 'Status',
        keyName: 'status',
        inputType: 'dropdwonSingleSelect',
        options: [],
    },
    {
        title: 'Product Type',
        keyName: 'type',
        inputType: 'dropdwonSingleSelect',
        options: [],
    },
];

export const productsNav: EntityNavData = {
    type: 'status',
    options: [
        {
            value: '',
            title: 'All',
        },
        {
            value: 'active',
            title: 'Active',
        },
        {
            value: 'draft',
            title: 'Draft',
        },
        {
            value: 'archive',
            title: 'Archive',
        }]
}

export const productViewLayout: Column[] = [

    {
        id: 'product', title: 'Product'
    },
    {
        id: 'status', title: 'Status'
    },
    {
        id: 'inventory', title: 'Inventory'
    },
    {
        id: 'type', title: 'Type'
    },
    {
        id: 'vendor', title: 'Vendor'
    },
];

export const sortOptions: DropdownOption[] =
    [
        { label: 'Cretaed (newest first)', value: 'createdAt_desc' },
        { label: 'Cretaed (oldest first)', value: 'createdAt_asc' },
        { label: 'Updated (newest first)', value: 'updatedAt_desc' },
        { label: 'Updated (oldest first)', value: 'updatedAt_asc' },
        { label: 'Product title A-Z', value: 'title_asc' },
        { label: 'Product title Z-A', value: 'title_desc' },
        { label: 'Low inventory', value: 'inventory_asc' },
        { label: 'high inventory', value: 'inventory_desc' },
    ]