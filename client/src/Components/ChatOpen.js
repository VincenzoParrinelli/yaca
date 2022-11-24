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


    const handleSendMessage = e => {

        if ((e.key === "Enter" && !e.shiftKey) || e.type === "click") {

            e.preventDefault()

            if (!message) return

            dispatch(sendMessage({ message, friendSocketID: friendData.socketID, friendID: friendData._id, _id }))

            // Reset state message and editable div 
            setMessage("")

            textAreaRef.current.textContent = ""

            dispatch(updateChat({ message, _id, friendID: friendData._id }))

        }

    }


    // Conditionally render a user to user conversation or a group conversation 

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


