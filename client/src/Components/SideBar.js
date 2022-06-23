import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {
    handleDashboard,
    handleSettings,
    openNewGroupModal,
    handleAddFriend,
    openNotifications
} from "../Redux/modalsSlice"
import micImage from "../Assets/Images/mic.png"
import soundImage from "../Assets/Images/sound.png"
import addFriendImage from "../Assets/Images/add-friend.png"
import plus from "../Assets/Images/plus.png"
import logout from "../Assets/Images/logout.png"
import home from "../Assets/Images/home.png"
import bellImage from "../Assets/Images/bell.png"
import './SideBar.scss'

export default function SideBar() {

    const { dashboard, addFriend, notifications, newGroupModal } = useSelector(state => state.modal)
    const { data } = useSelector(state => state.user)

    const dispatch = useDispatch()

    return (
        <div className='sidebar'>

            <img src={data.proPicBlob} className='sidebar__propic' onClick={() => dispatch(handleSettings())} />

            <div className='sidebar__actions-container'>
                <img src={micImage} className='sidebar__mic-image' />
                <img src={soundImage} className='sidebar__sound-image' />

            </div>

            <div className='separator-container'>

                <div className='separator' />

            </div>

            <ul className='sidebar__icons' >

                <li>
                    <img
                        src={home}
                        className="sidebar__home"
                        value={dashboard}
                        onClick={() => dispatch(handleDashboard())}
                    />

                    <span className='sidebar__tooltip'>Dashboard</span>
                </li>

                <li>
                    <img
                        src={bellImage}
                        className='sidebar__notification-bell'
                        value={notifications} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(openNotifications())}
                    />
                    <span className='sidebar__tooltip'>Notifications</span>

                </li>


                <li>
                    <img
                        src={addFriendImage}
                        className="sidebar__add-friend"
                        value={addFriend} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(handleAddFriend())}
                    />

                    <span className='sidebar__tooltip'>Add Friend</span>

                </li>

                <li>
                    <img
                        src={plus}
                        className="sidebar__create-server"
                        value={newGroupModal}
                        onClick={() => dispatch(openNewGroupModal())}
                    />

                    <span className='sidebar__tooltip'>Create Server</span>

                </li>

                <li>
                    <img src={logout} className="sidebar__logout-icon" />

                    <span className='sidebar__tooltip'>Logout</span>

                </li>

            </ul>

        </div>
    )
}
