const modalsMiddleware = store => next => async action => {

    if (action.type === "modal/reset") return next(action)

    if (action.type.split("/")[0] === "modal") {

        store.dispatch({
            type: "modal/reset",
        })

    }

    next(action)
}

export default modalsMiddleware