import React from 'react';
import SideBar from "../Components/SideBar"
import Nav from "../Components/Nav"
import "./Dashboard.scss"

export default function Dashboard() {
    return (
        <div className='Dashboard'>

            <SideBar />
            <Nav />

        </div>
    )
}
