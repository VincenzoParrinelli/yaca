import React from 'react'
import home from "../Assets/Images/home.png"
import "./ChatList.scss"
import SearchBar from '../SharedComponents/SearchBar'

export default function ChatList() {

    return (
        <div className='ChatList'>

            <div className='page-title-container'>
                <img className='home' src={home} />

                <p>Dashboard</p>
            </div>

            <SearchBar />

        </div>
    )
}
