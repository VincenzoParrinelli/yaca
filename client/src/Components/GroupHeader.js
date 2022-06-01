import React from 'react'
import { useSelector } from "react-redux"
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./GroupHeader.scss"

export default function GroupHeader() {

    const { groupList, selectedGroupID } = useSelector(state => state.group)

    return (
        <div className='group-header'>

            {groupList.map(group => {

                if (group._id !== selectedGroupID) return


                return (
                    <div
                        key={group._id}
                        className='group-header__group-propic-container'

                    >

                        {group.proPicBlob ?

                            <img src={group.proPicBlob} className='group-header__group-propic' />

                            :

                            <img src={defaultProPic} className='group-header__default-propic' />


                        }


                        <p className='group-header__groupname'>{group.groupName}</p>


                    </div>
                )

            })}
            <div className='group-header__separator-horizontal'></div>

        </div>
    )
    
}
