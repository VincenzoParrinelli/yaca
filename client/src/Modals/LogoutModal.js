import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeLogoutModal } from '../Redux/modalsSlice'
import { logout } from "../Redux/userSlice"
import Modal from "react-modal"
import "./LogoutModal.scss"

export default function LogoutModal() {

    const { logoutModal } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch(logout()).then(() => {
            dispatch(closeLogoutModal())
        })

    }

    return (
        <Modal
            isOpen={logoutModal}
            appElement={document.getElementById('root') || undefined}

            className={{ base: 'logout-modal', afterOpen: "", beforeClose: "logout-modal--closed" }}
            overlayClassName={{ base: "logout-modal__overlay", afterOpen: "", beforeClose: "logout-modal__overlay--closed" }}

            closeTimeoutMS={295}
            onRequestClose={() => dispatch(closeLogoutModal())}
        >
            <div className='logout-modal__container'>

                <p className='logout-modal__logout-text'>Logout</p>
                <span className='logout-modal__logout-text-2'>Are you sure you want to logout?</span>


                <footer className='logout-modal__footer'>

                    <button
                        className='logout-modal__btn logout-modal__btn--discard'
                        onClick={() => dispatch(closeLogoutModal())}
                    >
                        Discard
                    </button>

                    <button
                        className='logout-modal__btn logout-modal__btn--logout'
                        onClick={() => handleLogout()}

                    >
                        Logout
                    </button>

                </footer>

            </div>

        </Modal>
    )
}
