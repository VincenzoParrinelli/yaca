import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    groupList: [],

    newGroupMessageFromSocket: null
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


export const getAllGroupMessages = createAsyncThunk(
    "group/getAllGroupMessages",

    async groupID => await axios.get(`${serverUrl}group/get-all-group-messages/${groupID}`,

        { withCredentials: true }

    ).then(res => res.data)
)

export const sendGroupMessage = createAsyncThunk(
    "group/sendGroupMessage",

    async payload => await axios.post(`${serverUrl}group/send-group-message`,

        payload,
        { withCredentials: true }

    ).then(res => res.data)
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

        getGroupMessage: (state, action) => {

            const { newMessage, groupID } = action.payload

            state.groupList.forEach(group => {

                if (group._id !== groupID) return

                group.messages.push(newMessage)

            })

            state.newGroupMessageFromSocket = newMessage

        },

        updateGroupChatUI: (state, action) => {

            const { newMessage, groupID } = action.payload

            state.groupList.forEach(group => {

                if (group._id !== groupID) return

                group.messages.push(newMessage)
            })

        },

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

        [getAllGroupMessages.fulfilled]: (state, action) => {

            action.payload.isFullyFetched = true

            const groupToUpdate = state.groupList.find(conv => conv._id === action.payload._id)

            Object.assign(groupToUpdate, action.payload)
        }

    }
})


export const {
    sendGroupInvite,
    updateGroupSettings,
    deleteGroup,
    updateGroupChatUI

} = groupSlice.actions

export default groupSlice.reducer