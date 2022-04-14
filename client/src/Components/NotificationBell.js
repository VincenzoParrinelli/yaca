import React from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from "react-redux"
import { handleNotificationBell } from "../Redux/modalsSlice"
import "./NotificationBell.scss"

export default function InboxModal() {

    const { notificationBell } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    return (
        <>
            <Modal
                className="NotificationBell"
                overlayClassName="NotificationBell-overlay"

                appElement={document.getElementById('root') || undefined}
                isOpen={notificationBell}
                onRequestClose={() => dispatch(handleNotificationBell())}
                
            >
                <div>
                    
                </div>

            </Modal>
        </>
    )
}
