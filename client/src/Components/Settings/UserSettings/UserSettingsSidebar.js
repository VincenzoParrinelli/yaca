import React from 'react'
import { useSelector, useDispatch } from "react-redux"

export default function UserSettingsSidebar() {

    const { userSettingsContent } = useSelector(state => state.settings)


    return (
        <>
            <span className='settings-container__section-text-divider'>USER SETTINGS</span>

            <button className='settings-container__settings-btns' aria-selected={userSettingsContent.myAccount}>My account</button>
        </>
    )
}
