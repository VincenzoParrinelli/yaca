import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeUsernameModal } from '../Redux/modalsSlice'
import { changeUsername } from '../Redux/userSlice'
import { reset as errorsReset } from '../Redux/errorsSlice';
import Modal from "react-modal"
import "./ChangeUsernameModal.scss"

export default function ChangeUsernameModal() {

    const [newUsername, setNewUsername] = useState(null)
    const [password, setPassword] = useState("")

    const { changeUsernameModal } = useSelector(state => state.modal)
    const { _id, username, friendList } = useSelector(state => state.user.data)
    const { passwordErrors } = useSelector(state => state.error)

    const dispatch = useDispatch()

    const passwordLabelRef = useRef(null)

    useEffect(() => {

        if (passwordErrors.isEmpty || passwordErrors.isInvalid) passwordLabelRef.current.classList.add("change-username-modal__existing-password-label--errors")

    }, [passwordErrors])

    const handleNewUsername = () => {

        const payload = {

            data: {
                _id, newUsername, password
            },

            friendList
        }


        dispatch(changeUsername(payload)).then(action => {

            //if username update has been successful close modal and reset errors state
            if (action.type === "user/changeUsername/fulfilled") dispatch(closeUsernameModal())


        })
    }

    const handleCloseModal = () => {
        dispatch(closeUsernameModal())
        dispatch(errorsReset())
    }

    return (
        <Modal
            isOpen={changeUsernameModal}
            appElement={document.getElementById('root') || undefined}

            className={{ base: 'change-username-modal', afterOpen: "", beforeClose: "change-username-modal--closed" }}
            overlayClassName={{ base: "change-username-modal__overlay", afterOpen: "", beforeClose: "change-username-modal__overlay--closed" }}

            closeTimeoutMS={295}
            onRequestClose={() => handleCloseModal()}

        >

            <div className='change-username-modal__header'>

                <h1 className='change-username-modal__text'>Change your username</h1>
                <p className='change-username-modal__text-2'>Insert a new username and your existing password.</p>

            </div>


            <div className='change-username-modal__form'>

                <label className='change-username-modal__username-label'>
                    USERNAME
                </label>

                <input
                    type="text"
                    className='change-username-modal__username-input'
                    value={newUsername ?? username}
                    onChange={e => setNewUsername(e.target.value)}
                />

                <label ref={passwordLabelRef} className='change-username-modal__existing-password-label'>

                    EXISTING PASSWORD

                    {passwordErrors.isEmpty &&

                        <span className='change-username-modal__existing-password-label change-username-modal__existing-password-label--errors'> - Please insert your password</span>

                    }

                    {passwordErrors.isInvalid &&

                        <span className='change-username-modal__existing-password-label change-username-modal__existing-password-label--errors'> - Passwords do not match</span>

                    }

                </label>

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
                        onClick={() => handleNewUsername()}

                    >
                        Done
                    </button>

                </div>

            </div>

        </Modal>
    )
}
