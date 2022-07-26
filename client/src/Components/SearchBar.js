import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import lens from "../Assets/Images/search-lens.png"
import "./SearchBar.scss"

export default function SearchBar() {

    const { addFriend } = useSelector(state => state.dashboard)

    const dispatch = useDispatch()

    const handleSearch = e => {

    }

    return (
        <div className='search-bar'>

            <input
                type="text"
                spellCheck="false"
                placeholder={addFriend ? "Search username or email..." : "Search..."}
                onChange={e => handleSearch(e)}
            />

            <img className='search-bar__lens' src={lens} />
        </div>
    )
}
