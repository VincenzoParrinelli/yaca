import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { sendMessage } from '../Redux/socketSlice'
import { updateChat } from '../Redux/conversationSlice'
import sendMessageIcon from "../Assets/Images/send-message.png"
import ConversationHeader from "./ConversationHeader"
import ConversationContainer from './ConversationContainer'
import GroupHeader from './GroupHeader'
import GroupContainer from './GroupContainer'
import "./ChatOpen.scss"

export default function MainContent() {

    const [message, setMessage] = useState("")

    const { selectedConversationID } = useSelector(state => state.conversation)
    const { selectedGroupID } = useSelector(state => state.group)

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

            {selectedConversationID &&

                <>
                    <ConversationHeader />

                    <ConversationContainer />
                </>

            }

            {selectedGroupID &&

                <>
                    <GroupHeader />

                    <GroupContainer />
                </>
            }


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
