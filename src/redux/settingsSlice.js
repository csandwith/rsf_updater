import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
      value: {
        lang: "en"
      },
    },
    reducers: {
        setLang: (state, action) => {
            state.value.lang = action.payload;
        },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setLang } = settingsSlice.actions
  
  export default settingsSlice.reducer