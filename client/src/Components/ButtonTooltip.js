import React, { useState, useEffect, useRef } from 'react'
import "./ButtonTooltip.scss"

export default function ButtonTooltip() {

    const [hoveredId, setHoveredId] = useState(null)

    const toolTipRef = useRef(null)


    useEffect(() => {

        let sidebarIconRef = document.querySelector(".sidebar-icons")

        let sidebarIconHovered = sidebarIconRef.querySelector(":hover > img")

        setHoveredId(sidebarIconHovered.dataset.tooltiptext)

        let sidebarIconTop = sidebarIconHovered.getBoundingClientRect().top

        toolTipRef.current.style.top = sidebarIconTop.toString() + "px"

        toolTipRef.current.style.display = "flex"


    }, [])

    return (
        <div ref={toolTipRef} className="ButtonToolTip" >
            <span className='toolTipText'>
                {hoveredId}
            </span>
        </div>
    )
}
