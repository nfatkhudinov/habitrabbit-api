const Router = require('express')
const {accessTokenValidation} = require("../utils/validator");
const router = Router()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const jwt = require('jsonwebtoken')
const solveAccessToken = require("../utils/solveAccessToken");


const ACCESS_TOKEN_PRIVATE_KEY = 'Secret_for_access'
router.get('/', jsonParser,  async (req, res) => {
    try {
        console.log('USERAGENT:',req.get('User-Agent'), '\nUSERIP:',req.ip)
        const {error} = accessTokenValidation(req.body)
        if (error) return res.json({error: true, message: 'Validation error'})

        try{const result = await solveAccessToken(req.body.accessToken)
        console.log(result)}
        catch (e) {
            return res.json({e})
        }
        return res.json({message: 'No error'})


    } catch (e) {
        return res.json({message: 'Critical error', e})
    }
})

module.exports=router
