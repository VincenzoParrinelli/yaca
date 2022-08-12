import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { reset as resetUserState, login, logout } from '../Redux/userSlice';
import { reset as resetSocketState } from "../Redux/socketSlice"
import { reset as errorsReset } from '../Redux/errorsSlice';
import "./NewLogin.scss"

export default function NewLogin() {

    const [loginEmail, setLoginEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailLabelRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordLabelRef = useRef(null)
    const passwordInputRef = useRef(null)

    const { isLogged } = useSelector(state => state.user)
    const { errors } = useSelector(state => state.sockets)
    const { emailErrors, passwordErrors } = useSelector(state => state.error)

    console.log(passwordErrors)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // reset socket and user slice state when login page is rendered
    useEffect(() => {

        dispatch(resetSocketState())
        dispatch(logout())

    }, [])


    useEffect(() => {
        if (isLogged && errors.authorized) {
            navigate("/dashboard")
        }
    }, [isLogged])


    //user mousedown input listener
    useEffect(() => {

        window.addEventListener("mousedown", removeLabelFocusClass)

        return () => {
            window.removeEventListener("mousedown", removeLabelFocusClass)
        }

    }, [])


    //if no email, or password and no focus in input form remove focused class from respective label 
    const removeLabelFocusClass = e => {

        if (e.target !== emailLabelRef.current && !emailInputRef.current.value) emailLabelRef.current.classList.remove("login__label--focused")
        if (e.target !== passwordLabelRef.current && !passwordInputRef.current.value) passwordLabelRef.current.classList.remove("login__label--focused")

    }

    //when user clicks respective input add focused class on respective label
    const handleInputFocuses = e => {

        //check wich input the user has focused
        if (e.target.name === "email") emailLabelRef.current.classList.add("login__label--focused")
        if (e.target.name === "password") passwordLabelRef.current.classList.add("login__label--focused")

    }

    //add styling for respective errors
    useEffect(() => {

        if (emailErrors.isEmpty || emailErrors.isInvalid) {
            emailLabelRef.current.classList.add("login__label--error")
            emailInputRef.current.classList.add("login__input--error")
        }

        if (passwordErrors.isEmpty || passwordErrors.isInvalid) {
            passwordLabelRef.current.classList.add("login__label--error")
            passwordInputRef.current.classList.add("login__input--error")
        }

    }, [emailErrors, passwordErrors])

    //if email or password not valid, render respective error jsx
    const submitLoginForm = e => {
        e.preventDefault()
        
        reset()

        dispatch(login({ loginEmail, password }))

    }

    const reset = () => {

        dispatch(errorsReset())

        emailLabelRef.current.classList.remove("login__label--error")
        emailInputRef.current.classList.remove("login__input--error")

        passwordLabelRef.current.classList.remove("login__label--error")
        passwordInputRef.current.classList.remove("login__input--error")
    }

    return (
        <div className='login'>

            <div className='login__container-outer'>

                <div className='login__form-container'>

                    <span className='login__welcome-span'>WELCOME BACK.</span>

                    <span className='login__signin-text'>Not a member? <a className='login__signin-anchor' href=''>Sign In</a> </span>

                    <form className='login__form' method='POST' autoComplete='off' onSubmit={submitLoginForm} noValidate>

                        <div>
                            <label
                                className='login__label'
                                ref={emailLabelRef}
                                htmlFor="email" >

                                Email

                                {emailErrors.isEmpty && <span className='login__error'> - This field is required</span>}
                                {emailErrors.isInvalid && <span className='login__error'> - Invalid Email</span>}
                                {!emailErrors.isPresent && <span className='login__error'> - This user doesn't exist</span>}
                            </label>

                            <input
                                className='login__input login__input--email'
                                id='email'
                                type="email"
                                name='email'
                                value={loginEmail}
                                ref={emailInputRef}
                                onChange={e => setLoginEmail(e.target.value)}
                                onClick={e => handleInputFocuses(e)}
                            />
                        </div>


                        <div>

                            <label
                                className='login__label'
                                ref={passwordLabelRef}
                                htmlFor="password" >

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

                        <input className='login__submit-btn' type="submit" value="LOGIN" />
                    </form>

                </div>

            </div>
        </div>
    )
}
