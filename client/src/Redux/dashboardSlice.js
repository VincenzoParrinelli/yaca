import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dashboard: false,
    notifications: false,
    addFriend: false,
}


export const dashboardSlice = createSlice({
    name: "dashboard",

    initialState,

    reducers: {

        //reset everything but notifications component
        reset: state => {
            state.dashboard = initialState.dashboard
            state.addFriend = initialState.addFriend
        },

        handleDashboard: state => {
            state.dashboard = true
        },

        openNotifications: state => {
            state.notifications = true
        },

        closeNotifications: state => {
            state.notifications = false
        },

        handleAddFriend: state => {
            state.addFriend = true
        },


    }
})


export const {
    handleDashboard,
    openNotifications,
    closeNotifications,
    handleAddFriend,
} = dashboardSlice.actions


export default dashboardSlice.reducer