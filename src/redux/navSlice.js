import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
    name: 'nav',
    initialState: {
      value: "updater",
    },
    reducers: {
        navigateTo: (state, action) => {
            state.value = action.payload
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { navigateTo } = navSlice.actions
  
  export default navSlice.reducer