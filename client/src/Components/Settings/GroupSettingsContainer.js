import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { handleOpenGroupSettings } from '../../Redux/settingsSlice'
import GroupSettingsOverview from './GroupSettingsOverview'
import UnsavedChangesAlert from './UnsavedChangesAlert'
import "./GroupSettingsContainer.scss"

export default function GroupSettingsContainer() {

    const { selectedGroupID, groupSettingsContent } = useSelector(state => state.settings)
    
    const { groupList } = useSelector(state => state.group)

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("keydown", closeGroupSettings)

        return () => {
            window.removeEventListener("keydown", closeGroupSettings)
        }
    }, [])

    //close settings when user presses Escape key
    const closeGroupSettings = e => {

        if (e.key !== "Escape") return

        dispatch(handleOpenGroupSettings())
    }



    const renderGroupSettings = () => {

        const selectedGroup = groupList.find(group => group._id === selectedGroupID)

        return (
            <div className='group-settings-container'>

                <nav className='group-settings-container__sidebar'>

                    <span className='group-settings-container__server-name'> {selectedGroup.groupName.toUpperCase()} </span>

                    <button className='group-settings-container__settings-btns' aria-selected={groupSettingsContent.overview}>Overview</button>

                    <button className='group-settings-container__settings-btns' aria-selected={groupSettingsContent.roles}>Roles</button>

                    <button className='group-settings-container__settings-btns'>Delete Server</button>

                </nav>

                <div className='group-settings-container__element'>
                    {groupSettingsContent.overview && <GroupSettingsOverview />}
                </div>

                <UnsavedChangesAlert />
            </div>
        )
    }

    return renderGroupSettings()
}
