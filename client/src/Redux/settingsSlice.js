import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    selectedFriendID: "",
    selectedGroupID: "",

    //defines if a settings container is open
    isOpenFlag: {
        appSettings: false,
        friendSettings: false,
        groupSettings: false,
    },

    //defines wich settings content to render
    groupSettings: {
        overview: false,
        roles: false
    },

    unsavedChangesAlert: false,
}


export const settingsSlice = createSlice({

    name: "settings",

    initialState,

    reducers: {

        handleOpenGroupSettings: (state, action) => {
            state.selectedGroupID = action.payload
            state.groupSettings.overview = !state.groupSettings.overview
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
} = settingsSlice.actions


export default settingsSlice.reducer