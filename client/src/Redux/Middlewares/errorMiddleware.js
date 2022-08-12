export const errorMiddleware = store => next => action => {

    if (action.type === "user/login/rejected") {

        console.log(action.payload)

        store.dispatch({
            type: "error/setErrors",
            payload: action.payload,
        })

    }

    next(action)
}