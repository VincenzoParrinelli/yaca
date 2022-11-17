import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchUsers } from '../Redux/socketSlice'
import lens from "../Assets/Images/search-lens.png"
import "./SearchBar.scss"

export default function SearchBar() {

    const [searchBarInput, setSearchBarInput] = useState("")

    const { dashboard, addFriend } = useSelector(state => state.dashboard)

    const dispatch = useDispatch()

    useEffect(() => {

        checkActiveDashboardComponent()

    }, [dashboard])


    useEffect(() => {

        if (searchBarInput && addFriend) dispatch(searchUsers(searchBarInput))

    }, [searchBarInput])

    // Set searchBarInput state based on wich component is rendered
    const checkActiveDashboardComponent = () => {

        if (dashboard) setSearchBarInput("Chats")
        if (addFriend) setSearchBarInput("Search")

    }

    return (
        <div className='search-bar'>

            <div className='search-bar__container'>

                <input
                    type="text"
                    spellCheck="false"
                    className='search-bar__input-field'
                    onChange={e => setSearchBarInput(e.target.value)}
                    placeholder={searchBarInput}
                    onBlur={() => checkActiveDashboardComponent()} // When input loses focus reset searchBarInput state

                />

                <img className='search-bar__lens' src={lens} alt="lens-icon" />

            </div>

        </div>
    )
}
