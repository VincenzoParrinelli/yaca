const modalsMiddleware = store => next => async action => {

    if (action.type === "modals/handleButtonToolTip" && action.payload === false) {
      
        let toolTipRef = document.querySelector(".ButtonToolTip")

        if (toolTipRef) toolTipRef.style.animation = "popOut .1s"

        // close the tooltip after waiting for animation's end 
        await new Promise(res => setTimeout(res, 100))

    }

    next(action)
}

export default modalsMiddleware