import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deletePrevPic, updateProPic } from '../../../Redux/userSlice'
import defaultProPic from "../../../Assets/Images/user-icon-2.png"
import { v4 as uuidv4 } from "uuid"
import "./UserSettingsMyAccount.scss"

export default function UserSettingsMyAccount() {

    const [newProPic, setNewProPic] = useState(null)
    const [applyImageComponent, setApplyImageComponent] = useState(false)

    const { _id, username, proPicBlob, profilePicID } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    useEffect(() => {

        return () => {
            URL.revokeObjectURL(newProPic)
        }

    }, [])

    useEffect(() => {

        //display buttons that respectively restore or apply a new image
        newProPic && setApplyImageComponent(true)

    }, [newProPic])

    const handleNewPic = e => {

        setNewProPic(e.target.files[0])

    }

    const updatePic = () => {

        const userAndOldPicIDS = {
            userID: _id,
            oldProPicID: profilePicID,
        }

        const newProPicData = {
            userID: _id,
            newProPicID: uuidv4(),
            newProPicFile: newProPic,
        }

        if (profilePicID) dispatch(deletePrevPic(userAndOldPicIDS))

        dispatch(updateProPic(newProPicData))

        setApplyImageComponent(false)

    }

    return (
        <div className='app-settings-my-account'>

            <section className='app-settings-my-account__section-1'>

                <span className='app-settings-my-account__section-1-title'>
                    My account
                </span>

                <div className='app-settings-my-account__user-profile-card'>

                    <div className='app-settings-my-account__banner' />

                    <label className='app-settings-my-account__propic-container'>

                        <img className='app-settings-my-account__propic' src={(newProPic && URL.createObjectURL(newProPic)) ?? (proPicBlob || defaultProPic)} />

                        <input
                            className='app-settings-my-account__new-pro-pic'
                            type="file"
                            accept='.jpg, .png'
                            onClick={e => e.target.value = null} //set value to null on every click, so the user can select the same file again
                            onChange={e => handleNewPic(e)}
                        />

                    </label>

                    <div className='app-settings-my-account__container'>

                        <span className='app-settings-my-account__username'>{username}</span>

                        {newProPic && applyImageComponent &&

                            <div className='app-settings-my-account__container-2'>

                                <button
                                    className='app-settings-my-account__btn-restore'
                                    onClick={() => setNewProPic(null)}
                                >
                                    Restore
                                </button>

                                <button
                                    className='app-settings-my-account__btn-apply-image'
                                    onClick={() => updatePic()}
                                >
                                    Apply Image
                                </button>

                            </div>
                        }

                    </div>


                    <div className='app-settings-my-account__user-settings-container'>

                    </div>

                </div>

            </section>
        </div>
    )
}
