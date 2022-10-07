import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  systemSelectedData: {},
  dialog: {
    name: '',
    props: {}
  },
  criteria: {
    skip: 0,
    limit: 25
  }
};


const appReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => state.isLoading = payload,
    setSelectedData: (state, { payload }) => state.systemSelectedData = payload,
    setCriteria: (state, { payload }) => state.criteria = { ...state.criteria, ...payload }
  }
})


export default appReducer.reducer
export const { setCriteria, setLoading, setSelectedData } = appReducer.actions

