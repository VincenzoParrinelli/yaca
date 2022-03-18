import React from 'react'
import { useSelector } from "react-redux"
import SearchNewUser from './SearchNewUser'
import "./MainContent.scss"

export default function MainContent() {
    const { addFriend } = useSelector(state => state.modal)


    return (
        <div className='MainContent'>
            {addFriend &&
                <SearchNewUser />
            }
        </div>
    )
}
