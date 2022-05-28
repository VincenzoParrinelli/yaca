import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import conversationReducer from "./conversationSlice"
import socketsReducer from "./socketSlice"
import modalReducer from "./modalsSlice"
import groupReducer from "./groupSlice"
import userMiddleware from "./Middlewares/userMiddleware"
import conversationMiddleware from "./Middlewares/conversationMiddleware"
import resetSelectedIDsMiddleware from "./Middlewares/groupMiddleware"
import socketMiddleware from "./Middlewares/socketMiddleware"
import modalMiddleware from "./Middlewares/modalMiddleware"

const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationReducer,
        sockets: socketsReducer,
        modal: modalReducer,
        group: groupReducer

    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        userMiddleware,
        conversationMiddleware,
        resetSelectedIDsMiddleware,
        socketMiddleware,
        modalMiddleware
    )

})

export default store