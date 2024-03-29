import { configureStore } from "@reduxjs/toolkit"

//reducers
import errorReducer from "./errorsSlice"
import userReducer from "./userSlice"
import dashboardReducer from "./dashboardSlice"
import conversationReducer from "./conversationSlice"
import socketsReducer from "./socketSlice"
import groupReducer from "./groupSlice"
import modalReducer from "./modalsSlice"
import settingsReducer from "./settingsSlice"
import appSettingsReducer from "./appSettingsSlice"
import settingsOverviewReducer from "./settingsOverviewSlice" 

//middlewares
import { errorMiddleware } from "./Middlewares/errorMiddleware"
import userMiddleware from "./Middlewares/userMiddleware"
import dashboardMiddleware from "./Middlewares/dashboardMiddleware"
import conversationMiddleware from "./Middlewares/conversationMiddleware"
import groupMiddleware from "./Middlewares/groupMiddleware"
import socketMiddleware from "./Middlewares/socketMiddleware"
import modalMiddleware from "./Middlewares/modalMiddleware"
import unsavedChangesMiddleware from "./Middlewares/unsavedChangesMiddleware"

const store = configureStore({
    reducer: {
        error: errorReducer,
        user: userReducer,
        dashboard: dashboardReducer,
        conversation: conversationReducer,
        group: groupReducer,
        sockets: socketsReducer,
        modal: modalReducer,
        settings: settingsReducer,
        appSettings: appSettingsReducer,
        settingsOverview: settingsOverviewReducer,

    },

    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
        errorMiddleware,
        userMiddleware,
        dashboardMiddleware,
        conversationMiddleware,
        groupMiddleware,
        socketMiddleware,
        modalMiddleware,
        unsavedChangesMiddleware,
    )

})

export default store