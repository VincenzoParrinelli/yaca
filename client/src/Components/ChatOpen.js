import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from 'react-router-dom'
import { sendMessage } from '../Redux/conversationSlice'
import { updateChat } from '../Redux/conversationSlice'
import { sendGroupMessage, updateGroupChatUI } from '../Redux/groupSlice'
import ConversationHeader from "./ConversationHeader"
import ConversationContainer from './ConversationContainer'
import { ReactComponent as Plus } from "../Assets/Images/plus.svg"
import { ReactComponent as SendMessageIcon } from "../Assets/Images/send-message-icon.svg"
import "./ChatOpen.scss"

export default function ChatOpen() {

    const [message, setMessage] = useState("")

    const { _id } = useSelector(state => state.user.data)
    const { newMessageFromSocket, } = useSelector(state => state.conversation)
    const { newGroupMessageFromSocket } = useSelector(state => state.group)

    const { conversationID } = useParams()

    const { convData, receiverData } = useLocation().state

    const [conversationData, setConversationData] = useState({})

    const dispatch = useDispatch()

    const textAreaRef = useRef(null)

    useEffect(() => {
        setConversationData(convData)
    }, [convData])

    const handleSendMessage = e => {

        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {

            e.preventDefault()

            if (!message) return

            const currentDate = Date()

            const newMessage = { text: message, senderID: _id, createdAt: currentDate }

            setConversationData({ ...conversationData, messages: conversationData.messages?.concat(newMessage) })

            let payload = {}

            // Set payload based on group or normal conversation by using groupname property
            if (!convData.groupName) {

                payload = { newMessage, receiverSocketID: receiverData.socketID, conversationID }

                dispatch(updateChat(payload))

                dispatch(sendMessage(payload))
            }

            if (convData.groupName) {

                payload = { newMessage, groupID: convData._id }

                dispatch(updateGroupChatUI(payload))

                dispatch(sendGroupMessage(payload))

            }

            // Reset state message and editable div 
            setMessage("")

            textAreaRef.current.textContent = ""


        }

    }

    // Get incoming message from socket and update ui
    useEffect(() => {

        (newMessageFromSocket || newGroupMessageFromSocket) && setConversationData({ ...conversationData, messages: conversationData.messages?.concat(newMessageFromSocket || newGroupMessageFromSocket) })

    }, [newMessageFromSocket, newGroupMessageFromSocket])

    // Conditionally render a user to user conversation or a group conversation 

    return (
        <div className='chat-open'>

            <ConversationHeader data={receiverData ? receiverData : conversationData} />

            <div className='chat-open__overlay'>

                <ConversationContainer conversationData={conversationData} receiverData={receiverData} />

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