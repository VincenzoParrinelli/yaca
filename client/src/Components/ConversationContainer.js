import React from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import "./ConversationContainer.scss"


export default function ChatContainer() {

    const { conversationList, selectedFriendID, selectedConversationID } = useSelector(state => state.conversation)


    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }


    return (
        conversationList.map(conv => {

            if (conv._id !== selectedConversationID) return

            return (
                <div className='conversation-container' key={conv._id}>
                    {
                        conv.messages.map(message => {

                            if (message.senderID !== selectedFriendID) {

                                return (
                                    <div

                                        className={
                                            message.senderID !== selectedFriendID ? 'message-container message-container--current-user' : 'message-container message-container--sender-user'
                                        }
                                        key={uuidv4()}
                                    >

                                        <div className='metadata-container'>

                                            <span className='metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                            <span className='metadata-container__text'>{message.text}</span>

                                        </div>


                                    </div>
                                )

                            }

                            return (
                                <div className='message-container message-container--sender-user' key={uuidv4()}>

                                    <div className='metadata-container'>
                                        <span className='metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                        <span className='metadata-container__text'>{message.text}</span>

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
