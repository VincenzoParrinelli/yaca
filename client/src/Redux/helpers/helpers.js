import { storage } from "../../firebase"
import { ref, uploadBytes, deleteObject } from "firebase/storage"

//userSlice helpers
export const deletePrevPic = async state => {
    const userID = state.data._id
    const prevPicId = state.data.profilePicId

    if (!prevPicId) return

    const prevPicRef = ref(storage, `proPics/${userID}/${prevPicId}`)

    await deleteObject(prevPicRef).catch(err => {

        if (err.message === "Firebase Storage: Object 'proPics/undefined' does not exist. (storage/object-not-found)") return
    })
}


export const updateProPic = async (state, action) => {

    const userID = state.data._id

    const proPicId = action.payload.profilePicId

    const proPicFile = action.meta.arg.file.proPic

    const proPicRef = ref(storage, `proPics/${userID}/${proPicId}`)

    await uploadBytes(proPicRef, proPicFile).catch(err => { throw err })

}
///


//groupSlice helpers

export const updateGroupPic = async action => {

    const groupID = action.payload._id

    const groupPicID = action.payload.groupPicId

    const groupPicFile = action.meta.arg.file.groupPic

    const groupPicRef = ref(storage, `groupPics/${groupID}/${groupPicID}`)

    await uploadBytes(groupPicRef, groupPicFile).catch(err => { throw err })

}

///