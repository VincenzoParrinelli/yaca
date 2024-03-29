import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { connection } from '../Redux/socketSlice';
import { handleDashboard } from '../Redux/dashboardSlice';
import SideBar from "./SideBar"
import NewGroupModal from '../Modals/NewGroupModal';
import AddGroupMembersModal from '../Modals/AddGroupMembersModal';
import LogoutModal from '../Modals/LogoutModal';
import ChatList from './ChatList'
import AddFriend from './AddFriendList';
import Notifications from './Notifications';
import ChatListContextMenus from "./Settings/ChatListContextMenus"
import SettingsController from './Settings/SettingsController';
import "./Dashboard.scss"

export default function Dashboard() {
    const { errors } = useSelector(state => state.sockets)
    const { data, isLogged } = useSelector(state => state.user)
    const { addFriend, notifications } = useSelector(state => state.dashboard)
    const { isOpenFlag } = useSelector(state => state.settings)

    const dispatch = useDispatch()

    useEffect(() => {

        if (!isLogged) return

        dispatch(connection(data._id))
        dispatch(handleDashboard())


    }, [data._id, dispatch, errors.authorized, isLogged])

    return (

        isLogged

            ?

            <>

                {/* if no settings menu is open, render dashboard */}

                {Object.values(isOpenFlag).some(state => state) ? <SettingsController /> :

                    <div className='dashboard'>

                        <NewGroupModal />
                        <AddGroupMembersModal />
                        <LogoutModal />

                        <SideBar />


                        <div className='dashboard__lists-container'>

                            {
                                addFriend ? <AddFriend /> : <ChatList />
                            }

                        </div>

                        {notifications && <Notifications />}

                        <ChatListContextMenus />

                        <Outlet />

                    </div>

                }

            </>

            :

            <Navigate to="/" />
    )
}