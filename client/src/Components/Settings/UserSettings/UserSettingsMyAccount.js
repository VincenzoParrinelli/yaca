import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import defaultProPic from "../../../Assets/Images/user-icon-2.png"
import "./UserSettingsMyAccount.scss"

export default function UserSettingsMyAccount() {

    const [newProPic, setNewProPic] = useState(null)

    const { username, newProPicBlob } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    useEffect(() => {

        return () => {
            URL.revokeObjectURL(newProPic)
        }

    }, [])

    const handleNewPic = e => {

        setNewProPic(e.target.files[0])
        
    }

    return (
        <div className='app-settings-my-account'>

            <section className='app-settings-my-account__section-1'>

                <span className='app-settings-my-account__section-1-title'>
                    My account
                </span>

                <div className='app-settings-my-account__user-profile-card'>

                    <div className='app-settings-my-account__banner' />

                    <label className='app-settings-my-account__propic-container'>

                        <img className='app-settings-my-account__propic' src={(newProPic && URL.createObjectURL(newProPic)) ?? defaultProPic} />

                        <input
                            className='app-settings-my-account__new-pro-pic'
                            type="file"
                            accept='.jpg, .png'
                            onClick={e => e.target.value = null} //set value to null on every click, so the user can select the same file again
                            onChange={e => handleNewPic(e)}
                        />

                    </label>

                    <span className='app-settings-my-account__username'> {username} </span>

                    <div className='app-settings-my-account__user-settings-container'>

                    </div>

                </div>

            </section>
        </div>
    )
}
