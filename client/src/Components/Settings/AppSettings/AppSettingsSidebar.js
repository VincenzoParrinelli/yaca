import React from 'react'
import { useSelector, useDispatch } from "react-redux"

export default function AppSettingsSidebar() {

    const { appSettingsContent } = useSelector(state => state.settings)


    return (
        <>
            <span className='settings-container__section-text-divider'>USER SETTINGS</span>

            <button className='settings-container__settings-btns' aria-selected={appSettingsContent.myAccount}>Sasa</button>
        </>
    )
}
