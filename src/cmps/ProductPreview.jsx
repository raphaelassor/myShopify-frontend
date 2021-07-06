import { ReactComponent as ImgIcon } from '../assets/img/icons/image.svg'
import { StatusWidget } from "./StatusWidget"
export const ProductPreview = ({ product }) => {

    return (
        <tr className="product-preview">
            <td>{/* Checkbox */} </td>
            <td>
                <div className="img-preview">
                    {product.imgUrls[0] ?
                        <img src="" alt="" />
                        :
                        <ImgIcon />
                    }
                </div>
            </td>
            <td>{product.title} </td>
            <td> <StatusWidget product={product} /></td>
            <td>{product.inventory}</td>
            <td>{product.type}</td>
            <td>{product.vendor} </td>
        </tr >
    )
}