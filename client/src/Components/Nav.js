import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { handleInbox } from "../Redux/modalsSlice"
import inboxImage from "../Assets/Images/inbox.png"
import ButtonTooltip from './ButtonTooltip'
import "./Nav.scss"
import InboxModal from './InboxModal';

export default function Nav() {

    const [showTooltip, setShowTooltip] = useState(false)

    const inboxRef = useRef(null)
    const toolTipRef = useRef(null)

    const { inbox } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const closeToolTip = () => {

        if (toolTipRef.current) toolTipRef.current.style.animation = "popOut .1s"

        // close the tooltip after waiting for animation's end 
        setTimeout(() => {
            setShowTooltip(false)
        }, 100)
    }

    return (
        <div className='Nav'>

            <img
                ref={inboxRef}
                value={inbox} //parameter to keep button opacity set to 1 while modal is open
                src={inboxImage}
                className='inbox'
                onClick={() => dispatch(handleInbox())}
                onMouseOver={() => setShowTooltip(true)}
                onMouseLeave={() => closeToolTip()}
            />

            { inbox && <InboxModal/> }

            {showTooltip &&
                <div ref={toolTipRef} className="ButtonTooltip">
                    <ButtonTooltip />
                </div>
            }
        </div>
    )
}
