import { loadProPics } from "../../helpers/firebase.helpers"

const userMiddleware = store => next => async action => {

    next(action)

    if (action.type === "user/login/fulfilled") {

        let promisesQueue = []

        //load current user proPic
        const user = action.payload.userData

        if (user.profilePicID) {

            const userDataWithProPicBlob = await loadProPics(user)

            store.dispatch({
                type: "user/loadedUser",
                payload: userDataWithProPicBlob
            })

        } else {

            store.dispatch({
                type: "user/loadedUser",
                payload: user
            })

        }

        //load friends proPics
        const friendList = action.payload.friendList

        if (friendList.length >= 1) {

            const friendListLoadedAssets = friendList.map(async friend => await loadProPics(friend))

            promisesQueue.push(Promise.all(friendListLoadedAssets).then(friendListLoadedAssetsData => {

                store.dispatch({
                    type: "user/loadedFriendList",
                    payload: friendListLoadedAssetsData
                })

            }))
        }

        //load friendRequests data
        const friendRequestsData = action.payload.requestsData

        if (friendRequestsData.length >= 1) {

            const loadRequests = await loadProPics(friendRequestsData)

            promisesQueue.push(Promise.all(loadRequests).then(requests => {

                store.dispatch({
                    type: "user/loadRequestProPic",
                    payload: requests
                })
            }))

        }


        //load conversations last messages
        const convData = action.payload.convData

        //for each conversation set an isFullyFetched flag to false since we are only fetching the last messages for now
        convData.forEach(conv => {
            conv.isFullyFetched = false
        })

        store.dispatch({
            type: "conversation/getLastMessages",
            payload: convData
        })


        const groupList = action.payload.groupList

        if (groupList.length >= 1) {

            groupList.forEach(group => {
                group.isFullyFetched = false
            })

            //load groups proPics
            const loadGroups = groupList.map(async group => await loadProPics(group))

            promisesQueue.push(Promise.all(loadGroups).then(groups => {

                store.dispatch({
                    type: "group/loadGroupsProPics",
                    payload: groups
                })
            }))

        }


        Promise.all(promisesQueue).then(() => {

            //set is logged flag to true when everything is loaded
            store.dispatch({
                type: "user/setIsLogged"
            })

        })
    }
}

export default userMiddleware