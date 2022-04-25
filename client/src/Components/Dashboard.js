import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { loadUser } from '../Redux/userSlice';
import { connection } from '../Redux/socketSlice';
import SideBar from "./SideBar"
import ProfileModal from "./ProfileModal"
import MainContent from "./MainContent"
import ChatList from './ChatList'
import AddFriend from './AddFriendList';
import Notifications from './Notifications';
import "./Dashboard.scss"

export default function Dashboard() {
    const { user, isLogged } = useSelector(state => state.user)
    const { addFriend, settings, openNotifications } = useSelector(state => state.modal)
    const { errors } = useSelector(state => state.sockets)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {

        if (!isLogged || !errors.authorized) {
            navigate("/")

        } else {
            dispatch(loadUser(user))
            dispatch(connection(user._id))
        }

    }, [errors.authorized])

    
    return (
        <div className='Dashboard'>

            {settings && <ProfileModal />}
            <SideBar />

            <div className='separator-vertical' />

            {
                addFriend ? <AddFriend /> :
                    openNotifications ? <Notifications /> : <ChatList />
            }

            <div className='separator-vertical' />

            <MainContent />

        </div>
    )
}