
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
