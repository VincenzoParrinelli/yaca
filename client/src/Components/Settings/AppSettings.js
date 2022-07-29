import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleAppSettings } from '../../Redux/settingsSlice'
import "./AppSettings.scss"

export default function AppSettings() {

    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener("keydown", closeSettings)

        return () => window.removeEventListener("keydown", closeSettings)
    }, [])


    const closeSettings = e => {

        if (e.key === "Escape") dispatch(handleAppSettings())
        
    }

    return (
        <div className='app-settings'>

        </div>
    )
}
