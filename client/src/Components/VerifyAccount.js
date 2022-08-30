import React from 'react'
import "./VerifyAccount.scss"

export default function VerifyAccount() {
    return (
        <div className='verify-account'>

            <div className='verify-account__container'>

                <h1 className='verify-account__heading'>Thank you for joining us.</h1>

                <span className='verify-account__span-1'>
                    In order to continue using yaca, you must verify your account first, an email has already been sent with a
                    confirmation link.
                </span>

                <button className='verify-account__resend-email-btn'>
                    Resend Email
                </button>

            </div>


        </div>
    )
}
