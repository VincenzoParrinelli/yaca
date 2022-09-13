import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { resetFlags } from '../../Redux/settingsSlice'
import useSelectedGroup from '../hooks/useSelectedGroup'
import GroupSettingsSidebar from './GroupSettings/GroupSettingsSidebar'
import GroupSettingsElements from './GroupSettings/GroupSettingsElements'
import UserSettingsSidebar from './UserSettings/UserSettingsSidebar'
import UserSettingsElements from './UserSettings/UserSettingsElements'
import UnsavedChangesAlert from './UnsavedChangesAlert'
import "./SettingsController.scss"

export default function SettingsController() {

    const { selectedGroupID, groupSettingsContent } = useSelector(state => state.settings)
    const { userSettings, groupSettings } = useSelector(state => state.settings.isOpenFlag)

    const selectedGroupData = useSelectedGroup(selectedGroupID)

    const elementRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("keydown", closeSettings)

        return () => {
            window.removeEventListener("keydown", closeSettings)
        }
    }, [])

    //close settings when user presses Escape key
    const closeSettings = e => {

        if (e.key === "Escape") dispatch(resetFlags())

    }

    return (
        <div className='settings-container'>

            <nav className='settings-container__sidebar'>

                {userSettings && <UserSettingsSidebar />}
                {groupSettings && <GroupSettingsSidebar {...selectedGroupData} />}

            </nav>

            <div className='settings-container__element' ref={elementRef}>

                {userSettings && <UserSettingsElements />}
                {groupSettings && <GroupSettingsElements {...selectedGroupData} />}

            </div>

            <UnsavedChangesAlert />
        </div>

    )

}
