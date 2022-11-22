import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Scrollbars } from 'react-custom-scrollbars-2';
import "./ConversationContainer.scss"

export default function ChatContainer({ data }) {

    const { conversationList } = useSelector(state => state.conversation)

    const [conversationData, setConversationData] = useState({})

    useEffect(() => {

        setConversationData(conversationList.find(conv => conv.members.includes(data._id)))

    }, [conversationList, data._id])

    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        const formattedString = stringToDate.toLocaleString("en-US", { hour: "numeric", hour12: true, minute: "numeric" })

        return formattedString
    }



    return (

        <div className='conversation-container'>

            <Scrollbars
                renderTrackVertical={props => <div {...props} className="conversation-container__scrollbar-track-vertical" />}
                renderThumbVertical={props => <div {...props} className="conversation-container__scrollbar-thumb-vertical" />}
                renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style, display: "none" }} />} //we need this to remove horizontal scrollbar

                renderView={props => <div {...props} className="conversation-container__view" />}  //we need this to remove horizontal overflow
            >

                <div className='conversation-container__messages'>


                    {
                        conversationData?.messages?.map(message => {

                            if (message.senderID !== data._id) {

                                return (
                                    <div
                                        className={
                                            message.senderID !== data._id ? "conversation-container__message-container  conversation-container__message-container--current-user" : "conversation-container__message-container  conversation-container__message-container--sender-user"
                                        }
                                        key={uuidv4()}
                                    >

                                        <div
                                            className={
                                                message.senderID !== data._id ? 'conversation-container__text-container conversation-container__text-container--current-user' : "conversation-container__text-container conversation-container__text-container--sender-user"
                                            }
                                        >
                                            {message.text}
                                        </div>

                                        <div className='conversation-container__message-metadata-container'>

                                            <span className='conversation-container__created-at-date'>{refactorDate(message.createdAt)}</span>

                                        </div>

                                    </div>
                                )

                            }


                        })
                    }
                </div>
            </Scrollbars>
        </div>

    )


}
