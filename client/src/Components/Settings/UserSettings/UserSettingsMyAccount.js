import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openUsernameModal } from '../../../Redux/modalsSlice'
import { deletePrevPic, updateProPic } from '../../../Redux/userSlice'
import defaultProPic from "../../../Assets/Images/user-icon-2.png"
import { v4 as uuidv4 } from "uuid"
import "./UserSettingsMyAccount.scss"

export default function UserSettingsMyAccount() {

    const [showChangePicText, setShowChangePicText] = useState(false)
    const [newProPic, setNewProPic] = useState(null)
    const [applyImageComponent, setApplyImageComponent] = useState(false)

    const { _id, username, proPicBlob, profilePicID, email } = useSelector(state => state.user.data)

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

                        {showChangePicText && <span className='app-settings-my-account__change-pic-text'>CHANGE PIC</span>}

                        <img className='app-settings-my-account__propic'
                            src={(newProPic && URL.createObjectURL(newProPic)) ?? (proPicBlob || defaultProPic)}
                            onMouseEnter={() => setShowChangePicText(true)}
                            onMouseLeave={() => setShowChangePicText(false)}
                        />

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

                        <div className='app-settings-my-account__change-username-container'>

                            <div className='app-settings-my-account__username-2'>USERNAME</div>

                            <span className='app-settings-my-account__username-3'>{username}</span>

                            <button
                                className='app-settings-my-account__btn-modify'
                                onClick={() => dispatch(openUsernameModal())}
                            >
                                Modify
                            </button>

                        </div>

                        <div className='app-settings-my-account__change-email-container'>

                            <div className='app-settings-my-account__email'>E-MAIL</div>

                            <span className='app-settings-my-account__username-3'>{email}</span>

                            <button className='app-settings-my-account__btn-modify'>Modify</button>

                        </div>

                    </div>

                </div>

            </section>
        </div>
    )
}
