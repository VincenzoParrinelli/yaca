import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { connection } from '../Redux/socketSlice';
import SideBar from "./SideBar"
import ProfileModal from "./ProfileModal"
import ChatOpen from "./ChatOpen"
import ChatList from './ChatList'
import AddFriend from './AddFriendList';
import Notifications from './Notifications';
import "./Dashboard.scss"

export default function Dashboard() {
    const { data, isLogged } = useSelector(state => state.user)
    const { selectedUser } = useSelector(state => state.conversation)
    const { addFriend, settings, openNotifications } = useSelector(state => state.modal)
    const { errors } = useSelector(state => state.sockets)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if (!isLogged || !errors.authorized) {
            navigate("/")

        } else {
            dispatch(connection(data._id))
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

            {selectedUser && <ChatOpen />}

        </div>
    )
}