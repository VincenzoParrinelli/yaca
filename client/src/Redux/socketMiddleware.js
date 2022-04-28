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

        socket.on("receive-searched-users", users => {
            console.log(users)
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
    }

    if (action.type === "socket/searchUsers") {
        socket.emit("search-user", action.payload)
    }

    if (action.type === "socket/sendFriendRequest") {
        socket.emit("send-friend-request", action.payload)
    }

    if (action.type === "socket/acceptFriendRequest") {
        socket.emit("accept-friend-request", action.payload)
    }

    if (action.type === "socket/refuseFriendRequest") {
        socket.emit("refuse-friend-request", action.payload)
    }


    next(action)
}

export default socketMiddleware