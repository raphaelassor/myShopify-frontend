
export function initLoading() {
    return dispatch => {
        dispatch({ type: 'INIT_LOADING' })
    }
}

export function endLoading() {
    return dispatch => {
        dispatch({ type: 'END_LOADING' })
    }
}

export function setError(e) {
    return dispatch => {
        dispatch({ type: 'SET_DIALOG', msg: e })
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
export function openDialog(dialogName,props){
    
    return dispatch =>{
        dispatch({
            type:'SET_DIALOG',
            dialog:{
                name:dialogName,
                props
            }
        })
    }
}
export function closeDialog(){
    return dispatch=>{
        dispatch({type:'UNSET_DIALOG'})
    }
}
export function updateCriteria(update){
    return dispatch=>{
        dispatch({type:'UPDATE_CRITERIA',update})
    }
}


