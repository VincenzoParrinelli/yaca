import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { acceptFriendRequest, refuseFriendRequest } from '../Redux/socketSlice'
import { ReactComponent as CrossIcon } from "../Assets/Images/cross.svg"
import { closeNotifications } from "../Redux/dashboardSlice"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import acceptImage from "../Assets/Images/accept.png"
import refuseImage from "../Assets/Images/refuse.png"
import "./Notifications.scss"

export default function Notifications() {

    const [inboxBtn, setInboxBtn] = useState(true)

    const inboxBtnRef = useRef(null)

    const { data } = useSelector(state => state.user)
    const { friendRequests } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    useEffect(() => {

        if (inboxBtn) inboxBtnRef.current.classList.add("notifications__btns--active")

    }, [inboxBtn])

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

                <div className='notifications__header-container'>

                    <button className='notifications__close-btn' onClick={() => dispatch(closeNotifications())}>

                        <CrossIcon className="notifications__cross-icon" />

                    </button>

                    Notifications

                    <span>LOREM </span>
                </div>

                <div className='notifications__header-container-2'>

                    <button
                        className='notifications__btns'
                        ref={inboxBtnRef}
                        onClick={() => setInboxBtn(true)}
                    >
                        Inbox
                    </button>

                </div>


            </div>

            {friendRequests?.map((friendRequest, i) => {

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
