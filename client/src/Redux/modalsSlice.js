import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    settings: false,
    addFriend: false,
    buttonToolTip: false,
    notificationBell: false,
}

export const modalsSlice = createSlice({
    name: "modals",

    initialState,

    reducers: {
        handleSettings: state => {
            state.settings = !state.settings
        },

        handleNotificationBell: state => {
            state.notificationBell = !state.notificationBell
        },

        handleButtonToolTip: state => {
            state.buttonToolTip = !state.buttonToolTip
        },

        handleAddFriend: state => {
            state.addFriend = !state.addFriend
        }

    }
})

export const {
    handleSettings,
    handleButtonToolTip,
    handleNotificationBell,
    handleAddFriend,
} = modalsSlice.actions

export default modalsSlice.reducer