import React, {useEffect, useRef} from 'react'
import "./ButtonTooltip.scss"

export default function ButtonTooltip() {

    const toolTipRef = useRef(null)

    useEffect(() => {
        let sidebarIconRef = document.querySelector(".notificationBell")

        let sidebarIconTop = sidebarIconRef.getBoundingClientRect().top
    
        toolTipRef.current.style.top = sidebarIconTop.toString() + "px"

        toolTipRef.current.style.display = "flex"

    }, [])

    return (
        <div ref={toolTipRef} className="ButtonToolTip">
            <p>Inbox</p>
        </div>
    )
}
