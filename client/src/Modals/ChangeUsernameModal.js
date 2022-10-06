import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeUsernameModal } from '../Redux/modalsSlice'
import Modal from "react-modal"
import "./ChangeUsernameModal.scss"

export default function ChangeUsernameModal() {

    const [newUsername, setNewUsername] = useState(null)
    const [password, setPassword] = useState("")

    const { changeUsernameModal } = useSelector(state => state.modal)
    const { username } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    const handleNewUsername = e => {
        e.preventDefault()

    }

    return (
        <Modal
            isOpen={changeUsernameModal}
            appElement={document.getElementById('root') || undefined}

            className={{ base: 'change-username-modal', afterOpen: "", beforeClose: "change-username-modal--closed" }}
            overlayClassName={{ base: "change-username-modal__overlay", afterOpen: "", beforeClose: "change-username-modal__overlay--closed" }}

            closeTimeoutMS={295}
            onRequestClose={() => dispatch(closeUsernameModal())}

        >

            <div className='change-username-modal__header'>

                <h1 className='change-username-modal__text'>Change your username</h1>
                <p className='change-username-modal__text-2'>Insert a new username and your existing password.</p>

            </div>


            <div className='change-username-modal__form'>

                <label className='change-username-modal__username-label'>USERNAME</label>

                <input
                    type="text"
                    className='change-username-modal__username-input'
                    value={newUsername ?? username}
                    onChange={e => setNewUsername(e.target.value)}
                />

                <label className='change-username-modal__existing-password-label'>EXISTING PASSWORD</label>

                <input
                    type="password"
                    className='change-username-modal__existing-password-input'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <div className='change-username-modal__btns-container'>

                    <button
                        className='change-username-modal__btn-discard'
                        onClick={() => dispatch(closeUsernameModal())}

                    >
                        Discard
                    </button>

                    <button
                        className='change-username-modal__btn-done'
                     
                    >
                        Done
                    </button>

                </div>

            </div>

        </Modal>
    )
}
