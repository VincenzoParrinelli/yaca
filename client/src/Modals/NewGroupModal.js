import React, { useState, useEffect, useRef } from 'react'
import Modal from "react-modal"
import { useSelector, useDispatch } from 'react-redux'
import { closeNewGroupModal } from '../Redux/modalsSlice'
import { createGroup } from '../Redux/groupSlice'
import createGroupPic from "../Assets/Images/create-group-pic.png"
import "./NewGroupModal.scss"
import { produceWithPatches } from 'immer'

export default function NewGroupModal() {

    const [groupName, setGroupName] = useState("")
    const [groupPic, setGroupPic] = useState(null)
    const [groupPicUrl, setGroupPicUrl] = useState(null)

    const picRef = useRef(null)

    const { data } = useSelector(state => state.user)
    const { newGroupModal } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    //reset modal state on open
    useEffect(() => {

        setGroupPic(null)
        setGroupPicUrl(null)
        setGroupName(`${data.username}'s Server`)

    }, [newGroupModal])

    //if user selects an image for his group, add border radius 
    useEffect(() => {

        if (!groupPicUrl) return

        picRef.current.style.borderRadius = "50%"

    }, [groupPicUrl])


    const handleNewGroupPic = e => {

        setGroupPic(e.target.files[0])
        setGroupPicUrl(URL.createObjectURL(e.target.files[0]))
    }


    const handleNewGroup = () => {

        const groupPicID = groupPicUrl?.split("/")[3]
        const proPicBlob = URL.createObjectURL(groupPic)

        const payload = {
            data: {
                userID: data._id,
                groupName,
                groupPicID,
            },

            file: {
                groupPic
            },

            proPicBlob

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
                    src={groupPicUrl ? groupPicUrl : createGroupPic}
                />

                <input
                    className='new-group-modal__new-group-pic'
                    type="file"
                    accept='.jpg, .png'
                    onChange={e => handleNewGroupPic(e)}
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
