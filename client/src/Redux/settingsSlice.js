import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    selectedFriendID: "",
    selectedGroupID: "",

    //defines if a settings container is open
    isOpenFlag: {
        appSettings: false,
        userSettings: false,
        groupSettings: false,
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

        handleOpenGroupSettings: (state, action) => {
            if (action.payload) state.selectedGroupID = action.payload
            state.isOpenFlag.groupSettings = !state.isOpenFlag.groupSettings
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
    closeUnsavedChangesAlert
} = settingsSlice.actions


export default settingsSlice.reducer