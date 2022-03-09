import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { handleSettings } from "../Redux/modalsSlice"
import './SideBar.scss'

export default function SideBar() {

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    return (
        <div className='SideBar'>

            <div className='icons'>
                <img src={user.proPic} className='user-icon' onClick={() => dispatch(handleSettings())} />
            </div>

            <div className='separator-wrapper'>

                <div className='separator' />

            </div>
        </div>
    )
}
