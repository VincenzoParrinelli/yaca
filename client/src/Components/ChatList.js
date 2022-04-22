import React from 'react'
import home from "../Assets/Images/home.png"
import "./ChatList.scss"
import SearchBar from '../ComponentsShared/SearchBar'

export default function ChatList() {

    return (
        <div className='ChatList'>

            <div className='page-title-container'>
                <img className='home' src={home} />

                Dashboard
            </div>

            <SearchBar />

        </div>
    )
}
