import { createSlice,current } from "@reduxjs/toolkit"

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

            //object name = e.g emailErrors or passwordErrors
            //property = selected obj property e.g isInvalid, isEmpty
            const objectName = action.payload[0]
            const property = action.payload[1]

            console.log(action.payload[1])

            Object.assign(state[objectName], property)

            console.log(current(state))


        }
    }

})


export const {
    reset
} = errorSlice.actions

export default errorSlice.reducer