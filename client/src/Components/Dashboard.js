import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { connection } from '../Redux/socketSlice';
import SideBar from "./SideBar"
import ProfileModal from "../Modals/ProfileModal"
import NewGroupModal from '../Modals/NewGroupModal';
import AddGroupMembersModal from '../Modals/AddGroupMembersModal';
import ChatOpen from "./ChatOpen"
import ChatList from './ChatList'
import AddFriend from './AddFriendList';
import Notifications from './Notifications';
import "./Dashboard.scss"

export default function Dashboard() {
    const { data, isLogged } = useSelector(state => state.user)
    const { selectedUserIndex } = useSelector(state => state.conversation)
    const { addFriend, notifications } = useSelector(state => state.modal)
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


            <ProfileModal />
            <NewGroupModal />
            <AddGroupMembersModal />

            <SideBar />

            <div className='separator-vertical' />

            {
                addFriend ? <AddFriend /> :
                    notifications ? <Notifications /> : <ChatList />
            }

            <div className='separator-vertical' />

            {selectedUserIndex !== null && <ChatOpen />}

        </div>
    )
}