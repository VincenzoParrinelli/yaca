import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { handleOpenGroupSettings } from '../../Redux/settingsSlice'
import GroupSettingsOverview from './GroupSettingsOverview'
import "./GroupSettingsContainer.scss"

export default function GroupSettingsContainer() {

    const { selectedGroupID } = useSelector(state => state.settings)
    const { groupList } = useSelector(state => state.group)
    const { groupSettings } = useSelector(state => state.settings)

    const dispatch = useDispatch()

    //close settings when user presses Escape key
    const closeGroupSettings = e => {

        if (e.key !== "Escape") return

        dispatch(handleOpenGroupSettings())
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
            <div className='group-settings-container'>

                <nav className='group-settings-container__sidebar'>

                    <span className='group-settings-container__server-name'> {selectedGroup.groupName.toUpperCase()} </span>

                    <button className='group-settings-container__settings-btns' aria-selected={groupSettings.overview}>Overview</button>

                    <button className='group-settings-container__settings-btns'>Roles</button>

                    <button className='group-settings-container__settings-btns'>Delete Server</button>

                </nav>

                <div className='group-settings-container__element'>
                    {groupSettings.overview && <GroupSettingsOverview />}
                </div>

            </div>
        )
    }

    return groupSettingsController()
}
