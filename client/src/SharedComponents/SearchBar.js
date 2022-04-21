import React from 'react'
import { useSelector } from 'react-redux'
import lens from "../Assets/Images/search-lens.png"
import "./SearchBar.scss"

export default function SearchBar() {

    const { addFriend } = useSelector(state => state.modal)

    return (
        <div className='SearchBar'>
            <input
                type="text"
                placeholder={addFriend ? "Search username or email..." : "Search..."} 
                spellCheck="false"
            />

            <img className='lens' src={lens} />
        </div>
    )
}
