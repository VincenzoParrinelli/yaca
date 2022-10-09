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

        socket.on("receive-searched-users", users => {

            //loadingUsers returns n promises based on how many users have been fetched
            const loadingUsers = users.map(async user => {

                const userID = user._id
                const userProPic = user.profilePicId

                const proPicRef = ref(storage, `proPics/${userID}/${userProPic}`)

                //get user multimedia files from firebase and then return updated obj
                return await getDownloadURL(proPicRef).then(proPicBlob => {

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

        //group listeners

        socket.on("send-updated-group-settings", updatedGroupData => {

            store.dispatch({
                type: "group/getUpdatedGroupSettings",
                payload: updatedGroupData
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

    if (action.type === "socket/searchUsers") {

        const userID = store.getState().user.data._id

        const payload = {
            userID,
            username: action.payload
        }

        socket.emit("search-user", payload)
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


    //friend requests socket handlers

    if (action.type === "socket/sendFriendRequest") socket.emit("send-friend-request", action.payload)

    if (action.type === "socket/acceptFriendRequest") socket.emit("accept-friend-request", action.payload)

    if (action.type === "socket/refuseFriendRequest") socket.emit("refuse-friend-request", action.payload)


    //group socket handlers

    if (action.type === "group/sendGroupInvite") socket.emit("send-group-invite", action.payload)

    if (action.type === "group/deleteGroup") socket.emit("delete-group", action.payload)


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