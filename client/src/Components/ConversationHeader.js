import React from 'react'
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./ConversationHeader.scss"

export default function ChatHeader({ friendData }) {

    return (

        <div className='chat-header'>

    
            <div className='chat-header__user-propic-container'>

                {friendData.proPicBlob ?

                    <img src={friendData.proPicBlob} className='chat-header__user-propic' />

                    :

                    <img src={defaultProPic} className='chat-header__default-propic' />


                }

                {friendData.socketID !== "OFFLINE" ?
                    <>
                        <div className='chat-header__user-status chat-header__user-status--online' />

                        <p className='chat-header__user-status-text chat-header__user-status-text--online' >
                            Online
                        </p>
                    </>

                    :

                    <>
                        <div className='chat-header__user-status chat-header__user-status--offline' />

                        <p className='chat-header__user-status-text chat-header__user-status-text--offline' >
                            Offline
                        </p>
                    </>
                }


                <p className='chat-header__username'>{friendData.username}</p>

            </div>


        </div>
    )
}
