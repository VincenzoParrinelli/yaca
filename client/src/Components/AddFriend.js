import React from 'react'
import SearchBar from '../SharedComponents/SearchBar'
import addFriend from "../Assets/Images/add-friend.png"
import "./AddFriend.scss"

export default function AddFriend() {
    return (
        <div className='AddFriend'>

            <div className='page-title-container'>

                <img src={addFriend} className="add-friend-icon" />

                <p>Add new friend</p>

            </div>

            <SearchBar />
        </div>
    )
}
