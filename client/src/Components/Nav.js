import React, { useRef, useState, useEffect } from 'react';
import inbox from "../Assets/Images/inbox.png"
import ButtonTooltip from './ButtonTooltip'
import "./Nav.scss"

export default function Nav() {

    const [showTooltip, setShowTooltip] = useState(false)

    const inboxRef = useRef(null)
    const toolTipRef = useRef(null)

    const closeToolTip = () => {

        if(toolTipRef.current) toolTipRef.current.style.animation = "popOut .1s"
      
        // close the tooltip after waiting for animation's end 
        setTimeout(() => {
            setShowTooltip(false)
        }, 100)
    }

    return (
        <div className='Nav'>

            <img
                ref={inboxRef}
                src={inbox}
                className='inbox'
                onMouseOver={() => setShowTooltip(true)}
                onMouseLeave={() => closeToolTip()}
            />

            {showTooltip &&
                <div ref={toolTipRef} className="ButtonTooltip">
                    <ButtonTooltip />
                </div>
            }
        </div>
    )
}
