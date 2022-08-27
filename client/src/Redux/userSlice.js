import { current, createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { auth, storage } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

import { deletePrevPic, updateProPic } from "./helpers/firebase.helpers"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    rememberMe: false,
    isLogged: false,
    emailSent: false,

    data: {
        _id: null,
        socketID: null,
        proPicBlob: "",
        profilePicId: "",
        friendRequests: [],
        friendRequestsPending: [],
        friendList: [],
    },
}


export const register = createAsyncThunk(
    "user/register",

    async (data, { rejectWithValue }) => await axios.post(`${serverUrl}user/register`,
        data
    ).then(res => {


        return res.data;
    }).catch(err => {

        if (!err.response) throw (err)


        //add error body to login/rejected payload
        //redux doesn't do this automatically, so we need to call this function
        throw rejectWithValue(err.response.data)
    })
)

export const activateAccount = createAsyncThunk(
    "user/activateAccount",

    async data => await axios.post(`${serverUrl}user/activate-account`,
        data

    ).then(res => {

        createUserWithEmailAndPassword(auth, res.data.payload.email, res.data.hashedPassword)

        return res.data;
    }).catch(err => { throw Error(err) })
)

export const login = createAsyncThunk(
    "user/login",

    async (data, { rejectWithValue }) => await axios.post(`${serverUrl}user/login`,

        data,
        { withCredentials: true }

    ).then(async res => {

        signInWithEmailAndPassword(auth, res.data.userData.email, res.data.userData.password)

        return res.data

    }).catch(err => {

        if (!err.response) throw (err)


        //add error body to login/rejected payload
        //redux doesn't do this automatically, so we need to call this function
        throw rejectWithValue(err.response.data)
    })
)

export const updateUser = createAsyncThunk(
    "user/updateUser",
    async data => await axios.post(`${serverUrl}user/update`,

        data.payload,
        { withCredentials: true },

    ).then(async res => {

        return res.data
    }).catch(err => { throw Error(err) })
)

export const logout = createAsyncThunk(
    "user/logout",
    async () => await axios.delete(`${serverUrl}user/logout`,

        { withCredentials: true },

    ).then(res => {

        return res.data
    }).catch(err => { throw Error(err) })
)


export const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {

        loadUserProPic: (state, action) => {
            state.data.proPicBlob = action.payload
        },

        loadFriendProPic: (state, action) => {

            state.data.friendList.map(friend => {

                friend.proPicBlob = action.payload

            })

        },

        loadRequestProPic: (state, action) => {
            state.data.friendRequests = action.payload
        },

        updateFriendStatus: (state, action) => {

            const { _id, socketID } = action.payload

            state.data.friendList.map(friend => {

                if (friend._id === _id) friend.socketID = socketID

            })

        },

        getFriendRequests: (state, action) => {
            state.data.friendRequests.push(action.payload)
        },

        getPendingFriendRequest: (state, action) => {
            state.data.friendRequestsPending.push(action.payload)
        },

        acceptFriendRequest: (state, action) => {
            state.data.friendList.push(action.payload)
        },

        deleteFriendRequest: (state, action) => {
            state.data.friendRequests = state.data.friendRequests.filter(req => req._id !== action.payload)
            state.data.friendRequestsPending = state.data.friendRequestsPending.filter(pend => pend !== action.payload)
        },

        reset: state => {
            state.emailSent = false
        },
    },

    extraReducers: {
        [register.pending]: (state, action) => {
            state.emailSent = false
        },

        [register.fulfilled]: (state, action) => {
            state.emailSent = action.payload.emailSent
        },

        [register.rejected]: (state, action) => {

        },

        [login.fulfilled]: (state, action) => {
            state.data = action.payload.userData
            state.isLogged = action.payload.isLogged
        },

        [updateUser.fulfilled]: (state, action) => {

            deletePrevPic(state)

            state.data.profilePicId = action.payload.profilePicId

            updateProPic(state, action)

            state.data.proPicBlob = URL.createObjectURL(action.meta.arg.file.proPic)
        },

        [logout.fulfilled]: (state, action) => {
            state.isLogged = false
            state.data = initialState.data
        }

    }
})

export const {
    reset,

} = userSlice.actions

export default userSlice.reducer