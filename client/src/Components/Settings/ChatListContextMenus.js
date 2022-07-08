import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { handleOpenGroupSettings } from '../../Redux/settingsSlice'
import "./ChatListContextMenus.scss"

export default function ChatListMenus() {

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 })
    const [isOpen, setIsOpen] = useState(false)
    const [selectedID, setSelectedID] = useState("")
    const [selectedType, setSelectedType] = useState("")

    const menuRef = useRef(null)

    const dispatch = useDispatch()

    //get exact position where user clicks and from that origin show a menu
    const menusHandler = useCallback(e => {

        e.preventDefault()

        if (menuRef.current && menuRef.current.contains(e.target)) return
        
        setAnchorPoint({ x: e.pageX, y: e.pageY })
        setSelectedID(e.target.id)
        setSelectedType(e.target.dataset.type)
        setIsOpen(true)

    }, [setAnchorPoint, setIsOpen, setSelectedID])

    useEffect(() => {
        document.addEventListener("contextmenu", menusHandler)

        return () => {
            document.removeEventListener("contextmenu", menusHandler)
        }
    }, [])

    //close menu when clicking outside or pressing escape key
    const closeMenu = e => {
        if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false)
    }

    const closeMenuOnEsc = e => {
        if (e.key === "Escape") setIsOpen(false)
    }

    useEffect(() => {

        document.addEventListener("mousedown", closeMenu)
        document.addEventListener("keydown", closeMenuOnEsc)

        return () => {
            document.removeEventListener("mousedown", closeMenu)
            document.removeEventListener("keydown", closeMenuOnEsc)
        }
    }, [menuRef])


    const listController = () => {

        switch (isOpen) {

            case selectedType === "friend":
                return (
                    <nav className='chat-list-menus chat-list-menus--friend-settings' ref={menuRef} style={{ position: "absolute", top: anchorPoint.y, left: anchorPoint.x }}>
                        <button className='chat-list-menus--friend-settings__delete-friend-btn'> Delete Friend </button>
                    </nav>
                )

            case selectedType === "group":

                return (
                    <nav className='chat-list-menus chat-list-menus--group-settings' ref={menuRef} style={{ position: "absolute", top: anchorPoint.y, left: anchorPoint.x }}>
                        <button
                            className='chat-list-menus--group-settings__group-settings-btn'
                            onClick={() => dispatch(handleOpenGroupSettings(selectedID))}
                        > Group Settings
                        </button>
                    </nav>
                )

            default: break;
        }
    }

    //check to avoid displaying menu on first
    return isOpen && listController()

}
