import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    selectedFriendID: "",
    selectedGroupID: "",

    appSettings: false,
    friendSettings: false,
    groupSettings: false,

    
}


export const settingsSlice = createSlice({

    name: "settings",

    initialState,

    reducers: {

        handleGroupSettings: (state, action) => {
            state.selectedGroupID = action.payload
            state.groupSettings = !state.groupSettings
        },
    }

})


export const {
    handleGroupSettings,
} = settingsSlice.actions


export default settingsSlice.reducer