import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { searchUsers } from '../Redux/socketsSlice'
import SearchLens from "../Assets/Images/search-lens.png"
import "./SearchNewUser.scss"

export default function SearchNewUser() {

  const [username, setUsername] = useState("")

  const searchBarRef = useRef(null)

  const { searchedUsers } = useSelector(state => state.sockets)

  const dispatch = useDispatch()

  return (
    <div className='SearchNewUser'>

      <div className='search-bar-container'>

        <input
          ref={searchBarRef}
          type="text"
          placeholder='Enter a username'
          className='search-bar'
          value={username}
          onChange={e => setUsername(e.target.value)}

        />

        <img className='search-lens' src={SearchLens} onClick={() => dispatch(searchUsers(username))} />

      </div>


      <div className='separator' />

      <div className=''>

      </div>

    </div>
  )

}
