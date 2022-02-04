import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    email: "",
    password: "",
    isLogged: false,
}

export const createUser = createAsyncThunk(
    "user/createUser",
    async (email) => await axios.post("http://localhost:5000/user/createUser", {
        email
    }).then(() => {

    }).catch(err => { console.error(err.message) })
)

export const userSlice = createSlice({
    name: "user",

    initialState,

    reducers: {

        newUser: (state, action) => {

        },

        login: state => {

        },

    },

    extraReducers: {
        [createUser.pending]: (state, action) => {

        },

        [createUser.fulfilled]: (state, action) => {

        },

        [createUser.rejected]: (state, action) => {

        },
    }
})


export const {
    login,
    newUser
} = userSlice.actions

export default userSlice.reducer