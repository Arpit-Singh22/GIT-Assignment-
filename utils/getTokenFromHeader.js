const getTokenFromHeader = (req) => {
    // get token from header
    const headerObject = req.headers
    // console.log(headerObject);
    const token = headerObject['authorization'].split(" ")[1]
    if (token !== undefined) {
        return token
    }
    else {
        return false
    }
}

module.exports = getTokenFromHeader