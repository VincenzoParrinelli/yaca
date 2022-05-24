import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendFriendRequest } from '../Redux/socketSlice'
import SearchBar from '../ComponentsShared/SearchBar'
import addFriendImage from "../Assets/Images/add-friend.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
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
        <div className='add-friend-List'>

            <div className='add-friend-list__header'>

                <img src={addFriendImage} className="add-friend-list__icon" />

                Add new friend

            </div>

            <SearchBar />

            <p className='add-friend-list__text'> USERS </p>


            {searchedUsers && searchedUsers.map((searchedUser, i) => {

                return (
                    <div key={searchedUser._id} data-index={i} className='add-friend-list__users-container'>

                        <div className='add-friend-list__users-propic-container'>


                            {searchedUser.proPicBlob ?
                                <img src={searchedUser.proPicBlob} className='add-friend-list__users-propic' />
                                :
                                <img src={defaultProPic} className='add-friend-list__default-propic' />
                            }

                        </div>


                        <p className='add-friend-list__username'>{searchedUser.username}</p>


                        {
                            //if user is already added or friend request has been already sent, 
                            //render a button that doesn't allow the user to duplicate his request 
                        }

                        {data.friendList.some(user => user["_id"] === searchedUser._id) ?

                            <button className='add-friend-list__btn add-friend-list__btn--request-already-added'>Friend added</button> :

                            data.friendRequests.some(user => user["_id"] === searchedUser._id) || data.friendRequestsPending.includes(searchedUser._id) ?

                            <button className='add-friend-list__btn add-friend-list__btn--request-already-sent'>Request sent</button> :

                            <button className='add-friend-list__btn add-friend-list__btn--send-request' onClick={() => handleSendFriendRequest(searchedUser._id)}>Send request</button>

                        }

                    </div>
                )

            })}

        </div>
    )
}
