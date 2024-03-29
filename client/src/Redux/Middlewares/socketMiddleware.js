import io from 'socket.io-client'
import { storage } from "../../firebase"
import { ref, getDownloadURL } from "firebase/storage"
import { loadProPics } from '../../helpers/firebase.helpers'

var socket

const serverUrl = process.env.REACT_APP_SERVER_ROOT_URL

const socketMiddleware = store => next => action => {

    if (action.type === "socket/connection") {

        const options = {
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

        //user listeners

        socket.on("update-friend-status", friend => {

            store.dispatch({
                type: "user/updateFriendStatus",
                payload: friend
            })
        })

        socket.on("receive-friend-updated-pro-pic", async payload => {

            const { userID, newProPicID } = payload

            //download image from firebase
            const proPicBlob = await loadProPics({ _id: userID, profilePicID: newProPicID })

            store.dispatch({
                type: "user/setFriendUpdatedProPic",
                payload: { userID, proPicBlob }
            })
        })

        socket.on("receive-new-friend-username", payload => {

            store.dispatch({
                type: "user/setFriendUpdatedUsername",
                payload
            })
        })

        // socket.on("receive-searched-users", users => {

        //     //loadingUsers returns n promises based on how many users have been fetched
        //     const loadingUsers = users.map(async user => {

        //         const userID = user._id
        //         const userProPic = user.profilePicId

        //         const proPicRef = ref(storage, `proPics/${userID}/${userProPic}`)

        //         //get user multimedia files from firebase and then return updated obj
        //         return await getDownloadURL(proPicRef).then(proPicBlob => {

        //             user.proPicBlob = proPicBlob

        //             return user
        //         }).catch(() => { return user })

        //     })

        //     //await users loading 
        //     Promise.all(loadingUsers).then(loadedUsers => {

        //         store.dispatch({
        //             type: "socket/getSearchedUsers",
        //             payload: loadedUsers
        //         })

        //     })
        // })

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

        // conversation listeners

        socket.on("get-new-conversation", newConversation => {

            store.dispatch({
                type: "conversation/getNewConversationFromSocket",
                payload: newConversation
            })

        })

        socket.on("get-message", payload => {

            store.dispatch({
                type: "conversation/getMessage",
                payload
            })

            // store.dispatch({
            //     type: "user/increaseNewMessageCounter",
            //     payload: conversation._id
            // })
        })

        //group listeners

        socket.on("send-updated-group-settings", updatedGroupData => {

            store.dispatch({
                type: "group/getUpdatedGroupSettings",
                payload: updatedGroupData
            })
        })

        socket.on("get-group-message", payload => {

            store.dispatch({
                type: "group/getGroupMessage",
                payload
            })
        })

        socket.on("delete-group-successful", groupID => {

            store.dispatch({
                type: "group/handleDeletedGroup",
                payload: groupID
            })

            store.dispatch({
                type: "settings/handleOpenGroupSettings"
            })

        })

    }

    //user socket handlers

    if (action.type === "user/updateProPic/fulfilled") {

        const { userID, newProPicID } = action.payload

        //send only userID and newProPicID since we don't need to send proPicBlob to server
        socket.emit("update-pro-pic", { userID, newProPicID })
    }


    if (action.type === "user/changeUsername/fulfilled") {

        const { _id, newUsername } = action.payload.data
        const friendList = action.payload.friendList

        socket.emit("update-username", { _id, newUsername, friendList })
    }


    // friend requests socket handlers

    if (action.type === "socket/sendFriendRequest") socket.emit("send-friend-request", action.payload)

    if (action.type === "socket/acceptFriendRequest") socket.emit("accept-friend-request", action.payload)

    if (action.type === "socket/refuseFriendRequest") socket.emit("refuse-friend-request", action.payload)


    // conversation handlers

    if (action.type === "conversation/newConversation/fulfilled" && action.meta.arg.socketID) socket.emit("send-new-conversation", { newConversation: action.payload, receiverSocketID: action.meta.arg.socketID })

    if (action.type === "conversation/sendMessage/fulfilled") {

        const { newMessage, conversationID, receiverSocketID } = action.meta.arg

        const payload = { newMessage, receiverSocketID, conversationID }

        socket.emit("send-message", payload)

    }

    if (action.type === "group/sendGroupMessage/fulfilled") {

        const { newMessage, groupID } = action.meta.arg

        const payload = { newMessage, groupID }

        socket.emit("send-group-message", payload)

    }

    // group socket handlers

    if (action.type === "group/sendGroupInvite") socket.emit("send-group-invite", action.payload)

    if (action.type === "group/deleteGroup") socket.emit("delete-group", action.payload)


    if (action.type === "socket/sendMessage") {

        const { message, currentUserID, friendSocketID, conversationID } = action.payload

        const payload = {
            message,
            currentUserID,
            friendSocketID,
            conversationID
        }

        socket.emit("send-message", payload)
    }

    if (action.type === "group/updateGroupSettings") {

        const userID = store.getState().user.data._id
        const { selectedGroupID, groupSettingsContent } = store.getState().settings

        const openContentKey = Object.keys(groupSettingsContent).find(content => groupSettingsContent[content])


        if (openContentKey === "overview") {
            const settingsOverview = store.getState().settingsOverview

            //filter settingsOverview by removing null values
            const newSettings = Object.fromEntries(Object.entries(settingsOverview).filter(([_, value]) => value !== null))

            socket.emit("update-group-settings", { userID, selectedGroupID, newSettings })

        }
    }

    next(action)
}

export default socketMiddleware