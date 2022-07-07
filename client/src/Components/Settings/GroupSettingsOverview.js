import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetOverviewState, setNewPicBlob, resetNewPicBlob, setNewGroupName } from '../../Redux/settingsOverviewSlice'
import "./GroupSettingsOverview.scss"

export default function GroupSettingsOverview() {

    const [showChangePicText, setShowChangePicText] = useState(false)
    const [newPicFile, setNewPicFile] = useState(null)

    const { selectedGroupID } = useSelector(state => state.settings)
    const { groupList } = useSelector(state => state.group)
    const { newPicBlob, newGroupName } = useSelector(state => state.settingsOverview)

    const dispatch = useDispatch()

    useEffect(() => {
       return () => dispatch(resetOverviewState())
    }, [])

    const handleNewPic = e => {

        setNewPicFile(e.target.files[0])

        dispatch(setNewPicBlob(URL.createObjectURL(e.target.files[0])))

    }

    const clearPreviousPic = () => {

        setNewPicFile(null)

        dispatch(resetNewPicBlob(null))

    }

    const renderSelectedGroupData = () => {

        const selectedGroup = groupList.find(group => group._id === selectedGroupID)

        return (
            <div className='group-settings-overview'>

                <span className='group-settings-overview__section-1-title'>
                    Server's overview
                </span>

                <section className='group-settings-overview__section-1'>

                    <label className='group-settings-overview__propic-container'
                        onMouseEnter={() => setShowChangePicText(true)}
                        onMouseLeave={() => setShowChangePicText(false)}
                    >

                        {showChangePicText && <span className='group-settings-overview__change-pic-text'>CHANGE PIC</span>}

                        <img className='group-settings-overview__propic' src={newPicBlob ?? selectedGroup.proPicBlob} />

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

                    <div className='group-settings-overview__server-name-changer'>

                        <span className='group-settings-overview__server-name-text'>SERVER'S NAME</span>

                        <input
                            className='group-settings-overview__server-name-input'
                            type="text"
                            value={newGroupName ?? selectedGroup.groupName}
                            onChange={e => dispatch(setNewGroupName(e.target.value))}
                        />

                    </div>

                </section>

                <div className='group-settings-overview__divider' />
            </div>
        )
    }


    return renderSelectedGroupData()
}
