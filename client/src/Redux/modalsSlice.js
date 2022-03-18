import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    settings: false,
    addFriend: false,
    inbox: false,
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

        handleAddFriend: state => {
            state.addFriend = !state.addFriend
        }

    }
})

export const {
    handleSettings,
    handleAddFriend,
    handleInbox,
} = modalsSlice.actions

export default modalsSlice.reducer