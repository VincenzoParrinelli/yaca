import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {

    usernameErrors: {
        isEmpty: false,
    },

    emailErrors: {
        isInvalid: false,
        isEmpty: false,
        isPresent: true,
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

        //swap boolean when user swaps to registration form
        // @desc: if user tries to login with a non existing email, the system will throw 
        // email doesn't exist error. Viceversa if the user is in registration form and tries to signup with an already registered email,
        // throw email already exists error, since we cannot register 2 times with the same email. 
        // Instead of creating another bool variable we swap the value of this one.
        swapEmailIsPresentValue: state => {
            state.emailErrors.isPresent = false
        }
    }

})


export const {
    reset,
    swapEmailIsPresentValue
} = errorSlice.actions

export default errorSlice.reducer