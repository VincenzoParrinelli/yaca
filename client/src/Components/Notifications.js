import React from 'react'
import { useSelector } from 'react-redux'
import notificationBell from "../Assets/Images/bell.png"
import "./Notifications.scss"

export default function Notifications() {

    const { friendRequests } = useSelector(state => state.user.user)

    return (
        <div className='Notifications'>

            <div className='notifications-header'>

                <img src={notificationBell} className="notifications-icon" />

                Notifications
            </div>

            {friendRequests && friendRequests.map((friendRequest) => {
                console.log(friendRequest)
            })}
        </div>
    )
}
