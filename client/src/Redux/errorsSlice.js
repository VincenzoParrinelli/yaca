import { createSlice, current } from "@reduxjs/toolkit"

const initialState = {

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
            state.emailErrors = { ...initialState.emailErrors, ...action.payload.emailErrors }
            state.passwordErrors = { ...initialState.passwordErrors, ...action.payload.passwordErrors }
        }
    }

})


export const {
    reset
} = errorSlice.actions

export default errorSlice.reducer