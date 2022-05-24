import React, { useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import "./ChatContainer.scss"


export default function ChatContainer() {

    const { data } = useSelector(state => state.user)
    const { conversationsData, selectedUserIndex, selectedConversationID } = useSelector(state => state.conversation)

    const chatRef = useRef(null)

    const selectedUser = data.friendList[selectedUserIndex]

    
    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)
        
        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }



    return (
        conversationsData.map((conv, i) => {

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

        })

    )
}
