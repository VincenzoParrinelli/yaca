import React from 'react'
import "./UnsavedChangesAlert.scss"

export default function UnsavedChangesAlert() {
    return (
        <div className='unsaved-changes-alert'>
            Attention! There are unsaved changes!

            <div className='unsaved-changes-alert__btns-container'>

                <button className='unsaved-changes-alert__restore-btn'>Restore</button>
                <button className='unsaved-changes-alert__save-changes-btn'>Save Changes</button>
                
            </div>
        </div>
    )
}
