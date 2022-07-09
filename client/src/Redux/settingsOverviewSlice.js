import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    newPicBlob: null,
    newGroupPicID: null,
    newGroupName: null,

}

export const settingsOverviewSlice = createSlice({

    name: "settingsOverview",

    initialState,

    reducers: {

        resetOverviewState: () => initialState,

        setNewPic: (state, action) => {
            state.newPicBlob = action.payload
            state.newGroupPicID = action.payload.split("/")[3]
        },
   
        resetNewPic: state => {
            state.newPicBlob = initialState.newPicBlob
            state.newGroupPicID = initialState.newGroupPicID
        },

        setNewGroupName: (state, action) => {
            state.newGroupName = action.payload
        },
    }
})


export const {
    resetOverviewState,
    setNewPic,
    resetNewPic,
    setNewGroupName,
} = settingsOverviewSlice.actions

export default settingsOverviewSlice.reducer