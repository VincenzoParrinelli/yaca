import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from "react-redux"
import { createUser } from '../Redux/userSlice';
import backArrow from "../Assets/Images/back-arrow.png"
import "./SignUp.scss"


export default function SignUp(props) {
    const [signUpEmail, setSignUpEmail] = useState("")
    const emailSpanRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {

        if (signUpEmail) {
            emailSpanRef.current.style.top = "242px"
            emailSpanRef.current.style.fontSize = "12px"

        } else {
            emailSpanRef.current.style.top = ""
            emailSpanRef.current.style.fontSize = ""
        }

    }, [signUpEmail])


    return (

        <div className='SignUp' >

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
                        type="email"
                        className='email-sign-up'
                        onChange={e => setSignUpEmail(e.target.value)}
                    />

                    <span
                        ref={emailSpanRef}
                        className='email-sign-up-span'
                    > EMAIL
                    </span>

                </label>

                <button className='submit' onClick={() => dispatch(createUser(signUpEmail))}>SUBMIT</button>

            </div>
        </div>

    )
}
