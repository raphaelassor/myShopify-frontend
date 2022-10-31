import {Home} from './pages/Home'
import {ProductsPage} from './pages/Products/Products'
export const routes = [
    
    {
        path:'/products',
        component:ProductsPage
    },
    {
        path: '/',
        component: Home,
        exact:true
    },
]