import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { openDeleteGroupModal } from '../../../Redux/modalsSlice'

export default function GroupSettingsSidebar(selectedGroupData) {
    
    const dispatch = useDispatch()

    const { groupSettingsContent } = useSelector(state => state.settings)

    return (
        <>
            <span className='settings-container__server-name'> {selectedGroupData.groupName.toUpperCase()} </span>

            <button className='settings-container__settings-btns' aria-selected={groupSettingsContent.overview}>Overview</button>

            <button className='settings-container__settings-btns' aria-selected={groupSettingsContent.roles}>Roles</button>

            <button
                className='settings-container__settings-btns'
                onClick={() => dispatch(openDeleteGroupModal())}
            >
                Delete Server
            </button>
        </>
    )
}
