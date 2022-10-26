import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { openAddGroupMembers } from '../Redux/modalsSlice'
import { ReactComponent as AddFriendIcon } from "../Assets/Images/add-friend.svg"
import ProPic from './ProPic';
import "./GroupHeader.scss"

export default function GroupHeader({ groupData }) {

    const { addGroupMembers } = useSelector(state => state.modal)

    const dispatch = useDispatch()


    return (
        <div className='group-header'>

            <ProPic
                proPicBlob={groupData.proPicBlob}
            />

            <div>

                <span className='group-header__groupname'>{groupData.groupName}</span>

                <AddFriendIcon
                    className='group-header__add-friend-icon'
                    value={addGroupMembers}
                    onClick={() => dispatch(openAddGroupMembers())}
                />


            </div>

        </div>
    )

}
