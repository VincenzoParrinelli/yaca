import React from 'react'
import { useSelector } from "react-redux"
import ChangeUsernameModal from '../../../Modals/ChangeUsernameModal'
import UserSettingsMyAccount from './UserSettingsMyAccount'

export default function UserSettingsElements() {

    const { userSettingsContent } = useSelector(state => state.settings)
    const { changeUsernameModal } = useSelector(state => state.modal)

    return (
        <>
            {userSettingsContent.myAccount && <UserSettingsMyAccount />}

            {changeUsernameModal && <ChangeUsernameModal />}
        </>
    )
}
