const jwt = require('jsonwebtoken')
const UserRefreshToken = require('../models/UsetToken')


/** TOKENS SECRET KEYS **/
const ACCESS_TOKEN_PRIVATE_KEY = 'Secret_for_access'
const REFRESH_TOKEN_PRIVATE_KEY = 'Secret_for_refresh'
/** Don't forget change key in verifyRefreshToken.js **/

const generateRefreshToken = async (user, device, ip) =>{
    try{
        /** Create refresh token includes user id **/
        const payload = {_id: user}
        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_PRIVATE_KEY, {expiresIn: "30d"})
        const newUserRefreshToken =
           await new UserRefreshToken(
               {userId: user,
                    token: refreshToken,
                    device: device,
                    ip: ip})
        console.log('NEW USER REFRESH TOKEN', user)
        /** save new Refresh token to database **/
        newUserRefreshToken.save()
        return Promise.resolve(refreshToken)

    }
    catch (e) {
        return Promise.reject(e)
    }
}

module.exports=generateRefreshToken