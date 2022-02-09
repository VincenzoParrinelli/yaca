import React from 'react';
import backArrow from "../Assets/Images/back-arrow.png"
import "./EmailSent.scss"

export default function EmailSent(props) {
    return (
        <div className='EmailSent'>

            <img
                className='back-arrow'
                onClick={() => props.handleSignUpForm(true)}
                src={backArrow}
            />

            <div className='email-sent-container'>
                An activation email has been sent to your inbox. Please activate your email in the next 10 minutes
            </div>

        </div>
    )
}
