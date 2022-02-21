import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { openSettings } from "../Redux/modalSlice"
import './SideBar.scss'

export default function SideBar() {

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    return (
        <div className='SideBar'>

            <div className='icons'>
                <a className='user-icon' onClick={() => dispatch(openSettings())} />
            </div>

            <div className='separator-wrapper'>

                <div className='separator' />

            </div>
        </div>
    )
}
