import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import "./ConversationContainer.scss"

export default function ChatContainer({ data }) {

    const { conversationList } = useSelector(state => state.conversation)

    const [conversationData] = useState(conversationList.find(conv => conv._id === data._id))

    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }



    return (

        <div className='conversation-container'>

            {
                conversationData?.messages?.map(message => {

                    if (message.senderID !== data._id) {

                        return (
                            <div
                                className={
                                    message.senderID !== data._id ? 'conversation-container__message-container conversation-container__message-container--current-user' : 'conversation-container__message-container conversation-container__message-container--sender-user'
                                }
                                key={uuidv4()}
                            >

                                <div className='conversation-container__metadata-container'>

                                    <span className='conversation-container__metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                    <span className='conversation-container__metadata-container__text'>{message.text}</span>

                                </div>


                            </div>
                        )

                    }

                    return (
                        <div className='conversation-container__message-container conversation-container__message-container--sender-user' key={uuidv4()}>

                            <div className='conversation-container__metadata-container'>

                                <span className='conversation-container__metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                <span className='conversation-container__metadata-container__text'>{message.text}</span>

                            </div>

                        </div>
                    )

                })
            }
        </div>

    )


}
