import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { auth } from "../firebase"
import { signInWithCustomToken } from "firebase/auth"
import { storage } from "../firebase"
import { ref, getDownloadURL } from "firebase/storage"
import { firebaseDeletePrevPic, firebaseUploadProPic } from "../helpers/firebase.helpers"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const initialState = {
    rememberMe: false,
    isLogged: false,
    emailSent: false,
    redirectToActivation: false,

    data: {
        _id: null,
        username: "",
        socketID: null,
        proPicBlob: "",
        profilePicID: "",
        friendRequests: [],
        friendRequestsPending: [],
        friendList: [],
    },

    searchedUsers: []
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

    async (token, { rejectWithValue }) => await axios.post(`${serverUrl}user/activate-account`,
        { token },
        { withCredentials: true }

    ).then(res => {


        return res.data;
    }).catch(err => {

        if (!err.response) throw (err)

        //add error body to login/rejected payload
        //redux doesn't do this automatically, so we need to call this function
        throw rejectWithValue(err.response.data)
    })
)

export const login = createAsyncThunk(
    "user/login",

    async (data, { rejectWithValue }) => await axios.post(`${serverUrl}user/login`,

        data,
        { withCredentials: true }

    ).then(async res => {

        const firebaseToken = document.cookie.split("=")[1]

        return await signInWithCustomToken(auth, firebaseToken).then(() => {

            return res.data
        })


    }).catch(err => {

        if (!err.response) throw (err)

        //add error body to login/rejected payload
        //redux doesn't do this automatically, so we need to call this function
        throw rejectWithValue(err.response.data)
    })
)


export const deletePrevPic = createAsyncThunk(
    "user/deletePrevPic",

    async userAndOldPicIDS => await firebaseDeletePrevPic(userAndOldPicIDS).catch(err => { throw Error(err) })

)

export const updateProPic = createAsyncThunk(
    "user/updateProPic",

    async newProPicData => await firebaseUploadProPic(newProPicData).then(data => data).catch(err => { throw Error(err) })

)

export const changeUsername = createAsyncThunk(
    "user/changeUsername",

    async (payload, { rejectWithValue }) => await axios.patch(`${serverUrl}user/changeUsername`,

        payload.data,
        { withCredentials: true },

    ).then(() => payload).catch(err => {

        if (!err.response) throw (err)

        throw rejectWithValue(err.response.data)
    })
)


export const searchUsers = createAsyncThunk(
    "user/searchUsers",

    async payload => await axios.post(`${serverUrl}user/searchUsers`,

        payload,
        { withCredentials: true }

    ).then(users => {

        const loadingUsers = users.data.map(async user => {

            const { _id, profilePicID } = user

            const proPicRef = ref(storage, `proPics/${_id}/${profilePicID}`)

            return await getDownloadURL(proPicRef).then(proPicBlob => {

                user.proPicBlob = proPicBlob

                return user
            }).catch(() => user)

        })

        return Promise.all(loadingUsers).then(loadedUsers => loadedUsers)

    })
)


// Since tokens are httpOnly we need to delete them server side
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

        loadedUser: (state, action) => {
            state.data = action.payload
        },

        setIsLogged: (state) => {
            state.isLogged = true
        },

        setFriendUpdatedProPic: (state, action) => {

            state.data.friendList.map(friend => {

                if (friend._id === action.payload.userID) friend.proPicBlob = action.payload.proPicBlob

            })

        },

        setFriendUpdatedUsername: (state, action) => {

            state.data.friendList.map(friend => {

                if (friend._id === action.payload._id) friend.username = action.payload.newUsername

            })
        },

        loadedFriendList: (state, action) => {

            state.data.friendList = action.payload

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

        resetSearchedUsers: state => {
            state.searchedUsers = []
        },

        reset: state => {
            state.emailSent = false
        },
    },

    extraReducers: {

        [register.fulfilled]: (state, action) => {
            state.redirectToActivation = true
        },

        [activateAccount.fulfilled]: (state, action) => {
            state.data = action.payload.userData
            state.isLogged = action.payload.isLogged
        },

        [updateProPic.fulfilled]: (state, action) => {
            state.data.profilePicID = action.payload.newProPicID
            state.data.proPicBlob = action.payload.newProPicBlob
        },

        [changeUsername.fulfilled]: (state, action) => {
            state.data.username = action.payload.data.newUsername
        },

        [searchUsers.fulfilled]: (state, action) => {
            state.searchedUsers = action.payload
        },

        [logout.fulfilled]: (state, action) => {
            state.isLogged = false
            state.data = initialState.data
        }

    }
})

export const {
    reset,
    resetSearchedUsers
} = userSlice.actions

export default userSlice.reducer