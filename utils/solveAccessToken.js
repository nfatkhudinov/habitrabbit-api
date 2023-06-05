const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_PRIVATE_KEY = 'Secret_for_access'
const solveAccessToken = async(accessToken)=>{
    try {
        const result = await jwt.verify(accessToken, ACCESS_TOKEN_PRIVATE_KEY)
        return Promise.resolve(result)
    }
    catch (e) {
        return Promise.reject(e)
    }
}

module.exports = solveAccessToken