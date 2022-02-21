import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { auth, storage } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytes, deleteObject } from "firebase/storage"

//refresh token on expiry
axios.interceptors.response.use(res => res, async (err) => {
    if (err.response.status === 403) {
        await axios.post("http://localhost:5000/user/refresh-token",
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

    async (email) => await axios.post("http://localhost:5000/user/create-user", {
        email
    }).then(async res => {


        return res.data;
    }).catch(err => { throw Error(err) })
)

export const activateAccount = createAsyncThunk(
    "user/activateAccount",

    async (data) => await axios.post("http://localhost:5000/user/activate-account",
        data

    ).then(res => {

        createUserWithEmailAndPassword(auth, res.data.payload.email, res.data.hashedPassword)

        return res.data;
    }).catch(err => { throw Error(err) })
)

export const login = createAsyncThunk(
    "user/login",
    async (data) => await axios.post("http://localhost:5000/user/login",
        data,
        { withCredentials: true }
    ).then(res => {

        signInWithEmailAndPassword(auth, res.data.user.data.email, res.data.user.data.password)

        return res.data
    }).catch(err => { throw Error(err) })
)


export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (data) => await axios.post("http://localhost:5000/user/update",

        { data },
        { withCredentials: true },

    ).then(async res => {

        const prevProPicRef = ref(storage, `proPics/${initialState.profilePicId}`)

        await deleteObject(prevProPicRef).then(async () => {
            const proPicRef = ref(storage, `proPics/${res.data.profilePicId}`)

            await uploadBytes(proPicRef, data.newProPic).catch(err => console.error(err.message))

        }).catch(err => console.error(err.message))


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
            state.user.profilePicId = action.payload.profilePicId
        },

    }
})


export const {
    reset,
    logout
} = userSlice.actions

export default userSlice.reducer