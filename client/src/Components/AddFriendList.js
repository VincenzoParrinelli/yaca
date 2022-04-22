import React from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../ComponentsShared/SearchBar'
import addFriendImage from "../Assets/Images/add-friend.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./AddFriendList.scss"

export default function AddFriend() {

    const { searchedUsers } = useSelector(state => state.sockets)

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

                        <button className='send-request'>Send request</button>

                    </div>
                )

            })}

        </div>
    )
}
