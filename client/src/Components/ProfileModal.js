import React, { useState, useEffect } from 'react'
import "./ProfileModal.scss"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from '../Redux/userSlice';
import { handleSettings } from "../Redux/modalsSlice"
import Modal from "react-modal"


export default function ProfileModal() {
    const [newProPic, setNewProPic] = useState(null)
    const [newProPicUrl, setNewProPicUrl] = useState(null)

    const { user } = useSelector(state => state.user)
    const { settings } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const handleNewProPic = e => {
        setNewProPic(e.target.files[0])

        setNewProPicUrl(URL.createObjectURL(e.target.files[0]))
    }

    const updateProfile = () => {
        if (newProPic) {

            //we define these 2 nested objects:
            //payload obj: values that we want to send to the server
            //file obj: raw image that we don't want to send to the server, but to redux only
            //in order to store it in firebase 
            const payload = {
                payload: {
                    newProPicUrl, _id: user._id
                },

                file: {
                    proPic: newProPic
                }
            }

            dispatch(updateUser(payload))
        }

        dispatch(handleSettings())
    }


    return (
        <>
            <Modal
                className="ProfileModal"
                overlayClassName="ProfileModal-overlay"

                appElement={document.getElementById('root') || undefined}
                isOpen={settings}
                onRequestClose={() => dispatch(handleSettings())}

            >
                <label className='proPic-container'>
                    <img className='proPic' src={newProPicUrl ? newProPicUrl : user.proPic} />

                    <input
                        className='pic-changer'
                        type="file"
                        accept='.jpg, .png'
                        onChange={e => handleNewProPic(e)}
                    />
                </label>

                <p className='email' type="text">{user.email}</p>
                <p className='username' type="text">{user.username}</p>

                <footer className='settings-footer'>
                    <button className='save-btn' onClick={() => updateProfile()}>
                        SAVE
                    </button>
                </footer>

            </Modal>
        </>
    )
}
