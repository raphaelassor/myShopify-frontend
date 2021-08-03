const initialState = {
    
        domains: [],
        title: '',
        productTypes: [],
        vendors: [],
        suppliers: [{
            id: '',
            name: '',
        }],
        productTags: [],
        orderTags: [],
        customerTags: []
 
};

export function shopReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_SHOP':
            return {...state,...action.shop }
        case 'UPDATE_SHOP':
            return { ...state, ...action.shop }
        default: return state
    }
}