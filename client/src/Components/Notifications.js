import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { acceptFriendRequest, refuseFriendRequest } from '../Redux/socketSlice'
import { ReactComponent as CrossIcon } from "../Assets/Images/cross.svg"
import { closeNotifications } from "../Redux/dashboardSlice"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import acceptImage from "../Assets/Images/accept.png"
import refuseImage from "../Assets/Images/refuse.png"
import "./Notifications.scss"

export default function Notifications() {

    const { data } = useSelector(state => state.user)
    const { friendRequests } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    const handleAcceptFriendRequest = userToAcceptID => {
        const payload = { currentUserID: data._id, userToAcceptID }

        dispatch(acceptFriendRequest(payload))
    }


    const handleRefuseFriendRequest = userToRefuseID => {
        const payload = { currentUserID: data._id, userToRefuseID }

        dispatch(refuseFriendRequest(payload))
    }


    return (
        <div className='notifications'>

            <div className='notifications__header'>

                Notifications

                <button className='notifications__close-btn' onClick={() => dispatch(closeNotifications())}>

                    <CrossIcon className="notifications__cross-icon"/>
                    
                </button>

            </div>

            {friendRequests && friendRequests.map((friendRequest, i) => {

                return (
                    <div key={friendRequest._id} data-index={i} className='notifications__users-container'>

                        <div className='notifications__propic-container'>

                            <img
                                src={friendRequest.proPicBlob ? friendRequest.proPicBlob : defaultProPic}
                                alt='friend-request-friend-propic'
                                className={friendRequest.proPicBlob ? 'notifications__propic' : "notifications__default-propic"}
                            />

                        </div>


                        <p className='notifications__username'>{friendRequest.username}</p>

                        <div className='notifications__request-container notifications__request-container--accept' onClick={() => handleAcceptFriendRequest(friendRequest._id)}>
                            <img
                                src={acceptImage}
                                alt='accept-request-icon'
                                className="notifications__request notifications__request--accept"
                            />
                        </div>

                        <div className='notifications__request-container notifications__request-container--refuse' onClick={() => handleRefuseFriendRequest(friendRequest._id)}>
                            <img
                                src={refuseImage}
                                alt="refuse-request-icon"
                                className="notifications__request notifications__request--refuse"
                            />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
