import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import conversationReducer from "./conversationSlice"
import socketsReducer from "./socketSlice"
import modalReducer from "./modalsSlice"
import userMiddleware from "./Middlewares/userMiddlware"
import conversationMiddleware from "./Middlewares/conversationMiddleware"
import socketMiddleware from "./Middlewares/socketMiddleware"
import modalsMiddleware from "./Middlewares/modalsMiddleware"

const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationReducer,
        sockets: socketsReducer,
        modal: modalReducer,

    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        userMiddleware,
        conversationMiddleware,
        socketMiddleware,
        modalsMiddleware
    )

})

export default store