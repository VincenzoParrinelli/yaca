import io from 'socket.io-client'
import { storage } from "../../firebase"
import { ref, getDownloadURL } from "firebase/storage"

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

            //loadingUsers returns n promises based on how many users have been fetched
            const loadingUsers = users.map(async user => {

                const userID = user._id
                const userProPic = user.profilePicId

                const proPicRef = ref(storage, `proPics/${userID}/${userProPic}`)

                //get user multimedia files from firebase and then return updated obj
                return getDownloadURL(proPicRef).then(proPicBlob => {

                    user.proPicBlob = proPicBlob

                    return user
                }).catch(() => { return user })

            })

            //await users loading 
            Promise.all(loadingUsers).then(loadedUsers => {

                store.dispatch({
                    type: "socket/getSearchedUsers",
                    payload: loadedUsers
                })

            })
        })

        socket.on("receive-friend-request", user => {

            const proPicRef = ref(storage, `proPics/${user._id}/${user.profilePicId}`)

            getDownloadURL(proPicRef).then(proPicBlob => {

                user.proPicBlob = proPicBlob

                store.dispatch({
                    type: "user/getFriendRequests",
                    payload: user
                })
             
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

        socket.on("get-message", conversation => {

            store.dispatch({
                type: "conversation/getMessage",
                payload: conversation
            })
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

    if (action.type === "group/sendGroupInvite") {
        socket.emit("send-group-invite", action.payload)
    }

    if (action.type === "socket/sendMessage") {
        const conversationID = store.getState().conversation.selectedConversationID
        const currentUserID = store.getState().user.data._id
        const selectedFriendID = store.getState().conversation.selectedFriendID
        const friendList = store.getState().user.data.friendList

        const getFriend = friendList.find(friend => friend._id === selectedFriendID)

        const payload = {
            conversationID,
            currentUserID,
            selectedUserSocketID: getFriend.socketID,
            message: action.payload
        }

        socket.emit("send-message", payload)
    }

    next(action)
}

export default socketMiddleware