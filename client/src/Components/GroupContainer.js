import React from 'react'
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import "./GroupContainer.scss"

export default function GroupContainer() {

    const { groupList, selectedGroupID } = useSelector(state => state.group)
    const { data } = useSelector(state => state.user)


    const refactorDate = createdAt => {

        const stringToDate = new Date(createdAt)

        const getHours = stringToDate.getHours()

        const getMinutes = stringToDate.getMinutes()

        return `${getHours}:${getMinutes}`
    }


    return (
        groupList.map(group => {

            if (group._id !== selectedGroupID) return

            return (
                <div className='group-container' key={group._id}>
                    {
                        group.messages.map(message => {

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
        })
    )
}
