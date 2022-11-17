import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { searchUsers, resetSearchedUsers } from '../Redux/userSlice'
import lens from "../Assets/Images/search-lens.png"
import "./SearchBar.scss"

export default function SearchBar() {

    const [usernameToSearch, setUsernameToSearch] = useState("")
    const [searchBarPlaceHolder, setSearchBarPlaceHolder] = useState("")

    const { dashboard, addFriend } = useSelector(state => state.dashboard)
    const { _id } = useSelector(state => state.user.data)

    const dispatch = useDispatch()

    useEffect(() => {

        if(!usernameToSearch) dispatch(resetSearchedUsers())

    }, [usernameToSearch, dispatch])

    useEffect(() => {

        checkActiveDashboardComponent()

    }, [dashboard])


    useEffect(() => {

        if (usernameToSearch && addFriend) dispatch(searchUsers({ userID: _id, usernameToSearch }))

    }, [usernameToSearch])

    // Set searchBarInput state based on wich component is rendered
    const checkActiveDashboardComponent = () => {

        if (dashboard) setSearchBarPlaceHolder("Chats")
        if (addFriend) setSearchBarPlaceHolder("Search")

    }

    return (
        <div className='search-bar'>

            <div className='search-bar__container'>

                <input
                    type="text"
                    spellCheck="false"
                    className='search-bar__input-field'
                    onChange={e => setUsernameToSearch(e.target.value)}
                    placeholder={searchBarPlaceHolder}
                    onBlur={() => checkActiveDashboardComponent()} // When input loses focus reset searchBarPlaceHolder state

                />

                <img className='search-bar__lens' src={lens} alt="lens-icon" />

            </div>

        </div>
    )
}
