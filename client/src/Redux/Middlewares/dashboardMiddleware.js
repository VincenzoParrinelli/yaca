const dashboardMiddleware = store => next => action => {

    if (action.type === "dashboard/reset") return next(action)

    const notificationAction = action.type.split("/")[1]

    // do not reset state on notification component triggers 
    
    if (
        action.type.split("/")[0] === "dashboard" &&
        notificationAction !== "closeNotifications" &&
        notificationAction !== "openNotifications" 
    ) {

        store.dispatch({
            type: "dashboard/reset"
        })

    }

    next(action)
}

export default dashboardMiddleware