export const errorMiddleware = store => next => action => {

    if (action.type === "user/login/rejected" || action.type === "user/register/rejected") {

        store.dispatch({
            type: "error/setErrors",
            payload: action.payload,
        })

    }

    if(action.type === "user/activateAccount/rejected") {

        store.dispatch({
            type: "error/setActivationErrors",
            payload: action.payload
        })

    }
    
    next(action)
}