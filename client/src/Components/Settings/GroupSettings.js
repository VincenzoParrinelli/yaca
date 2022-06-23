import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { handleGroupSettings } from '../../Redux/settingsSlice'
import "./GroupSettings.scss"

export default function GroupSettings() {

    const { selectedGroupID } = useSelector(state => state.settings)
    const { groupList } = useSelector(state => state.group)

    const dispatch = useDispatch()

    //close settings when user presses Escape key
    const closeGroupSettings = e => {

        if (e.key !== "Escape") return

        dispatch(handleGroupSettings())
    }

    useEffect(() => {
        window.addEventListener("keydown", closeGroupSettings)

        return () => {
            window.removeEventListener("keydown", closeGroupSettings)
        }
    }, [])


    const groupSettingsController = () => {

        const selectedGroup = groupList.find(group => group._id === selectedGroupID)

        return (
            <div className='group-settings'>

                <nav className='group-settings__sidebar'>

                    <span className='group-settings__server-name'> {selectedGroup.groupName.toUpperCase()} </span>

                    <button className='group-settings__settings-btns'>Overview</button>

                    <button className='group-settings__settings-btns'>Roles</button>

                    <button className='group-settings__settings-btns'>Delete Server</button>

                </nav>

                <div className='group-settings__content'>


                </div>

            </div>
        )
    }

    return (
        groupSettingsController()
    )
}
