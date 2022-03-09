import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import socketsReducer from "./socketsSlice"
import modalReducer from "./modalsSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        sockets: socketsReducer,
        modal: modalReducer,

    }
})

export default store