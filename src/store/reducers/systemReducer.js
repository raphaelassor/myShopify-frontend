const initialState = {
  isLoading: false,
  selectedData: {}
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_INIT':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    default: return state
    case 'SET_MODAL':
      return {
        ...state, modal: { isActive: true, msg: action.msg }
      }
  }
}
