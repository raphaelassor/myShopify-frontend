import { useMemo } from "react"
import { statusNames } from '../services/settings'
export const StatusWidget = ({ product }) => {

    const status = useMemo(() => {
        switch (product.status) {
            case statusNames.active:
                return { txt: 'Active', class: 'active' }
            case statusNames.archive:
                return { txt: 'Archived', class: 'archive' }
            case statusNames.draft:
                return { txt: 'Draft', class: 'draft' }
        }
    }, [product])
    return (
        <div className={`status-widget ${status.class}`}>
            <span>
                {status.txt}
            </span>
        </div>
    )
}