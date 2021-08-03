
export function initLoading() {
    console.log('init loading')
    return dispatch => {
        dispatch({ type: 'LOADING_INIT' })
    }
}

export function endLoading() {
    console.log('end loading')
    return dispatch => {
        dispatch({ type: 'LOADING_END' })
    }
}

export function setError(e) {
    return dispatch => {
        dispatch({ type: 'SET_MODAL', msg: e })
    }
}

export function setGlobalSelected(selectedData){
    return dispatch=>{
        dispatch({type:'SET_SELECTED_DATA',selectedData})
    }
}
export function unsetGlobalSelected(){
    return dispatch=>{
        dispatch({type:'SET_SELECTED_DATA',selectedData:{}})
    }
}
export function openModal(modalName,props){
    
    return dispatch =>{
        dispatch({
            type:'SET_MODAL',
            modal:{
                name:modalName,
                props
            }
        })
    }
}
export function closeModal(){
    return dispatch=>{
        dispatch({type:'UNSET_MODAL'})
    }
}
