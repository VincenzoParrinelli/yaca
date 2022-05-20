import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { sendMessage } from '../Redux/socketSlice'
import { updateChat } from '../Redux/conversationSlice'
import { v4 as uuidv4 } from "uuid"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import sendMessageIcon from "../Assets/Images/send-message.png"
import "./ChatOpen.scss"

export default function MainContent() {

    const [message, setMessage] = useState("")

    const { data } = useSelector(state => state.user)
    const { conversationsData, selectedUserIndex, selectedConversationID } = useSelector(state => state.conversation)

    const dispatch = useDispatch()

    const textAreaRef = useRef(null)
    const chatRef = useRef(null)

    const selectedUser = data.friendList[selectedUserIndex]

    //automatically resize textarea
    useEffect(() => {

        if (!message) textAreaRef.current.style.height = "2%"

        textAreaRef.current.style.height = "2%";
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight - 28) + "px";

    }, [message])


    const handleSendMessage = e => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()

            if (!message) return

            dispatch(sendMessage(message))

            setMessage("")

            dispatch(updateChat(message))

        }

    }

    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)
        
        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }


    return (
        <div className='chat-open'>

            <div className='chat-open__header'>

                {selectedUser.proPicBlob ?

                    <div className='chat-open__user-propic-container' >

                        <img src={selectedUser.proPicBlob} className='chat-open__user-propic' />

                        {selectedUser.socketID !== "OFFLINE" ?

                            <div className='chat-open__user-status chat-open__user-status--online' />

                            :

                            <div className='chat-open__user-status chat-open__user-status--offline' />
                        }

                    </div>

                    :

                    <img src={defaultProPic} className='chat-open__default-propic' />

                }

                <p className='chat-open__username'>{selectedUser.username}</p>

                {
                    selectedUser.socketID !== "OFFLINE" ?

                        <p className='chat-open__user-status-text chat-open__user-status-text--online' >
                            Online
                        </p>

                        :

                        <p className='chat-open__user-status-text chat-open__user-status-text--offline' >
                            Offline
                        </p>

                }

                <div className='chat-open__separator-horizontal'></div>

            </div>



            {conversationsData.map((conv, i) => {

                if (conv._id !== selectedConversationID) return

                    return (
                        <div className='chat-container' key={conv._id}>
                            {
                                conv.messages.map(message => {

                                    if (message.senderID !== selectedUser._id) {

                                        return (
                                            <div
                                                ref={chatRef}
                                                className={
                                                    message.senderID !== selectedUser._id ? 'message-container message-container--current-user' : 'message-container message-container--sender-user'
                                                }
                                                key={uuidv4()}
                                            >

                                                <div className='metadata-container'>

                                                    <p className='metadata-container__created-at'>{refactorDate(message.createdAt)}</p>

                                                    <p className='metadata-container__text'>{message.text}</p>

                                                </div>


                                            </div>
                                        )

                                    }

                                    return (
                                        <div className='message-container message-container--sender-user' key={uuidv4()}>

                                            <div className='metadata-container'>

                                                <p className='metadata-container__created-at'>{refactorDate(message.createdAt)}</p>

                                                <p className='metadata-container__text'>{message.text}</p>

                                            </div>

                                        </div>
                                    )

                                })
                            }
                        </div>
                    )

            })}



            <textarea
                ref={textAreaRef}
                className='chat-open__message-input'
                placeholder='Write a message...'
                spellCheck="false"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => handleSendMessage(e)}
            />

            <img
                src={sendMessageIcon}
                className='chat-open__send-message-icon'

            />

        </div >
    )
}
