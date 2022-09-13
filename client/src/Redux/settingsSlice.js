import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    selectedFriendID: "",
    selectedGroupID: "",

    //defines if a settings container is open
    isOpenFlag: {
        userSettings: false,
        groupSettings: false,
    },

    //defines wich app settings content to render
    userSettingsContent: {
        myAccount: true,
    },

    //defines wich group settings content to render
    groupSettingsContent: {
        overview: true,
        roles: false
    },

    unsavedChangesAlert: false,
}


export const settingsSlice = createSlice({

    name: "settings",

    initialState,

    reducers: {

        resetFlags: state => {
            state.isOpenFlag = initialState.isOpenFlag
        },

        handleOpenGroupSettings: (state, action) => {
            if (action.payload) state.selectedGroupID = action.payload
            state.isOpenFlag.groupSettings = !state.isOpenFlag.groupSettings
        },

        handleUserSettings: state => {
            state.isOpenFlag.userSettings = !state.isOpenFlag.userSettings
        },

        openUnsavedChangesAlert: state => {
            state.unsavedChangesAlert = true
        },

        closeUnsavedChangesAlert: state => {
            state.unsavedChangesAlert = false
        },
    }

})


export const {
    handleOpenGroupSettings,
    resetFlags,
    handleUserSettings,
    closeUnsavedChangesAlert
} = settingsSlice.actions


export default settingsSlice.reducer