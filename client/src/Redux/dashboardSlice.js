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

        reset: () => initialState,

        handleDashboard: state => {
            state.dashboard = true
        },

        openNotifications: state => {
            state.notifications = !state.notifications
        },

        handleAddFriend: state => {
            state.addFriend = true
        },


    }
})


export const {
    handleDashboard,
    openNotifications,
    handleAddFriend,
} = dashboardSlice.actions


export default dashboardSlice.reducer