import io from 'socket.io-client'

var socket

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

var options = {
    withCredentials: true
}

const socketMiddleware = store => next => action => {

    if (action.type === "socket/connection") {
        socket = io(serverUrl, options)

        socket.on("connect_error", err => {

            store.dispatch({
                type: "socket/error",
                payload: err.message
            })

        })
    }


    next(action)
}

export default socketMiddleware