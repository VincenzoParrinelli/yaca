import React, { useState, useEffect } from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from 'react-redux'
import { closeNewGroupModal } from '../Redux/modalsSlice'
import "./NewGroupModal.scss"

export default function NewGroupModal() {

    const { data } = useSelector(state => state.user)
    const { newGroupModal } = useSelector(state => state.modal)

    const [groupName, setGroupName] = useState("")

    const dispatch = useDispatch()

    //set groupname to the underneath string every time the modal opens
    useEffect(() => {
        setGroupName(`${data.username}'s Server`)
    }, [])

    return (
        <Modal
            className="new-group-modal"
            overlayClassName="new-group-modal__overlay"

            appElement={document.getElementById('root') || undefined}
            isOpen={newGroupModal}
            onRequestClose={() => dispatch(closeNewGroupModal())}
        >

            <header className='new-group-modal__header'>

                <h1 className='new-group-modal__text'>Create a group</h1>

                <p className='new-group-modal__description'>Select an icon and a name for your group.</p>
                <p className='new-group-modal__description'>You may change them later.</p>

            </header>

            <div className='new-group-modal__input-container'>

                <label className='new-group-modal__server-name-text'>SERVER'S NAME</label>

                <input
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    className='new-group-modal__group-name'
                    type="text"
                    autoFocus
                />
            </div>

            <footer className='new-group-modal__footer'>

                <button
                    className='new-group-modal__create-group-button'
                />
            </footer>

        </Modal>
    )
}
