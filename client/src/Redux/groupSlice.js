import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { updateGroupPic } from "./helpers/helpers"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    groupData: [],
}

export const createGroup = createAsyncThunk(
    "group/createGroup",

    async payload => await axios.post(`${serverUrl}group/create-group`,
        payload.data,
        { withCredentials: true }

    ).then(res => {

        return res.data
    })
)

const groupSlice = createSlice({
    name: "group",

    initialState,

    reducers: {

    },

    extraReducers: {
        [createGroup.fulfilled]: (state, action) => {

            updateGroupPic(action)

            state.groupData.push(action.payload)
        }
    }
})


export const {

} = groupSlice.actions

export default groupSlice.reducer