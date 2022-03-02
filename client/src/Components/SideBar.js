import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from '../Redux/userSlice';
import { openSettings } from "../Redux/modalSlice"
import './SideBar.scss'

export default function SideBar() {
    const [proPic, setProPic] = useState(null)

    const { user, isLogged } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isLogged) {
            dispatch(loadUser(user))
        }
    }, [])

    return (
        <div className='SideBar'>

            <div className='icons'>
                <img src={user.proPic} className='user-icon' onClick={() => dispatch(openSettings())} />
            </div>

            <div className='separator-wrapper'>

                <div className='separator' />

            </div>
        </div>
    )
}
