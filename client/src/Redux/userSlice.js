import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"
import { auth, storage } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, deleteObject } from "firebase/storage"

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

    async (email) => await axios.post(`${serverUrl}user/create-user`, {
        email
    }).then(async res => {


        return res.data;
    }).catch(err => { throw Error(err) })
)

export const activateAccount = createAsyncThunk(
    "user/activateAccount",

    async (data) => await axios.post(`${serverUrl}user/activate-account`,
        data

    ).then(res => {

        createUserWithEmailAndPassword(auth, res.data.payload.email, res.data.hashedPassword)

        return res.data;
    }).catch(err => { throw Error(err) })
)

export const login = createAsyncThunk(
    "user/login",
    async (data) => await axios.post(`${serverUrl}user/login`,
        data,
        { withCredentials: true }
    ).then(res => {

        signInWithEmailAndPassword(auth, res.data.user.email, res.data.user.password)
        return res.data
    }).catch(err => { throw Error(err) })
)


export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data) => await axios.post(`${serverUrl}user/update`,

        { data },
        { withCredentials: true },

    ).then(async res => {

        return res.data
    }).catch(err => { throw Error(err) })
)

export const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {
        reset: (state) => {
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

        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user
            state.errors.isValid = action.payload.isValid
            state.errors.isPresent = action.payload.isPresent
            state.isLogged = action.payload.isLogged
        },

        [updateUser.fulfilled]: (state, action) => {

            deletePrevPic(state.user)

            state.user.profilePicId = action.payload.profilePicId

            updateProPic(state)

        },

    }
})

const deletePrevPic = async state => {
    const prevPicId = state.profilePicId

    if (!prevPicId) return

    const prevPic = ref(storage, `proPics/${prevPicId}`)

    await deleteObject(prevPic).catch(err => {
        console.log(err.message)
        if (err.message === "Firebase Storage: Object 'proPics/undefined' does not exist. (storage/object-not-found)") {
            return
        }
    })
}

const updateProPic = async state => {
    const proPicId = state.user.profilePicId

    const proPic = ref(storage, `proPics/${proPicId}`)

    await uploadBytes(proPic).catch(err => { throw err })
}


export const {
    reset,
    logout
} = userSlice.actions

export default userSlice.reducer