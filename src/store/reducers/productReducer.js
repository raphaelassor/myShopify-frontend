const initialState = {
  products: [],
}

export function productReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.products }
    default:
      return state
  }
}