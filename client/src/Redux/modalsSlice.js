import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    settings: false,
    inbox: false
}

export const modalsSlice = createSlice({
    name: "modals",

    initialState,

    reducers: {
        handleSettings: state => {
            state.settings = !state.settings
        },

        handleInbox: state => {
            state.inbox = !state.inbox
        },

    }
})

export const {
    handleSettings,
    handleInbox
} = modalsSlice.actions

export default modalsSlice.reducer