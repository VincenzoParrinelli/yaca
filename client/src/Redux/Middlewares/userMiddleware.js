import { loadProPics } from "../../helpers/firebase.helpers"

const userMiddleware = store => next => async action => {

    next(action)

    if (action.type === "user/login/fulfilled") {

        //load current user proPics
        const user = store.getState().user.data

        if (user.profilePicID) {

            const userProPicBlob = await loadProPics(user)

            store.dispatch({
                type: "user/loadUserProPic",
                payload: userProPicBlob
            })

        }


        //load friends proPics
        const friendList = store.getState().user.data.friendList

        if (friendList.length >= 1) {

            friendList.map(async friend => {

                await loadProPics(friend).then(friendProPicBlob => {

                    store.dispatch({
                        type: "user/loadFriendProPic",
                        payload: friendProPicBlob
                    })
                })

             
            })

        }


        //load friendRequests data
        const friendRequestsData = action.payload.requestsData

        if (friendRequestsData.length >= 1) {

            const loadRequests = await loadProPics(friendRequestsData)

            Promise.all(loadRequests).then(requests => {

                store.dispatch({
                    type: "user/loadRequestProPic",
                    payload: requests
                })
            })

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

            Promise.all(loadGroups).then(groups => {

                store.dispatch({
                    type: "group/loadGroupsProPics",
                    payload: groups
                })
            })

        }

    }

}

export default userMiddleware