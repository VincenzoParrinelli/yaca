import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLogged: false,
    emailSent: false,
    user: {},
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
    }).then(data => {

        return data.data;
    }).catch(err => { throw Error(err) })
)

export const activateAccount = createAsyncThunk(
    "user/activateAccount",

    async (data) => await axios.post("http://localhost:5000/user/activate-account", 
        data

    ).then(data => {
        
        return data.data;
    }).catch(err => { throw Error(err) })
)

export const login = createAsyncThunk(
    "user/login",
    async () => await axios.post("http://localhost:5000/user/login", {

    }).then(data => {
        return data.data
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
            state.error = null
            state.emailSent = false
        },

        [createUser.fulfilled]: (state, action) => {
            state.emailSent = action.payload.emailSent
            state.errors = action.payload
        },

        [activateAccount.fulfilled]: (state, action) => {
            state.errors = action.payload
        }
    }
})


export const {
    reset,
    logout
} = userSlice.actions

export default userSlice.reducer