import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetOverviewState } from '../../Redux/settingsOverviewSlice'
import { updateGroupSettings } from "../../Redux/groupSlice"
import "./UnsavedChangesAlert.scss"

export default function UnsavedChangesAlert() {

    const { unsavedChangesAlert, userSettingsContent, groupSettingsContent } = useSelector(state => state.settings)
    const { userSettings } = useSelector(state => state.settings.isOpenFlag)

    const unsavedChangesRef = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {

        if (unsavedChangesAlert) {
            unsavedChangesRef.current.classList.add('open')
            unsavedChangesRef.current.style.display = "flex"
        }

        if (!unsavedChangesAlert) unsavedChangesRef.current.classList.remove("open")

    }, [unsavedChangesAlert])


    const resetChanges = () => {

        //get key of open content and reset his state
        const openGroupContentKey = Object.keys(groupSettingsContent).find(content => groupSettingsContent[content])

        if (openGroupContentKey === "overview") dispatch(resetOverviewState())

    }

    return (
        <div className='unsaved-changes-alert' ref={unsavedChangesRef}>
            Attention! There are unsaved changes!

            <div className='unsaved-changes-alert__btns-container'>

                <button
                    className='unsaved-changes-alert__restore-btn'
                    onClick={() => resetChanges()}
                >
                    Restore
                </button>

                <button
                    className='unsaved-changes-alert__save-changes-btn'
                    onClick={() => dispatch(updateGroupSettings())}
                >
                    Save Changes
                </button>

            </div>
        </div>
    )
}
