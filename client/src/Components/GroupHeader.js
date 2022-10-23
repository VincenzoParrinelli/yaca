import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { openAddGroupMembers } from '../Redux/modalsSlice'
import defaultProPic from "../Assets/Images/user-icon-2.png"
import { ReactComponent as AddFriendIcon } from "../Assets/Images/add-friend.svg"
import "./GroupHeader.scss"

export default function GroupHeader({ groupData }) {

    const { addGroupMembers } = useSelector(state => state.modal)

    const dispatch = useDispatch()


    return (
        <div className='group-header'>

            <div
                key={groupData._id}
                className='group-header__group-propic-container'

            >

                {groupData.proPicBlob ?

                    <img src={groupData.proPicBlob} className='group-header__group-propic' />
                    :
                    <img src={defaultProPic} className='group-header__default-propic' />

                }

                <p className='group-header__groupname'>{groupData.groupName}</p>

            </div>

            <AddFriendIcon
                className='group-header__add-friend-icon'
                value={addGroupMembers}
                onClick={() => dispatch(openAddGroupMembers())}
            />

            <div className='group-header__separator-horizontal' />

        </div>
    )

}
