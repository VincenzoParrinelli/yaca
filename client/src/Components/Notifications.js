import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { acceptFriendRequest, refuseFriendRequest } from '../Redux/socketSlice'
import { ReactComponent as BellIcon } from "../Assets/Images/bell.svg"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import acceptImage from "../Assets/Images/accept.png"
import refuseImage from "../Assets/Images/refuse.png"
import "./Notifications.scss"

export default function Notifications() {

    const { data } = useSelector(state => state.user)
    const { friendRequests } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    const handleAcceptFriendRequest = userToAcceptID => {
        const currentUserID = data._id

        const payload = { currentUserID, userToAcceptID }

        dispatch(acceptFriendRequest(payload))
    }


    const handleRefuseFriendRequest = userToRefuseID => {
        const currentUserID = data._id

        const payload = { currentUserID, userToRefuseID }

        dispatch(refuseFriendRequest(payload))
    }


    return (
        <div className='notifications'>

            <div className='notifications__header'>

                <BellIcon className="notifications__icon"/>

                Notifications

            </div>

            {friendRequests && friendRequests.map((friendRequest, i) => {

                return (
                    <div key={friendRequest._id} data-index={i} className='notifications__users-container'>

                        <div className='notifications__propic-container'>

                            <img
                                src={friendRequest.proPicBlob ? friendRequest.proPicBlob : defaultProPic}
                                className={friendRequest.proPicBlob ? 'notifications__propic' : "notifications__default-propic"}
                            />

                        </div>


                        <p className='notifications__username'>{friendRequest.username}</p>

                        <div className='notifications__request-container notifications__request-container--accept' onClick={() => handleAcceptFriendRequest(friendRequest._id)}>
                            <img src={acceptImage} className="notifications__request notifications__request--accept" />
                        </div>

                        <div className='notifications__request-container notifications__request-container--refuse' onClick={() => handleRefuseFriendRequest(friendRequest._id)}>
                            <img src={refuseImage} className="notifications__request notifications__request--refuse" />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
