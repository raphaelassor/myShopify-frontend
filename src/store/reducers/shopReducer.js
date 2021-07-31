const initialState = {
    shop: {}
};

export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_SHOP':
            return { ...state, shop: action.shop }
        case 'UPDATE_SHOP':
            return { ...state, shop: action.shop }
        default: return state
    }
}