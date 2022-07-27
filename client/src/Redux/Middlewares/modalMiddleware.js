const modalsMiddleware = store => next => async action => {

    next(action)
}

export default modalsMiddleware