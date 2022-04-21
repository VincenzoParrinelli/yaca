const modalsMiddleware = store => next => action => {

    if (action.type === "modals/closeButtonToolTip") {

        let toolTipRef = document.querySelector(".ButtonToolTip")

        if (toolTipRef) toolTipRef.style.animation = "popOut .1s"

        // close the tooltip after waiting for animation's end 
        new Promise(res => setTimeout(res, 100))

    }

    //get slice and current action name
    var sliceName = action.type.split("/")[0]
    var sliceAction = action.type.split("/")[1]

    //second if check prevents an infinite loop
    if (sliceName === "modals" && sliceAction !== "reset" && sliceAction !== "openButtonToolTip" && sliceAction !== "closeButtonToolTip") {
        store.dispatch({
            type: "modals/reset",
            payload: sliceAction
        })
    }


    next(action)
}

export default modalsMiddleware