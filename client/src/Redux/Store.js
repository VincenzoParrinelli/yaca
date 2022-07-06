import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import conversationReducer from "./conversationSlice"
import socketsReducer from "./socketSlice"
import groupReducer from "./groupSlice"
import modalReducer from "./modalsSlice"
import settingsReducer from "./settingsSlice"
import settingsOverviewReducer from "./settingsOverviewSlice" 
import userMiddleware from "./Middlewares/userMiddleware"
import conversationMiddleware from "./Middlewares/conversationMiddleware"
import groupMiddleware from "./Middlewares/groupMiddleware"
import socketMiddleware from "./Middlewares/socketMiddleware"
import modalMiddleware from "./Middlewares/modalMiddleware"
import unsavedChangesMiddleware from "./Middlewares/unsavedChangesMiddleware"

const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationReducer,
        group: groupReducer,
        sockets: socketsReducer,
        modal: modalReducer,
        settings: settingsReducer,
        settingsOverview: settingsOverviewReducer,

    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        userMiddleware,
        conversationMiddleware,
        groupMiddleware,
        socketMiddleware,
        modalMiddleware,
        unsavedChangesMiddleware
    )

})

export default store