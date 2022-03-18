import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { loadUser } from '../Redux/userSlice';
import { connection } from '../Redux/socketsSlice';
import SideBar from "./SideBar"
import Nav from "./Nav"
import ProfileModal from "./ProfileModal"
import MainContent from "./MainContent"
import "./Dashboard.scss"

export default function Dashboard() {
    const { user, isLogged } = useSelector(state => state.user)
    const { settings } = useSelector(state => state.modal)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        if (!isLogged) {
            navigate("/")
        } else {
            dispatch(loadUser(user))
            dispatch(connection())
        }

    }, [])

    return (
        <div className='Dashboard'>

            {settings && <ProfileModal />}
            <SideBar />
            <Nav />
            <MainContent />

        </div>
    )
}
