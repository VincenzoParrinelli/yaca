import React, { memo, useLayoutEffect, useRef } from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Scrollbars } from 'react-custom-scrollbars-2';
import ProPic from './ProPic';
import "./ConversationContainer.scss"

const areEqual = (prevProps, nextProps) => prevProps.conversationData?.messages === nextProps.conversationData?.messages

const ConversationContainer = memo(({ conversationData, friendData, groupData }) => {

    const { _id, proPicBlob } = useSelector(state => state.user.data)

    const bottomDivRef = useRef(null)

    useLayoutEffect(() => {

        bottomDivRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [conversationData.messages])

    useLayoutEffect(() => {

        bottomDivRef.current?.scrollIntoView({ block: "end" })

    }, [conversationData._id])

    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        // Format date to hour12 (AM - PM) format
        let formattedString = stringToDate.toLocaleString("en-US", { hour: "numeric", hour12: true, minute: "numeric" })

        // Get hours and add 0 if less than 10
        const hours = formattedString.split(":")[0]

        if (hours < 10) formattedString = "0" + formattedString

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

        if (!friendData?.username) member = groupData.members.find(member => member.userData._id === messageSenderID)

        return (
            <>
                <span className='conversation-container__sender-username'>

                    {friendData?.username}

                    {member.userData?.username}

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
        if (friendData?.proPicBlob) return friendData.proPicBlob
        if (member) return member.userData.proPicBlob

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
                    conversationData?.messages?.map(message => {

                        return (
                            <div className={selectMessagesClassName(message.senderID)} key={uuidv4()} >

                                <div className="conversation-container__message-container">

                                    <div
                                        className={selectConversationClassName(message.senderID, message.text)}
                                    >
                                        {message.text}
                                    </div>

                                </div>

                                <div className={selectMetadataContainerClassName(message.senderID)}>

                                    <span className='conversation-container__created-at-date'>{refactorDate(message.createdAt)}</span>

                                    {selectUsernameAndProPicBlobJSX(message.senderID)}

                                </div>

                                <div ref={bottomDivRef}></div>
                            </div>

                        )
                    })
                }

            </Scrollbars>
        </div>

    )
}, areEqual)

export default ConversationContainer