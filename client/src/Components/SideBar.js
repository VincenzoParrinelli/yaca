import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { handleSettings, handleAddFriend, handleButtonToolTip, handleNotificationBell } from "../Redux/modalsSlice"
import micImage from "../Assets/Images/mic.png"
import soundImage from "../Assets/Images/sound.png"
import addFriend from "../Assets/Images/add-friend.png"
import logout from "../Assets/Images/logout.png"
import bellImage from "../Assets/Images/bell.png"
import ButtonTooltip from './ButtonTooltip'
import NotificationBellModal from './NotificationBell';
import './SideBar.scss'

export default function SideBar() {

    const { buttonToolTip, notificationBell } = useSelector(state => state.modal)
    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()


    return (
        <div className='SideBar'>

            <div className='icons'>
                <img src={user.proPicBlob} className='user-icon' onClick={() => dispatch(handleSettings())} />
            </div>

            <div className='user-actions-container'>
                <img src={micImage} className='micImage' />
                <img src={soundImage} className='soundImage' />

            </div>

            <div className='separator-wrapper'>

                <div className='separator' />

            </div>

            <ul className='sidebar-icons'>

                <li>
                    <img
                        value={notificationBell} //parameter that keeps button opacity set to 1 while modal is open
                        src={bellImage}
                        className='notificationBell'
                        onClick={() => dispatch(handleNotificationBell())}
                        onMouseOver={() => dispatch(handleButtonToolTip())}
                        onMouseLeave={() => dispatch(handleButtonToolTip(false))}
                    />

                    {buttonToolTip &&
                        <ButtonTooltip />
                    }

                </li>


                <li><img src={addFriend} className="add-friend-icon" onClick={() => dispatch(handleAddFriend())} /></li>
                <li><img src={logout} className="logout-icon" /></li>

                {notificationBell && <NotificationBellModal />}


            </ul>

        </div>
    )
}
