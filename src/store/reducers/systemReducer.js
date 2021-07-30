const initialState = {
  isLoading: false,
  systemSelectedData: {}
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_INIT':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    case 'SET_MODAL':
      return { ...state, modal: { isActive: true, msg: action.msg } }
    case 'SET_SELECTED':
      return { ...state, systemSelectedData: action.selectedData }
    default: return state
  }
}
