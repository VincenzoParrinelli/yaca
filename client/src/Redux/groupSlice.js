import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    groupList: [],

}

export const createGroup = createAsyncThunk(
    "group/createGroup",

    async payload => await axios.post(`${serverUrl}group/create-group`,
        payload.data,
        { withCredentials: true }

    ).then(res => {

        return res.data
    }).catch(err => { throw Error(err) })
)


const groupSlice = createSlice({
    name: "group",

    initialState,

    reducers: {

        loadGroupsProPics: (state, action) => {
            state.groupList = action.payload
        },

        resetSelectedGroupID: state => {
            state.selectedGroupID = ""
        },

        sendGroupInvite: () => { },

        updateGroupSettings: () => { },

        deleteGroup: () => { },

        getUpdatedGroupSettings: (state, action) => {

            state.groupList = state.groupList.map(group => {

                if (group._id !== action.payload._id) return group

                return Object.assign(group, action.payload)
            })
        },

        handleDeletedGroup: (state, action) => {

            state.groupList = state.groupList.filter(group => group._id !== action.payload)

        }
    },

    extraReducers: {

        [createGroup.fulfilled]: (state, action) => {

            const newGroup = action.payload

            //*****newGroup.proPicBlob = action.meta.arg.proPicBlob

            state.groupList.push(newGroup)
        },

    }
})


export const {
    sendGroupInvite,
    updateGroupSettings,
    deleteGroup,

} = groupSlice.actions

export default groupSlice.reducer