import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendFriendRequest } from '../Redux/socketSlice'
import SearchBar from '../ComponentsShared/SearchBar'
import addFriendImage from "../Assets/Images/add-friend.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./AddFriendList.scss"

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
        <div className='AddFriendList'>

            <div className='add-friendlist-header'>

                <img src={addFriendImage} className="add-friend-icon" />

                Add new friend

            </div>

            <SearchBar />

            <p className='users-text'>USERS</p>


            {searchedUsers && searchedUsers.map((user, i) => {

                return (
                    <div key={user.email} data-index={i} className='users-container'>

                        <div className='propic-container'>


                            {user.proPicId ?
                                <img className='propic' />
                                :
                                <img src={defaultProPic} className='defaultpropic' />
                            }

                        </div>


                        <p className='username'>{user.username}</p>

                        <button className='send-request' onClick={() => handleSendFriendRequest(user)}>Send request</button>

                    </div>
                )

            })}

        </div>
    )
}
