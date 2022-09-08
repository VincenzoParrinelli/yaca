import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
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
    }).catch(err => { throw Error(err) })
)

export const getGroup = createAsyncThunk(
    "group/getGroup",

    async groupID => await axios.get(`${serverUrl}group/get-group`,

        { withCredentials: true, params: groupID }
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

        setSelectedGroupID: (state, action) => {
            state.selectedGroupID = action.payload
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

        [getGroup.fulfilled]: (state, action) => {


            state.groupList.map((group, i) => {

                if (group._id !== action.payload.group._id) return

                // state.founder = action.payload.group.founder
                // state.moderators = action.payload.group.moderators
                // state.members = action.payload.group.members

                group.isFullyFetched = true

            })


        }
    }
})


export const {
    setSelectedGroupID,
    sendGroupInvite,
    updateGroupSettings,
    deleteGroup

} = groupSlice.actions

export default groupSlice.reducer