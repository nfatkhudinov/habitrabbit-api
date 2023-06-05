const Router = require('express')
const UserToken = require('../models/UsetToken')
const jwt = require('jsonwebtoken')
const {refreshTokenValidation} = require("../utils/validator");
const verifyRefreshToken = require("../utils/verifyRefreshToken");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const router = Router()
const UserRefreshToken = require('../models/UsetToken')
const generateRefreshToken = require("../utils/refreshTokenGenerator");


/** Get new access token **/
const ACCESS_TOKEN_PRIVATE_KEY = 'Secret_for_access'
router.post("/", jsonParser, async (req, res)=>{
    try {
        const {error} = refreshTokenValidation(req.body)
        if (error) return res.json({error: true, message: 'Your token does not pass validation stage'})

        const {findToken} = await verifyRefreshToken(req.body)
        console.log(findToken)

        /** Generating new access token**/
        const payload = {_id: findToken.userId}
        const accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_PRIVATE_KEY,
            {expiresIn: "15m"}
        )

        /** Deleting last refresh token **/
        await UserRefreshToken.deleteOne({token: req.body.refreshToken})


        /** Generating new refresh token and write it to database**/
       const refreshToken = await generateRefreshToken({_id: findToken.userId}, req.get('User-Agent'), req.ip)

        console.log('New token successfully created')
       return res.json(
            {
                error: false,
               message: 'New token pair generated',
                accessToken,
                accessTokenLifetime: '15m',
                refreshToken,
                refreshTokenLifetime: '30d',})

    }
    catch (e) {
        return res.json({error: true, message: 'Critical error while refreshing token'})
    }
})

module.exports = router