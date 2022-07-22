import React, { useState, useEffect } from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from 'react-redux'
import { handleDeleteGroupModal } from '../Redux/modalsSlice'
import "./DeleteGroupModal.scss"

export default function DeleteGroupModal(selectedGroupData) {

    const [enteredGroupName, setEnteredGroupName] = useState("")
    const [renderError, setRenderError] = useState(false)

    const { deleteGroupModal } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    const handleDeleteGroup = () => {
        if (enteredGroupName !== selectedGroupData.groupName) setRenderError(true)
    }

    return (

        <Modal
            className='delete-group-modal'
            overlayClassName="delete-group-modal__overlay"

            appElement={document.getElementById('root') || undefined}
            isOpen={deleteGroupModal}
            onRequestClose={() => dispatch(handleDeleteGroupModal())}
        >

            <div className='delete-group-modal__container'>

                <h1 className='delete-group-modal__text'>Delete {`<<${selectedGroupData.groupName}>>`}</h1>


                <div className='delete-group-modal__warning-box'>

                    <p className='delete-group-modal__warning-box-text'>Are you sure you want to delete <b>{selectedGroupData.groupName}?</b></p>

                    <p className='delete-group-modal__warning-box-text'>This action cannot be reversed.</p>

                </div>

                <div className='delete-group-modal__input-container'>

                    <span className='delete-group-modal__input-text'>ENTER SERVER NAME</span>

                    <input
                        className='delete-group-modal__input'
                        type="text"
                        value={enteredGroupName}
                        onChange={e => setEnteredGroupName(e.target.value)}
                        autoFocus
                    />
                </div>

                {renderError && <span className='delete-group-modal__input-not-equal-error'> You haven't entered the correct group name </span>}

            </div>

            <footer className='delete-group-modal__footer'>

                <div className='delete-group-modal__btns-container'>

                    <button
                        className='delete-group-modal__discard-btn'
                        onClick={() => dispatch(handleDeleteGroupModal())}
                    >
                        Discard
                    </button>

                    <button
                        className='delete-group-modal__delete-btn'
                        onClick={() => handleDeleteGroup()}
                    >

                        Delete group
                    </button>

                </div>

            </footer>
        </Modal>

    )
}
