import { storage } from "../firebase"
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
import { toBase64 } from "./base64Converter"

//userSlice helpers

export const firebaseUploadProPic = async payload => {

    const { userID, newProPicID } = payload
    const newProPicFile = payload.newProPicFile

    const proPicRef = ref(storage, `proPics/${userID}/${newProPicID}`)

    return await uploadBytes(proPicRef, newProPicFile).then(async () => {

        return { newProPicID, userID, newProPicBlob: await toBase64(newProPicFile) }

    }).catch(err => { throw err })

}

export const firebaseDeletePrevPic = async payload => {

    const { userID, oldProPicID } = payload

    const prevPicRef = ref(storage, `proPics/${userID}/${oldProPicID}`)

    return await deleteObject(prevPicRef).catch(err => {

        if (err.message === "Firebase Storage: Object 'proPics/undefined' does not exist. (storage/object-not-found)") return
    })
}


///


//groupSlice helpers

export const updateGroupPic = async action => {

    const groupID = action.payload._id

    const groupPicID = action.payload.groupPicID

    const groupPicFile = action.meta.arg.file.groupPic

    const groupPicRef = ref(storage, `groupPics/${groupID}/${groupPicID}`)

    await uploadBytes(groupPicRef, groupPicFile).catch(err => { throw err })

}

///

//load ProfilePictures

export const loadProPics = async user => {

    //check if the user or the group has a profile pic then download it from firebase
    if (user.profilePicID || user.groupPicID) {

        const _id = user._id
        const profilePicID = user.profilePicID ?? user.groupPicID

        const proPicRef = ref(storage, `${user.profilePicID ? "proPics" : "groupPics"}/${_id}/${profilePicID}`)

        return await getDownloadURL(proPicRef).then(proPicBlob => proPicBlob)

    } 

}