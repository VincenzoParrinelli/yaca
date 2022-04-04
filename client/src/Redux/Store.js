import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import socketsReducer from "./socketSlice"
import modalReducer from "./modalsSlice"
import socketMiddleware from "./socketMiddleware"

const store = configureStore({
    reducer: {
        user: userReducer,
        sockets: socketsReducer,
        modal: modalReducer,

    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware) 

})

export default store