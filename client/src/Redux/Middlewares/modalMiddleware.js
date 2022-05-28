const modalsMiddleware = store => next => async action => {

    //get slice and current action name
    var sliceName = action.type.split("/")[0]
    var sliceAction = action.type.split("/")[1]

    //second if check prevents an infinite loop
    if (sliceName === "modal" && sliceAction !== "reset" && sliceAction !== "openButtonToolTip" && sliceAction !== "closeButtonToolTip" && sliceAction !== "closeNewGroupModal") {
       
        store.dispatch({
            type: "modal/reset",
            payload: sliceAction
        })
        
    }


    if (action.type === "modal/closeNewGroupModal") {
        let groupModalOverlayRef = document.querySelector(".new-group-modal__overlay")
        let sidebarIconRef = document.querySelector(".sidebar__create-server")

        groupModalOverlayRef.style.animation= "modalPopOut .3s"
        sidebarIconRef.style.animation = "popOut .3s"

        //wait for animation to end before closing the modal
        await new Promise(res => setTimeout(res, 200))
    }


    next(action)
}

export default modalsMiddleware