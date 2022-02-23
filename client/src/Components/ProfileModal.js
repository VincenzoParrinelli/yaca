import React, { useState, useEffect } from 'react'
import "./ProfileModal.scss"
import { useSelector, useDispatch } from "react-redux"
import { updateUser } from '../Redux/userSlice';
import { closeSettings } from "../Redux/modalSlice"
import Modal from "react-modal"


export default function ProfileModal() {
    const [newProPic, setNewProPic] = useState(null)

    const { user } = useSelector(state => state.user)
    const { settings } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const updateProfile = () => {
        if (newProPic) {
            dispatch(updateUser({ newProPic, _id: user._id }))
        }

        dispatch(closeSettings())
    }

    return (
        <>
            <Modal
                className="ProfileModal"
                overlayClassName="overlay"

                appElement={document.getElementById('root') || undefined}
                isOpen={settings}
                onRequestClose={() => dispatch(closeSettings())}

            >
                <label className='proPic-container'>
                    <img className='proPic' src={newProPic} />

                    <input
                        className='pic-changer'
                        type="file"
                        accept='.jpg, .png'
                        onChange={e => setNewProPic(URL.createObjectURL(e.target.files[0]))}
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
