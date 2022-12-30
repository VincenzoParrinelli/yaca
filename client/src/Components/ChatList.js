import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Scrollbars } from 'react-custom-scrollbars-2';
import { getConversation, newConversation } from '../Redux/conversationSlice';
import { getAllGroupMessages } from '../Redux/groupSlice';
import { getReceiverDataFromConv } from "../helpers/getReceiverDataFromConv"
import SearchBar from './SearchBar';
import ProPic from './ProPic';
import "./ChatList.scss"

export default function ChatList() {

    const { _id } = useSelector(state => state.user.data)
    const { conversationList } = useSelector(state => state.conversation)
    const { groupList } = useSelector(state => state.group)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showScrollBar = () => {
        const scrollbarRef = document.querySelector(".chat-list__scrollbar-thumb-vertical")

        scrollbarRef.style.visibility = "visible"
    }

    const hideScrollBar = () => {
        const scrollbarRef = document.querySelector(".chat-list__scrollbar-thumb-vertical")

        scrollbarRef.style.visibility = "hidden"
    }

    const handleConv = (conv, receiverData) => {

        if (!conv) {

            // Define payload for direct conversation
            let payload = { userID: _id, friendID: receiverData._id, socketID: receiverData.socketID }

            dispatch(newConversation(payload)).then(newConv => handleNavigation(newConv.payload, receiverData))

        }
        
        // Fetch conv If it hasn't been fetched yet 
        if (!conv?.isFullyFetched) {

            if (!conv.groupName) dispatch(getConversation(conv._id)).then(convData => handleNavigation(convData.payload, receiverData))
            if (conv.groupName) dispatch(getAllGroupMessages(conv._id)).then(convData => handleNavigation(convData.payload))
        }
        
        // else render conv
        if (conv.isFullyFetched) handleNavigation(conv, receiverData)
    }


    const handleNavigation = (convData, receiverData) => {

        if (!convData.groupName) navigate(`conversation/${convData._id}`, { state: { convData, receiverData } })

        if (convData.groupName) navigate(`group/${convData._id}`, { state: { convData } })
    }


    const renderLastMessage = (friendID, groupID) => {

        return conversationList.map(conv => {

            // Check if is a group or a direct conversation by using members array since group members
            // are stored in groupList data 
            if (conv.members.length && !conv.members.includes(friendID)) return

            if (!conv.members.length && conv.groupID !== groupID) return

            return <span className='chat-list__last-message' key={conv._id}>{conv.messages[conv.messages.length - 1]?.text}</span>


        })

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

                    {conversationList?.map(conv => {

                        const receiverData = getReceiverDataFromConv(conv, _id)

                        return (
                            <div
                                key={conv._id}
                                className='chat-list__element-container'
                                onClick={() => handleConv(conv, receiverData)}
                            >


                                <ProPic
                                    proPicBlob={receiverData.proPicBlob}
                                    socketID={receiverData.socketID}
                                    style={{ marginLeft: "10px", width: "2.5em", height: "2.5em" }}
                                />

                                <div className='chat-list__userdata-container'>

                                    <span className='chat-list__name'>{receiverData.username}</span>

                                    {renderLastMessage(receiverData._id)}


                                </div>
                            </div>
                        )

                    })}

                    <p className='chat-list__text chat-list__text--group-messages'> Group Messages </p>

                    {groupList.map(group => {

                        return (
                            <div
                                key={group._id}
                                className='chat-list__element-container'
                                onClick={() => handleConv(group)}
                            >
                                <ProPic
                                    proPicBlob={group.proPicBlob}
                                    style={{ marginLeft: "10px", width: "2.5em", height: "2.5em" }}
                                />

                                <div className='chat-list__userdata-container'>

                                    <span className='chat-list__name'>{group.groupName}</span>

                                    {renderLastMessage(group._id)}


                                </div>
                            </div>
                        )
                    })}

                    {/* {friendList?.map(friend => {

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

                                    {renderLastMessage(friend._id)}


                                </div>

                                {friend.newMessageCounter && <div className='chat-list__new-message-counter' data-newMessageCounter={friend.newMessageCounter} />}
                            </div>

                        )
                    })} */}




                    {/*logic that handles the rendering of the group list*/}
                    {/* 
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

                                    {renderLastMessage(null, group._id)}

                                </div>

                            </div>
                        )
                    })} */}
                </Scrollbars>
            </div>
        </div>
    )
}