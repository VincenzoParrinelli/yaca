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
                                message.senderID !== data._id ? 'message-container message-container--current-user' : 'message-container message-container--sender-user'
                            }
                            key={uuidv4()}
                        >

                            <div className='metadata-container'>

                                <span className='metadata-container__sender-username'></span>

                                <span className='metadata-container__created-at'>{refactorDate(message.createdAt)}</span>

                                <span className='metadata-container__text'>{message.text}</span>

                            </div>

                        </div>
                    )

                })
            }
        </div>
    )

}
