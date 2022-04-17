import React from 'react'
import lens from "../Assets/Images/search-lens.png"
import home from "../Assets/Images/home.png"
import "./ChatList.scss"

export default function ChatList() {
    return (
        <div className='ChatList'>

            <div className='page-title-container'>
                <img className='home' src={home} />

                <p>Dashboard</p>
            </div>

            <div className='nav'>
                <input
                    type="text"
                    placeholder="Search..."
                    spellCheck="false"
                />

                <img className='lens' src={lens} />

            </div>

        </div>
    )
}
