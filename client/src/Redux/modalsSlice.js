import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    dashboard: true,
    settings: false,
    addFriend: false,
    buttonToolTip: false,
    notificationBell: false,
}

export const modalsSlice = createSlice({
    name: "modals",

    initialState,

    reducers: {
        reset: (state, action) => {

            //format string to resemble state key values
            //@desc: get the action name without the handle prefix and refactor first letter as lowercase
            //finally sum lower case letter with the rest of the action name
            var actionName = action.payload.split("handle")[1]
            var firstActionLetter = actionName.split("")[0].toLowerCase()
            var actionName2 = actionName.split("")
            actionName2.shift()
            var formattedAction = firstActionLetter + actionName2.join("")

            Object.keys(state).forEach(v => {

                if (formattedAction === "settings") return

                if (v !== formattedAction) {
                    state[v] = false
                }
            })

        },

        handleDashboard: state => {
            state.dashboard = true
        },

        handleSettings: state => {
            state.settings = !state.settings
        },

        handleNotificationBell: state => {
            state.notificationBell = !state.notificationBell
        },

        openButtonToolTip: state => {
            state.buttonToolTip = true
        },

        closeButtonToolTip: state => {
            state.buttonToolTip = false
        },

        handleAddFriend: state => {
            state.addFriend = true
        }

    }
})

export const {
    handleDashboard,
    handleSettings,
    openButtonToolTip,
    closeButtonToolTip,
    handleNotificationBell,
    handleAddFriend,
} = modalsSlice.actions

export default modalsSlice.reducer