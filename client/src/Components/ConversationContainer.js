import React, { memo, useLayoutEffect, useRef } from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Scrollbars } from 'react-custom-scrollbars-2';
import ProPic from './ProPic';
import "./ConversationContainer.scss"

const areEqual = (prevProps, nextProps) => prevProps.conversationData?.messages === nextProps.conversationData?.messages

const ConversationContainer = memo(({ conversationData, receiverData }) => {

    const { _id, proPicBlob } = useSelector(state => state.user.data)

    const bottomDivRef = useRef(null)

    useLayoutEffect(() => {

        bottomDivRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [conversationData.messages])

    useLayoutEffect(() => {

        bottomDivRef.current?.scrollIntoView({ block: "end" })

    }, [conversationData._id])

    const refactorMessageDate = createdAt => {

        const stringToDate = new Date(createdAt)

        // Format date to hour12 (AM - PM) format
        let formattedString = stringToDate.toLocaleString("en-US", { hour: "numeric", hour12: true, minute: "numeric" })

        // Get hours and add 0 if less than 10
        const hours = formattedString.split(":")[0]

        if (hours < 10) formattedString = "0" + formattedString

        return formattedString
    }

    const refactorSeparatorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        // Format date to hour12 (AM - PM) format
        let formattedString = stringToDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })

        return formattedString
    }


    const selectMessagesClassName = (messageSenderID) => {

        let messagesClassName = "conversation-container__messages"
        const messagesSenderModifier = " conversation-container__messages--sender"

        if (messageSenderID === _id) return messagesClassName

        return messagesClassName += messagesSenderModifier

    }

    // Choose className accordingly based on text length and if user is a sender or a receiver
    const selectConversationClassName = (messageSenderID, messageText) => {

        let currentUserClassName = "conversation-container__text-container conversation-container__text-container--current-user"
        let senderUserClassName = "conversation-container__text-container conversation-container__text-container--sender-user"
        const textBreakModifier = " conversation-container__text-container--text-break"

        // if current user is the sender
        if (messageSenderID === _id) {

            // if message length is greater than 60 set className to currentUserClassName 
            // and add text break className, so the text is gonna get aligned to left

            if (messageText.length > 60) return currentUserClassName += textBreakModifier

            return currentUserClassName
        }

        if (messageText.length > 60) return senderUserClassName += textBreakModifier

        return senderUserClassName
    }

    const selectMetadataContainerClassName = messageSenderID => {

        let metadataContainerClassName = "conversation-container__message-metadata-container"
        const metadataContainerModifier = " conversation-container__message-metadata-container--sender"

        if (messageSenderID === _id) return metadataContainerClassName

        return metadataContainerClassName += metadataContainerModifier
    }

    const selectUsernameAndProPicBlobJSX = messageSenderID => {

        let member = {}

        if (!receiverData?.username) member = conversationData.members?.find(member => member.userData._id === messageSenderID)
        
        return (
            <>
                <span className='conversation-container__sender-username'>

                    {receiverData?.username}

                    {member?.userData?.username}

                </span>


                <ProPic
                    proPicBlob={getProPicBlob(messageSenderID, member)}
                    style={{ width: "1.5em", height: "1.5em", outline: "none", bottom: "4px" }}
                />
            </>
        )
    }

    const getProPicBlob = (messageSenderID, member) => {

        if (messageSenderID === _id) return proPicBlob
        if (receiverData?.proPicBlob) return receiverData.proPicBlob
        if (member) return member.userData?.proPicBlob

    }

    const getDay = createdAt => new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric" })

    // Render date separator once for each day 
    const renderDateSeparator = (message, i) => {

        const currentMessageDay = getDay(message?.createdAt)
        const prevMessageDay = getDay(conversationData.messages[i - 1]?.createdAt)

        if (currentMessageDay === prevMessageDay) return

        return (
            <div className='conversation-container__date-separator'>

                <span className='conversation-container__date-separator-date-text'>{refactorSeparatorDate(message.createdAt)}</span>

            </div>
        )
    }


    return (

        <div className='conversation-container'>

            <Scrollbars
                renderTrackVertical={props => <div {...props} className="conversation-container__scrollbar-track-vertical" />}
                renderThumbVertical={props => <div {...props} className="conversation-container__scrollbar-thumb-vertical" />}
                renderTrackHorizontal={({ style, ...props }) => <div {...props} style={{ ...style, display: "none" }} />} //we need this to remove horizontal scrollbar

                renderView={props => <div {...props} className="conversation-container__view" />}  //we need this to remove horizontal overflow
            >

                {
                    conversationData?.messages?.map((message, i) => {

                        return (

                            <>

                                {renderDateSeparator(message, i)}

                                <div className={selectMessagesClassName(message.senderID)} key={uuidv4()} >

                                    <div className="conversation-container__message-container">

                                        <div
                                            className={selectConversationClassName(message.senderID, message.text)}
                                        >
                                            {message.text}
                                        </div>

                                    </div>

                                    <div className={selectMetadataContainerClassName(message.senderID)}>

                                        <span className='conversation-container__created-at-date'>{refactorMessageDate(message.createdAt)}</span>

                                        {selectUsernameAndProPicBlobJSX(message.senderID)}

                                    </div>

                                </div>
                            </>

                        )
                    })
                }

                <div ref={bottomDivRef}></div>
            </Scrollbars>
        </div>

    )
}, areEqual)

export default ConversationContainer