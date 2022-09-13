import React from 'react'
import { useSelector } from "react-redux"
import UserSettingsMyAccount from './UserSettingsMyAccount'

export default function UserSettingsElements() {

    const { userSettingsContent } = useSelector(state => state.settings)

    return (
        <>
            {userSettingsContent.myAccount && <UserSettingsMyAccount />}
        </>
    )
}
