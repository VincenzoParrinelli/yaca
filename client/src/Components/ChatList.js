import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setSelectedUser } from '../Redux/conversationSlice'
import home from "../Assets/Images/home.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import SearchBar from '../ComponentsShared/SearchBar'
import "./ChatList.scss"

export default function ChatList() {

    const { data } = useSelector(state => state.user)
    const { selectedUser } = useSelector(state => state.conversation)

    const dispatch = useDispatch()

    return (
        <div className='chat-list'>

            <div className='chat-list__header'>

                <img src={home} className='chat-list__icon' />

                Dashboard

            </div>

            <SearchBar />

            <p className='chat-list__text'> DIRECT MESSAGES </p>

            {data.friendList && data.friendList.map((friend, i) => {

                return (
                    <div
                        key={friend._id}
                        data-index={i}
                        className='chat-list__user-container'
                        aria-checked={friend._id === i}
                        onClick={() => dispatch(setSelectedUser(friend))}
                    >

                        <div className='chat-list__user-propic-container'>

                            {friend.proPicBlob ?

                                <>
                                    <img src={friend.proPicBlob} className='chat-list__user-propic' />

                                    {friend.socketID !== "OFFLINE" ?

                                        <div className='chat-list__user-status chat-list__user-status--online' />

                                        :

                                        <div className='chat-list__user-status chat-list__user-status--offline' />
                                    }

                                </>
                                :
                                <img src={defaultProPic} className='chat-list__default-propic' />
                            }

                        </div>

                        <p className='chat-list__username'>{friend.username}</p>

                    </div>
                )
            })}

        </div>
    )
}
