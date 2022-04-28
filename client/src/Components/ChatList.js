import React from 'react'
import { useSelector } from "react-redux"
import home from "../Assets/Images/home.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import SearchBar from '../ComponentsShared/SearchBar'
import "../ComponentsShared/UserActions.scss"

export default function ChatList() {

    const { user } = useSelector(state => state.user)

    return (
        <div className='UserActions'>

            <div className='actions-header'>

                <img src={home} className='actions-icon' />

                Dashboard

            </div>

            <SearchBar />

            <p className='users-text'> DIRECT MESSAGES </p>

            {user.friendList && user.friendList.map((friend, i) => {

                 return (
                    <div key={friend._id} data-index={i} className='users-container'>

                        <div className='propic-container'>

                            {friend.proPicId ?
                                <img className='propic' />
                                :
                                <img src={defaultProPic} className='defaultpropic' />
                            }

                        </div>

                    </div>
                )
            })}

        </div>
    )
}
