import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    newPicBlob: null,
    newGroupName: null,

}

export const settingsOverviewSlice = createSlice({

    name: "settingsOverview",

    initialState,

    reducers: {

        setNewPicBlob: (state, action) => {
            state.newPicBlob = action.payload
        },

        resetNewPicBlob: state => {
            state.newPicBlob = initialState.newPicBlob
        },

        setNewGroupName: (state, action) => {
            state.newGroupName = action.payload
        },

        
    }
})


export const {
    setNewPicBlob,
    resetNewPicBlob,
    setNewGroupName,
} = settingsOverviewSlice.actions

export default settingsOverviewSlice.reducer