import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { sendMessage } from '../Redux/socketSlice'
import { updateChat } from '../Redux/conversationSlice'
import sendMessageIcon from "../Assets/Images/send-message.png"
import ChatContainer from './ChatContainer'
import ChatHeader from "./ChatHeader"
import "./ChatOpen.scss"

export default function MainContent() {

    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    const textAreaRef = useRef(null)

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

    return (
        <div className='chat-open'>

            <ChatHeader />

            <ChatContainer />

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
