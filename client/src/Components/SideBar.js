import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { handleSettings, handleAddFriend } from "../Redux/modalsSlice"
import addFriend from "../Assets/Images/add-friend.png"
import logout from "../Assets/Images/logout.png"
import './SideBar.scss'

export default function SideBar() {

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    return (
        <div className='SideBar'>

            <div className='icons'>
                <img src={user.proPicBlob} className='user-icon' onClick={() => dispatch(handleSettings())} />
            </div>

            <div className='user-actions-container'>
                <img src={addFriend} className="add-friend-icon" onClick={() => dispatch(handleAddFriend())} />
                <img src={logout} className="logout-icon" />

            </div>

            <div className='separator-wrapper'>

                <div className='separator' />

            </div>
        </div>
    )
}
