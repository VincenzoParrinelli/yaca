import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { connection } from '../Redux/socketSlice';
import { handleDashboard } from '../Redux/dashboardSlice';
import SideBar from "./SideBar"
import NewGroupModal from '../Modals/NewGroupModal';
import AddGroupMembersModal from '../Modals/AddGroupMembersModal';
import ChatOpen from "./ChatOpen"
import ChatList from './ChatList'
import AddFriend from './AddFriendList';
import Notifications from './Notifications';
import ChatListContextMenus from "./Settings/ChatListContextMenus"
import SettingsController from './Settings/SettingsController';
import "./Dashboard.scss"

export default function Dashboard() {
    const { errors } = useSelector(state => state.sockets)
    const { data, isLogged } = useSelector(state => state.user)
    const { selectedUserIndex } = useSelector(state => state.conversation)
    const { addFriend, notifications } = useSelector(state => state.dashboard)
    const { isOpenFlag } = useSelector(state => state.settings)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if (!isLogged || !errors.authorized) {
            navigate("/")

        } else {
            dispatch(connection(data._id))
            dispatch(handleDashboard())
        }

    }, [errors.authorized, isLogged])

    return (
        <>

            {/* if no settings menu is open, render dashboard */}

            {Object.values(isOpenFlag).some(state => state) ? <SettingsController /> :

                <div className='dashboard'>

                    <NewGroupModal />
                    <AddGroupMembersModal />

                    <SideBar />
                    <div className='dashboard__separator-vertical' />

                    <div className='dashboard__lists-container'>
                        {
                            addFriend ? <AddFriend /> :
                                notifications ? <Notifications /> : <ChatList />
                        }

                    </div>

                    <div className='dashboard__separator-vertical' />

                    {selectedUserIndex !== null && <ChatOpen />}

                    <ChatListContextMenus />

                </div>

            }

        </>
    )
}