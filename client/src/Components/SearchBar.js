import React, { useState, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import lens from "../Assets/Images/search-lens.png"
import "./SearchBar.scss"

export default function SearchBar() {

    const [test, setTest] = useState("")

    const { addFriend } = useSelector(state => state.dashboard)

    const dispatch = useDispatch()

    return (
        <div className='search-bar'>
            
            <input
                type="text"
                spellCheck="false"
                className='search-bar__input-field'
                onChange={e => setTest(e.target.value)}
                value={test ? test : "Chats"}
                onBlur={() => setTest("")} //When input loses focus reset test state

            />

            <img className='search-bar__lens' src={lens} />
            
        </div>
    )
}
