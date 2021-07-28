import { ReactComponent as ImgIcon } from '../assets/img/icons/image.svg'
import { StatusWidget } from "./StatusWidget"
import Checkbox from '@material-ui/core/Checkbox';
export const ProductPreview = ({ product,isSelected,handleChange }) => {

   
    return (
        <tr className="product-preview">
            <td> <Checkbox
                checked={isSelected}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            /> 
            </td>
            <td className="img-preview">
                <div>
                    {product.imgUrls[0] ?
                        <img src="" alt="" />
                        :
                        <ImgIcon />
                    }
                </div>
            </td>
            <td><span className="product-title">{product.title}</span></td>
            <td> <StatusWidget product={product} /></td>
            <td>{product.inventory}</td>
            <td>{product.type}</td>
            <td>{product.vendor} </td>
        </tr >
    )
}