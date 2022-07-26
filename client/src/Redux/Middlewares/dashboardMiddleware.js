const dashboardMiddleware = store => next => action => {

    if (action.type === "dashboard/reset") return next(action)

    if (action.type.split("/")[0] === "dashboard") {
      
        store.dispatch({
            type: "dashboard/reset"
        })

    }

    next(action)
}

export default dashboardMiddleware