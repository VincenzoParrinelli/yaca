import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { openNewGroupModal, openLogoutModal } from "../Redux/modalsSlice"
import { handleAddFriend, handleDashboard, openNotifications } from "../Redux/dashboardSlice"
import { handleUserSettings } from '../Redux/settingsSlice';
import { ReactComponent as ChatIcon } from "../Assets/Images/chat-icon.svg"
import micImage from "../Assets/Images/mic.png"
import soundImage from "../Assets/Images/sound.png"
import addFriendImage from "../Assets/Images/add-friend.png"
import plus from "../Assets/Images/plus.png"
import logoutImage from "../Assets/Images/logout.png"
import { ReactComponent as BellIcon } from "../Assets/Images/bell.svg"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import { ReactComponent as SettingsIcon } from "../Assets/Images/settings.svg"
import './SideBar.scss'

export default function SideBar() {

    const { newGroupModal } = useSelector(state => state.modal)
    const { addFriend, dashboard, notifications } = useSelector(state => state.dashboard)
    const { proPicBlob } = useSelector(state => state.user.data)

    const dispatch = useDispatch()


    return (
        <div className='sidebar'>

            <label className='sidebar__propic-container'>

                <img src={proPicBlob ?? defaultProPic} className='sidebar__propic' />

            </label>


            <ul className='sidebar__icons' >

                <li value={dashboard}>

                    <ChatIcon
                        className="sidebar__chat-icon"
                        value={dashboard}
                        onClick={() => dispatch(handleDashboard())}
                    />

                    <span className='sidebar__tooltip'>Dashboard</span>
                </li>

                <li value={notifications}>

                    <BellIcon
                        className='sidebar__notification-bell'
                        value={notifications} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(openNotifications())}
                    />

                    <span className='sidebar__tooltip'>Notifications</span>

                </li>


                <li value={addFriend}>
                    <img
                        src={addFriendImage}
                        className="sidebar__add-friend"
                        value={addFriend} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(handleAddFriend())}
                    />

                    <span className='sidebar__tooltip'>Add Friend</span>

                </li>

                <li value={newGroupModal}>
                    <img
                        src={plus}
                        className="sidebar__create-server"
                        value={newGroupModal}
                        onClick={() => dispatch(openNewGroupModal())}
                    />

                    <span className='sidebar__tooltip'>Create Server</span>

                </li>

                <li>
                    <img
                        src={logoutImage}
                        className="sidebar__logout-icon"
                        onClick={() => dispatch(openLogoutModal())}
                    />

                    <span className='sidebar__tooltip'>Logout</span>

                </li>

                <li>
                    <SettingsIcon
                        className="sidebar__settings-icon"
                        onClick={() => dispatch(handleUserSettings())}
                    />

                    <span className='sidebar__tooltip'>Settings</span>
                </li>

            </ul>

        </div>
    )
}
