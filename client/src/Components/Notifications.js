import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { acceptFriendRequest, refuseFriendRequest } from '../Redux/socketSlice'
import notificationBell from "../Assets/Images/bell.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import acceptImage from "../Assets/Images/accept.png"
import refuseImage from "../Assets/Images/refuse.png"
import "../ComponentsShared/UserActions.scss"

export default function Notifications() {

    const { user } = useSelector(state => state.user)
    const { friendRequests } = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const handleAcceptFriendRequest = userToAcceptID => {
        let currentUserID = user._id

        let payload = { currentUserID, userToAcceptID }

        dispatch(acceptFriendRequest(payload))
    }


    const handleRefuseFriendRequest = userToRefuseID => {
        let currentUserID = user._id

        let payload = { currentUserID, userToRefuseID }

        dispatch(refuseFriendRequest(payload))
    }


    return (
        <div className='UserActions'>

            <div className='actions-header'>

                <img src={notificationBell} className="actions-icon" />

                Notifications
            </div>

            {friendRequests && friendRequests.map((friendRequest, i) => {

                return (
                    <div key={friendRequest._id} data-index={i} className='users-container'>

                        <div className='propic-container'>


                            {friendRequest.proPicId ?
                                <img className='propic' />
                                :
                                <img src={defaultProPic} className='defaultpropic' />
                            }

                        </div>


                        <p className='username'>{friendRequest.username}</p>

                        <div className='accept-request-container' onClick={() => handleAcceptFriendRequest(friendRequest._id)}>
                            <img src={acceptImage} className="accept-request" />
                        </div>

                        <div className='refuse-request-container' onClick={() => handleRefuseFriendRequest(friendRequest._id)}>
                            <img src={refuseImage} className="refuse-request" />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}
