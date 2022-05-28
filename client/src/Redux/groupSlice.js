import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { updateGroupPic } from "./helpers/helpers"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    groupList: [],

    selectedGroupID: ""

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

export const getGroup = createAsyncThunk(
    "group/getGroup",

    async payload => await axios.get(`${serverUrl}group/get-group/${payload}`,

        { withCredentials: true }
    ).then(res => {

        return res.data
    })
)

const groupSlice = createSlice({
    name: "group",

    initialState,

    reducers: {

        loadGroups: (state, action) => {
            state.groupList = action.payload
        },

        resetSelectedGroupID: state => {
            state.selectedGroupID = ""
        },

        setSelectedGroupID: (state, action) => {
            state.selectedGroupID = action.payload
        }
    },

    extraReducers: {

        [createGroup.fulfilled]: (state, action) => {

            updateGroupPic(action)

            state.groupList.push(action.payload)
        },

        [getGroup.fulfilled]: (state, action) => {

        }
    }
})


export const {
    setSelectedGroupID,

} = groupSlice.actions

export default groupSlice.reducer