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

        friendList.forEach(async (friend, i) => {
            const friendID = friend._id
            const friendProPic = friend.profilePicId

            const proPicRef = ref(storage, `proPics/${friendID}/${friendProPic}`)

            await getDownloadURL(proPicRef).then(proPicBlob => {

                let payload = { proPicBlob, i }

                store.dispatch({
                    type: "user/loadFriendProPic",
                    payload
                })

            })

        })

    }

}

export default userMiddleware