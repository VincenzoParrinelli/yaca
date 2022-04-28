import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendFriendRequest } from '../Redux/socketSlice'
import SearchBar from '../ComponentsShared/SearchBar'
import addFriendImage from "../Assets/Images/add-friend.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "../ComponentsShared/UserActions.scss"

export default function AddFriend() {

    const { user } = useSelector(state => state.user)
    const { searchedUsers } = useSelector(state => state.sockets)

    const dispatch = useDispatch()

    const handleSendFriendRequest = userToAddId => {
        let currentUserId = user._id

        let payload = { currentUserId, userToAddId }

        dispatch(sendFriendRequest(payload))
    }

    return (
        <div className='UserActions'>

            <div className='actions-header'>

                <img src={addFriendImage} className="actions-icon" />

                Add new friend

            </div>

            <SearchBar />

            <p className='users-text'> USERS </p>


            {searchedUsers && searchedUsers.map((searchedUser, i) => {

                return (
                    <div key={searchedUser._id} data-index={i} className='users-container'>

                        <div className='propic-container'>


                            {searchedUser.proPicId ?
                                <img className='propic' />
                                :
                                <img src={defaultProPic} className='defaultpropic' />
                            }

                        </div>


                        <p className='username'>{searchedUser.username}</p>


                        {
                            //if user is already added or friend request has been already sent, 
                            //render a button that doesn't allow the user to duplicate his request 
                        }

                        {user.friendList.includes(searchedUser._id) ?

                            <button className='already-added-friend'>Friend added</button> :

                            user.friendRequests.some(user => user["_id"] === searchedUser._id) || user.friendRequestsPending.includes(searchedUser._id) ?

                            <button className='already-added-friend'>Request sent</button> :

                            <button className='send-request' onClick={() => handleSendFriendRequest(searchedUser._id)}>Send request</button>

                        }

                    </div>
                )

            })}

        </div>
    )
}
