import React from 'react'
import ProPic from './ProPic';
import "./ConversationHeader.scss"

export default function ChatHeader({ data }) {

    return (

        <div className='chat-header'>

            <ProPic
                proPicBlob={data.proPicBlob}
                socketID={data.socketID}
                style={{ width: "2.4em", height: "2.4em" }}
            />


            <div className='chat-header__metadata'>

                <span className='chat-header__username'>{data.username}</span>

                {data.socketID !== "OFFLINE" ?

                    <span className='chat-header__user-status-text chat-header__user-status-text--online' >
                        Online
                    </span>

                    :

                    <span className='chat-header__user-status-text chat-header__user-status-text--offline' >
                        Offline
                    </span>

                }

            </div>

        </div>
    )
}
