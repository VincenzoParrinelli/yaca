import React from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from 'react-redux'
import { handleDeleteGroupModal } from '../Redux/modalsSlice'
import "./DeleteGroupModal.scss"

export default function DeleteGroupModal() {

    const { deleteGroupModal } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    return (

        <Modal
            className='delete-group-modal'
            overlayClassName="delete-group-modal__overlay"

            appElement={document.getElementById('root') || undefined}
            isOpen={deleteGroupModal}
            onRequestClose={() => dispatch(handleDeleteGroupModal())}
        >

            <div className='delete-group-modal__container'>

                <h1 className='delete-group-modal__text'>Delete {"<< >>"}</h1>


            </div>

            <footer className='delete-group-modal__container'>

            </footer>
        </Modal>

    )
}
