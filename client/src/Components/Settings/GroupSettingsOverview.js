import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetOverviewState, setNewPic, resetNewPic, setNewGroupName } from '../../Redux/settingsOverviewSlice'
import "./GroupSettingsOverview.scss"

export default function GroupSettingsOverview(selectedGroupData) {

    const [showChangePicText, setShowChangePicText] = useState(false)

    const { newPicBlob, newGroupName } = useSelector(state => state.settingsOverview)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(resetOverviewState())
    }, [])

    const handleNewPic = e => {

        dispatch(setNewPic(URL.createObjectURL(e.target.files[0])))

    }

    const clearPreviousPic = () => {

        dispatch(resetNewPic())

    }

    return (
        <div className='group-settings-overview'>

            <section className='group-settings-overview__section-1'>

                <span className='group-settings-overview__section-1-title'>
                    Server's overview
                </span>

                <label className='group-settings-overview__propic-container'
                    onMouseEnter={() => setShowChangePicText(true)}
                    onMouseLeave={() => setShowChangePicText(false)}
                >

                    {showChangePicText && <span className='group-settings-overview__change-pic-text'>CHANGE PIC</span>}

                    <img className='group-settings-overview__propic' src={newPicBlob ?? selectedGroupData.proPicBlob} />

                    <input
                        className='group-settings-overview__new-group-pic-input'
                        type="file"
                        accept='.jpg, .png'
                        onClick={e => e.target.value = null} //set value to null on every click, so the user can select the same file again
                        onChange={e => handleNewPic(e)}
                    />

                </label>

                {newPicBlob &&

                    <button
                        className='group-settings-overview__remove-btn'
                        onClick={() => clearPreviousPic()}
                    >
                        Remove
                    </button>
                }

                <div className='group-settings-overview__server-name-changer-container'>

                    <span className='group-settings-overview__server-name-text'>SERVER'S NAME</span>

                    <input
                        className='group-settings-overview__server-name-input'
                        type="text"
                        value={newGroupName ?? selectedGroupData.groupName}
                        onChange={e => dispatch(setNewGroupName(e.target.value))}
                    />

                </div>


            </section>

            <div className='group-settings-overview__divider' />

        </div>
    )
}
