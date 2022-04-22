import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchUsers } from '../Redux/socketSlice'
import lens from "../Assets/Images/search-lens.png"
import "./SearchBar.scss"

export default function SearchBar() {

    const { addFriend } = useSelector(state => state.modal)

    const dispatch = useDispatch()

    const handleSearchBarinput = e => {

        if (addFriend) {
            dispatch(searchUsers(e.target.value))
        }

    }

    return (
        <div className='SearchBar'>
            <input
                type="text"
                placeholder={addFriend ? "Search username or email..." : "Search..."}
                spellCheck="false"
                onChange={e => handleSearchBarinput(e)}
            />

            <img className='lens' src={lens} />
        </div>
    )
}
