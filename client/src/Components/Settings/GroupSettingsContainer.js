import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { handleOpenGroupSettings } from '../../Redux/settingsSlice'
import { handleDeleteGroupModal } from '../../Redux/modalsSlice'
import DeleteGroupModal from '../../Modals/DeleteGroupModal';
import GroupSettingsOverview from './GroupSettingsOverview'
import UnsavedChangesAlert from './UnsavedChangesAlert'
import useSelectedGroup from '../hooks/useSelectedGroup'
import "./GroupSettingsContainer.scss"

export default function GroupSettingsContainer() {

    const { selectedGroupID, groupSettingsContent } = useSelector(state => state.settings)

    const selectedGroupData = useSelectedGroup(selectedGroupID)

    const elementRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("keydown", closeGroupSettings)

        return () => {
            window.removeEventListener("keydown", closeGroupSettings)
        }
    }, [])

    //close settings when user presses Escape key
    const closeGroupSettings = e => {

        if (e.key === "Escape") dispatch(handleOpenGroupSettings())

    }


    return (

        <div className='group-settings-container'>

            <nav className='group-settings-container__sidebar'>

                <span className='group-settings-container__server-name'> {selectedGroupData.groupName.toUpperCase()} </span>

                <button className='group-settings-container__settings-btns' aria-selected={groupSettingsContent.overview}>Overview</button>

                <button className='group-settings-container__settings-btns' aria-selected={groupSettingsContent.roles}>Roles</button>

                <button
                    className='group-settings-container__settings-btns'
                    onClick={() => dispatch(handleDeleteGroupModal())}
                >
                    Delete Server
                </button>

            </nav>

            <div className='group-settings-container__element' ref={elementRef}>
                {groupSettingsContent.overview && <GroupSettingsOverview {...selectedGroupData} />}

                <DeleteGroupModal {...selectedGroupData} />
            </div>

            <UnsavedChangesAlert />
        </div>

    )
}
