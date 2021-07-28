import Checkbox from '@material-ui/core/Checkbox';
import { ProductViewActions } from './ProductViewActions';
export const DataActions = ({type,data}) => {

        switch(type){
            case 'PRODUCT':
                return <ProductViewActions products={data} />
        }
    
}