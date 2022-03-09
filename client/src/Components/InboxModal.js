import React from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from "react-redux"
import { handleInbox } from "../Redux/modalsSlice"
import "./InboxModal.scss"

export default function InboxModal() {

    const { inbox } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    return (
        <>
            <Modal
                className="InboxModal"
                overlayClassName="InboxModal-overlay"

                appElement={document.getElementById('root') || undefined}
                isOpen={inbox}
                onRequestClose={() => dispatch(handleInbox())}
                
            >
                <div>
                    
                </div>

            </Modal>
        </>
    )
}
