const jwt = require('jsonwebtoken')
const UserToken = require('../models/UsetToken')

/** TOKENS SECRET KEYS **/
const ACCESS_TOKEN_PRIVATE_KEY = 'Secret_for_access'
/** Don't forget change key in verifyRefreshToken.js **/

const generateAccessToken = async (user) =>{
    try{
        /** Create access token with user id **/
        const payload = {_id: user._id}
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_PRIVATE_KEY, {expiresIn: "15m"})
        return Promise.resolve(accessToken)

    }
    catch (e) {
        return Promise.reject(e)
    }
}

module.exports=generateAccessToken