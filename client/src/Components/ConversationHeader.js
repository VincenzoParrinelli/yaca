import React from 'react'
import { useSelector } from "react-redux"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./ConversationHeader.scss"

export default function ChatHeader() {

    const { data } = useSelector(state => state.user)
    const { selectedFriendID } = useSelector(state => state.conversation)

    return (

        <div className='chat-header'>

            {data.friendList.map(friend => {

                if (friend._id !== selectedFriendID) return

                return (
                    <div
                        key={friend._id}
                        className='chat-header__user-propic-container'
                    >

                        {friend.proPicBlob ?

                            <img src={friend.proPicBlob} className='chat-header__user-propic' />

                            :

                            <img src={defaultProPic} className='chat-header__default-propic' />


                        }

                        {friend.socketID !== "OFFLINE" ?
                            <>
                                <div className='chat-header__user-status chat-header__user-status--online' />

                                <p className='chat-header__user-status-text chat-header__user-status-text--online' >
                                    Online
                                </p>
                            </>

                            :

                            <>
                                <div className='chat-header__user-status chat-header__user-status--offline' />

                                <p className='chat-header__user-status-text chat-header__user-status-text--offline' >
                                    Offline

                                </p>
                            </>
                        }


                        <p className='chat-header__username'>{friend.username}</p>

                    </div>

                )

            })}
            <div className='chat-header__separator-horizontal'></div>
        </div>
    )
}
