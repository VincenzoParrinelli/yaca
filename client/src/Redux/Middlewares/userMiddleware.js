import { storage } from "../../firebase"
import { ref, getDownloadURL } from "firebase/storage"

const userMiddleware = store => next => async action => {

    next(action)

    if (action.type === "user/login/fulfilled") {

        //load current user proPics
        const user = store.getState().user.data

        const userID = user._id
        const userProfilePicId = user.profilePicId

        const proPicRef = ref(storage, `proPics/${userID}/${userProfilePicId}`)

        await getDownloadURL(proPicRef).then(proPicBlob => {

            store.dispatch({
                type: "user/loadProPic",
                payload: proPicBlob
            })
        })


        //load friends proPics
        const friendList = store.getState().user.data.friendList

        friendList.map(async (friend, i) => {

            const friendID = friend._id
            const friendProPic = friend.profilePicId

            const proPicRef = ref(storage, `proPics/${friendID}/${friendProPic}`)

            await getDownloadURL(proPicRef).then(proPicBlob => {

                const payload = { proPicBlob, i }

                store.dispatch({
                    type: "user/loadFriendProPic",
                    payload
                })

            })

        })

        //load friendRequests data
        const friendRequestsData = action.payload.requestsData

        const loadRequests = friendRequestsData.map(async request => {

            const { _id, profilePicId } = request

            if (!profilePicId) return

            const proPicRef = ref(storage, `proPics/${_id}/${profilePicId}`)

            return getDownloadURL(proPicRef).then(proPicBlob => {

                request.proPicBlob = proPicBlob

                return request
            }).catch(() => { return request })
        })


        Promise.all(loadRequests).then(requests => {

            store.dispatch({
                type: "user/loadRequestProPic",
                payload: requests
            })
        })

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

        //load groups proPics
        const groupList = action.payload.groupList

        groupList.forEach(group => {
            group.isFullyFetched = false
        })

        const loadGroups = groupList.map(async group => {

            const { _id, groupPicId } = group

            if (!groupPicId) return group

            const proPicRef = ref(storage, `groupPics/${_id}/${groupPicId}`)

            return getDownloadURL(proPicRef).then(proPicBlob => {
                group.proPicBlob = proPicBlob

                return group
            }).catch(() => { return group })

        })

        Promise.all(loadGroups).then(groups => {

            console.log(groups)

            store.dispatch({
                type: "group/loadGroups",
                payload: groups
            })
        })
    }

}

export default userMiddleware