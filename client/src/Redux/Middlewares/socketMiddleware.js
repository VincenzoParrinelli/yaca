import io from 'socket.io-client'

var socket

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL


const socketMiddleware = store => next => action => {

    if (action.type === "socket/connection") {

        var options = {
            withCredentials: true,
            auth: {
                currentUserID: action.payload
            }
        }

        socket = io(serverUrl, options)

        socket.on("connect_error", err => {

            store.dispatch({
                type: "socket/error",
                payload: err.message
            })

        })

        socket.on("update-friend-status", friend => {

            store.dispatch({
                type: "user/updateFriendStatus",
                payload: friend
            })
        })

        socket.on("receive-searched-users", users => {

            store.dispatch({
                type: "socket/getSearchedUsers",
                payload: users
            })
        })

        socket.on("receive-friend-request", user => {

            store.dispatch({
                type: "user/getFriendRequests",
                payload: user
            })
        })

        socket.on("receive-pending-friend-request", user => {

            store.dispatch({
                type: "user/getPendingFriendRequest",
                payload: user
            })
        })

        socket.on("accept-friend-request", userToAcceptID => {

            store.dispatch({
                type: "user/acceptFriendRequest",
                payload: userToAcceptID
            })

            store.dispatch({
                type: "user/deleteFriendRequest",
                payload: userToAcceptID
            })
        })

        socket.on("delete-friend-request", userToRefuseID => {

            store.dispatch({
                type: "user/deleteFriendRequest",
                payload: userToRefuseID
            })
        })

        socket.on("get-message", newMessage => {
            console.log(newMessage)
        })
    }

    if (action.type === "socket/searchUsers") {

        const userID = store.getState().user.data._id

        const payload = {
            userID,
            username: action.payload
        }

        socket.emit("search-user", payload)
    }

    //friend requests socket handlers

    if (action.type === "socket/sendFriendRequest") {
        socket.emit("send-friend-request", action.payload)
    }

    if (action.type === "socket/acceptFriendRequest") {
        socket.emit("accept-friend-request", action.payload)
    }

    if (action.type === "socket/refuseFriendRequest") {
        socket.emit("refuse-friend-request", action.payload)
    }

    //

    if (action.type === "socket/sendMessage") {

        const currentUserID = store.getState().user.data._id
        const selectedUser = store.getState().conversation.selectedUser

        const payload = {
            currentUserID,
            selectedUserID: selectedUser._id,
            selectedUserSocketID: selectedUser.socketID,
            message: action.payload
        }

        socket.emit("send-message", payload)
    }

    next(action)
}

export default socketMiddleware