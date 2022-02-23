import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import SideBar from "../Components/SideBar"
import Nav from "../Components/Nav"
import ProfileModal from "../Components/ProfileModal"
import "./Dashboard.scss"

export default function Dashboard() {
    const { isLogged } = useSelector(state => state.user)
    const { settings } = useSelector(state => state.modal)

    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogged) {
            navigate("/login")
        }
    }, [])

    return (
        <div className='Dashboard'>

            {settings && <ProfileModal />}
            <SideBar />
            <Nav />

        </div>
    )
}
