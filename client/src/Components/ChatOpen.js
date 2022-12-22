import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from 'react-router-dom'
import { sendMessage } from '../Redux/conversationSlice'
import { updateChat } from '../Redux/conversationSlice'
import ConversationHeader from "./ConversationHeader"
import ConversationContainer from './ConversationContainer'
import { ReactComponent as Plus } from "../Assets/Images/plus.svg"
import { ReactComponent as SendMessageIcon } from "../Assets/Images/send-message-icon.svg"
import "./ChatOpen.scss"

export default function ChatOpen() {

    const [message, setMessage] = useState("")

    const { _id } = useSelector(state => state.user.data)
    const { newMessageFromSocket } = useSelector(state => state.conversation)

    const { conversationID } = useParams()

    const { friendData, groupData, convData } = useLocation().state

    const [conversationData, setConversationData] = useState({})

    const dispatch = useDispatch()

    const textAreaRef = useRef(null)

    useEffect(() => {
        setConversationData(convData ?? groupData)
    }, [convData, groupData])

    const handleSendMessage = e => {

        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {

            e.preventDefault()

            if (!message) return

            let payload = {}

            // Set payload accordingly 
            if (friendData) payload = { message, currentUserID: _id, friendSocketID: friendData.socketID, conversationID }
            if (groupData) payload = { message, currentUserID: _id, groupID: groupData._id, conversationID }

            dispatch(updateChat({ message, _id, conversationID }))

            const currentDate = Date()

            const newMessage = { text: message, senderID: _id, createdAt: currentDate }

            setConversationData({ ...conversationData, messages: conversationData.messages.concat(newMessage) })

            // Reset state message and editable div 
            setMessage("")

            textAreaRef.current.textContent = ""

            dispatch(sendMessage(payload))

        }

    }

    useEffect(() => {

        newMessageFromSocket && setConversationData({ ...conversationData, messages: conversationData.messages?.concat(newMessageFromSocket) })

    }, [newMessageFromSocket])

    // Conditionally render a user to user conversation or a group conversation 

    return (
        <div className='chat-open'>

            <ConversationHeader data={friendData ? friendData : groupData} />

            <div className='chat-open__overlay'>

                <ConversationContainer data={conversationData} />

                <div className='chat-open__message-input-container'>

                    <div
                        contentEditable
                        className='chat-open__message-input'
                        ref={textAreaRef}
                        data-placeholder='Write a message...'
                        spellCheck="false"
                        value={message}
                        onInput={e => setMessage(e.currentTarget.textContent)}
                        onKeyDown={e => handleSendMessage(e)}
                    >
                    </div>


                    <div className='chat-open__btns-container'>

                        <button className='chat-open__btns chat-open__btns--attach-file-btn'>
                            <Plus />
                        </button>


                        <button
                            className='chat-open__btns chat-open__btns--send-message-btn'
                            onClick={e => handleSendMessage(e)}
                        >
                            <SendMessageIcon />
                        </button>


                    </div>

                </div>

            </div>

        </div >
    )
}