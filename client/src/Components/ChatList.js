import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setSelectedFriendID } from '../Redux/conversationSlice'
import { setSelectedGroupID } from '../Redux/groupSlice'
import home from "../Assets/Images/home.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import SearchBar from '../ComponentsShared/SearchBar'
import "./ChatList.scss"

export default function ChatList() {

    const { data } = useSelector(state => state.user)
    const { conversationList, selectedFriendID } = useSelector(state => state.conversation)
    const { groupList, selectedGroupID } = useSelector(state => state.group)

    const dispatch = useDispatch()

    return (
        <div className='chat-list'>

            <div className='chat-list__header'>

                <img src={home} className='chat-list__icon' />

                Dashboard

            </div>

            <SearchBar />


            <p className='chat-list__text'> DIRECT MESSAGES </p>

            {/*logic that handles the rendering of the friend list*/}

            {data.friendList && data.friendList.map(friend => {

                return (
                    <div
                        key={friend._id}
                        className='chat-list__container'
                        aria-checked={selectedFriendID === friend._id}
                        onClick={() => dispatch(setSelectedFriendID(friend._id))}
                    >

                        <div className='chat-list__propic-container'>

                            {friend.proPicBlob ?

                                <>
                                    <img src={friend.proPicBlob} className='chat-list__propic' />

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

                        <p className='chat-list__name'>{friend.username}</p>

                        {
                            /*display last message */
                        }

                        {conversationList.map(conv => {

                            if (!conv.members.includes(friend._id)) return

                            return (
                                <span className='chat-list__last-message' key={conv._id}>{conv.messages[conv.messages.length - 1].text}</span>
                            )
                        })}

                    </div>
                )
            })}

            <p className='chat-list__text'> GROUP MESSAGES </p>


            {/*logic that handles the rendering of the group list*/}

            {groupList && groupList.map(group => {

                return (
                    <div
                        key={group._id}
                        aria-checked={selectedGroupID === group._id}
                        className='chat-list__container'
                        onClick={() => dispatch(setSelectedGroupID(group._id))}

                    >

                        <div className='chat-list__propic-container'>

                            {group.proPicBlob ?

                                <img src={group.proPicBlob} className='chat-list__propic' />
                                :
                                <img src={defaultProPic} className='chat-list__default-propic' />
                            }

                        </div>

                        <p className='chat-list__name'>{group.groupName}</p>
                    </div>
                )
            })}


        </div>
    )
}
