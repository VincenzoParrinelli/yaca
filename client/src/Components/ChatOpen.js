import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { sendMessage } from '../Redux/socketSlice'
import { updateChat } from '../Redux/conversationSlice'
import ConversationHeader from "./ConversationHeader"
import ConversationContainer from './ConversationContainer'
import { ReactComponent as Plus } from "../Assets/Images/plus.svg"
import { ReactComponent as SendMessageIcon } from "../Assets/Images/send-message-icon.svg"
import { setSelectedConvMainData } from "../Redux/conversationSlice"
import "./ChatOpen.scss"

export default function MainContent() {

    const [message, setMessage] = useState("")

    const [friendData, setFriendData] = useState({})
    const [groupData, setGroupData] = useState({})

    const { _id, friendList } = useSelector(state => state.user.data)
    const { groupList } = useSelector(state => state.group)
    const { friendID, groupID } = useParams()

    const dispatch = useDispatch()

    const textAreaRef = useRef(null)

    //Get friend or group data
    // @desc: if friend is selected after getting his data set conversation id
    useEffect(() => {

        if (friendID) {
            setFriendData(friendList.find(friend => friend._id === friendID))

            dispatch(setSelectedConvMainData({ _id, friendID }))
        }

        groupID && setGroupData(groupList.find(group => group._id === groupID))

    }, [friendID, friendList, groupID, groupList, dispatch])


    //Automatically resize textarea
    // useEffect(() => {

    //     textAreaRef.current.addEventListener("input", resizeTextarea)

    //     return () => {

    //         textAreaRef.current.removeEventListener("input", resizeTextarea)
    //     }

    // }, [message])

    // const resizeTextarea = e => {

    //     if (!e.target.value) return e.target.style.height = "100%"

    //     e.target.style.height = "100%"
    //     e.target.style.height = (e.target.scrollHeight) + "px";

    // }

    const handleSendMessage = e => {


        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault()

            if (!message) return

            dispatch(sendMessage(message))

            setMessage("")

            dispatch(updateChat(message))

        }

    }

    // conditionally render a user to user conversation or a group conversation 

    return (
        <div className='chat-open'>

            <ConversationHeader data={friendID ? friendData : groupData} />

            <div className='chat-open__overlay'>

                <ConversationContainer data={friendID ? friendData : groupData} />

                <div className='chat-open__message-input-container'>

                    <div
                        contentEditable
                        className='chat-open__message-input'
                        ref={textAreaRef}
                        placeholder='Write a message...'
                        spellCheck="false"
                        value={message}
                        onInput={e => setMessage(e.currentTarget.textContent)}
                        onKeyDown={(e) => handleSendMessage(e)}
                    />


                    <div className='chat-open__btns-container'>

                        <button className='chat-open__btns chat-open__btns--attach-file-btn'>
                            <Plus />
                        </button>


                        <button className='chat-open__btns chat-open__btns--send-message-btn'>
                            <SendMessageIcon />
                        </button>


                    </div>


                </div>


            </div>

        </div >
    )
}


