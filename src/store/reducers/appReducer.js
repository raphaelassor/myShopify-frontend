const initialState = {
  isLoading: false,
  systemSelectedData: {},
  dialog: {
    name: '',
    props: {}
  },
  criteria:{
    skip:0,
    limit:25
  }
};

export function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'INIT_LOADING':
      return { ...state, isLoading: true }
    case 'END_LOADING':
      return { ...state, isLoading: false }
    case 'SET_SELECTED_DATA':
      return { ...state, systemSelectedData: action.selectedData }
    case 'SET_DIALOG':
      return { ...state, dialog: action.dialog }
    case 'UNSET_DIALOG':
      return { ...state, dialog: { name: '', props: {} } }
      case 'UPDATE_CRITERIA':
        return {...state, criteria:{...state.criteria,...action.update}}
    default: return state
  }
}
