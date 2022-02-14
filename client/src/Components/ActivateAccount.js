import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { activateAccount, reset } from '../Redux/userSlice';
import "./ActivateAccount.scss"

export default function ActivateAccount() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const usernameSpanRef = useRef(null)
    const passwordInputRef = useRef(null)
    const passwordInputRef2 = useRef(null)
    const passwordSpanRef = useRef(null)
    const passwordSpanRef2 = useRef(null)

    const { errors } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {

        if (username) {
            usernameSpanRef.current.style.top = "150px"
            usernameSpanRef.current.style.fontSize = "11px"

        } else {
            usernameSpanRef.current.style.top = ""
            usernameSpanRef.current.style.fontSize = ""
        }

    }, [username])


    useEffect(() => {

        dispatch(reset())

        if (password) {
            passwordSpanRef.current.style.top = "245px"
            passwordSpanRef.current.style.fontSize = "12px"

        } else {
            passwordSpanRef.current.style.top = ""
            passwordSpanRef.current.style.fontSize = ""
        }

    }, [password])

    useEffect(() => {

        if (password2) {
            passwordSpanRef2.current.style.top = "340px"
            passwordSpanRef2.current.style.fontSize = "11px"

        } else {
            passwordSpanRef2.current.style.top = ""
            passwordSpanRef2.current.style.fontSize = ""
        }

    }, [password2])

    useEffect(() => {

        if (!errors.isValid) {
            passwordInputRef.current.style.borderColor = "red"
            passwordSpanRef.current.style.color = "red"

            passwordSpanRef.current.style.left = "282px"
            passwordSpanRef.current.style.fontSize = "12px"
            passwordSpanRef.current.style.inlineSize = "300px"

        } else {
            passwordInputRef.current.style.borderColor = ""
            passwordSpanRef.current.style.color = ""
        }

        if (!errors.isMatch) {
            passwordInputRef2.current.style.borderColor = "red"
            passwordSpanRef2.current.style.color = "red"

            passwordSpanRef2.current.style.left = "280px"
            passwordSpanRef2.current.style.fontSize = "11px"
            passwordSpanRef2.current.style.inlineSize = "300px"

        } else {
            passwordInputRef2.current.style.borderColor = ""
            passwordSpanRef2.current.style.color = ""
        }

    }, [errors])


    return (
        <div className='ActivateAccount'>

            <div className='new-password-form-container'>

                <label className='password-container'>
                    <input
                        className='password'
                        id='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <span ref={usernameSpanRef} id="username-span"> USERNAME
                      
                    </span>
                </label>

                <label className='password-container'>
                    <input
                        ref={passwordInputRef}
                        type="password"
                        className='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <span ref={passwordSpanRef} id="password-span"> PASSWORD
                        {
                            !errors.isValid && <span>- please input a valid password</span>
                        }
                    </span>
                </label>

                <label className='password-container'>
                    <input
                        ref={passwordInputRef2}
                        type="password"
                        className='password'
                        id='confirm-password'
                        value={password2}
                        onChange={e => setPassword2(e.target.value)}
                    />
                    <span ref={passwordSpanRef2} id='confirm-password-span'> CONFIRM-PASSWORD
                        {
                            !errors.isMatch && <span>- passwords do not match</span>
                        }
                    </span>

                </label>

                <div className='is-present-error'>
                    {errors.isPresent && <span>This user is already active</span>}
                </div>

                <button className='submit'
                    onClick={() => dispatch(activateAccount({ username, password, password2, id: location.pathname.substring(location.pathname.lastIndexOf("/") + 1) }))}
                >

                    ActivateAccount
                </button>

                <Link to="/login" className='login-link'>Log In</Link>
            </div>
        </div>
    )
}
