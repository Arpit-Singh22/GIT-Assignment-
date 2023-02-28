// Error

const appError = (message, statusCode) => {
    const error = new Error(message)
    error.statusCode = statusCode ? statusCode : 500
    error.stack = error.stack
    return error
}

module.exports = appError