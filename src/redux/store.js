import { configureStore } from '@reduxjs/toolkit'
import navReducer from './navSlice'
import settingsReducer from './settingsSlice'
import rsfReducer from './RSFSlice'

export default configureStore({
    reducer: {
        nav: navReducer,
        settings: settingsReducer,
        rsf: rsfReducer,
    },
})