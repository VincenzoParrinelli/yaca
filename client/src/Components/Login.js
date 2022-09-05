import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { register, login, logout } from '../Redux/userSlice';
import { reset as resetSocketState } from "../Redux/socketSlice"
import { reset as errorsReset } from '../Redux/errorsSlice';
import "./Login.scss"

export default function NewLogin() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formContainerRef = useRef(null)

    const usernameLabelRef = useRef(null)
    const usernameInputRef = useRef(null)
    const emailLabelRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordLabelRef = useRef(null)
    const passwordInputRef = useRef(null)

    const { isLogged, redirectToActivation } = useSelector(state => state.user)
    const { errors } = useSelector(state => state.sockets)
    const { usernameErrors, emailErrors, passwordErrors } = useSelector(state => state.error)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    // reset socket and user slice state when login page is rendered
    useEffect(() => {

        //this if prevents user from going back to login form while already logged
        if (isLogged) return navigate("/dashboard")

        dispatch(resetSocketState())
        dispatch(logout())

        if (isLogged && errors.authorized) navigate("/dashboard")

    }, [])

    //trigger opening animation when user swaps to register form
    useEffect(() => {

        removeErrorStylingFromInputs()

        if (location.pathname !== "/register") return

        formContainerRef.current.classList.add("login__form-container--open")

        return () => {
            if (formContainerRef.current) formContainerRef.current.classList.remove("login__form-container--open")
        }
    }, [location.pathname])


    useEffect(() => {

        if (isLogged && errors.authorized) navigate("/dashboard")

        if (redirectToActivation) navigate("/verify-account")

    }, [isLogged, redirectToActivation])


    //user mousedown input listener
    useEffect(() => {

        window.addEventListener("mousedown", removeLabelFocusClass)

        return () => {
            window.removeEventListener("mousedown", removeLabelFocusClass)
        }

    }, [])


    //if no email, password or username and no focus in input form remove focused class from respective label 
    const removeLabelFocusClass = e => {

        if (e.target !== emailLabelRef.current && !emailInputRef.current.value) emailLabelRef.current.classList.remove("login__label--focused")
        if (e.target !== passwordLabelRef.current && !passwordInputRef.current.value) passwordLabelRef.current.classList.remove("login__label--focused")

        if (!usernameLabelRef.current) return
        if (e.target !== usernameLabelRef.current && !usernameInputRef.current.value) usernameLabelRef.current.classList.remove("login__label--focused")

    }

    //when user clicks respective input add focused class on respective label
    const handleInputFocuses = e => {

        //check wich input the user has focused
        if (e.target.name === "email") emailLabelRef.current.classList.add("login__label--focused")
        if (e.target.name === "password") passwordLabelRef.current.classList.add("login__label--focused")

        if (!usernameLabelRef.current) return
        if (e.target.name === "username") usernameLabelRef.current.classList.add("login__label--focused")

    }

    //add styling for respective errors
    useLayoutEffect(() => {

        if (emailErrors.isEmpty || emailErrors.isInvalid || !emailErrors.loginIsPresent || emailErrors.signupIsPresent) {
            emailLabelRef.current.classList.add("login__label--error")
            emailInputRef.current.classList.add("login__input--error")
        }

        if (passwordErrors.isEmpty || passwordErrors.isInvalid) {
            passwordLabelRef.current.classList.add("login__label--error")
            passwordInputRef.current.classList.add("login__input--error")
        }

        if (!usernameLabelRef.current) return

        if (usernameErrors.isEmpty) {
            usernameLabelRef.current.classList.add("login__label--error")
            usernameInputRef.current.classList.add("login__input--error")
        }

    }, [usernameErrors, emailErrors, passwordErrors])

    //if email or password not valid, render respective error jsx
    const submitLoginForm = e => {
        e.preventDefault()

        removeErrorStylingFromInputs()

        if (location.pathname !== "/register") return dispatch(login({ email, password }))

        dispatch(register({ username, email, password }))

    }

    const removeErrorStylingFromInputs = () => {

        dispatch(errorsReset())

        emailLabelRef.current.classList.remove("login__label--error")
        emailInputRef.current.classList.remove("login__input--error")

        passwordLabelRef.current.classList.remove("login__label--error")
        passwordInputRef.current.classList.remove("login__input--error")

        if (!usernameLabelRef.current) return
        usernameLabelRef.current.classList.remove("login__label--error")
        usernameInputRef.current.classList.remove("login__input--error")

    }

    return (
        <div className='login'>

            <div className='login__container-outer'>

                <div className='login__form-container' ref={formContainerRef}>

                    {location.pathname === "/register" ?
                        <>
                            <span className='login__span-1'>CREATE NEW ACCOUNT.</span>
                        </>

                        :

                        <>
                            <span className='login__span-1'>WELCOME BACK.</span>

                            <span className='login__signin-text'>Not a member? <a className='login__signin-anchor' onClick={() => navigate("/register")}>Sign In</a> </span>
                        </>
                    }

                    <form className='login__form' method='POST' autoComplete='off' onSubmit={submitLoginForm} noValidate>

                        {location.pathname === "/register" &&
                            <div>
                                <label
                                    className='login__label'
                                    ref={usernameLabelRef}
                                    htmlFor='username'
                                >

                                    Username

                                    {usernameErrors.isEmpty && <span className='login__error'> - This field is required</span>}

                                </label>

                                <input
                                    className='login__input login__input--username'
                                    id='username'
                                    type="text"
                                    name="username"
                                    value={username}
                                    ref={usernameInputRef}
                                    onChange={e => setUsername(e.target.value)}
                                    onClick={e => handleInputFocuses(e)}
                                />
                            </div>
                        }

                        <div>
                            <label
                                className='login__label'
                                ref={emailLabelRef}
                                htmlFor="email"
                            >

                                Email

                                {emailErrors.isEmpty && <span className='login__error'> - This field is required</span>}
                                {emailErrors.isInvalid && <span className='login__error'> - Invalid Email</span>}
                                {!emailErrors.loginIsPresent && <span className='login__error'> - This user doesn't exist</span>}
                                {emailErrors.signupIsPresent && <span className='login__error'> - This user already exist</span>}
                            </label>

                            <input
                                className='login__input login__input--email'
                                id='email'
                                type="email"
                                name='email'
                                value={email}
                                ref={emailInputRef}
                                onChange={e => setEmail(e.target.value)}
                                onClick={e => handleInputFocuses(e)}
                            />
                        </div>


                        <div>

                            <label
                                className='login__label'
                                ref={passwordLabelRef}
                                htmlFor="password"
                            >

                                Password

                                {passwordErrors.isEmpty && <span className='login__error'> - This field is required</span>}
                                {passwordErrors.isInvalid && <span className='login__error'> - Invalid Password</span>}
                            </label>

                            <input
                                className='login__input login__input--password'
                                id="password"
                                name='password'
                                type="password"
                                value={password}
                                ref={passwordInputRef}
                                onChange={e => setPassword(e.target.value)}
                                onClick={e => handleInputFocuses(e)}
                            />
                        </div>

                        <input className='login__submit-btn' type="submit" value={location.pathname === "/register" ? "SIGNUP" : "LOGIN"} />
                    </form>

                </div>

            </div>
        </div>
    )
}
