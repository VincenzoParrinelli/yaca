import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    settings: false
}

export const modalsSlice = createSlice({
    name: "modal",

    initialState,

    reducers: {
        openSettings: state => {
            state.settings = !state.settings
        },

        closeSettings: state => {
            state.settings = false
        }
    }
})

export const {
    openSettings,
    closeSettings
} = modalsSlice.actions

export default modalsSlice.reducer