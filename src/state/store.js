import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "../state/user";
import modalReducer from "../state/app/modal"

export default configureStore({
    reducer: {
        user: userReducer,
        application: combineReducers({
            modal: modalReducer,
        })
    },
})