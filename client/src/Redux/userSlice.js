import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    email = "",
    password = "",
    isLogged = false,
}

export const userSlice = createSlice({
    name: "userData",

    initialState,

    reducers: {

        newUser: (state, action) => {

        },

        login: state => {

        },
 
    }
})


export const {
    login,
    newUser
} = userSlice.actions

export default userSlice.reducer