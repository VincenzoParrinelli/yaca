import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    settings: false,
    newGroupModal: false,
    addGroupMembers: false,
    deleteGroupModal: false,
    changeUsernameModal: false
}

export const modalsSlice = createSlice({
    name: "modal",

    initialState,

    reducers: {

        reset: () => initialState,

        handleSettings: state => {
            state.settings = !state.settings
        },

        openNewGroupModal: state => {
            state.newGroupModal = true
        },

        closeNewGroupModal: state => {
            state.newGroupModal = false
        },

        openAddGroupMembers: state => {
            state.addGroupMembers = true
        },

        closeAddGroupMembers: state => {
            state.addGroupMembers = false
        },

        openDeleteGroupModal: state => {
            state.deleteGroupModal = true
        },

        closeDeleteGroupModal: state => {
            state.deleteGroupModal = false
        },

        openUsernameModal: state => {
            state.changeUsernameModal = true
        },

        closeUsernameModal: state => {
            state.changeUsernameModal = false
        },

        openLogoutModal: state => {
            state.logoutModal = true
        },

        closeLogoutModal: state => {
            state.logoutModal = false
        }

    }
})

export const {
    handleSettings,
    openNewGroupModal,
    closeNewGroupModal,
    openAddGroupMembers,
    closeAddGroupMembers,
    openDeleteGroupModal,
    closeDeleteGroupModal,
    handleAddFriend,
    openUsernameModal,
    closeUsernameModal,
    openLogoutModal,
    closeLogoutModal
} = modalsSlice.actions

export default modalsSlice.reducer