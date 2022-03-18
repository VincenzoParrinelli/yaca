import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { createUser, reset } from '../Redux/userSlice';
import backArrow from "../Assets/Images/back-arrow.png"
import loginIcon from "../Assets/Images/login-icon.png"
import "./SignUp.scss"
import EmailSent from './EmailSent.js';


export default function SignUp(props) {
    const [signUpEmail, setSignUpEmail] = useState("")
    const emailSpanRef = useRef(null)
    const emailInputRef = useRef(null)
    const { emailSent, errors } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(reset())

        if (emailSent) return

        if (signUpEmail) {
            emailSpanRef.current.style.top = "242px"
            emailSpanRef.current.style.fontSize = "12px"

        } else {
            emailSpanRef.current.style.top = ""
            emailSpanRef.current.style.fontSize = ""
        }

    }, [signUpEmail])

    useEffect(() => {
        if (emailSent) return

        if (!errors.isValid || errors.isPresent) {
            emailInputRef.current.style.borderColor = "red"
            emailSpanRef.current.style.color = "red"
        } else {
            emailInputRef.current.style.borderColor = ""
            emailSpanRef.current.style.color = ""
        }
    }, [errors])

    return (

        <div className='SignUp' >

            {emailSent ?

                <EmailSent
                    handleSignUpForm={props.handleSignUpForm}
                />

                :

                <div
                    className='sign-up-form'
                >

                    <img
                        className='back-arrow'
                        onClick={() => props.handleSignUpForm(true)}
                        src={backArrow}
                    />

                    <label className='email-sign-up-container'>

                        <input
                            ref={emailInputRef}
                            type="email"
                            className='email-sign-up'
                            onChange={e => setSignUpEmail(e.target.value)}
                        />

                        <span
                            ref={emailSpanRef}
                            className='email-sign-up-span'
                        > EMAIL
                            {
                                !errors.isValid ? <span>- please input a valid email</span> :
                                    errors.isPresent && <span>- email already present</span>
                            }
                        </span>

                    </label>

                    <img className='login-icon' src={loginIcon} />

                    <button className='submit' id='submit-sign-up' onClick={() => dispatch(createUser(signUpEmail))}>SUBMIT</button>

                </div>

            }

        </div>

    )
}
