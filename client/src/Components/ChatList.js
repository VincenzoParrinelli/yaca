import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { setSelectedFriendID } from '../Redux/conversationSlice'
import { setSelectedGroupID } from '../Redux/groupSlice'
import { Scrollbars } from 'react-custom-scrollbars-2';
import home from "../Assets/Images/home.png"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import SearchBar from './SearchBar';
import "./ChatList.scss"

export default function ChatList() {

    const { data } = useSelector(state => state.user)
    const { conversationList, selectedFriendID } = useSelector(state => state.conversation)
    const { groupList, selectedGroupID } = useSelector(state => state.group)

    const dispatch = useDispatch()

    const showScrollBar = () => {
        const scrollbarRef = document.querySelector(".chat-list__scrollbar-thumb-vertical")

        scrollbarRef.style.visibility = "visible"
    }

    const hideScrollBar = () => {
        const scrollbarRef = document.querySelector(".chat-list__scrollbar-thumb-vertical")

        scrollbarRef.style.visibility = "hidden"
    }

    return (
        <div className='chat-list'>

            <div className='chat-list__header'>

                <div className='chat-list__header-container'>

                    <img src={home} className='chat-list__icon' />

                    Dashboard

                    <SearchBar />

                </div>

            </div>

            <div className='chat-list__container'
                onMouseEnter={() => showScrollBar()}  //show scrollbar when chat-list hovered
                onMouseLeave={() => hideScrollBar()}  //hide scrollbar when chat-list is not hovered
            >

                <Scrollbars
                    renderTrackVertical={props => <div {...props} className="chat-list__scrollbar-track-vertical" />}
                    renderThumbVertical={props => <div {...props} className="chat-list__scrollbar-thumb-vertical" />}
                    renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style, display: "none" }} />} //we need this to remove horizontal scrollbar

                    renderView={props => <div {...props} className="chat-list__view" />}  //we need this to remove horizontal overflow
                >

                    <p className='chat-list__text'> DIRECT MESSAGES </p>

                    {/*logic that handles the rendering of the friend list*/}

                    {data.friendList?.map(friend => {

                        return (
                            <div
                                key={friend._id}
                                id={friend._id}
                                data-type="friend"
                                className='chat-list__element-container'
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
                                    if (!conv.messages.text) return

                                    return (
                                        <span className='chat-list__last-message' key={conv._id}>{conv.messages[conv.messages.length - 1].text}</span>
                                    )
                                })}

                            </div>
                        )
                    })}

                    <p className='chat-list__text chat-list__text--group-messages'> GROUP MESSAGES </p>


                    {/*logic that handles the rendering of the group list*/}

                    {groupList?.map(group => {

                        if (!group) return

                        return (
                            <div
                                key={group._id}
                                id={group._id}
                                data-type="group"
                                aria-checked={selectedGroupID === group._id}
                                className='chat-list__element-container'
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
                </Scrollbars>
            </div>
        </div>
    )
}
