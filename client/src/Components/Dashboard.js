import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux"
import SideBar from "../Components/SideBar"
import Nav from "../Components/Nav"
import Settings from "../Components/Settings"
import "./Dashboard.scss"

export default function Dashboard() {
    const [settingsModal, setSettingsModal] = useState(false)
    const { user } = useSelector(state => state.user)

    return (
        <div className='Dashboard'>

            <Settings />
            <SideBar />
            <Nav />

        </div>
    )
}
