import React from 'react'
import { useSelector } from "react-redux"
import "./MainContent.scss"

export default function MainContent() {
    const { addFriend } = useSelector(state => state.modal)


    return (
        <div className='MainContent'>
          
        </div>
    )
}
