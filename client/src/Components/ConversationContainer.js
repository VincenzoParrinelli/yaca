import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import "./ConversationContainer.scss"

export default function ChatContainer({ friendData }) {

    const { conversationList } = useSelector(state => state.conversation)

    const [conversationData] = useState(conversationList.find(conv => conv._id === friendData._id))

    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }



    return (

        <div className='chat-container'>

            <div className='chat-container__conversation-container'>

                {
                    conversationData?.messages?.map(message => {

                        if (message.senderID !== friendData._id) {

                            return (
                                <div
                                    className={
                                        message.senderID !== friendData._id ? 'chat-container__message-container chat-container__message-container--current-user' : 'chat-container__message-container chat-container__message-container--sender-user'
                                    }
                                    key={uuidv4()}
                                >

                                    <div className='chat-container__metadata-container'>

                                        <span className='chat-container__metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                        <span className='chat-container__metadata-container__text'>{message.text}</span>

                                    </div>


                                </div>
                            )

                        }

                        return (
                            <div className='chat-container__message-container chat-container__message-container--sender-user' key={uuidv4()}>

                                <div className='chat-container__metadata-container'>

                                    <span className='chat-container__metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                    <span className='chat-container__metadata-container__text'>{message.text}</span>

                                </div>

                            </div>
                        )

                    })
                }
            </div>

        </div>
    )


}
