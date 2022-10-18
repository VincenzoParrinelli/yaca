import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
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

    const { friendList } = useSelector(state => state.user.data)
    const { groupList } = useSelector(state => state.group)

    const dispatch = useDispatch()
    const { friendID, groupID } = useParams()

    const textAreaRef = useRef(null)

    //automatically resize textarea
    useEffect(() => {

        if (!textAreaRef.current) return

        if (!message) textAreaRef.current.style.height = "2%"

        textAreaRef.current.style.height = "2%";
        textAreaRef.current.style.height = (textAreaRef.current.scrollHeight - 29) + "px";

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


            {/*Render selected friend*/}

            {friendID &&

                <>
                    {friendList.map(friend => {

                        if (friend._id === friendID) return (

                            <>

                                <ConversationHeader friendData={friend} />

                                <ConversationContainer friendData={friend} />

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

                            </>
                        )
                    })}


                </>

            }

            {/*Render selected group*/}

            {groupID &&

                <>
                    {groupList.map(group => {

                        if (group._id === groupID) return (

                            <>
                                <GroupHeader groupData={group} />

                                <GroupContainer groupData={group} />
                            </>

                        )

                    })}
                </>


            }


        </div >
    )
}
