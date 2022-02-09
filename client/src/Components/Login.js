import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { reset } from '../Redux/userSlice';
import "./Login.scss"
import logo from "../Assets/Images/logo.png"
import loginIcon from "../Assets/Images/login-icon.png"
import userIcon from "../Assets/Images/user-icon.png"
import emailIcon from "../Assets/Images/email.png"
import SignUpForm from "./SignUp"

export default function Login() {

    const [openSignUp, setOpenSignUp] = useState(false)
    const [back, setBack] = useState(false)
    const [loginEmail, setLoginEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginRef = useRef(null)
    const emailSpanLoginRef = useRef(null)
    const passwordSpanRef = useRef(null)
    const { emailSent } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {

        if (loginEmail) {
            emailSpanLoginRef.current.style.top = "242px"
            emailSpanLoginRef.current.style.fontSize = "12px"

        } else {
            emailSpanLoginRef.current.style.top = ""
            emailSpanLoginRef.current.style.fontSize = ""
        }

    }, [loginEmail])

    useEffect(() => {

        if (password) {
            passwordSpanRef.current.style.top = "312px"
            passwordSpanRef.current.style.fontSize = "12px"

        } else {
            passwordSpanRef.current.style.top = ""
            passwordSpanRef.current.style.fontSize = ""
        }

    }, [password])

    //The back parameter is a flag that tells this function if we want to swap from
    //signup to login form

    const handleSignUpForm = back => {
        setBack(back)

        if (openSignUp && !back) return

        loginRef.current.style.animation = "sign-up-form-close 0.4s"

        setLoginEmail("")

    }

    const openSignUpForm = () => {

        //removes errors and emailSent flag while swapping form
        dispatch(reset())

        loginRef.current.style.animation = "sign-up-form-open 0.4s"

        if (!back) {
            setOpenSignUp(true)
        } else {
            setOpenSignUp(false)
        }
    }


    return (
        <div className='Login'>

            <img src={logo} className='logo' />

            <div className='login-form-container'>

                <div
                    ref={loginRef}
                    className='login-form1'
                    onAnimationEnd={() => openSignUpForm()}
                    value={openSignUp}
                >

                    {emailSent ?

                        <img className='icon' id='icon-email' src={emailIcon} />

                        :

                        <img className='icon' id='icon-user' src={userIcon} />
                    }

                    { //swap form to signup on user click

                        openSignUp ?

                            <SignUpForm
                                handleSignUpForm={handleSignUpForm}
                            />

                            :

                            <div>

                                <label className='email-container'>

                                    <input
                                        type="email"
                                        className='email'
                                        value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)}
                                    />

                                    <span ref={emailSpanLoginRef}> EMAIL </span>

                                </label>

                                <label className='password-container'>

                                    <input
                                        type="password"
                                        className='password'
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <span ref={passwordSpanRef}> PASSWORD </span>

                                </label>


                                <img className='login-icon' src={loginIcon} />

                                <button className='submit'>LOGIN</button>

                                <div className='remember-me-container'>
                                    <input type="checkbox" className='remember-me-checkbox'></input>

                                    <p className='remember-me-paragraph'> Remember me </p>
                                </div>


                                <a className='reset-password' href=""> Forgot your password? </a>

                            </div>
                    }

                </div>


                <div className='login-form2'>
                    <p className='welcome'> Welcome. </p>
                    <p className='not-a-member'>Not a member? </p>
                    <p className='sign-up' onClick={() => handleSignUpForm()}> Sign up now </p>
                </div>
            </div>

        </div>
    )
}
