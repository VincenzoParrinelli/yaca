const handleErrors = (req, res, next) => {

    const { emailErrorsMap, passwordErrorsMap } = res.locals


    if (emailErrorsMap.size) return res.status(400).send(...emailErrorsMap)
    if (passwordErrorsMap.size) return res.status(400).send(...passwordErrorsMap)


    next()
}


module.exports = { handleErrors }