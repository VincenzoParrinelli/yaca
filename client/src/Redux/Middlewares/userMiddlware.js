import { storage } from "../../firebase"
import { ref, getDownloadURL } from "firebase/storage"

const userMiddleware = store => next => action => {

    if (action.type === "user/load/fulfilled") {

        let friendList = store.getState().user.user.friendList

        friendList.forEach(async (friend, i) => {
            let friendID = friend._id
            let friendProPic = friend.profilePicId

            const proPicRef = ref(storage, `proPics/${friendID}/${friendProPic}`)

            await getDownloadURL(proPicRef).then(proPicBlob => {

                let payload = { proPicBlob, i }

                store.dispatch({
                    type: "user/getFriendProPic",
                    payload
                })

            })

        })

    }

    next(action)
}

export default userMiddleware