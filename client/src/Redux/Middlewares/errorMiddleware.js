export const errorMiddleware = store => next => action => {

    if (action.type === "user/login/rejected") {

        store.dispatch({
            type: "error/setErrors",
            payload: action.payload,
        })

    }

    next(action)
}