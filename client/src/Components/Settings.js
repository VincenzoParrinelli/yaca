import React from 'react'
import Modal from "react-modal"

export default function Settings() {
    return (
        <div>
            <Modal style={
                {
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)'
                    },

                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "50vh",
                        height: "80vh",
                        transform: "translate(-50%, -50%)",
                        fontFamily: "arial",
                        borderRadius: "7px"
                    }
                }
            } />

            <div className="top-container">
             
                <button className="closeBtn">X</button>
            </div>
        </div >
    )
}
