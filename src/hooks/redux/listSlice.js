import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
  temp: [],
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.value = action.payload;
      state.temp = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addData } = listSlice.actions

export default listSlice.reducer