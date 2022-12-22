import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getConversation, newConversation } from '../Redux/conversationSlice';
import SearchBar from './SearchBar';
import ProPic from './ProPic';
import "./ChatList.scss"

export default function ChatList() {

    const [selectedConv, setSelectedConv] = useState({})

    const { _id, friendList } = useSelector(state => state.user.data)
    const { conversationList } = useSelector(state => state.conversation)
    const { groupList } = useSelector(state => state.group)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { friendID, groupID } = useParams()

    const showScrollBar = () => {
        const scrollbarRef = document.querySelector(".chat-list__scrollbar-thumb-vertical")

        scrollbarRef.style.visibility = "visible"
    }

    const hideScrollBar = () => {
        const scrollbarRef = document.querySelector(".chat-list__scrollbar-thumb-vertical")

        scrollbarRef.style.visibility = "hidden"
    }

    const handleFriendConv = friend => {

        const selectedConv = conversationList.find(conv => conv.members.includes(_id) && conv.members.includes(friend._id) && !conv.groupID)

        checkConvExistence(selectedConv, friend)
    }

    const handleGroupConv = group => {

        const selectedConv = conversationList.find(conv => conv.groupID === group._id)

        checkConvExistence(selectedConv, group)
    }

    const checkConvExistence = (selectedConv, data) => {

        if (!selectedConv) {

            // Define payload for either group conversation or direct conversation
            let payload = data.groupName ? { groupID: data._id, socketID: data.socketID } : { userID: _id, friendID: data._id, socketID: data.socketID }

            dispatch(newConversation(payload)).then(newConv => handleNavigation(newConv.payload, data))

        }

        if (selectedConv && !selectedConv.isFullyFetched) dispatch(getConversation(selectedConv._id)).then(convData => handleNavigation(convData.payload, data))

    }

    const handleNavigation = (convData, data) => {

        console.log(convData)

        if (!convData.groupID) navigate(`conversation/${convData._id}`, { state: { convData, friendData: data } })

        if (convData.groupID) navigate(`group/${data._id}/${convData._id}`, { state: { convData, groupData: data } })
    }

    return (
        <div className='chat-list'>

            <SearchBar />

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

                    <p className='chat-list__text'> Friend Messages </p>

                    {friendList?.map(friend => {

                        return (

                            <div
                                key={friend._id}
                                id={friend._id}
                                data-type="friend"
                                className='chat-list__element-container'
                                aria-checked={friend._id === friendID}
                                onClick={() => handleFriendConv(friend)}
                            >


                                <ProPic
                                    proPicBlob={friend.proPicBlob}
                                    socketID={friend.socketID}
                                    style={{ marginLeft: "10px", width: "2.5em", height: "2.5em" }}
                                />


                                <div className='chat-list__userdata-container'>

                                    <span className='chat-list__name'>{friend.username}</span>

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

                            </div>

                        )
                    })}

                    <p className='chat-list__text chat-list__text--group-messages'> Group Messages </p>


                    {/*logic that handles the rendering of the group list*/}

                    {groupList?.map(group => {

                        return (
                            <div
                                key={group._id}
                                id={group._id}
                                data-type="group"
                                aria-checked={group._id === groupID}
                                className='chat-list__element-container'
                                onClick={() => handleGroupConv(group)}

                            >

                                <ProPic
                                    proPicBlob={group.proPicBlob}
                                    style={{ marginLeft: "10px", width: "2.5em", height: "2.5em" }}
                                />

                                <div className='chat-list__userdata-container'>

                                    <span className='chat-list__name'>{group.groupName}</span>

                                </div>

                            </div>
                        )
                    })}
                </Scrollbars>
            </div>
        </div>
    )
}