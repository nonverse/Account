import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "../state/user";
import modalReducer from "../state/app/modal"
import settingsReducer from "../state/app/settings.js"

export default configureStore({
    reducer: {
        user: userReducer,
        application: combineReducers({
            modal: modalReducer,
            settings: settingsReducer
        })
    },
})
