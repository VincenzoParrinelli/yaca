import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendFriendRequest } from '../Redux/socketSlice'
import defaultProPic from "../Assets/Images/user-icon-2.png"
import SearchBar from './SearchBar'
import ProPic from './ProPic';
import "./AddFriendList.scss"

export default function AddFriend() {

    const { data } = useSelector(state => state.user)
    const { searchedUsers } = useSelector(state => state.sockets)

    const dispatch = useDispatch()

    const handleSendFriendRequest = userToAddId => {
        let currentUserId = data._id

        let payload = { currentUserId, userToAddId }

        dispatch(sendFriendRequest(payload))
    }

    return (
        <div className='add-friend-list'>

            <SearchBar />

            {searchedUsers?.map((searchedUser, i) => {

                return (
                    <div key={searchedUser._id} data-index={i} className='add-friend-list__users-container'>

                        <ProPic

                            proPicBlob={searchedUser.proPicBlob}
                            style={{ width: "2.6em", height: "2.6em" }}

                        />


                        <p className='add-friend-list__username'>{searchedUser.username}</p>


                        {
                            //if user is already added or friend request has been already sent, 
                            //render a button that doesn't allow the user to duplicate his request 
                        }

                        {data.friendList.some(user => user._id === searchedUser._id) ?

                            <button className='add-friend-list__btn add-friend-list__btn--request-already-added'>Friend added</button> :

                            data.friendRequests.some(user => user._id === searchedUser._id) || data.friendRequestsPending.includes(searchedUser._id) ?

                                <button className='add-friend-list__btn add-friend-list__btn--request-already-sent'>Request sent</button> :

                                <button className='add-friend-list__btn add-friend-list__btn--send-request' onClick={() => handleSendFriendRequest(searchedUser._id)}>Send request</button>

                        }

                    </div>
                )

            })}

        </div>
    )
}
