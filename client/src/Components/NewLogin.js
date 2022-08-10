import React, { useState, useRef, useEffect } from 'react'
import "./NewLogin.scss"

export default function NewLogin() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const emailLabelRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordLabelRef = useRef(null)
    const passwordInputRef = useRef(null)

    //user mousedown input listener
    useEffect(() => {

        window.addEventListener("mousedown", removeLabelFocusClass)

        return () => {
            window.removeEventListener("mousedown", removeLabelFocusClass)
        }

    }, [])


    //if no email or password and no focus in input form remove focused class from respective label 
    const removeLabelFocusClass = e => {

        if (e.target !== emailLabelRef.current && !emailInputRef.current.value) emailLabelRef.current.classList.remove("login__label--focused")
        if (e.target !== passwordLabelRef.current && !passwordInputRef.current.value) passwordLabelRef.current.classList.remove("login__label--focused")

    }

    //when user clicks respective input add focused class on respective label
    const handleEmailFocus = e => {

        //we use htmlFor to distinguish each label
        if (e.target.name === emailLabelRef.current.htmlFor) emailLabelRef.current.classList.add("login__label--focused")
        if (e.target.name === passwordLabelRef.current.htmlFor) passwordLabelRef.current.classList.add("login__label--focused")

    }

    return (
        <div className='login'>

            <div className='login__container-outer'>

                <div className='login__form-container'>

                    <span className='login__welcome-span'>WELCOME BACK.</span>

                    <span className='login__signin-text'>Not a member? <a className='login__signin-anchor' href=''>Sign In</a> </span>

                    <form className='login__form' method='POST' autoComplete='off'>

                        <div>
                            <label className='login__label' ref={emailLabelRef} htmlFor="email" >Email</label>

                            <input
                                className='login__input login__input--email'
                                id='email'
                                name='email'
                                value={email}
                                ref={emailInputRef}
                                onChange={e => setEmail(e.target.value)}
                                onClick={e => handleEmailFocus(e)}
                            />
                        </div>

                        <div>
                            <label className='login__label' ref={passwordLabelRef} htmlFor="password" >Password</label>

                            <input
                                className='login__input login__input--password'
                                id="password"
                                name='password'
                                type="password"
                                value={password}
                                ref={passwordInputRef}
                                onChange={e => setPassword(e.target.value)}
                                onClick={e => handleEmailFocus(e)}
                            />
                        </div>

                        <input className='login__submit-btn' type="submit" value="LOGIN" />
                    </form>

                </div>

            </div>
        </div>
    )
}
