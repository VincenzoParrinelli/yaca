import React from 'react'
import defaultProPic from "../Assets/Images/user-icon-2.png"
import "./ProPic.scss"

export default function ProPic({ ...props }) {

    const { proPicBlob, style, socketID } = props

    return (
        <label className='propic-container' style={style}>

            <img
                src={proPicBlob ?? defaultProPic}
                className={proPicBlob ? 'propic-container__propic' : "propic-container__default-propic"}
            />

            {socketID !== "OFFLINE" ?

                <div className='propic-container__user-status propic-container__user-status--online' />

                :

                <div className='propic-container__user-status propic-container__user-status--offline' />
            }

        </label>
    )
}
