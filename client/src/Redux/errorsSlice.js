import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {

    usernameErrors: {
        isEmpty: false,
    },

    emailErrors: {
        isInvalid: false,
        isEmpty: false,
        loginIsPresent: true,
        signupIsPresent: false

    },

    passwordErrors: {
        isInvalid: false,
        isEmpty: false,
    }
}

export const errorSlice = createSlice({

    name: "error",

    initialState,

    reducers: {

        reset: () => initialState,

        setErrors: (state, action) => {
            state.usernameErrors = { ...initialState.usernameErrors, ...action.payload.usernameErrors }
            state.emailErrors = { ...initialState.emailErrors, ...action.payload.emailErrors }
            state.passwordErrors = { ...initialState.passwordErrors, ...action.payload.passwordErrors }
        },
    }

})


export const {
    reset,

} = errorSlice.actions

export default errorSlice.reducer