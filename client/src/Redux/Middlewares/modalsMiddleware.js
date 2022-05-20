const modalsMiddleware = store => next => async action => {

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