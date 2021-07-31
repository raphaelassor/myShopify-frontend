const initialState = {
  isLoading: false,
  systemSelectedData: {},
  modal: {
    type: '',
    props: {}
  },
  popover: {
    type: '',
    props: {},
    elPos: null
  }

};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOADING_INIT':
      return { ...state, isLoading: true }
    case 'LOADING_DONE':
      return { ...state, isLoading: false }
    case 'SET_MODAL':
      return { ...state, modal: { isActive: true, msg: action.msg } }
    case 'SET_SELECTED_DATA':
      return { ...state, systemSelectedData: action.selectedData }
    case 'SET_MODAL':
      return { ...state, modal: action.modal }
    case 'UNSET_MODAL':
      return { ...state, modal: { type: '', props: {} } }
    case 'SET_POPOVER':
      return { ...state, popover: action.modal }
    case 'UNSET_POPOVER':
      return { ...state, popover: { type: '', props: {}, elPos: {} } }
    default: return state
  }
}
