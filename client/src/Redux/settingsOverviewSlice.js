import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    newPicBlob: null,
    newGroupName: null,

}

export const settingsOverviewSlice = createSlice({

    name: "settingsOverviewSettings",

    initialState,

    reducers: {

        resetOverviewState: () => initialState,

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
    resetOverviewState,
    setNewPicBlob,
    resetNewPicBlob,
    setNewGroupName,
} = settingsOverviewSlice.actions

export default settingsOverviewSlice.reducer