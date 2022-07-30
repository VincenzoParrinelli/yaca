import React from 'react'
import { useSelector } from "react-redux"
import GroupSettingsOverview from './GroupSettingsOverview'
import DeleteGroupModal from '../../Modals/DeleteGroupModal'

export default function GroupSettingsElements(selectedGroupData) {

    const { groupSettingsContent } = useSelector(state => state.settings)

    return (
        <>
            {groupSettingsContent.overview && <GroupSettingsOverview {...selectedGroupData} />}

            <DeleteGroupModal {...selectedGroupData} />
        </>
    )
}
