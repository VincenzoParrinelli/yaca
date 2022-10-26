import React from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import "./GroupContainer.scss"

export default function GroupContainer({ groupData }) {

    const { data } = useSelector(state => state.user)


    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }


    return (

        <div className='group-container'>
            {
                groupData.messages?.map(message => {

                    return (
                        <div
                            className={
                                message.senderID !== data._id ? 'group-container__message-container group-container__message-container--current-user' : 'group-container__message-container message-container--sender-user'
                            }
                            key={uuidv4()}
                        >

                            <div className='group-container__metadata-container'>

                                <span className='group-container__metadata-container-sender-username'></span>

                                <span className='group-container__metadata-container-created-at'>{refactorDate(message.createdAt)}</span>

                                <span className='group-container__metadata-container-text'>{message.text}</span>

                            </div>

                        </div>
                    )

                })
            }
        </div>
    )

}
