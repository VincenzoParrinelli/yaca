import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { auth, storage } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { ref, getDownloadURL } from "firebase/storage"

import { deletePrevPic, updateProPic } from "./helpers/helpers"

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

//refresh token on expiry
axios.interceptors.response.use(res => res, async (err) => {
    if (err.response.status === 403) {
        await axios.post(`${serverUrl}user/refresh-token`,
            {},
            { withCredentials: true }

        )
    }
})
///


const initialState = {
    isLogged: false,
    emailSent: false,
    user: {
        proPic: {},
        profilePicId: {},
        friendList: {},
    },
    errors: {
        isValid: true,
        isPresent: false,
        isMatch: true
    }
}


export const createUser = createAsyncThunk(
    "user/createUser",

    async email => await axios.post(`${serverUrl}user/create-user`, {
        email
    }).then(async res => {


        return res.data;
    }).catch(err => { throw Error(err) })
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
    async data => await axios.post(`${serverUrl}user/login`,

        data,
        { withCredentials: true }

    ).then(res => {

        signInWithEmailAndPassword(auth, res.data.user.email, res.data.user.password)

        return res.data

    }).catch(err => { throw Error(err) })
)

export const loadUser = createAsyncThunk(
    "user/load",
    async data => await axios.post(`${serverUrl}user/load`,
        data,
        { withCredentials: true }

    ).then(res => {

        const proPicId = ref(storage, `proPics/${res.data.profilePicId}`)

        const proPic = getDownloadURL(proPicId)

        return proPic

    }).catch(err => { throw Error(err) })

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

export const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {
        reset: state => {
            state.emailSent = false
            state.errors.isPresent = false
            state.errors.isValid = true
            state.errors.isMatch = true
        },

        logout: (state, action) => {
            state.isLogged = false
            state.user = null
        }

    },

    extraReducers: {
        [createUser.pending]: (state, action) => {
            state.errors = initialState.errors
            state.emailSent = false
        },

        [createUser.fulfilled]: (state, action) => {
            state.emailSent = action.payload.emailSent
            state.errors = action.payload
        },

        [createUser.rejected]: (state, action) => {
            state.errors = initialState.errors
            state.emailSent = false
        },

        [activateAccount.pending]: (state, action) => {
            state.errors = initialState.errors
        },

        [activateAccount.fulfilled]: (state, action) => {
            state.errors = action.payload
        },

        [activateAccount.rejected]: (state, action) => {
            state.errors = initialState.errors
        },

        [loadUser.fulfilled]: (state, action) => {
            state.user.proPic = action.payload
        },

        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user
            state.errors.isValid = action.payload.isValid
            state.errors.isPresent = action.payload.isPresent
            state.isLogged = action.payload.isLogged
        },

        [updateUser.fulfilled]: (state, action) => {

            deletePrevPic(state)

            state.user.profilePicId = action.payload.profilePicId

            updateProPic(state, action)

        },

    }
})

export const {
    reset,
    logout
} = userSlice.actions

export default userSlice.reducer