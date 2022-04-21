import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import socketsReducer from "./socketSlice"
import modalReducer from "./modalsSlice"
import socketMiddleware from "./socketMiddleware"
import modalsMiddleware from "./modalsMiddleware"

const store = configureStore({
    reducer: {
        user: userReducer,
        sockets: socketsReducer,
        modal: modalReducer,
    
    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware, modalsMiddleware) 

})

export default store