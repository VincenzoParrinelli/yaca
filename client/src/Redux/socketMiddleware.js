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

        socket.on("receive-friend-request", user => {
            store.dispatch({
                type: "user/getFriendRequests",
                payload: user
            })
        })
    }

    if (action.type === "socket/sendFriendRequest") {
        socket.emit("send-friend-request", action.payload)
    }


    next(action)
}

export default socketMiddleware