import React, { useState } from 'react'
import Modal from "react-modal"
import stringSimilarity from "string-similarity"
import { useSelector, useDispatch } from 'react-redux'
import { closeAddGroupMembers } from '../Redux/modalsSlice'
import { sendGroupInvite } from '../Redux/groupSlice'
import lens from "../Assets/Images/search-lens.png"
import cross from "../Assets/Images/x.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./AddGroupMembersModal.scss"

export default function AddGroupMembersModal() {

    const [userToSearch, setUserToSearch] = useState("")

    const { addGroupMembers } = useSelector(state => state.modal)
    const { groupList, selectedGroupID } = useSelector(state => state.group)
    const { data } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const getGroupName = () => {
        
        const group = groupList.find(group => group?._id === selectedGroupID)
        
        if (!group) return
        
        return (
            <span className='add-group-members-modal__header-text'>Add friends in <b>{group.groupName}</b></span>
        )

    }


    //controller that conditionally returns jsx
    const renderSearchedFriends = () => {

        const renderFriends = data.friendList.map(friend => {

            //if we have no user to search, render whole friendlist
            if (!userToSearch) return defaultRenderJSX(friend)

            //else check for string similarity and return friend based on float value 
            const result = stringSimilarity.compareTwoStrings(friend.username, userToSearch)

            if (result > 0.67) return defaultRenderJSX(friend)

        })

        //if searched user in renderFriends array doesn't exist, return no result error, else render results
        if (renderFriends.every(friend => !friend)) return (

            <div className='add-group-members-modal__no-result-error-text'>
                NO RESULT
            </div>
        )

        return renderFriends

    }

    //function with some boilerplate jsx that we need in every case, this func exists to avoid code redundancy 
    const defaultRenderJSX = friend => {

        return (
            <div className='add-group-members-modal__friend-data-container' key={friend._id}>

                <img
                    className='add-group-members-modal__friend-propic'
                    src={friend.proPicBlob ? friend.proPicBlob : defaultProPic}
                />

                <span className='add-group-members-modal__friend-username'>{friend.username}</span>

                <button
                    className='add-group-members-modal__friend-invite'
                    onClick={() => dispatch(sendGroupInvite({ socketID: friend.socketID, groupID: selectedGroupID }))}
                >
                    Invite

                </button>

            </div>
        )
    }


    return (
        <Modal
            className="add-group-members-modal"
            overlayClassName="add-group-members-modal__overlay"

            appElement={document.getElementById('root') || undefined}
            isOpen={addGroupMembers}
            onRequestClose={() => dispatch(closeAddGroupMembers())}

        >

            <header className='add-group-members-modal__header'>

                {getGroupName()}

                <input
                    className='add-group-members-modal__header-input'
                    spellCheck="false"
                    placeholder='Find Friends'
                    onChange={e => setUserToSearch(e.target.value)}

                />


                {userToSearch ?

                    <img
                        className={"add-group-members-modal__header-input-icon add-group-members-modal__header-input-icon--cross"}
                        src={cross}
                        onClick={() => setUserToSearch("")}
                    />

                    :

                    <img
                        className={'add-group-members-modal__header-input-icon add-group-members-modal__header-input-icon--lens'}
                        src={lens}
                    />

                }


            </header>

            <div className='add-group-members-modal__separator-horizontal add-group-members-modal__separator-horizontal--start' />

            {renderSearchedFriends()}

            <div className='add-group-members-modal__separator-horizontal add-group-members-modal__separator-horizontal--end' />

            <span className='add-group-members-modal__invite-text'>OR, INVITE VIA SERVER LINK</span>

        </Modal>
    )
}
