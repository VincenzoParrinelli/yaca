import React from 'react'
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./ProPic.scss"

export default function ProPic({ ...props }) {

    const { proPicBlob, style, socketID, isLogged } = props

    return (

        <div>
            <label className='propic-container' style={style}>

                <img
                    src={proPicBlob ? proPicBlob : defaultProPic}
                    className={proPicBlob ? 'propic-container__propic' : "propic-container__default-propic"}
                    alt="propic-or-defaultpropicasset"
                />


                {isLogged && <div className='propic-container__user-status propic-container__user-status--online' />}

                {socketID && <div className='propic-container__user-status propic-container__user-status--online' />}

                {socketID === "OFFLINE" && <div className='propic-container__user-status propic-container__user-status--offline' />}

            </label>
        </div>
    )
}
