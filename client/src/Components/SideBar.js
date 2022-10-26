import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { openNewGroupModal, openLogoutModal } from "../Redux/modalsSlice"
import { handleAddFriend, handleDashboard, openNotifications } from "../Redux/dashboardSlice"
import { handleUserSettings } from '../Redux/settingsSlice';
import { ReactComponent as ChatIcon } from "../Assets/Images/chat.svg"
import { ReactComponent as AddFriendIcon } from "../Assets/Images/add-friend.svg"
import { ReactComponent as CreateGroupIcon } from "../Assets/Images/create-group.svg"
import { ReactComponent as LogoutIcon } from "../Assets/Images/logout.svg"
import { ReactComponent as BellIcon } from "../Assets/Images/bell.svg"
import { ReactComponent as SettingsIcon } from "../Assets/Images/settings.svg"
import ProPic from './ProPic';
import './SideBar.scss'

export default function SideBar() {

    const { newGroupModal } = useSelector(state => state.modal)
    const { addFriend, dashboard, notifications } = useSelector(state => state.dashboard)
    const { proPicBlob } = useSelector(state => state.user.data)

    const dispatch = useDispatch()


    return (
        <div className='sidebar'>

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

                    <AddFriendIcon
                        className="sidebar__add-friend"
                        value={addFriend} //parameter that keeps button opacity set to 1 while modal is open
                        onClick={() => dispatch(handleAddFriend())}
                    />

                    <span className='sidebar__tooltip'>Add Friend</span>

                </li>

                <li value={newGroupModal}>

                    <CreateGroupIcon
                        className="sidebar__create-server"
                        value={newGroupModal}
                        onClick={() => dispatch(openNewGroupModal())}
                    />

                    <span className='sidebar__tooltip'>Create Server</span>

                </li>

                <li>

                    <SettingsIcon
                        className="sidebar__settings-icon"
                        onClick={() => dispatch(handleUserSettings())}
                    />

                    <span className='sidebar__tooltip'>Settings</span>

                </li>

                <li>

                    <LogoutIcon
                        className="sidebar__logout-icon"
                        onClick={() => dispatch(openLogoutModal())}
                    />

                    <span className='sidebar__tooltip'>Logout</span>

                </li>


                <li>
                    <ProPic
                        proPicBlob={proPicBlob}
                        style={{ top: "120px", width: "2.6em", height: "2.6em" }}
                    />
                </li>

            </ul>

        </div>
    )
}
