import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {
    handleDashboard,
    handleSettings,
    handleAddFriend,
    openButtonToolTip,
    closeButtonToolTip,
    openNotifications
} from "../Redux/modalsSlice"
import micImage from "../Assets/Images/mic.png"
import soundImage from "../Assets/Images/sound.png"
import addFriendImage from "../Assets/Images/add-friend.png"
import logout from "../Assets/Images/logout.png"
import home from "../Assets/Images/home.png"
import bellImage from "../Assets/Images/bell.png"
import ButtonTooltip from './ButtonTooltip'
import './SideBar.scss'

export default function SideBar() {

    const { dashboard, addFriend, buttonToolTip, notificationBell } = useSelector(state => state.modal)
    const { data } = useSelector(state => state.user)

    const dispatch = useDispatch()


    return (
        <div className='SideBar'>

            <div className='icons'>
                <img src={data.proPicBlob} className='user-icon' onClick={() => dispatch(handleSettings())} />
            </div>

            <div className='user-actions-container'>
                <img src={micImage} className='micImage' />
                <img src={soundImage} className='soundImage' />

            </div>

            <div className='separator-wrapper'>

                <div className='separator' />

            </div>

            <ul className='sidebar-icons' >

                <li>
                    <img
                        src={home}
                        data-tooltiptext="Dashboard"
                        className="home"
                        value={dashboard}
                        onClick={() => dispatch(handleDashboard())}
                        onMouseOver={() => dispatch(openButtonToolTip())}
                        onMouseLeave={() => dispatch(closeButtonToolTip())}
                    />
                </li>

                <li>
                    <img
                        src={bellImage}
                        data-tooltiptext="Notifications"
                        className='notificationBell'
                        value={notificationBell} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(openNotifications())}
                        onMouseOver={() => dispatch(openButtonToolTip())}
                        onMouseLeave={() => dispatch(closeButtonToolTip())}
                    />

                </li>


                <li>
                    <img
                        src={addFriendImage}
                        data-tooltiptext="Add friend"
                        className="add-friend-icon"
                        value={addFriend} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(handleAddFriend())}
                        onMouseOver={() => dispatch(openButtonToolTip())}
                        onMouseLeave={() => dispatch(closeButtonToolTip())}
                    />
                </li>
                <li><img src={logout} className="logout-icon" /></li>

            </ul>

            {buttonToolTip &&
                <ButtonTooltip />
            }

        </div>
    )
}
