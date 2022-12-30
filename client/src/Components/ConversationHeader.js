import React from 'react'
import ProPic from './ProPic';
import "./ConversationHeader.scss"

export default function ChatHeader({ data }) {

    const { proPicBlob, socketID, username, groupName } = data

    return (

        <div className='chat-header'>

            <ProPic
                proPicBlob={proPicBlob}
                socketID={socketID}
                style={{ width: "2.4em", height: "2.4em" }}
            />


            <div className='chat-header__metadata'>

                <span className='chat-header__username'>{username ?? groupName}</span>

                {socketID && socketID !== "OFFLINE" && <span className='chat-header__user-status-text chat-header__user-status-text--online' > Online </span>}

                {socketID === "OFFLINE" && <span className='chat-header__user-status-text chat-header__user-status-text--offline' > Offline </span>}

            </div>

        </div >
    )
}
