import React from 'react'
import ProPic from './ProPic';
import "./ConversationHeader.scss"

export default function ChatHeader({ friendData }) {

    return (

        <div className='chat-header'>

            <ProPic
                proPicBlob={friendData.proPicBlob}
                socketID={friendData.socketID}
            />


            {friendData.socketID !== "OFFLINE" ?

                <p className='chat-header__user-status-text chat-header__user-status-text--online' >
                    Online
                </p>

                :

                <p className='chat-header__user-status-text chat-header__user-status-text--offline' >
                    Offline
                </p>

            }


            <p className='chat-header__username'>{friendData.username}</p>


        </div>
    )
}
