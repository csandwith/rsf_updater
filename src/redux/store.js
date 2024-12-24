import { configureStore } from '@reduxjs/toolkit'
import navReducer from './navSlice'
import settingsReducer from './settingsSlice'

export default configureStore({
    reducer: {
        nav: navReducer,
        settings: settingsReducer,
    },
})