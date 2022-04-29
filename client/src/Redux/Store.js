import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import socketsReducer from "./socketSlice"
import modalReducer from "./modalsSlice"
import userMiddleware from "./Middlewares/userMiddlware"
import socketMiddleware from "./Middlewares/socketMiddleware"
import modalsMiddleware from "./Middlewares/modalsMiddleware"

const store = configureStore({
    reducer: {
        user: userReducer,
        sockets: socketsReducer,
        modal: modalReducer,

    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userMiddleware, socketMiddleware, modalsMiddleware)

})

export default store