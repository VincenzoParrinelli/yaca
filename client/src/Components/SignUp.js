import React, { useState, useEffect, useRef } from 'react';
import backArrow from "../Assets/Images/back-arrow.png"


export default function SignUp(props) {
    const [signUpEmail, setSignUpEmail] = useState("")
    const emailSpanRef = useRef(null)

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

        <div className='sign-up-form-container' >

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

                <button className='submit'>SUBMIT</button>

            </div>
        </div>

    )
}
