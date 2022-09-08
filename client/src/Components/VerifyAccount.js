import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { activateAccount } from '../Redux/userSlice'
import "./VerifyAccount.scss"

export default function VerifyAccount() {

    const { isLogged } = useSelector(state => state.user)

    const { activationErrors } = useSelector(state => state.error)
    const { token } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
     
        if (token) dispatch(activateAccount(token))

        if (isLogged) navigate("/dashboard")

    }, [])

    return (
        <div className='verify-account'>

            <div className='verify-account__container'>


                {activationErrors.isInvalid ?
                    <>
                        <h1 className='verify-account__heading verify-account__heading--error'>Token Expired.</h1>

                        <span className='verify-account__span-1'>
                            There had been an error with your activation process, this might happen when your activation
                            token has expired, please try again by clicking the button below and generating a new link.
                        </span>

                    </>
                    :
                    <>
                        <h1 className='verify-account__heading'>Thank you for joining us.</h1>

                        <span className='verify-account__span-1'>
                            In order to continue using yaca, you must verify your account first, an email has already been sent with a
                            confirmation link.
                        </span>
                    </>
                }


                <button className='verify-account__resend-email-btn'>
                    Resend Email
                </button>

            </div>


        </div>
    )
}
