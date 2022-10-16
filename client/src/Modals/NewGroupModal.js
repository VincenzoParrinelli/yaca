import React, { useState, useEffect, useRef } from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from "uuid"
import { closeNewGroupModal } from '../Redux/modalsSlice'
import { createGroup } from '../Redux/groupSlice'
import createGroupPic from "../Assets/Images/create-group-pic.png"
import "./NewGroupModal.scss"

export default function NewGroupModal() {

    const [groupName, setGroupName] = useState("")
    const [newGroupPic, setNewGroupPic] = useState(null)

    const picRef = useRef(null)

    const { data } = useSelector(state => state.user)
    const { newGroupModal } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    useEffect(() => {

        return () => {
            URL.revokeObjectURL(newGroupPic)
        }

    }, [])

    //reset modal state on open
    useEffect(() => {

        setNewGroupPic(null)
        setGroupName(`${data.username}'s Server`)

    }, [newGroupModal])

    //if user selects an image for his group, add border radius 
    useEffect(() => {

        if (!newGroupPic) return

        picRef.current.style.borderRadius = "50%"

    }, [newGroupPic])


    const handleNewGroup = () => {

    
        const payload = {
            data: {
                userID: data._id,
                groupName,
                groupPicID: uuidv4(),
            },

            file: {
                groupPic: newGroupPic
            },

        }

        dispatch(createGroup(payload))

        dispatch(closeNewGroupModal())
    }

    return (

        <Modal
            isOpen={newGroupModal}
            appElement={document.getElementById('root') || undefined}

            className={{ base: "new-group-modal", afterOpen: "", beforeClose: "new-group-modal--closed" }}
            overlayClassName={{ base: "new-group-modal__overlay", afterOpen: "", beforeClose: "new-group-modal__overlay--closed" }}
            
            closeTimeoutMS={295}
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

            <label className='new-group-modal__group-pro-pic-container'>

                <img
                    ref={picRef}
                    className='new-group-modal__group-pro-pic'
                    src={(newGroupPic && URL.createObjectURL(newGroupPic)) ?? (createGroupPic)}
                />

                <input
                    className='new-group-modal__new-group-pic'
                    type="file"
                    accept='.jpg, .png'
                    onChange={e =>  setNewGroupPic(e.target.files[0])}
                />
            </label>

            <footer className='new-group-modal__footer'>

                <button
                    className='new-group-modal__create-group-button'
                    onClick={e => handleNewGroup(e)}
                >
                    Create
                </button>
            </footer>

        </Modal>

    )
}
